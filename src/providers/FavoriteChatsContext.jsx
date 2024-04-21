
//React Hooks
import React, { createContext, useContext, useState, useCallback } from 'react';

const FavChatsContext = createContext();

//Get Existing Favorite Chats
const getExistingFavChats = () => {
    const existingFavChats = localStorage.getItem("favChats");
    if (existingFavChats) {
        return JSON.parse(existingFavChats);
    } else {
        return [];
    }
};

//Is Unique?
const isUniqueFavChat = (newFavChat, existingFavChats) => {
    return !existingFavChats.some((chat) => chat.title === newFavChat.title && chat.texts === newFavChat.texts);
};

export const FavChatsProvider = ({ children }) => {

    const [favChats, setFavChats] = useState(() => getExistingFavChats());
    const [selectedChatModal, setSelectedChatModal] = useState("");

    //Set New Favorite Chat
    const setNewFavChat = useCallback((title, texts) => {
        const savedDate = new Date();
        const options = {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            separator: "-",
            hour12: false,
            minute: "2-digit",
        };
        const formattedDate = savedDate.toLocaleDateString(undefined, options);

        const newFavChat = {
            id: Date.now(),
            title,
            texts,
            date: formattedDate,
        };

        if (isUniqueFavChat(newFavChat, favChats)) {
            const updatedFavChats = [...favChats, newFavChat];
            localStorage.setItem("favChats", JSON.stringify(updatedFavChats));
            setFavChats(updatedFavChats);
        }
    }, [favChats]);

    return (
        <FavChatsContext.Provider value={{ favChats, setNewFavChat, setFavChats, selectedChatModal, setSelectedChatModal }}>
            {children}
        </FavChatsContext.Provider>
    );
};

export const useFavChat = () => {
    return useContext(FavChatsContext);
};