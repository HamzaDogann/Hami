//React Hooks - Router
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Providers
import { useTheme } from '../../../../providers/ThemeContext';
import { useLanguage } from '../../../../providers/LanguageContext';
import { AImageContext } from '../../../../providers/AImageContext';

// Style - Icons
import PreLoader from '../../../../components/PreLoader';
import HamiLogo from "../../../../assets/HamiLogo.png";
import errorImage from "../../../../assets/ErrorImage/errorImage.png";
import { MdOutlineDraw } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { IoMdImages } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdDownloadDone } from "react-icons/md";


const GeneratedImage = () => {

  //Hooks-Providers
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const { imageObjectURL, loading, recentPrompt, DownloadNewImage, error, handleSaveInFavorite, isSaved, setIsSaved, setShowResult } = useContext(AImageContext);

  //States
  const [isDownload, setIsDownload] = useState(false);


  //Save Button Method
  const handleSaveButton = () => {
    handleSaveInFavorite();
    setIsSaved(true)
  };

  //DownloadImage Button Method
  const handleDownloadImage = () => {
    DownloadNewImage();
    setIsDownload(true)

    setTimeout(() => {
      setIsDownload(false)
    }, 2000);
  };

  //Show Favorite Button Method
  const handleShowFavorites = () => {
    setShowResult(false);
    navigate("/favorite-images")
  };


  return (
    <div className='generated-image-box'>
      {/* Generated Image */}
      <div className='generated-image'>
        <div className={`img-box ${!darkMode ? "bg-[#1a1a1a]" : "bg-[#dadada]"} `}>
          {loading
            ?
            //Pre Loader
            <PreLoader />

            // Generated Image
            :
            imageObjectURL
              ? <img className='img-element' src={imageObjectURL} alt="" />
              : <img className='img-element' src={errorImage} alt="" />
          }
        </div>
      </div>


      {/* Generated Image Prompts */}
      {imageObjectURL ? <div className='generated-image-prompt-box'>
        <div className={`prompts-box ${!darkMode ? "bg-[#1a1a1adf]" : "bg-[#d7d7d7df]"} `}>
          <div className='icon-box'>
            <MdOutlineDraw />
          </div>
          <div className={`content-box ${!darkMode ? "text-[#dedededf]" : "text-[#242424df]"} `}>
            <p>{recentPrompt}</p>
          </div>
        </div>
      </div> : null}


      {/* Generated Image Download and Save on Favorites - All Favorites Button */}
      {imageObjectURL
        ?
        <div className='download-favorite-buttons-box'>

          {/* Download Button */}
          <button onClick={handleDownloadImage} className='download-btn'>
            {!isDownload ?
              <>
                <span className='mr-3'>{language === "en" ? "Download Image" : "Resmi İndir"}</span>
                <span className='text-[23px]'><FiDownload /></span>
              </>
              : <>
                <span className='image-down-ani mr-3'>{language === "en" ? "Downloaded" : "Resmi İndirildi"}</span>
                <span className='image-down-ani text-[23px]'><MdDownloadDone /></span>
              </>
            }
          </button>

          {/* Save Button */}
          <button onClick={handleSaveButton} className='save-btn'>
            {!isSaved
              ? <>
                <span className='mr-3'>{language === "en" ? "Save In Favorites" : "Favorilere Kaydet"}</span>
                <span className='text-[23px]'><LuImagePlus /></span>

              </>
              :
              <>
                <span className='saved-span mr-3'>{language === "en" ? "Saved" : "Favorilere Eklendi"}</span>
                <span className='saved-span text-[23px]'><BsFillBookmarkCheckFill /></span>
              </>
            }
          </button>

          {!isSaved ?
            <>
              <button onClick={handleShowFavorites} className='show-favorites-btn'>
                <span className='text-[23px]'><IoMdImages /></span>
              </button>
            </>
            : <>
              <button onClick={handleShowFavorites} className='show-favorites-btn relative'>
                <span className='saved-icon-ani'><IoMdImages /></span>
              </button>
            </>
          }

        </div>
        :

        <div className='hami-image-generator-info'>
          <div className='flex justify-center'>
            <img className='w-[60px] mr-1' src={HamiLogo} />
          </div>
          {error ? <>
            <p>{language === "en" ? "An error has occurred. Please try again." : "Bir hata meydana geldi. Lütfen tekrar deneyin."}</p>

          </>
            :
            <>
              <p>{language === "en" ? "Your image is being prepared. The processing time may vary depending on system load." : "Resminiz hazırlanıyor, bu işlemin süresi sistemin yoğunluğuna göre değişiklik gösterebilir."}</p>
            </>}
        </div>
      }
    </div >
  )
}

export default GeneratedImage