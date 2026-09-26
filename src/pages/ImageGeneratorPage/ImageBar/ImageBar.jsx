import { useAIImage } from "../../../providers/AImageContext.jsx";

import StockImages from "./ImageBarComponents/StockImages.jsx";
import GeneratedImage from "./ImageBarComponents/GeneratedImage.jsx"

import "./ImageBar.css";

const ImageBar = () => {
  const { showResult } = useAIImage();

  return (
    <div className="image-bar-box">
      {showResult ? <GeneratedImage /> : <StockImages />}
    </div>
  )
}

export default ImageBar
