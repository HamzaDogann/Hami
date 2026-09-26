import { useAIChat } from '../../../providers/AIChatContext.jsx';
import { useFavChat } from '../../../providers/FavoriteChatsContext.jsx'
import { useModal } from '../../../providers/AlertModalContext.jsx';
import { useLanguage } from '../../../providers/LanguageContext.jsx'
import { useTheme } from '../../../providers/ThemeContext.jsx';
import { useUser } from '../../../providers/userAccountContext.jsx';

import MarkdownContent from '../../../components/MarkdownContent.jsx';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard.js';
import { markdownToPlainText } from '../../../utils/markdown.js';

import HamiLogo from "../../../assets/HamiLogo.png";
import { MdContentCopy } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

import "../textGenerator.css";

const ResultScreen = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { userName, userAvatar } = useUser();
    const { showAlert } = useModal();
    const { addFavChat } = useFavChat();
    const { copied, copy } = useCopyToClipboard(1000);

    const {
        recentPrompt, resultData, loading, hasError,
        liked, disliked, favorited, setFavorited, toggleLike, toggleDislike,
    } = useAIChat();

    const handleLike = () => {
        showAlert(t("thanksForContribution"));
        toggleLike();
    };

    const handleDislike = () => {
        showAlert(t("thanksForContribution"));
        toggleDislike();
    };

    const handleFavorite = () => {
        addFavChat(recentPrompt, resultData);
        setFavorited(true);
        showAlert(t("favChatAdded"));
    };

    const textColor = !isLightTheme ? "text-[#ebebeb]" : "text-[#353535]";
    const nameColor = isLightTheme ? "text-[#2f2f2f] " : "text-white";

    return (
        <div className="result">
            <div className='result-title'>
                <div className='flex items-center mr-2'>
                    <img className='w-[60px] mr-1' src={userAvatar} alt="" />
                    <span className={`font-medium ${nameColor} `}>{userName}</span>
                </div>
                <p className={`pl-2 my-[10px] ${textColor} `}>{recentPrompt}</p>
            </div>
            <div className={`result-data ${isLightTheme ? "result-data li-[#2f2f2f] " : "text-white"} `}>
                <div className='flex items-center'>
                    <img className='w-[60px] mr-1' src={HamiLogo} alt="" />
                    <span className={`font-medium ${nameColor} `}>Hami</span>
                </div>
                {loading
                    ? <div className={`loader border-[5px] border-t-[5px] ${!isLightTheme ? "border-[#323232] border-t-[#525252]" : "border-[#d0d0d0] border-t-[#949494]"} `}></div>
                    : <div className='result-visibility'>
                        <MarkdownContent className={`pl-2 my-[10px] ${textColor}`} content={resultData} lightCode={isLightTheme} />
                        {!hasError &&
                            <div className={`icon-btns pl-2 mt-2 ${!isLightTheme ? "text-[#dfdfdf]" : "text-[#2f2f2f]"} `}>
                                <button className='mr-2 hover:scale-[1.1]' onClick={handleLike}>
                                    {liked ? <AiFillLike /> : <AiOutlineLike />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={handleDislike}>
                                    {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={() => copy(markdownToPlainText(resultData))}>
                                    {copied ? <FaCheck /> : <MdContentCopy />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={handleFavorite}>
                                    {favorited ? <FaHeart /> : <MdFavoriteBorder />}
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default ResultScreen
