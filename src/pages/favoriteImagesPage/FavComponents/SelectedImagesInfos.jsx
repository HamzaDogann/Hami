//React Hooks
import { useContext, useState } from 'react';

//Providers
import { useLanguage } from '../../../providers/LanguageContext';
import { useTheme } from '../../../providers/ThemeContext';
import { AImageContext } from "../../../providers/AImageContext";

// Style - Icons
import { FiDownload } from "react-icons/fi";
import { MdDraw } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";

const SelectedImagesInfos = ({ selectedImage, setModal, selectedPrompts, itemId }) => {

  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const { DownloadImage, removeImageFromFavorites, setPopup } = useContext(AImageContext);
  const [isDownload, setIsDownload] = useState(false);

  //Download Process
  const handleDownload = () => {
    DownloadImage(selectedImage)
    setIsDownload(true)

    setTimeout(() => {
      setIsDownload(false)
    }, 2000);
  }

  //Delete Process  
  const deleteThisImage = () => {
    removeImageFromFavorites(itemId);
    setModal(false)
  }

  const handleDeleteImage = () => {
    setPopup((prevState) => ({
      ...prevState,
      show: true,
      content: `${language === "en" ? "Are you sure to delete this image" : "Bu resmi silmek üzeresin"}`,
      function: deleteThisImage
    }));
  }

  // Modal On/Off
  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <div className='selected-image-overlay'>
      <div className={`selected-image-box ${!darkMode ? "bg-[#151515] border-[#202020]" : "bg-[#e4e4e4] border-[#e6e6e6]"}`}>

        {/* Content */}
        <div className='content-modal-box'>
          <div className='content-image-box'>
            <img src={selectedImage} alt="" />
          </div>

          <div className='prompts-buttons-box'>
            <div className='image-prompts-box'>
              <div className="draw-icon-box">
                <MdDraw className={`draw-icon ${!darkMode ? "bg-[#333333]" : "bg-[#939393]"}`} />
                <span className={`${!darkMode ? "text-[#dbdbdb]" : "text-[#5b5b5b]"}`}>{language === "en" ? "Prompts" : "İstemler"}</span>
              </div>
              <div className={`prompt-texts-box ${!darkMode ? "bg-[#151515]" : "bg-[#e4e4e4]"}`}>
                <p className={`${!darkMode ? "text-[#d3d3d3]" : "text-[#4b4b4b]"}`}>{selectedPrompts}</p>
              </div>
            </div>
            <div className='buttons-box'>
              <button onClick={handleDownload} className='download-image-btn'>
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

              <button onClick={handleDeleteImage} className='delete-img-btn'>
                <span className='mr-2'>{language === "en" ? "Delete Image" : "Resmi Sil"}</span>
                <span className='text-[23px]'><MdDelete /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Close Modal */}
        <div className={`close-modal-box ${!darkMode ? "bg-[#202020]" : "bg-[#b1b1b1] rounded-[20px]"}`}>
          <button onClick={handleCloseModal} className={`close-modal-btn ${!darkMode ? "text-[#c7c7c7]":"text-[#424242]"}`}>{language === "en" ? "Close" : "Kapat"}</button>
        </div>
      </div>
    </div>
  )
}

export default SelectedImagesInfos