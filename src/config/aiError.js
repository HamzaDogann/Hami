// Error thrown by the AI clients. `code` is one of:
// auth | quota | rate_limit | bad_request | unavailable | config | network
export class AIError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "AIError";
        this.code = code;
    }
}

// Turns a failed Netlify Function response into an AIError.
export async function toAIError(response) {
    let code = "unavailable";
    let message = `Request failed with status ${response.status}`;
    try {
        const data = await response.json();
        code = data?.error?.code ?? code;
        message = data?.error?.message ?? message;
    } catch {
        // Non-JSON body (e.g. the function is not running); keep the defaults.
    }
    return new AIError(code, message);
}
