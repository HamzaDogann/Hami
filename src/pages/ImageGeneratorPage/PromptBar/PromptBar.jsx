import { useAIImage } from '../../../providers/AImageContext'
import { useLanguage } from '../../../providers/LanguageContext'
import { useTheme } from '../../../providers/ThemeContext'
import { useUser } from '../../../providers/userAccountContext'

import "./promptBar.css";
import { MdOutlineDraw } from "react-icons/md";
import PromptOptions from "./PromptBarComponents/PromptOptions";
import GenerateButton from "./PromptBarComponents/GenerateButton";

const PromptBar = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { userName, userAvatar } = useUser();
    const { prompts, setPrompts } = useAIImage();

    return (
        <>
            {/* User Box */}
            <div className='user-box'>
                <img className='user-avatar' src={userAvatar} alt="Avatar" />
                <h1 className='hello-user-name' >{t("hey")} {userName},</h1>
            </div>

            <div className={`generator-bar-ani w-full ${!isLightTheme ? "bg-[#1a1a1adf]" : "bg-[#eaeaeadf]"} rounded-md py-5 mt-2`}>

                {/* Prompt Text Box */}
                <div className="prompt-box">
                    <MdOutlineDraw className="info-icons" />
                    <textarea
                        value={prompts}
                        onChange={(event) => setPrompts(event.target.value)}
                        className={`prompt-input ${!isLightTheme ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#dddddd] text-[#212121]"}`}
                        placeholder={t("promptPlaceholder")}
                    />
                </div>

                <div className=" w-full flex ml-[80px] mt-[20px] hr-tag">
                    <hr className="border-[2px] rounded-xl border-[#55555556] w-[60%]" />
                </div>

                <PromptOptions />
                <GenerateButton />
            </div>
        </>
    )
}

export default PromptBar
