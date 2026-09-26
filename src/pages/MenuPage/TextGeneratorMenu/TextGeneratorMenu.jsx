import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../../providers/ThemeContext'
import { useLanguage } from '../../../providers/LanguageContext'

import "../menuPage.css"
import "../TextGeneratorMenu/TextGeneratorMenu.css"

const TextGeneratorMenu = () => {

    const { isLightTheme } = useTheme();
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/text-generator")} className={`menu-button-design relative textGeneratorBtn ${isLightTheme ? 'border-[#374151]' : "border-[#f5f5f4]"}`}>
            <h1>{t("textGenerator")}</h1>
        </button>
    )
}

export default TextGeneratorMenu
