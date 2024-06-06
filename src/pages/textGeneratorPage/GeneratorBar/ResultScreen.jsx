//React Hooks
import { useState, useContext, useMemo } from 'react';

//NPM Packages
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

//Custom Provider
import { AIContext } from '../../../providers/AIChatContext.jsx';
import { useFavChat } from '../../../providers/FavoriteChatsContext.jsx'
import { useModal } from '../../../providers/AlertModalContext.jsx';
import { useLanguage } from '../../../providers/LanguageContext.jsx'

//User Avatars
import Avatars from "../../../components/AvatarSelection/avatars";

//Assets - Icons
import HamiLogo from "../../../assets/HamiLogo.png";
import { MdContentCopy } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

//Styles
import "../textGenerator.css";
const ResultScreen = ({ userInfos, theme }) => {

    //Provider
    const { setNewFavChat } = useFavChat();
    const { toggleModal } = useModal();
    const { language } = useLanguage();

    //Data
    const { recentPrompt, activeFavChat, loading, resultData, dislike, setDislike, like, setLike, heart, setHeart } = useContext(AIContext);

    //User Informations
    const userAvatar = Avatars[userInfos.avatarId - 1].AvatarImage;
    const userName = userInfos.username;

    // Liked Text
    const handleLikeClick = () => {
        toggleModal(true, language === "en" ? "Thanks for your contribution" : "Katkın için teşekkürler");
        setLike(!like);
        if (dislike) {
            setDislike(false);
        }
    };

    //Disliked Text
    const handleDislikeClick = () => {
        toggleModal(true, language === "en" ? "Thanks for your contribution" : "Katkın için teşekkürler");
        setDislike(!dislike);
        if (like) {
            setLike(false);
        }
    };

    // ----------- Copy ------------ //
    const [copied, setCopied] = useState(false);
    function MarkdownCleaner(texts) {
        // Heading tags (#)
        texts = texts.replace(/\#\s*(.*?)\n/g, '');
        // Bold tags (**)
        texts = texts.replace(/\*\*(.*?)\*\*/g, '$1');
        // Italic tags (*)
        texts = texts.replace(/\*(.*?)\*/g, '$1');
        // Link tags ([title](url))
        texts = texts.replace(/\[(.*?)\]\((.*?)\)/g, '$1');
        // Image tags (![title](url))
        texts = texts.replace(/\!\[(.*?)\]\((.*?)\)/g, '$1');
        // Code tags (`)
        texts = texts.replace(/\`(.*?)\`/g, '$1');
        // Code block tags (```language)
        texts = texts.replace(/\`\`\`.*?\n(.*?)\n\`\`\`/gs, '$1');
        // Replace "*" and "`" symbols with a space
        texts = texts.replace(/[\*\`]/g, ' ');
        // Remove trailing spaces
        texts = texts.replace(/  \n/g, '\n');
        return texts;
    }

    const copyPlainTextToClipboard = () => {
        const cleanTexts = MarkdownCleaner(resultData);
        navigator.clipboard.writeText(cleanTexts);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    // New Favorite Chat Handler

    const handleNewFavChat = (title, texts) => {
        setNewFavChat(title, texts);
        setHeart(true);
        toggleModal(true, language === "en" ? "A new favorite chat has been added" : "Yeni bir favori sohbet eklendi");

    }
    
    const memoizedContent = useMemo(() => {
        return (
            <div className="result">
                <div className='result-title'>
                    <div className='flex items-center mr-2'>
                        <img className='w-[60px] mr-1' src={userAvatar} alt="" />
                        <span className={`font-medium ${theme ? "text-[#2f2f2f] " : "text-white"} `}>{userName}</span>
                    </div>
                    <p className={`pl-2 my-[10px] ${!theme ? "text-[#ebebeb]" : "text-[#353535]"} `}>{recentPrompt}</p>
                </div>
                <div className={`result-data ${theme ? "result-data li-[#2f2f2f] " : "text-white"} `}>
                    <div className='flex items-center'>
                        <img className='w-[60px] mr-1' src={HamiLogo} />
                        <span className={`font-medium ${theme ? "text-[#2f2f2f] " : "text-white"} `}>Hami</span>
                    </div>
                    {loading
                        ? <div className={`loader border-[5px] border-t-[5px] ${!theme ? "border-[#323232] border-t-[#525252]" : "border-[#d0d0d0] border-t-[#949494]"} `}></div>
                        : <div className='result-visibility'>
                            <ReactMarkdown className={`pl-2 my-[10px] ${!theme ? "text-[#ebebeb]" : "text-[#353535]"}`}
                                children={resultData}
                                components={{
                                    code(props) {
                                        const { children, className, node, ...rest } = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <SyntaxHighlighter
                                                {...rest}
                                                PreTag="div"
                                                children={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                                style={!theme ? oneDark : oneLight}
                                            />
                                        ) : (
                                            <code {...rest} className={className}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            />
                            <div className={`icon-btns pl-2 mt-2 ${!theme ? "text-[#dfdfdf]" : "text-[#2f2f2f]"} `}>
                                <button className='mr-2 hover:scale-[1.1]' onClick={handleLikeClick}>
                                    {like ? <AiFillLike /> : <AiOutlineLike />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={handleDislikeClick}>
                                    {dislike ? <AiFillDislike /> : <AiOutlineDislike />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={copyPlainTextToClipboard}>
                                    {copied ? <FaCheck /> : <MdContentCopy />}
                                </button>
                                <button className='mr-2 hover:scale-[1.1]' onClick={() => handleNewFavChat(recentPrompt, activeFavChat)}>
                                    {heart ? <FaHeart /> : <MdFavoriteBorder />}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }, [resultData, dislike, like, copied, heart,theme]);

    return memoizedContent;
}


export default ResultScreen
