import { useAIImage } from '../../../../providers/AImageContext'
import { useLanguage } from '../../../../providers/LanguageContext'
import { useTheme } from '../../../../providers/ThemeContext'

import { MdPhotoSizeSelectActual } from "react-icons/md";
import { LuPaintbrush2 } from "react-icons/lu";

// `value` is what the image function understands (see netlify/functions/image.mjs); `labelKey` is the button text.
const QUALITY_OPTIONS = [
    { value: 'Low', labelKey: 'qualityLow' },
    { value: 'Medium', labelKey: 'qualityMedium' },
    { value: 'High', labelKey: 'qualityHigh' },
];

const STYLE_OPTIONS = [
    { value: 'Realistic', labelKey: 'styleRealistic' },
    { value: 'Cinematic', labelKey: 'styleCinematic' },
    { value: 'Origami', labelKey: 'styleOrigami' },
    { value: 'Animation', labelKey: 'styleAnimation' },
    { value: 'Cartoon', labelKey: 'styleCartoon' },
    { value: 'Pixel Art', labelKey: 'stylePixelArt' },
    { value: '3D', labelKey: 'style3D' },
];

const PromptOptions = () => {

    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    const { quality, setQuality, style, setStyle } = useAIImage();

    const buttonColors = !isLightTheme ? "bg-[#222222] text-[#d4d4d4]" : "bg-[#d3d3d3] text-[#212121]";

    return (
        <>
            {/* Image Size Box */}
            <div className="image-size-box">
                <MdPhotoSizeSelectActual className="info-icons" />
                {QUALITY_OPTIONS.map(({ value, labelKey }) => (
                    <button key={value} className={`size-btn ${buttonColors} ${quality === value ? 'active' : ''}`} onClick={() => setQuality(value)}>
                        {t(labelKey)}
                    </button>
                ))}
            </div>

            {/* hr * */}
            <div className="hr-tag w-full flex ml-[80px] mt-[20px]">
                <hr className="border-[2px] rounded-xl border-[#55555556] w-[60%]" />
            </div>

            {/* Image Style Box */}
            <div className="image-style-box flex">
                <LuPaintbrush2 className="info-icons" />
                <div className="style-buttons">
                    {STYLE_OPTIONS.map(({ value, labelKey }) => (
                        <button key={value} className={`style-btn ${buttonColors} ${style === value ? 'active' : ''}`} onClick={() => setStyle(value)}>
                            {t(labelKey)}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PromptOptions
