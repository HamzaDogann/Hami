import { useFavChat } from "../../providers/FavoriteChatsContext.jsx";
import { useConfirm } from '../../providers/ConfirmContext.jsx';
import { useLanguage } from '../../providers/LanguageContext';
import { useTheme } from '../../providers/ThemeContext.jsx';

import MarkdownContent from '../../components/MarkdownContent.jsx';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js';
import { markdownToPlainText } from '../../utils/markdown.js';

import "./SelectedFavoriteChatModal.css";
import { FaCheck } from "react-icons/fa";
import { BsCalendarHeart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";

const SelectedFavoriteChatModal = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { confirm } = useConfirm();
    const { copied, copy, reset } = useCopyToClipboard();
    const { selectedChat, setSelectedChat, removeFavChat } = useFavChat();

    if (!selectedChat) return null;

    const handleDelete = () => {
        confirm({ content: t("deleteChatConfirm"), onConfirm: () => removeFavChat(selectedChat.id) });
    };

    const handleClose = () => {
        setSelectedChat(null);
        reset();
    };

    return (
        <div className='selected-favorite'>
            <div className={`selected-favorite-box ${isLightTheme ? "bg-[#e4e4e4] border-[#bdbdbd]" : "bg-[#141414] border-[#282828]"}`}>
                {/* Title */}
                <div className={`title-box ${isLightTheme ? "bg-[#e4e4e4]" : "bg-[#141414]"}`}>
                    <div className="title-flex">
                        <h1 className={`title ${isLightTheme ? "text-[#141414]" : "text-[#e8e8e8]"}`}>{selectedChat.title}</h1>
                    </div>

                    <div>
                        <p className={`date-info ${isLightTheme ? " text-[#323232] bg-[#cfcfcf]" : "text-[#e4e4e4] bg-[#272727]"}`}>
                            <span className="mx-2"><BsCalendarHeart /></span>
                            <span className="mr-2">{selectedChat.date}</span>
                        </p>
                    </div>
                </div>

                {/* TextArea */}
                <div className="text-area-box">
                    <MarkdownContent className={`markdown-content ${!isLightTheme ? "text-[#ebebeb]" : "text-[#353535]"}`} content={selectedChat.texts} />
                </div>

                {/* chat-options */}
                <div className="chat-options">
                    <div className={`options-buttons-box ${isLightTheme ? "bg-[#cfcfcf]" : "bg-[#282828]"}`}>
                        <button onClick={() => copy(markdownToPlainText(selectedChat.texts))} className="options-btns">{copied ? <FaCheck /> : <MdContentCopy />}</button>
                        <button onClick={handleDelete} className="options-btns"><MdDelete /></button>
                    </div>
                </div>

                {/* Close Button */}
                <div className="close-btn-box">
                    <button onClick={handleClose} className="close-btn">{t("close")}</button>
                </div>
            </div>
        </div>
    )
}

export default SelectedFavoriteChatModal;
