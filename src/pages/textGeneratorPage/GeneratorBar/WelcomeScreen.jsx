import { useAIChat } from '../../../providers/AIChatContext.jsx';
import { useLanguage } from '../../../providers/LanguageContext.jsx';
import { useTheme } from '../../../providers/ThemeContext.jsx';

import { FaBoltLightning } from "react-icons/fa6";
import "./welcomeScreen.css";

const SUGGESTION_KEYS = ["suggestion1", "suggestion2", "suggestion3", "suggestion4"];

const WelcomeScreen = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { setInput } = useAIChat();

    return (
        <div>
            <div>
                <h1 className='you-can-ask-title text-[#8e8e8e]'>{t("welcomeTitle")}</h1>
            </div>

            <div className='cards'>
                {SUGGESTION_KEYS.map((key) => (
                    <button
                        key={key}
                        onClick={() => setInput(t(key))}
                        className={`card-btn border-[3px] text-[#767676]  ${!isLightTheme ? "border-[#3d3d3d] bg-[#2e2e2e00]" : "border-[#c4c4c4]"}`}>
                        <span><FaBoltLightning /></span>
                        <span className="ml-[10px]">{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WelcomeScreen
