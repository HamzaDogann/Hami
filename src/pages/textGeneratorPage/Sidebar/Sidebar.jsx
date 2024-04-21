//React Hooks
import React from 'react';
import { useContext, useState, useMemo } from 'react';

//Provider
import { useFavChat } from "../../../providers/FavoriteChatsContext.jsx";
import { AIContext } from '../../../providers/AIChatContext.jsx';

//Components
import FavoriteChat from './FavoriteChat.jsx';
import SelectedFavoriteChatModal from '../SelectedFavoriteChatModal.jsx';

//Styles - Icons
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { WiStars } from "react-icons/wi";
import "../textGenerator.css";


const Sidebar = ({ language, theme, setPopup }) => {

    const MemoizedFavoriteChat = React.memo(FavoriteChat);

    //Provider
    const { showResult, setShowResult, resultData } = useContext(AIContext);
    const { favChats, setFavChats, setSelectedChatModal } = useFavChat();
    const favChatsArray = favChats;

    const [showModal, setShowModal] = useState(false);


    // New Chat Handler
    const newChatHandle = () => {
        if (showResult && resultData !== "") {
            setShowResult(false);
        }
    };

    // Delete All Chats Handler
    const deleteAllItemFunc = () => {
        localStorage.removeItem("favChats");
        setFavChats([]);
    };

    const DeleteAllChats = () => {
        setPopup((prevState) => ({
            ...prevState,
            show: true,
            content: `${language === "en" ? "Are you sure to delete all chats?" : "Bütün sohbetleri silmek üzeresin"}`,
            function: deleteAllItemFunc
        }));
    };


    // Fav Chats Length Handler
    const favChatsLength = useMemo(() => {
        if (favChats && Array.isArray(favChatsArray)) {
            return favChats.length;
        }
        return 0;
    }, [favChats]);


    //Selected Chat Handler
    const handleSelectedChat = (chat) => {
        setSelectedChatModal(chat);
        setShowModal(true);
    }


    return (

        <div className='h-[auto] favorite-bar-animation'>
            <div className={`w-[100%] z-40 p-3 flex justify-center border-b-[3px] ${theme ? "border-[#cecece] " : "border-[#474747]"} `}>
                <button onClick={() => newChatHandle()} className='new-chat-btn'>
                    <span className={`mr-3 text-[#ececec]`}>
                        {language === "en" ? "New Chat" : "Yeni Sohbet"}
                    </span>
                    <span className='text-[#e3e3e3]'>
                        <BsFillChatSquareTextFill />
                    </span>
                </button>
            </div>

            <div className='favorite-bar-animation sidebar-favorites h-[100vh]'>
                <div className={`w-full flex justify-center ${theme ? "border-[#cecece] " : "border-[#474747]"} mt-4 `}>
                    <h1 className={`${theme ? "text-[#303030] " : "text-[#e2e2e2]"} flex justify-center items-center font-medium`}>
                        <span className='mr-1'>{language === "en" ? "Favorites" : "Favoriler"}</span>
                        <span className={`text-[30px] ${theme ? "text-[#303030] " : "text-[#e2e2e2]"}`}><WiStars /></span>
                        <span>{favChatsLength}</span>
                    </h1>
                </div>

                <div className='favori-texts-box mt-2  px-5'>
                    {favChatsArray.length > 0 ? (
                        <ul className='favorite-chats-ul'>
                            {favChatsArray.map((chat, index) => (
                                <MemoizedFavoriteChat
                                    key={chat.id}
                                    index={index}
                                    chat={chat}
                                    theme={theme}
                                    setPopup={setPopup}
                                    onChatClick={() => handleSelectedChat(chat)} // Call handleSelectedChat with chat data
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className='flex justify-center'>
                            <h1 className="text-center mt-4 text-gray-500">{language === "en" ? "No favorite chats" : "Favori konuşmalar yok"}</h1>
                        </div>
                    )}

                    {favChatsArray.length > 0 && (
                        <div className='my-5 flex justify-center'>
                            <button onClick={DeleteAllChats} className={`all-chats-delete-btn ${theme ? "text-[#292929]" : "text-[#ebebeb]"}`}>
                                {language === "en" ? "Delete All" : "Tümünü Sil"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showModal && <SelectedFavoriteChatModal setPopup={setPopup} />}
        </div>
    )
}

export default Sidebar;