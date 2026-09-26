import { useLanguage } from "../../../../providers/LanguageContext.jsx";
import { useTheme } from "../../../../providers/ThemeContext.jsx";

import Image1 from "../../../../assets/GeneratedImages/Image1.jpeg"
import Image2 from "../../../../assets/GeneratedImages/Image2.jpeg"
import Image3 from "../../../../assets/GeneratedImages/Image3.jpeg"
import Image4 from "../../../../assets/GeneratedImages/Image4.jpeg"

import YourFavoriteImageButton from "./YourFavoriteImageButton"

const STOCK_IMAGES = [
  { src: Image1, captionKey: "stockImage1" },
  { src: Image2, captionKey: "stockImage2" },
  { src: Image3, captionKey: "stockImage3" },
  { src: Image4, captionKey: "stockImage4" },
];

const StockImages = () => {

  const { t } = useLanguage();
  const { isLightTheme } = useTheme();

  return (
    <>
      {/* Stock Images */}
      <div className={`stock-images-box ${!isLightTheme ? "bg-[#1a1a1adf]" : "bg-[#eaeaeadf]"}`}>
        {STOCK_IMAGES.map(({ src, captionKey }) => (
          <div key={captionKey} className="stock-img-container">
            <img className="stock-img" src={src} alt="" />
            <div className="img-info">{t(captionKey)}</div>
          </div>
        ))}
      </div>

      {/* Your Favorite Images Button */}
      <div className="your-favorites-button-box">
        <YourFavoriteImageButton />
      </div>
    </>
  )
}

export default StockImages
