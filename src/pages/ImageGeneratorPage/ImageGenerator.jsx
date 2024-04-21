//Components
import PromptBar from "./PromptBar/PromptBar.jsx"
import ImageBar from "./ImageBar/ImageBar.jsx"

//Style
import "./ImageGenerator.css";

const ImageGenerator = ({ theme, language }) => {
    return (
        <>
            <div className={`image-generator-layout ${!theme ? "text-[white]" : "text-[black]"}`}>
                {/* Prompt Area */}
                <div className="prompt-bar">
                    <PromptBar theme={theme} language={language} />
                </div>
                {/* Images Area */}
                <div className="image-bar">
                    <ImageBar theme={theme} language={language} />
                </div>
            </div>
        </>
    )
}

export default ImageGenerator