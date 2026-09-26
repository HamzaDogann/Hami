import { hfFetch } from "../lib/hfFetch.mjs";
import { json, errorResponse, getToken, codeFromStatus, isRetryable, readBody, withNetworkRetry, isConnectionError } from "../lib/http.mjs";

// Hugging Face Inference Providers (OpenAI-compatible router).
// ":fastest" routes to the provider with the highest throughput (Groq / Cerebras for gpt-oss). This matters:
// a long answer must finish inside the function time limit (30 s locally, 60 s on Netlify). Measured for a
// "write a document" prompt: gpt-oss-120b 3-5 s, gemma-4-31B-it over 90 s.
const CHAT_URL = "https://router.huggingface.co/v1/chat/completions";
const DEFAULT_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "google/gemma-4-31B-it"];
const PROVIDER_POLICY = ":fastest";

const MAX_PROMPT_LENGTH = 4000;
const NETWORK_ATTEMPTS = 5; // 5 x 4 s connect timeout stays below the 30 s local / 60 s Netlify limit

const SYSTEM_PROMPTS = {
    tr: "Sen Hami'sin: yardımsever, açık ve doğru cevaplar veren bir yapay zeka asistanısın. Kullanıcı başka bir dilde yazmadıkça Türkçe cevap ver. Cevaplarında Markdown kullan; kod örneklerini dil etiketli kod bloklarıyla (```js gibi) yaz.",
    en: "You are Hami, a helpful AI assistant that gives clear and accurate answers. Reply in the language the user writes in (English by default). Use Markdown, and put code examples in fenced code blocks with a language tag (e.g. ```js).",
};

const getModels = () => {
    const custom = Netlify.env.get("HF_TEXT_MODEL");
    return custom ? [custom, ...DEFAULT_MODELS.filter((m) => m !== custom)] : DEFAULT_MODELS;
};

// Some reasoning models inline their chain of thought; keep only the final answer.
const cleanAnswer = (text) => text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

export default async (req) => {
    if (req.method !== "POST") return errorResponse(405, "bad_request", "Method not allowed");

    const token = getToken();
    if (!token) return errorResponse(500, "config", "HF_TOKEN is not configured on the server.");

    const body = await readBody(req);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return errorResponse(400, "bad_request", "Prompt is required.");
    if (prompt.length > MAX_PROMPT_LENGTH) return errorResponse(400, "bad_request", `Prompt is too long (max ${MAX_PROMPT_LENGTH} characters).`);

    const system = SYSTEM_PROMPTS[body.language === "en" ? "en" : "tr"];
    let lastStatus = 0;
    let lastCode = "unavailable";

    for (const model of getModels()) {
        let res;
        try {
            res = await withNetworkRetry(
                () => hfFetch(CHAT_URL, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: `${model}${PROVIDER_POLICY}`,
                        messages: [
                            { role: "system", content: system },
                            { role: "user", content: prompt },
                        ],
                        temperature: 0.7,
                        max_tokens: 2048,
                        stream: false,
                        // gpt-oss thinks before answering; "low" keeps that short so the answer is not cut off.
                        ...(model.startsWith("openai/gpt-oss") && { reasoning_effort: "low" }),
                    }),
                }),
                { attempts: NETWORK_ATTEMPTS, isNetworkError: isConnectionError }
            );
        } catch (err) {
            console.error(`chat: network error for ${model}:`, err?.cause?.code ?? err);
            lastStatus = 502;
            lastCode = "network";
            break; // the connection itself is the problem, another model will not help
        }

        if (res.ok) {
            const data = await res.json();
            const text = cleanAnswer(data?.choices?.[0]?.message?.content ?? "");
            if (text) return json(200, { text, model });
            console.warn(`chat: empty answer from ${model}, trying next model`);
            lastStatus = 502;
            lastCode = "unavailable";
            continue;
        }

        lastStatus = res.status;
        lastCode = codeFromStatus(res.status);
        console.error(`chat: ${model} -> ${res.status}`, (await res.text()).slice(0, 500));
        if (!isRetryable(res.status)) break;
    }

    return errorResponse(lastStatus >= 400 && lastStatus < 600 ? lastStatus : 502, lastCode, "The text model could not answer.");
};
