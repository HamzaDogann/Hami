//Providers
import { useTheme } from "../../providers/ThemeContext";

// Layout Components
import ImagesComponent from "./Layouts/ImagesComponent"
import NavComponent from "./Layouts/NavComponent";
import TitleComponent from "./Layouts/TitleComponent";

// Style
import "./FavoriteImages.css";

const FavoriteImages = () => {
    
    const {darkMode} = useTheme();

    return (
        <div className='favorite-images-box'>
            {/* Title Box */}
            <div className="favorites-title-box">
                <TitleComponent/>
            </div>

            {/* Nav Box */}
            <div className={`nav-box ${!darkMode? "border-b-[#2a2a2a]":"border-b-[#d8d8d8]"}`}>
                <NavComponent />
            </div>
            
            {/* Images Box */}
            <div className="images-box">
                <ImagesComponent />
            </div>
        </div>
    )
}

export default FavoriteImages