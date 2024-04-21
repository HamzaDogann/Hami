//Context
import { useLanguage } from "../../../../providers/LanguageContext.jsx";
import { useTheme } from "../../../../providers/ThemeContext.jsx";

// Generated Images
import Image1 from "../../../../assets/GeneratedImages/Image1.jpeg"
import Image2 from "../../../../assets/GeneratedImages/Image2.jpeg"
import Image3 from "../../../../assets/GeneratedImages/Image3.jpeg"
import Image4 from "../../../../assets/GeneratedImages/Image4.jpeg"

//Components
import YourFavoriteImageButton from "./YourFavoriteImageButton"

const StockImages = () => {

  const { language } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <>
      {/* Stock Images */}
      <div className={`stock-images-box ${!darkMode ? "bg-[#1a1a1adf]" : "bg-[#eaeaeadf]"}`}>
        <div className="stock-img-container">
          <img className="stock-img" src={Image1} alt="" />
          <div className="img-info">
            {language === "en" ? "A cute cat with big eyes showing its cute paws." : "Sevimli, patilerini gösteren büyük gözleri olan tatlı bir kedi."}
          </div>
        </div>

        <div className="stock-img-container">
          <img className="stock-img" src={Image2} alt="" />
          <div className="img-info">
            {language === "en" ? "A tropical island sunset, a large ship approaching, high details." : "Tropikal bir ada gün batımı, büyük bir gemi yaklaşıyor, yüksek detaylar."}

          </div>
        </div>

        <div className="stock-img-container">
          <img className="stock-img" src={Image3} alt="" />
          <div className="img-info">
            {language === "en" ? "Black motorcycle passing on a highway, sea in the background, cinematic angle, ultra realistic." : "Bir otobandan geçen siyah renkli motorsiklet, arka plan deniz,  sinematik bir açı , ultra gerçekçi."}
          </div>
        </div>
        
        <div className="stock-img-container">
          <img className="stock-img" src={Image4} alt="" />
          <div className="img-info">
            {language === "en" ? "Close-up astronaut looking towards the screen, very charismatic pose, high details." : "Ekrana doğru bakan yakın çekim astronot, çok karizmatik bir poz, yüksek detaylar."}
          </div>
        </div>
      </div>

      {/*Your Favorite Images Button */}
      <div className="your-favorites-button-box">
        <YourFavoriteImageButton />
      </div>
    </>

  )
}

export default StockImages