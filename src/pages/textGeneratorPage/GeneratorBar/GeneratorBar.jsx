import { useAIChat } from '../../../providers/AIChatContext.jsx';
import { useLanguage } from '../../../providers/LanguageContext.jsx';
import { useUser } from '../../../providers/userAccountContext.jsx';

import WelcomeScreen from './WelcomeScreen.jsx';
import ResultScreen from './ResultScreen.jsx';
import InputButton from "./InputButton.jsx";

import "../textGenerator.css";

const GeneratorBar = () => {

    const { t } = useLanguage();
    const { userName } = useUser();
    const { showResult } = useAIChat();

    return (
        <>
            {/* Title Section */}
            <div className='welcome-user-bar flex flex-col h-[30%] px-6 justify-center'>
                <h1 className='hello-user-h1'>{t("hey")} {userName},</h1>
                <p className='hami-info-text text-[gray]'>{t("aiDisclaimer")}</p>
            </div>

            {/* Text Section */}
            <div className='result-box flex flex-col h-[80%] px-6 text-white  mt-[20px]'>
                <div className={`visibilityEffect ${showResult ? 'showResultVisible' : 'showResultHidden'}`}>
                    {showResult ? <ResultScreen /> : <WelcomeScreen />}
                </div>
            </div>

            {/* Input Section */}
            <div className='input-bar flex flex-col  h-[20%] px-6 justify-center mt-[20px]'>
                <InputButton />
            </div>
        </>
    )
}

export default GeneratorBar;
