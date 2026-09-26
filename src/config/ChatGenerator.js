import { AIError, toAIError } from "./aiError";

// Calls the Netlify Function that talks to Hugging Face (the HF token never reaches the browser).
const CHAT_ENDPOINT = "/.netlify/functions/chat";

async function runChat(prompt, language) {
    let response;
    try {
        response = await fetch(CHAT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, language }),
        });
    } catch {
        throw new AIError("network", "Could not reach the server.");
    }

    if (!response.ok) throw await toAIError(response);

    const { text } = await response.json();
    return text;
}

export default runChat;
