import { useTheme } from "../../providers/ThemeContext";

import ImagesComponent from "./Layouts/ImagesComponent"
import NavComponent from "./Layouts/NavComponent";
import TitleComponent from "./Layouts/TitleComponent";

import "./FavoriteImages.css";

const FavoriteImages = () => {

    const { isLightTheme } = useTheme();

    return (
        <div className='favorite-images-box'>
            {/* Title Box */}
            <div className="favorites-title-box">
                <TitleComponent />
            </div>

            {/* Nav Box */}
            <div className={`nav-box ${!isLightTheme ? "border-b-[#2a2a2a]" : "border-b-[#d8d8d8]"}`}>
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
