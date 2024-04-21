//React Hooks
import { useState } from 'react';

//Npm Packages
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

//Providers
import { useFavChat } from "../../providers/FavoriteChatsContext.jsx";
import { useLanguage } from '../../providers/LanguageContext';
import { useTheme } from '../../providers/ThemeContext.jsx';

//Styles 
import "./SelectedFavoriteChatModal.css";
import { FaCheck } from "react-icons/fa";
import { BsCalendarHeart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";


const SelectedFavoriteChatModal = ({ setPopup}) => {

    const { language } = useLanguage();
    const { darkMode } = useTheme();
    const [copied, setCopied] = useState(false);
    const { selectedChatModal, setSelectedChatModal, setFavChats } = useFavChat();


    if (!selectedChatModal || !selectedChatModal.title) {
        return null;
    }

    // ----------- Copy ------------ //

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

    const CopyTexts = () => {
        const cleanTexts = MarkdownCleaner(selectedChatModal.texts);
        navigator.clipboard.writeText(cleanTexts);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    // ----------- Delete ------------ //
    const DeleteSelectedChat = () => {
        const storedChats = JSON.parse(localStorage.getItem("favChats"));
        const updatedChats = storedChats.filter(item => item.id !== selectedChatModal.id);
        localStorage.setItem("favChats", JSON.stringify(updatedChats));
        setFavChats(updatedChats)
        setSelectedChatModal({});
    }

    const DeleteChat = (event) => {
        event.stopPropagation();
        setPopup(prevState => ({
            ...prevState,
            show: true,
            content: `${language === "en" ? "Are you sure to delete this chat?" : "Bu sohbeti silmek üzeresin"}`,
            function: DeleteSelectedChat
        }));
    }

    // ----------- Close Modal ------------ //
    const handleCloseButton = () => {
        setSelectedChatModal("");
        setCopied(false);
    }

    // Return Content
    return (
        <div className='selected-favorite'>
            <div className={`selected-favorite-box ${darkMode ? "bg-[#e4e4e4] border-[#bdbdbd]" : "bg-[#141414] border-[#282828]"}`}>
                {/* Title */}
                <div className={`title-box ${darkMode ? "bg-[#e4e4e4]" : "bg-[#141414]"}`}>
                    <div className="title-flex">
                        <h1 className={`title ${darkMode ? "text-[#141414]" : "text-[#e8e8e8]"}`}>{selectedChatModal.title}</h1>
                    </div>

                    <div>
                        <p className={`date-info ${darkMode ? " text-[#323232] bg-[#cfcfcf]" : "text-[#e4e4e4] bg-[#272727]"}`}>
                            <span className="mx-2"><BsCalendarHeart /></span>
                            <span className="mr-2">{selectedChatModal.date}</span>
                        </p>
                    </div>
                </div>

                {/* TextArea */}
                <div className="text-area-box">
                    <ReactMarkdown className={`markdown-content ${!darkMode ? "text-[#ebebeb]" : "text-[#353535]"}`}
                        children={selectedChatModal.texts}
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
                                        style={oneDark}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>

                {/* chat-options */}
                <div className="chat-options">
                    <div className={`options-buttons-box ${darkMode ? "bg-[#cfcfcf]" : "bg-[#282828]"}`}>
                        <button onClick={CopyTexts} className="options-btns">{copied ? < FaCheck /> : <MdContentCopy />}</button>
                        <button onClick={DeleteChat} className="options-btns"><MdDelete /></button>
                    </div>
                </div>

                {/* Close Button */}
                <div className="close-btn-box">
                    <button onClick={handleCloseButton} className="close-btn">{language === "en" ? "Close" : "Kapat"}</button>
                </div>
            </div>
        </div>
    )
}

export default SelectedFavoriteChatModal;
