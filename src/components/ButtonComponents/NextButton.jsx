//Providers
import { useLanguage } from '../../providers/LanguageContext';

// Style
import { HiArrowRight } from "react-icons/hi";
import "./nextButton.css"

const NextButton = ({ handleUserUpdate }) => {

    const { language } = useLanguage();

    return (
        <>
            <button
                onClick={handleUserUpdate}
                className={`next-btn mt-6 bg-blue-700 text-white`}>
                <span>{language === "en" ? "Next" : "İlerle"}</span>
                <HiArrowRight id="btn-arrow" />
            </button>
        </>
    );
};
export default NextButton