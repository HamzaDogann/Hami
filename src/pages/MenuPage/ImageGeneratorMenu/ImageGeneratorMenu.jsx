import { Link } from "react-router-dom";

import { useTheme } from '../../../providers/ThemeContext'
import { useLanguage } from '../../../providers/LanguageContext'

import "../menuPage.css"
import "../ImageGeneratorMenu/ImageGeneratorMenu.css";

const ImageGeneratorMenu = () => {

    const { isLightTheme } = useTheme();
    const { t } = useLanguage();

    return (
        <button id="menuButtonImageGenerator" className={`menu-button-design relative ${isLightTheme ? 'border-[#374151]' : "border-[#f5f5f4]"}`}>
            <h1>{t("imageGenerator")}</h1>
            <Link className='w-full h-full absolute' to="/image-generator"></Link>
        </button>
    )
}

export default ImageGeneratorMenu
