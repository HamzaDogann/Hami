//React Hooks
import { useState,useContext } from "react";

//Providers
import { useTheme } from "../../../../providers/ThemeContext";
import { useLanguage } from "../../../../providers/LanguageContext";
import { AImageContext } from '../../../../providers/AImageContext'

//Styles
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { LuPaintbrush2 } from "react-icons/lu";

const PromptOptions = () => {

    const { darkMode } = useTheme();
    const { language } = useLanguage();

    const {setQuality,setStyle} = useContext(AImageContext);

    // For Styles
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('');

    const handleButtonClick = (style) => {
        setSelectedStyle(style);
        setStyle(style);        
    };

    const handleSizeButtonClick = (quality) => {
        setSelectedQuality(quality);
        setQuality(quality);
    };

    return (
        <>
            {/* Image Size Box */}
            <div className="image-size-box">
                <MdPhotoSizeSelectActual className="info-icons" />
                <button className={`size-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedQuality === 'Low' ? 'active' : ''}`} onClick={() => handleSizeButtonClick('Low')}>{language ==="en" ? "Low":"Düşük"}</button>
                <button className={`size-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedQuality === 'Medium' ? 'active' : ''}`} onClick={() => handleSizeButtonClick('Medium')}>{language ==="en" ? "Medium":"Orta"}</button>
                <button className={`size-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedQuality === 'High' ? 'active' : ''}`} onClick={() => handleSizeButtonClick('High')}>{language ==="en" ? "High":"Yüksek"}</button>
            </div>

            {/* hr * */}
            <div className="hr-tag w-full flex ml-[80px] mt-[20px]">
                <hr className="border-[2px] rounded-xl border-[#55555556] w-[60%]" />
            </div>

            {/* Image Style Box */}
            <div className="image-style-box flex">
                <LuPaintbrush2 className="info-icons" />
                <div className="style-buttons">
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Realistic' ? 'active' : ''}`} onClick={() => handleButtonClick('Realistic')}>{language ==="en" ? "Realistic":"Gerçekçi"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Cinematic' ? 'active' : ''}`} onClick={() => handleButtonClick('Cinematic')}>{language ==="en" ? "Cinematic":"Sinematik"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Origami' ? 'active' : ''}`} onClick={() => handleButtonClick('Origami')}>{language ==="en" ? "Origami":"Origami"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Animation' ? 'active' : ''}`} onClick={() => handleButtonClick('Animation')}>{language ==="en" ? "Animation":"Animasyon"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Cartoon' ? 'active' : ''}`} onClick={() => handleButtonClick('Cartoon')}>{language ==="en" ? "Cartoon":"Karikatür"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === 'Pixel Art' ? 'active' : ''}`} onClick={() => handleButtonClick('Pixel Art')}>{language ==="en" ? "Pixel Art":"Piksel"}</button>
                    <button className={`style-btn ${!darkMode ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]"} ${selectedStyle === '3D' ? 'active' : ''}`} onClick={() => handleButtonClick('3D')}>{language==="en" ? "3D":"3B"}</button>
                </div>
            </div>
        </>
    )
}

export default PromptOptions