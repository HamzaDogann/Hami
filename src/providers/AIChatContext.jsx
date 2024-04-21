//React Hooks
import { createContext, useState } from "react";

//Providers
import { useLanguage } from "./LanguageContext";

//Configuration
import runChat from "../config/ChatGenerator";

export const AIContext = createContext();


const AIChatContextProvider = (props) => {

    const { language } = useLanguage();
    const errorMessage = language === "en" ? "An error occurred. Try refreshing the page" : "Bir hata meydana geldi sayfayı yenilemeyi deneyin";

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("empty");
    const [dislike, setDislike] = useState(false);
    const [like, setLike] = useState(false);
    const [heart, setHeart] = useState(false);
    const [activeFavChat, setActiveFavChat] = useState("");

    const onSent = async (prompt) => {
        setInput("");
        setResultData("");
        setDislike(false);
        setLike(false);
        setHeart(false);
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        try {
            const response = await runChat(input);
            setActiveFavChat(response);
            setResultData(response);
        } catch (error) {
            setResultData(errorMessage);
        }
        setLoading(false);
        setInput("");
    };


    const aiContextValue = {
        recentPrompt,
        setRecentPrompt,
        onSent,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput,
        dislike,
        setDislike,
        like,
        setLike,
        activeFavChat,
        setActiveFavChat,
        heart,
        setHeart,
    }

    return (
        <AIContext.Provider value={aiContextValue}>
            {props.children}
        </AIContext.Provider>
    )
}

export default AIChatContextProvider;