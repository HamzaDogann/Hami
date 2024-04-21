//React  Hooks - Router
import { useEffect } from "react";
import { useNavigate, } from "react-router-dom";

// Layout Components
import Header from "../../components/Header.jsx";
import ImageGenerator from "./ImageGenerator.jsx";
import Footer from "../../components/Footer/Footer.jsx";

// Providers
import { useTheme } from '../../providers/ThemeContext'
import { useLanguage } from '../../providers/LanguageContext'
import AlertModal from "../../components/ModalComponent/Modal.jsx"
import { useModal } from "../../providers/AlertModalContext.jsx";

//Styles
import "./ImageGenerator.css";

const ImageGeneratorPage = () => {

  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { showModal } = useModal();

  const navigate = useNavigate();

  useEffect(() => {

    const userAccount = JSON.parse(localStorage.getItem("userAccount"));
    if (!userAccount || userAccount.length === 0) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  return (
    <div className={`image-generator-box  w-full  smooth-transitions ${darkMode ? "bg-white " : "bg-[#161616]"}`}>
      <Header />
      <ImageGenerator theme={darkMode} language={language} />
      <Footer theme={darkMode} />
      {showModal.show ? <AlertModal content={showModal.content} /> : null}
    </div>

  )
}

export default ImageGeneratorPage;