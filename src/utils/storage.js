// Single access point for localStorage. Every call is guarded because storage can be
// unavailable (private mode) or full (base64 favorite images are large).

export const STORAGE_KEYS = {
    userAccount: "userAccount",
    favChats: "favChats",
    favImages: "favImages",
    language: "language",
    theme: "theme",
    legacyDarkMode: "darkMode",
};

export function readString(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

// Returns false when the value could not be stored (e.g. quota exceeded).
export function writeString(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

export function readJSON(key, fallback) {
    const raw = readString(key);
    if (raw === null) return fallback;
    try {
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function writeJSON(key, value) {
    return writeString(key, JSON.stringify(value));
}

export function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // Nothing to clean up if storage is unavailable.
    }
}
