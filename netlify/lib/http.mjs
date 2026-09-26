// Shared helpers for the Netlify Functions (HF token stays server-side).

export const json = (status, body) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });

export const getToken = () => Netlify.env.get("HF_TOKEN");

// Maps an upstream HTTP status to a stable code the frontend can localize.
export const codeFromStatus = (status) => {
    if (status === 401 || status === 403) return "auth";
    if (status === 402) return "quota";
    if (status === 429) return "rate_limit";
    if (status === 400 || status === 404 || status === 422) return "bad_request";
    return "unavailable";
};

// Statuses where trying the next model/provider makes sense.
// auth / quota / rate_limit hit the account, so a fallback would fail the same way.
export const isRetryable = (status) => !status || status === 400 || status === 404 || status === 422 || status >= 500;

export const errorResponse = (status, code, message) => json(status, { error: { code, message } });

export const readBody = async (req) => {
    try {
        return await req.json();
    } catch {
        return null;
    }
};

// True for failures where no HTTP answer arrived: fetch's TypeError ("fetch failed") or a connection error code.
export const isConnectionError = (error) =>
    error instanceof TypeError || /^(UND_ERR|ECONN|ETIMEDOUT|ENOTFOUND|EAI_AGAIN)/.test(error?.cause?.code ?? error?.code ?? "");

// Connection failures (timeouts, resets) are often transient and a retry can reach a different server IP.
// Only errors accepted by `isNetworkError` are retried; HTTP errors are thrown right away.
export const withNetworkRetry = async (task, { attempts, isNetworkError }) => {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await task();
        } catch (error) {
            lastError = error;
            if (!isNetworkError(error)) throw error;
        }
    }
    throw lastError;
};
