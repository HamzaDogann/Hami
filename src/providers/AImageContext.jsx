//React Hooks
import { createContext, useState, useEffect } from "react";

//Configuration
import runImage from "../config/ImageGenerator";

export const AImageContext = createContext();

const AImageContextProvider = (props) => {

    //New Image Generate States
    const [prompts, setPrompts] = useState("");
    const [quality, setQuality] = useState("high details, high quality");
    const [style, setStyle] = useState("ultra realistic");
    const [showResult, setShowResult] = useState(false);
    const [recentPrompt, setRecentPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [resultData, setResultData] = useState("");
    const [imageObjectURL, setImageObjectURL] = useState("");
    const [error, setError] = useState(false);

    //Favorite Images States
    const [favImages, setFavImages] = useState([]);
    const [inputText, setInputText] = useState("");


    //--------------------------Generate Process----------------------------------

    const onSentPrompts = async (prompt) => {
        setShowResult(true);
        setError(false)
        setImageObjectURL("")
        setPrompts("");
        setResultData("");
        setLoading(true);
        setRecentPrompt(prompts);
        try {
            const response = await runImage(prompts, quality, style)
                .then(response => {
                    const objectURL = URL.createObjectURL(response);
                    setImageObjectURL(objectURL);
                })
            setActiveFavChat(response);
            setResultData(response);
        } catch (error) {
            setError(true)
        }
        setQuality("high details, high quality");
        setStyle("");
        setPrompts("");
        setLoading(false);
    };


    //-----------------------------Download, Favorites, Delete  Process----------------------------------


    //Download New Image
    const DownloadNewImage = () => {
        if (imageObjectURL) {
            const date = new Date();
            const formattedDate = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
            const link = document.createElement('a');
            link.href = imageObjectURL;
            link.download = `Hami-Image-${formattedDate}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Download Selected Image
    const DownloadImage = (selectedImage) => {

        if (selectedImage) {
            const date = new Date();
            const formattedDate = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
            const link = document.createElement('a');
            link.href = selectedImage;
            link.download = `Hami-Image-${formattedDate}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    //----------------------------------------------------------------


    // Save In Favorites - Blob Image to Base64 - This function converts blob images to base64. Then saved to favorites.

    const handleSaveInFavorite = () => {
        const blobURL = imageObjectURL;
        const imagePrompts = recentPrompt;

        const blobToBase64 = async (blobURL) => {
            const response = await fetch(blobURL);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };

        const getTimestamp = () => {
            const date = new Date();
            return date.getTime();
        };

        blobToBase64(blobURL)
            .then(base64 => {
                const newRecord = {
                    id: getTimestamp(),
                    prompts: imagePrompts,
                    image: base64
                };


                const prevImages = [...favImages];


                const isDuplicate = prevImages.some(record => record.prompts === imagePrompts && record.image === base64);

                if (!isDuplicate) {
                    prevImages.push(newRecord);
                    setFavImages(prevImages);
                    localStorage.setItem('favImages', JSON.stringify(prevImages));
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    //------------------------------Get that favorite Images from Local Storage---------------------------------   

    useEffect(() => {
        const getLocalStorageData = (key) => {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        };

        const images = getLocalStorageData('favImages');
        setFavImages(images);
    }, []);

    //------------------------------Delete All Favorite Images---------------------------------   

    const deleteAllFavImages = () => {
        localStorage.setItem('favImages', JSON.stringify([]));
        setFavImages([]);
    }

    //------------------------------Delete Image---------------------------------   

    const removeImageFromFavorites = (itemId) => {
        // Favorilerden bir öğeyi kaldırma işlemi.
        const updatedImages = favImages.filter(item => item.id !== itemId);
        setFavImages(updatedImages);
        localStorage.setItem('favImages', JSON.stringify(updatedImages));
    };

    //------------------------------AlertPopup For Delete---------------------------------   

    const [popup, setPopup] = useState({
        show: false,
        content: "",
        function: () => { }
    });

    //------------------------------Providers---------------------------------


    const aimageContextValue = {
        onSentPrompts,
        loading,
        resultData,
        showResult,
        error,
        setShowResult,
        prompts,
        setPrompts,
        quality,
        setQuality,
        style,
        setStyle,
        recentPrompt,
        imageObjectURL,
        setImageObjectURL,
        DownloadImage,
        handleSaveInFavorite,
        DownloadNewImage,
        deleteAllFavImages,
        removeImageFromFavorites,
        popup,
        setPopup,
        favImages,
        setFavImages,
        setInputText,
        inputText,
        isSaved,
        setIsSaved
    }

    return (
        <AImageContext.Provider value={aimageContextValue}>
            {props.children}
        </AImageContext.Provider>
    )
}

export default AImageContextProvider;