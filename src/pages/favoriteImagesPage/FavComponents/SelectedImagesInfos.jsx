import { useLanguage } from '../../../providers/LanguageContext';
import { useTheme } from '../../../providers/ThemeContext';

import { useTransientFlag } from '../../../hooks/useTransientFlag';
import { downloadImage, getDataUrlMimeType } from '../../../utils/image';

import { FiDownload } from "react-icons/fi";
import { MdDraw } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";

const DOWNLOADED_LABEL_MS = 2000;

const SelectedImagesInfos = ({ image, prompts, onDelete, onClose }) => {

  const { t } = useLanguage();
  const { isLightTheme } = useTheme();
  const { active: isDownloaded, trigger: showDownloaded } = useTransientFlag(DOWNLOADED_LABEL_MS);

  const handleDownload = () => {
    downloadImage(image, getDataUrlMimeType(image));
    showDownloaded();
  };

  return (
    <div className='selected-image-overlay'>
      <div className={`selected-image-box ${!isLightTheme ? "bg-[#151515] border-[#202020]" : "bg-[#e4e4e4] border-[#e6e6e6]"}`}>

        {/* Content */}
        <div className='content-modal-box'>
          <div className='content-image-box'>
            <img src={image} alt="" />
          </div>

          <div className='prompts-buttons-box'>
            <div className='image-prompts-box'>
              <div className="draw-icon-box">
                <MdDraw className={`draw-icon ${!isLightTheme ? "bg-[#333333]" : "bg-[#939393]"}`} />
                <span className={`${!isLightTheme ? "text-[#dbdbdb]" : "text-[#5b5b5b]"}`}>{t("prompts")}</span>
              </div>
              <div className={`prompt-texts-box ${!isLightTheme ? "bg-[#151515]" : "bg-[#e4e4e4]"}`}>
                <p className={`${!isLightTheme ? "text-[#d3d3d3]" : "text-[#4b4b4b]"}`}>{prompts}</p>
              </div>
            </div>
            <div className='buttons-box'>
              <button onClick={handleDownload} className='download-image-btn'>
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

              <button onClick={onDelete} className='delete-img-btn'>
                <span className='mr-2'>{t("deleteImage")}</span>
                <span className='text-[23px]'><MdDelete /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Close Modal */}
        <div className={`close-modal-box ${!isLightTheme ? "bg-[#202020]" : "bg-[#b1b1b1] rounded-[20px]"}`}>
          <button onClick={onClose} className={`close-modal-btn ${!isLightTheme ? "text-[#c7c7c7]" : "text-[#424242]"}`}>{t("close")}</button>
        </div>
      </div>
    </div>
  )
}

export default SelectedImagesInfos
