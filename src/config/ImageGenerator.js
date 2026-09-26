import { AIError, toAIError } from "./aiError";

// Calls the Netlify Function that talks to Hugging Face (the HF token never reaches the browser).
const IMAGE_ENDPOINT = "/.netlify/functions/image";

// Resolves with the generated image as a Blob.
// `quality` is Low | Medium | High and `style` is one of the PromptOptions styles; the function maps both.
async function runImage(prompt, quality, style) {
    let response;
    try {
        response = await fetch(IMAGE_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, quality, style }),
        });
    } catch {
        throw new AIError("network", "Could not reach the server.");
    }

    if (!response.ok) throw await toAIError(response);

    return response.blob();
}

export default runImage;
