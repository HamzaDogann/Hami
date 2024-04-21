
//React Hooks - Router
import { useTheme } from '../../../providers/ThemeContext'
import { useLanguage } from '../../../providers/LanguageContext'
import { useNavigate } from 'react-router-dom';

//Styles
import "../menuPage.css"
import "../TextGeneratorMenu/TextGeneratorMenu.css"

const TextGeneratorMenu = () => {

    const { darkMode } = useTheme();
    const { language } = useLanguage();
    const navigate = useNavigate();

    const handleTextGenerator = () => {
        navigate("/text-generator");
    };

    return (
        <button onClick={handleTextGenerator} className={`menu-button-design relative textGeneratorBtn ${darkMode ? 'border-[#374151]' : "border-[#f5f5f4]"}`}>
            <h1>
                {language === "en" ? "Text Generator" : "Yazı Üret"}
            </h1>
        </button>
    )
}

export default TextGeneratorMenu