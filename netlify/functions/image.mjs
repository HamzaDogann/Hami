import { InferenceClient } from "@huggingface/inference";
import { hfFetch } from "../lib/hfFetch.mjs";
import { errorResponse, getToken, codeFromStatus, isRetryable, readBody, withNetworkRetry, isConnectionError } from "../lib/http.mjs";

const MAX_PROMPT_LENGTH = 1500;
const NETWORK_ATTEMPTS = 3;

// The UI sends "Low" / "Medium" / "High"; anything else (e.g. the default) is treated as High.
const SIZES = { Low: 512, Medium: 768, High: 1024 };

// Style buttons in the UI -> prompt suffix.
const STYLES = {
    Realistic: "ultra realistic, photorealistic, natural lighting, sharp focus, highly detailed",
    Cinematic: "cinematic still, dramatic lighting, shallow depth of field, film grain, anamorphic lens",
    Origami: "origami style, folded paper art, paper craft, clean studio lighting",
    Animation: "animated film style, vibrant colors, stylized characters, smooth shading",
    Cartoon: "cartoon style, bold outlines, flat colors, playful",
    "Pixel Art": "pixel art, 16-bit retro game style, limited color palette, crisp pixels",
    "3D": "3D render, octane render, soft global illumination, detailed materials",
};

// Tried in order. FLUX.1-schnell (Apache-2.0, 4 steps) is the cheapest good option, so it comes first.
// `parameters` are provider specific: nscale takes an OpenAI-style `size`, fal takes `image_size`.
const attempts = (size) => [
    { model: "black-forest-labs/FLUX.1-schnell", provider: "nscale", parameters: { size: `${size}x${size}` } },
    { model: "black-forest-labs/FLUX.1-schnell", provider: "fal-ai", parameters: { image_size: { width: size, height: size }, num_inference_steps: 4 } },
    { model: "Tongyi-MAI/Z-Image-Turbo", provider: "fal-ai", parameters: { image_size: { width: size, height: size } } },
];

const statusOf = (err) => err?.httpResponse?.status ?? 0;

export default async (req) => {
    if (req.method !== "POST") return errorResponse(405, "bad_request", "Method not allowed");

    const token = getToken();
    if (!token) return errorResponse(500, "config", "HF_TOKEN is not configured on the server.");

    const body = await readBody(req);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return errorResponse(400, "bad_request", "Prompt is required.");
    if (prompt.length > MAX_PROMPT_LENGTH) return errorResponse(400, "bad_request", `Prompt is too long (max ${MAX_PROMPT_LENGTH} characters).`);

    const size = SIZES[body.quality] ?? SIZES.High;
    const style = STYLES[body.style];
    const finalPrompt = style ? `${prompt}, ${style}` : prompt;

    const client = new InferenceClient(token);
    let lastStatus = 0;
    let lastCode = "unavailable";

    for (const { model, provider, parameters } of attempts(size)) {
        try {
            const image = await withNetworkRetry(
                () => client.textToImage({ provider, model, inputs: finalPrompt, parameters }, { outputType: "blob", fetch: hfFetch }),
                { attempts: NETWORK_ATTEMPTS, isNetworkError: isConnectionError }
            );
            return new Response(image.stream(), {
                status: 200,
                headers: { "Content-Type": image.type || "image/jpeg", "Cache-Control": "no-store" },
            });
        } catch (err) {
            lastStatus = statusOf(err);
            lastCode = isConnectionError(err) ? "network" : codeFromStatus(lastStatus);
            console.error(`image: ${provider}/${model} failed (${lastStatus || "no status"}):`, err?.message);
            if (!isRetryable(lastStatus) && lastCode !== "network") break;
        }
    }

    return errorResponse(lastStatus >= 400 && lastStatus < 600 ? lastStatus : 502, lastCode, "The image model could not generate an image.");
};
