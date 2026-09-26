import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { STORAGE_KEYS, readJSON, writeJSON } from '../utils/storage';

const FavChatsContext = createContext(null);

const getStoredChats = () => {
    const chats = readJSON(STORAGE_KEYS.favChats, []);
    return Array.isArray(chats) ? chats : [];
};

const DATE_FORMAT = { day: '2-digit', month: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false };

export const FavChatsProvider = ({ children }) => {

    const [favChats, setFavChats] = useState(getStoredChats);
    const [selectedChat, setSelectedChat] = useState(null);

    // Every change goes through here so state and storage never drift apart.
    const commit = useCallback((chats) => {
        writeJSON(STORAGE_KEYS.favChats, chats);
        setFavChats(chats);
    }, []);

    // Returns false when this exact chat is already a favorite.
    const addFavChat = useCallback((title, texts) => {
        if (favChats.some((chat) => chat.title === title && chat.texts === texts)) return false;

        const newChat = { id: Date.now(), title, texts, date: new Date().toLocaleString(undefined, DATE_FORMAT) };
        commit([...favChats, newChat]);
        return true;
    }, [favChats, commit]);

    const removeFavChat = useCallback((id) => {
        commit(favChats.filter((chat) => chat.id !== id));
        setSelectedChat((current) => (current?.id === id ? null : current));
    }, [favChats, commit]);

    const clearFavChats = useCallback(() => {
        commit([]);
        setSelectedChat(null);
    }, [commit]);

    const value = useMemo(
        () => ({ favChats, addFavChat, removeFavChat, clearFavChats, selectedChat, setSelectedChat }),
        [favChats, addFavChat, removeFavChat, clearFavChats, selectedChat]
    );

    return <FavChatsContext.Provider value={value}>{children}</FavChatsContext.Provider>;
};

export const useFavChat = () => {
    const context = useContext(FavChatsContext);
    if (!context) throw new Error('useFavChat must be used inside <FavChatsProvider>');
    return context;
};
