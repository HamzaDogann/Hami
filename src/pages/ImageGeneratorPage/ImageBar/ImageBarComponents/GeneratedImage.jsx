import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../../../providers/ThemeContext';
import { useLanguage } from '../../../../providers/LanguageContext';
import { useAIImage } from '../../../../providers/AImageContext';
import { useFavImages } from '../../../../providers/FavoriteImagesContext';
import { useModal } from '../../../../providers/AlertModalContext';

import { useTransientFlag } from '../../../../hooks/useTransientFlag';
import { aiErrorKey } from '../../../../i18n/translations';
import { blobToDataUrl, downloadImage } from '../../../../utils/image';

import PreLoader from '../../../../components/PreLoader';
import HamiLogo from "../../../../assets/HamiLogo.png";
import errorImage from "../../../../assets/ErrorImage/errorImage.png";
import { MdOutlineDraw } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { IoMdImages } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdDownloadDone } from "react-icons/md";

const DOWNLOADED_LABEL_MS = 2000;

const GeneratedImage = () => {

  const navigate = useNavigate();
  const { isLightTheme } = useTheme();
  const { t } = useLanguage();
  const { showAlert } = useModal();
  const { addFavImage } = useFavImages();
  const { imageUrl, imageBlob, loading, recentPrompt, errorCode, isSaved, setIsSaved, setShowResult } = useAIImage();
  const { active: isDownloaded, trigger: showDownloaded } = useTransientFlag(DOWNLOADED_LABEL_MS);

  const handleSave = async () => {
    const saved = addFavImage(recentPrompt, await blobToDataUrl(imageBlob));
    if (saved) {
      setIsSaved(true);
    } else {
      showAlert(t("storageFull"));
    }
  };

  const handleDownload = () => {
    downloadImage(imageUrl, imageBlob?.type);
    showDownloaded();
  };

  const handleShowFavorites = () => {
    setShowResult(false);
    navigate("/favorite-images");
  };

  return (
    <div className='generated-image-box'>
      {/* Generated Image */}
      <div className='generated-image'>
        <div className={`img-box ${!isLightTheme ? "bg-[#1a1a1a]" : "bg-[#dadada]"} `}>
          {loading
            ? <PreLoader />
            : <img className='img-element' src={imageUrl || errorImage} alt="" />
          }
        </div>
      </div>

      {imageUrl
        ? <>
          {/* Prompt */}
          <div className='generated-image-prompt-box'>
            <div className={`prompts-box ${!isLightTheme ? "bg-[#1a1a1adf]" : "bg-[#d7d7d7df]"} `}>
              <div className='icon-box'>
                <MdOutlineDraw />
              </div>
              <div className={`content-box ${!isLightTheme ? "text-[#dedededf]" : "text-[#242424df]"} `}>
                <p>{recentPrompt}</p>
              </div>
            </div>
          </div>

          {/* Download / Save in favorites / Show favorites */}
          <div className='download-favorite-buttons-box'>
            <button onClick={handleDownload} className='download-btn'>
              {!isDownloaded ?
                <>
                  <span className='mr-3'>{t("downloadImage")}</span>
                  <span className='text-[23px]'><FiDownload /></span>
                </>
                : <>
                  <span className='image-down-ani mr-3'>{t("downloaded")}</span>
                  <span className='image-down-ani text-[23px]'><MdDownloadDone /></span>
                </>
              }
            </button>

            <button onClick={handleSave} className='save-btn'>
              {!isSaved
                ? <>
                  <span className='mr-3'>{t("saveInFavorites")}</span>
                  <span className='text-[23px]'><LuImagePlus /></span>
                </>
                : <>
                  <span className='saved-span mr-3'>{t("saved")}</span>
                  <span className='saved-span text-[23px]'><BsFillBookmarkCheckFill /></span>
                </>
              }
            </button>

            <button onClick={handleShowFavorites} className={`show-favorites-btn ${isSaved ? 'relative' : ''}`}>
              <span className={isSaved ? 'saved-icon-ani' : 'text-[23px]'}><IoMdImages /></span>
            </button>
          </div>
        </>
        : <div className='hami-image-generator-info'>
          <div className='flex justify-center'>
            <img className='w-[60px] mr-1' src={HamiLogo} alt="" />
          </div>
          <p>{errorCode ? t(aiErrorKey(errorCode)) : t("imagePreparing")}</p>
        </div>
      }
    </div>
  )
}

export default GeneratedImage
