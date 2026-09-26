import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { STORAGE_KEYS, readJSON, writeJSON } from '../utils/storage';

const FavImagesContext = createContext(null);

const getStoredImages = () => {
    const images = readJSON(STORAGE_KEYS.favImages, []);
    return Array.isArray(images) ? images : [];
};

export const FavImagesProvider = ({ children }) => {

    const [favImages, setFavImages] = useState(getStoredImages);
    const [searchText, setSearchText] = useState('');

    // Images are stored as base64, so writing can hit the browser quota. Returns false in that case.
    const commit = useCallback((images) => {
        if (!writeJSON(STORAGE_KEYS.favImages, images)) return false;
        setFavImages(images);
        return true;
    }, []);

    // `image` is a data URL. Duplicates count as success so the UI can show "saved".
    const addFavImage = useCallback((prompts, image) => {
        if (favImages.some((item) => item.prompts === prompts && item.image === image)) return true;
        return commit([...favImages, { id: Date.now(), prompts, image }]);
    }, [favImages, commit]);

    const removeFavImage = useCallback((id) => {
        commit(favImages.filter((item) => item.id !== id));
    }, [favImages, commit]);

    const clearFavImages = useCallback(() => commit([]), [commit]);

    // Newest first, narrowed by the search box.
    const visibleImages = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        return favImages
            .filter((item) => item.prompts.toLowerCase().includes(query))
            .reverse();
    }, [favImages, searchText]);

    const value = useMemo(
        () => ({ favImages, visibleImages, addFavImage, removeFavImage, clearFavImages, searchText, setSearchText }),
        [favImages, visibleImages, addFavImage, removeFavImage, clearFavImages, searchText]
    );

    return <FavImagesContext.Provider value={value}>{children}</FavImagesContext.Provider>;
};

export const useFavImages = () => {
    const context = useContext(FavImagesContext);
    if (!context) throw new Error('useFavImages must be used inside <FavImagesProvider>');
    return context;
};
