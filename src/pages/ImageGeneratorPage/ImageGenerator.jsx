import PromptBar from "./PromptBar/PromptBar.jsx"
import ImageBar from "./ImageBar/ImageBar.jsx"

import { useTheme } from "../../providers/ThemeContext.jsx";

import "./ImageGenerator.css";

const ImageGenerator = () => {

    const { isLightTheme } = useTheme();

    return (
        <div className={`image-generator-layout ${!isLightTheme ? "text-[white]" : "text-[black]"}`}>
            {/* Prompt Area */}
            <div className="prompt-bar">
                <PromptBar />
            </div>
            {/* Images Area */}
            <div className="image-bar">
                <ImageBar />
            </div>
        </div>
    )
}

export default ImageGenerator
