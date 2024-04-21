
//React Hooks
import React, { useContext } from 'react'

//React Router
import { useNavigate } from 'react-router-dom'

//Providers
import { useLanguage } from '../../../providers/LanguageContext';
import { AImageContext } from '../../../providers/AImageContext';
import { useTheme } from '../../../providers/ThemeContext';

//Styles - Icons
import { BsStars } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { MdImageSearch } from "react-icons/md";



const NavComponent = () => {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const { deleteAllFavImages, setPopup, favImages, setInputText } = useContext(AImageContext);

  //Delete All Favorite Images
  const DeleteAllImages = () => {
    deleteAllFavImages();
  }

  const handleDeleteAllFavorites = () => {
    setPopup((prevState) => ({
      ...prevState,
      show: true,
      content: `${language === "en" ? "Are you sure to delete all favorites" : "Bütün favoriler silinmek üzere"}`,
      function: DeleteAllImages
    }));
  }

  //Generate Button Method
  const handleGenerateButton = () => {
    setInputText("");
    navigate("/image-generator");
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  //Favorite Images Length
  const hasFavImages = favImages.length > 0;

  return (
    <div className='nav-flex'>
      {/* Generate Image Box */}
      <div className='generate-image-box'>
        <button
          onClick={handleGenerateButton}
          className='generate-new-image relative'>
          <span>{language === "en" ? "Generate Image" : "Resim Oluştur"}</span>
          <BsStars className='ml-2 text-[24px]' />
        </button>
      </div>

      {/* SearchBar Box */}
      <div className='search-bar-box'>
        <input
          onChange={handleInputChange}
          className={`search-input ${!darkMode ? "bg-[#242424e7] text-[#dcdcdc]" : "bg-[#dddddde7] text-[#222222]"}`} placeholder={`${language === "en" ? "Search in favorites..." : "Favorilerde ara..."}`}></input>
         <button className={`find-image-button ${!darkMode ? "bg-[#242424e7] text-[#dcdcdc]" : "bg-[#dddddde7] text-[#3f3f3f]"}`}>
          <MdImageSearch />
        </button>
      </div>

      {/* Delete All Images Box */}
      <div className='delete-all-images-box'>
        <button
          disabled={!hasFavImages}
          onClick={handleDeleteAllFavorites}
          className={`delete-all-image ${hasFavImages ? 'active-button' : 'enabled-button'}`}
        >
          <span>{language === "en" ? "Delete All Images" : "Bütün Resimleri Sil"}</span>
          <MdDeleteSweep className='ml-1 text-[26px]' />
        </button>
      </div>
    </div>
  )
}

export default NavComponent