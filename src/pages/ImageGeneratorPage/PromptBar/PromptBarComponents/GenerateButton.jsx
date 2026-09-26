import { useAIImage } from '../../../../providers/AImageContext'
import { useLanguage } from '../../../../providers/LanguageContext'
import { useModal } from '../../../../providers/AlertModalContext';

import { RiAiGenerate } from "react-icons/ri";
import { RiImageEditFill } from "react-icons/ri";

const GenerateButton = () => {

    const { t } = useLanguage();
    const { showAlert } = useModal();
    const { generate, prompts, loading } = useAIImage();

    const handleGenerate = () => {
        if (prompts.trim()) {
            generate();
        } else {
            showAlert(t("promptRequired"));
        }
    };

    return (
        <div className="w-full flex justify-center mt-8 mb-2">
            <button disabled={loading} onClick={handleGenerate} className="generate-btn">
                {!loading
                    ? <>
                        <span className={`mx-3 text-[#ececec]`}>{t("generateImage")}</span>
                        <span className=" mr-3">
                            <RiAiGenerate className="text-[24px]" />
                        </span>
                    </>
                    : <>
                        <span className={`generating-ani mx-3 text-[#ececec]`}>{t("generating")}</span>
                        <span className="generating-ani mr-3">
                            <RiImageEditFill className="text-[24px]" />
                        </span>
                    </>
                }
            </button>
        </div>
    )
}

export default GenerateButton
