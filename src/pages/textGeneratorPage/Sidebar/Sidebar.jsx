import { useCallback } from 'react';

import { useFavChat } from "../../../providers/FavoriteChatsContext.jsx";
import { useAIChat } from '../../../providers/AIChatContext.jsx';
import { useConfirm } from '../../../providers/ConfirmContext.jsx';
import { useLanguage } from '../../../providers/LanguageContext.jsx';
import { useTheme } from '../../../providers/ThemeContext.jsx';

import FavoriteChat from './FavoriteChat.jsx';
import SelectedFavoriteChatModal from '../SelectedFavoriteChatModal.jsx';

import { BsFillChatSquareTextFill } from "react-icons/bs";
import { WiStars } from "react-icons/wi";
import "../textGenerator.css";

const Sidebar = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { confirm } = useConfirm();
    const { startNewChat } = useAIChat();
    const { favChats, removeFavChat, clearFavChats, setSelectedChat } = useFavChat();

    const handleDeleteChat = useCallback((chat) => {
        confirm({ content: t("deleteChatConfirm"), onConfirm: () => removeFavChat(chat.id) });
    }, [confirm, t, removeFavChat]);

    const handleDeleteAll = () => {
        confirm({ content: t("deleteAllChatsConfirm"), onConfirm: clearFavChats });
    };

    const titleColor = isLightTheme ? "text-[#303030] " : "text-[#e2e2e2]";

    return (
        <div className='h-[auto] favorite-bar-animation'>
            <div className={`w-[100%] z-40 p-3 flex justify-center border-b-[3px] ${isLightTheme ? "border-[#cecece] " : "border-[#474747]"} `}>
                <button onClick={startNewChat} className='new-chat-btn'>
                    <span className={`mr-3 text-[#ececec]`}>{t("newChat")}</span>
                    <span className='text-[#e3e3e3]'>
                        <BsFillChatSquareTextFill />
                    </span>
                </button>
            </div>

            <div className='favorite-bar-animation sidebar-favorites h-[100vh]'>
                <div className={`w-full flex justify-center ${isLightTheme ? "border-[#cecece] " : "border-[#474747]"} mt-4 `}>
                    <h1 className={`${titleColor} flex justify-center items-center font-medium`}>
                        <span className='mr-1'>{t("favorites")}</span>
                        <span className={`text-[30px] ${titleColor}`}><WiStars /></span>
                        <span>{favChats.length}</span>
                    </h1>
                </div>

                <div className='favori-texts-box mt-2  px-5'>
                    {favChats.length > 0 ? (
                        <ul className='favorite-chats-ul'>
                            {favChats.map((chat) => (
                                <FavoriteChat
                                    key={chat.id}
                                    chat={chat}
                                    isLightTheme={isLightTheme}
                                    onSelect={setSelectedChat}
                                    onDelete={handleDeleteChat}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className='flex justify-center'>
                            <h1 className="text-center mt-4 text-gray-500">{t("noFavoriteChats")}</h1>
                        </div>
                    )}

                    {favChats.length > 0 && (
                        <div className='my-5 flex justify-center'>
                            <button onClick={handleDeleteAll} className={`all-chats-delete-btn ${isLightTheme ? "text-[#292929]" : "text-[#ebebeb]"}`}>
                                {t("deleteAll")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <SelectedFavoriteChatModal />
        </div>
    )
}

export default Sidebar;
