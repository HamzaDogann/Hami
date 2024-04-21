
//React Hooks - Router
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Providers
import { useTheme } from '../../providers/ThemeContext';
import { useModal } from '../../providers/AlertModalContext';

//Layout Components
import Header from '../../components/Header';
import FavoriteImages from '../favoriteImagesPage/FavoriteImages';
import Footer from '../../components/Footer/Footer';
import AlertPopup from "../favoriteImagesPage/FavComponents/AlertPopup.jsx";

//Alert Component
import AlertModal from '../../components/ModalComponent/Modal.jsx';

const FavoriteImagesPage = () => {

    const { darkMode } = useTheme();
    const { showModal } = useModal();

    const navigate = useNavigate();

    useEffect(() => {

        const userAccount = JSON.parse(localStorage.getItem("userAccount"));
        if (!userAccount || userAccount.length === 0) {
            navigate("/");
        }
    }, []);

    return (
        <div className={`image-generator-box ${darkMode ? "bg-white " : "bg-[#161616]"}`}>
            <Header />
            <FavoriteImages />
            <Footer theme={darkMode} />
            <AlertPopup />
            {showModal.show ? <AlertModal content={showModal.content} /> : null}
        </div>
    )
}

export default FavoriteImagesPage
