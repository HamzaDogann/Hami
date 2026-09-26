import { useTheme } from '../../providers/ThemeContext';
import { useLanguage } from '../../providers/LanguageContext';

import './ConfirmPopup.css';

const ConfirmPopup = ({ content, onConfirm, onCancel }) => {

    const { isLightTheme } = useTheme();
    const { t } = useLanguage();

    return (
        <div className="popup">
            <div className={`popup-box ${!isLightTheme ? "bg-[#131313] border-[#2b2b2b]" : "bg-[#e8e8e8] border-[#c9c9c9]"}`}>

                <div className={`flex justify-center my-3 ${!isLightTheme ? "text-[#dddddd]" : "text-[#232323]"} `}>
                    <h1>{content}</h1>
                </div>

                <hr className={`border-2  ${!isLightTheme ? "border-[#272727ae]" : "border-[#c9c9c9]"} rounded-sm w-[100%]`} />

                <div className="flex justify-evenly flex-row my-4 text-[#dddddd]">
                    <button onClick={onConfirm} id="delete-btn" className="btns">{t("confirmDelete")}</button>
                    <button onClick={onCancel} id="cancel-btn" className={`btns ${isLightTheme ? "text-[#282828] border-[#282828] hover:border-[#313131]" : "text-[#dddddd]"} `}>{t("cancel")}</button>
                </div>

            </div>
        </div>
    );
};

export default ConfirmPopup;
