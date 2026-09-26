import { useFavImages } from '../../../providers/FavoriteImagesContext';
import { useLanguage } from '../../../providers/LanguageContext';

import FavoriteImage from "../FavComponents/FavoriteImage"

import { MdImage } from "react-icons/md";

const ImagesComponent = () => {

  const { visibleImages } = useFavImages();
  const { t } = useLanguage();

  const hasImages = visibleImages.length > 0;

  return (
    <div className={`images-container ${hasImages ? '' : 'show-no-content-box'}`}>
      {hasImages ? (
        visibleImages.map((item) => (
          <FavoriteImage key={item.id} id={item.id} image={item.image} prompts={item.prompts} />
        ))
      ) : (
        <div className='no-content'>
          <MdImage size={80} color='#ccc' />
          <p className='text-[20px] text-[#595959] mt-2'>{t("noFavoriteImages")}</p>
        </div>
      )}
    </div>
  );
};

export default ImagesComponent;
