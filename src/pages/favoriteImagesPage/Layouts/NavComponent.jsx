import { useNavigate } from 'react-router-dom'

import { useLanguage } from '../../../providers/LanguageContext';
import { useFavImages } from '../../../providers/FavoriteImagesContext';
import { useConfirm } from '../../../providers/ConfirmContext';
import { useTheme } from '../../../providers/ThemeContext';

import { BsStars } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { MdImageSearch } from "react-icons/md";

const NavComponent = () => {
  const { t } = useLanguage();
  const { isLightTheme } = useTheme();
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { favImages, clearFavImages, searchText, setSearchText } = useFavImages();

  const hasFavImages = favImages.length > 0;
  const inputColors = !isLightTheme ? "bg-[#242424e7] text-[#dcdcdc]" : "bg-[#dddddde7] text-[#222222]";

  const handleDeleteAll = () => {
    confirm({ content: t("deleteAllImagesConfirm"), onConfirm: clearFavImages });
  };

  const handleGenerate = () => {
    setSearchText("");
    navigate("/image-generator");
  };

  return (
    <div className='nav-flex'>
      {/* Generate Image Box */}
      <div className='generate-image-box'>
        <button onClick={handleGenerate} className='generate-new-image relative'>
          <span>{t("generateImage")}</span>
          <BsStars className='ml-2 text-[24px]' />
        </button>
      </div>

      {/* SearchBar Box */}
      <div className='search-bar-box'>
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className={`search-input ${inputColors}`}
          placeholder={t("searchFavorites")} />
        <button className={`find-image-button ${inputColors}`}>
          <MdImageSearch />
        </button>
      </div>

      {/* Delete All Images Box */}
      <div className='delete-all-images-box'>
        <button
          disabled={!hasFavImages}
          onClick={handleDeleteAll}
          className={`delete-all-image ${hasFavImages ? 'active-button' : 'enabled-button'}`}
        >
          <span>{t("deleteAllImages")}</span>
          <MdDeleteSweep className='ml-1 text-[26px]' />
        </button>
      </div>
    </div>
  )
}

export default NavComponent
