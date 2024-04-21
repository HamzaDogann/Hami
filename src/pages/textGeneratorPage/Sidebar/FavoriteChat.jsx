//Providers
import { useFavChat } from "../../../providers/FavoriteChatsContext.jsx";
import { useLanguage } from '../../../providers/LanguageContext';

//Styles
import { TiDelete } from "react-icons/ti";

const FavoriteChat = ({ chat, index, theme, isNew, setPopup ,onChatClick}) => {

    const { setFavChats } = useFavChat();
    const { language } = useLanguage();

    const DeleteSelectedChat = () => {
        const storedChats = JSON.parse(localStorage.getItem("favChats"));
        const updatedChats = storedChats.filter(item => item.id !== chat.id);
        localStorage.setItem("favChats", JSON.stringify(updatedChats));
        setFavChats(updatedChats)
    }

    const setDeleteChatPopup = (event) => {
        event.stopPropagation();
        setPopup(prevState => ({
            ...prevState,
            show: true,
            content: `${language === "en" ? "Are you sure to delete this chat?" : "Bu sohbeti silmek üzeresin"}`,
            function: DeleteSelectedChat
        }));
    }

    return (
        <>
            <li onClick={onChatClick} className={`li-chat-animation favori-li  mt-3 flex justify-between items-center rounded-[10px] p-4 cursor-pointer ${theme ? "border-[#cecece] bg-[#d7d7d7bb]" : "border-[#3d3d3d] bg-[#1b1b1bd8]"} ${isNew ? 'new-item' : ''}`} key={index}>
                <span className={`${theme ? "text-[#303030]" : "text-[#e2e2e2]"} font-light truncate-text`}>
                    {chat.title}
                </span>
                <button onClick={(event) => { event.stopPropagation(); setDeleteChatPopup(event); }} value={chat.id} className='delete-btn'><TiDelete /></button>
            </li>

        </>
    );
};

export default FavoriteChat;