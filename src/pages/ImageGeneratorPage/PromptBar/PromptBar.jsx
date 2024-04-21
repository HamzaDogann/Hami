//React Hooks
import { useContext,useState,useEffect } from "react";

//Providers
import { AImageContext } from '../../../providers/AImageContext'

//UserInfos
import Avatars from "../../../components/AvatarSelection/avatars";

//Style
import "./promptBar.css";
import { MdOutlineDraw } from "react-icons/md";
import PromptOptions from "./PromptBarComponents/PromptOptions";
import GenerateButton from "./PromptBarComponents/GenerateButton";


const PromptBar = ({ theme, language }) => {

    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const { setPrompts, prompts } = useContext(AImageContext);

    useEffect(() => {
        const userInfos = JSON.parse(localStorage.getItem('userAccount'));
        const initialAvatar = Avatars[userInfos.avatarId - 1].AvatarImage;
        const initialName = userInfos.username;

        setUserAvatar(initialAvatar);
        setUserName(initialName);
    }, []);


    const handleTextAreaPrompts = (e) => {
        setPrompts(e.target.value);
    }

    return (
        <>
            {/* User Box */}
            <div className='user-box'>
                <img className='user-avatar' src={userAvatar} alt="Avatar" />
                <h1 className='hello-user-name' >{language === "en" ? "Hey" : "Selam"} {userName},</h1>
            </div>

            <div className={`generator-bar-ani w-full ${!theme ? "bg-[#1a1a1adf]" : "bg-[#eaeaeadf]"} rounded-md py-5 mt-2`}>

                {/* Prompt Text Box */}
                <div className="prompt-box">
                    <MdOutlineDraw className="info-icons" />
                    <textarea value={prompts} onChange={handleTextAreaPrompts} className={`prompt-input ${!theme ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#dddddd] text-[#212121]"}`}
                        placeholder={`${language === "en" ? "Write your request, keywords and your imagination here..." : "Buraya isteğinizi, anahtar kelimeleri ve hayal gücünüzü yazın..."}`}>

                    </textarea>
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