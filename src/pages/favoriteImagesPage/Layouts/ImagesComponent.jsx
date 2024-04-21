//React Hooks
import { useState, useEffect, useContext } from 'react';

//Providers
import { AImageContext } from '../../../providers/AImageContext';
import { useLanguage } from '../../../providers/LanguageContext';

//Components
import Image from "../FavComponents/Image"

//Icons
import { MdImage } from "react-icons/md";


const ImagesComponent = () => {

  const { favImages, inputText } = useContext(AImageContext);
  const { language } = useLanguage();
  const [filteredImages, setFilteredImages] = useState([]);

  // Filter Favorite Images
  useEffect(() => {
    const matchedImages = favImages.filter(image => image.prompts.includes(inputText));
    setFilteredImages(matchedImages);
  }, [inputText, favImages]);

  return (
    <div className={`images-container ${filteredImages.length > 0 ? '' : 'show-no-content-box'}`}>
        {filteredImages.length > 0 ? (
          filteredImages.slice().reverse().map((item, index) => (
            <Image key={index} image={item.image} prompts={item.prompts} itemId={item.id} />
          ))
        ) : (
          <div className='no-content'>
            <MdImage size={80} color='#ccc' />
            <p className='text-[20px] text-[#595959] mt-2'>{language === "en" ? "Not found favorite images" : "Favori resim bulunamadı"}</p>
          </div>
        )}
    </div>
  );
};

export default ImagesComponent;