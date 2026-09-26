import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import runImage from "../config/ImageGenerator";

const AIImageContext = createContext(null);

// Owns the current generation only (prompt, options, result). Saved images live in FavImagesProvider.
export const AIImageProvider = ({ children }) => {

    const [prompts, setPrompts] = useState("");
    const [quality, setQuality] = useState("High");
    const [style, setStyle] = useState("Realistic");

    const [showResult, setShowResult] = useState(false);
    const [recentPrompt, setRecentPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    // { blob, url } of the current image. The object URL is revoked when replaced to free memory.
    const [image, setImage] = useState(null);
    const objectUrlRef = useRef("");

    const replaceImage = useCallback((blob) => {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = blob ? URL.createObjectURL(blob) : "";
        setImage(blob ? { blob, url: objectUrlRef.current } : null);
    }, []);

    const generate = useCallback(async () => {
        const prompt = prompts.trim();
        if (!prompt || loading) return;

        setShowResult(true);
        setRecentPrompt(prompt);
        setPrompts("");
        setErrorCode(null);
        setIsSaved(false);
        replaceImage(null);
        setLoading(true);

        try {
            replaceImage(await runImage(prompt, quality, style));
        } catch (error) {
            setErrorCode(error.code ?? "unavailable");
        } finally {
            setLoading(false);
        }
    }, [prompts, quality, style, loading, replaceImage]);

    const value = useMemo(() => ({
        prompts, setPrompts, quality, setQuality, style, setStyle,
        showResult, setShowResult, recentPrompt, loading, errorCode, isSaved, setIsSaved,
        imageBlob: image?.blob ?? null,
        imageUrl: image?.url ?? "",
        generate,
    }), [prompts, quality, style, showResult, recentPrompt, loading, errorCode, isSaved, image, generate]);

    return <AIImageContext.Provider value={value}>{children}</AIImageContext.Provider>;
};

export const useAIImage = () => {
    const context = useContext(AIImageContext);
    if (!context) throw new Error("useAIImage must be used inside <AIImageProvider>");
    return context;
};
