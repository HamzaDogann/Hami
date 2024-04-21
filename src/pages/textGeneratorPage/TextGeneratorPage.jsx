//React Hooks - Router
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Layout Components
import Header from "../../components/Header.jsx";
import TextGenerator from "../textGeneratorPage/TextGenerator.jsx";
import Footer from "../../components/Footer/Footer.jsx";

// Providers
import { useTheme } from "../../providers/ThemeContext";
import { useLanguage } from "../../providers/LanguageContext";
import { FavChatsProvider } from "../../providers/FavoriteChatsContext.jsx";
import { useModal } from "../../providers/AlertModalContext.jsx";

//Alert
import AlertPopup from "./AlertPopup.jsx";
import AlertModal from "../../components/ModalComponent/Modal.jsx";

const TextGeneratorPage = () => {

    const { showModal } = useModal();
    const { darkMode } = useTheme();
    const { language } = useLanguage();
    const navigate = useNavigate();

    const [popup, setPopup] = useState({
        show: false,
        content: "",
        function: () => { }
    });

    useEffect(() => {
        
        const userAccount = JSON.parse(localStorage.getItem("userAccount"));
        if (!userAccount || userAccount.length === 0) {
            navigate("/");
        }
    }, []);


    return (
        <div className={`text-generator-box ${darkMode ? "bg-white " : "bg-[#161616]"}`}>
            <FavChatsProvider>
                <Header />
                <TextGenerator theme={darkMode} language={language} setPopup={setPopup} />
                <Footer theme={darkMode} />
                <AlertPopup setPopup={setPopup} trigger={popup} />
                {showModal.show ? <AlertModal content={showModal.content} /> : null}
            </FavChatsProvider>
        </div>

    )
}

export default TextGeneratorPage