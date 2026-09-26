import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { useLanguage } from "./LanguageContext";
import runChat from "../config/ChatGenerator";
import { aiErrorKey } from "../i18n/translations";

const AIChatContext = createContext(null);

export const AIChatProvider = ({ children }) => {

    const { language, t } = useLanguage();

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [hasError, setHasError] = useState(false);

    // Feedback / favorite marks for the current answer
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const sendPrompt = useCallback(async () => {
        const prompt = input.trim();
        if (!prompt || loading) return;

        setInput("");
        setRecentPrompt(prompt);
        setResultData("");
        setHasError(false);
        setLiked(false);
        setDisliked(false);
        setFavorited(false);
        setShowResult(true);
        setLoading(true);

        try {
            setResultData(await runChat(prompt, language));
        } catch (error) {
            setHasError(true);
            setResultData(t(aiErrorKey(error.code)));
        } finally {
            setLoading(false);
        }
    }, [input, loading, language, t]);

    // Back to the welcome screen (ignored while an answer is still loading).
    const startNewChat = useCallback(() => {
        if (!loading) setShowResult(false);
    }, [loading]);

    const toggleLike = useCallback(() => {
        setLiked((current) => !current);
        setDisliked(false);
    }, []);

    const toggleDislike = useCallback(() => {
        setDisliked((current) => !current);
        setLiked(false);
    }, []);

    const value = useMemo(() => ({
        input, setInput, recentPrompt, showResult, loading, resultData, hasError,
        liked, disliked, favorited, setFavorited,
        sendPrompt, startNewChat, toggleLike, toggleDislike,
    }), [input, recentPrompt, showResult, loading, resultData, hasError, liked, disliked, favorited, sendPrompt, startNewChat, toggleLike, toggleDislike]);

    return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
};

export const useAIChat = () => {
    const context = useContext(AIChatContext);
    if (!context) throw new Error("useAIChat must be used inside <AIChatProvider>");
    return context;
};
