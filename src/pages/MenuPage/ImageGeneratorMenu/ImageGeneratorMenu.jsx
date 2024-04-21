//Router
import { Link } from "react-router-dom";

//Providers 
import { useTheme } from '../../../providers/ThemeContext'
import { useLanguage } from '../../../providers/LanguageContext'

// Styles
import "../menuPage.css"
import "../ImageGeneratorMenu/ImageGeneratorMenu.css";

const ImageGeneratorMenu = () => {
    
    const { darkMode } = useTheme();
    const { language } = useLanguage();

    return (
        <button id="menuButtonImageGenerator" className={`menu-button-design relative ${darkMode ? 'border-[#374151]' : "border-[#f5f5f4]"}`}>
            <h1>
                {language === "en" ? "Image Generator" : "Resim Üret"}
            </h1>
            <Link className='w-full h-full absolute' to="/image-generator"></Link>
        </button>
    )
}

export default ImageGeneratorMenu