import { useLanguage } from '../../providers/LanguageContext';

import { HiArrowRight } from "react-icons/hi";
import "./nextButton.css"

const NextButton = ({ onClick }) => {

    const { t } = useLanguage();

    return (
        <button onClick={onClick} className="next-btn mt-6 bg-blue-700 text-white">
            <span>{t("next")}</span>
            <HiArrowRight id="btn-arrow" />
        </button>
    );
};

export default NextButton;
