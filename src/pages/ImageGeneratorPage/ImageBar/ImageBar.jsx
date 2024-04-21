//Providers
import { useContext } from "react";
import { AImageContext } from "../../../providers/AImageContext.jsx";

//Components
import StockImages from "../ImageBar/ImageBarComponents/StockImages.jsx";
import GeneratedImage from "../ImageBar/ImageBarComponents/GeneratedImage.jsx"

//Styles
import "./ImageBar.css";


const ImageBar = () => {
  const { showResult } = useContext(AImageContext)
  return (
    <>
      <div className="image-bar-box">
        {showResult ? <GeneratedImage /> : <StockImages />}
      </div>

    </>
  )
}

export default ImageBar