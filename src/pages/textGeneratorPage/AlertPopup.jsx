//Providers
import { useTheme } from '../../providers/ThemeContext'
import { useLanguage } from '../../providers/LanguageContext'
import { useModal } from '../../providers/AlertModalContext.jsx';

//Styles
import "./AlertPopup.css";

const AlertPopup = ({ setPopup, trigger }) => {

    const { darkMode } = useTheme();
    const { language } = useLanguage();
    const { toggleModal } = useModal();

    const handleDeleteButton = () => {
        trigger.function();
        setPopup({ ...trigger, show: false });
        toggleModal(true, language === "en" ? "The deletion completed successfully" : "Silme işlemi başarıyla tamamlandı");
    }
    const handleCancelButton = () => {
        setPopup(false);
    }

    return (trigger.show) ? (
        <div className="popup">
            <div className={`popup-box ${!darkMode ? "bg-[#131313] border-[#2b2b2b]" : "bg-[#e8e8e8] border-[#c9c9c9]"}`}>
              
                <div className={`flex justify-center my-3 ${!darkMode ? "text-[#dddddd]" : "text-[#232323]"} `}>
                    <h1>{trigger.content}</h1>
                </div>
            
                <hr className={`border-2  ${!darkMode ? "border-[#272727ae]" : "border-[#c9c9c9]"} rounded-sm w-[100%]`} />
             
                <div className="flex justify-evenly flex-row my-4 text-[#dddddd]">
                    <button onClick={handleDeleteButton} id="delete-btn" className="btns">{`${language === "en" ? "Delete" : "Onayla"}`}</button>
                    <button onClick={handleCancelButton} id="cancel-btn" className={`btns ${darkMode ? "text-[#282828] border-[#282828] hover:border-[#313131]" : "text-[#dddddd]"} `}>{`${language === "en" ? "Cancel" : "İptal et"}`}</button>
                </div>
                
            </div>
        </div>
    ) : null;
}

export default AlertPopup;