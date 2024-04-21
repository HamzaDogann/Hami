//Providers
import { useContext, useState, useEffect } from 'react';
import { AIContext } from '../../../providers/AIChatContext.jsx';

// Components
import WelcomeScreen from './WelcomeScreen.jsx';
import ResultScreen from './ResultScreen.jsx';
import InputButton from "../GeneratorBar/InputButton.jsx";

//Styles
import "../textGenerator.css";

const GeneratorBar = ({ theme, language }) => {

    const [userInfos, setUserInfos] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userInfoFromLocalStorage = JSON.parse(localStorage.getItem('userAccount'));
        setUserInfos(userInfoFromLocalStorage);
    }, []);

    useEffect(() => {
        if (userInfos) {
            setUserName(userInfos.username);
        }
    }, [userInfos]);

    const { showResult } = useContext(AIContext)

    return (
        <>
            {/* Title Section */}
            <div className='welcome-user-bar flex flex-col h-[30%] px-6 justify-center'>
                <h1 className='hello-user-h1'>{language === "en" ? "Hey" : "Selam"} {userName},</h1>
                <p className='hami-info-text text-[gray]'>
                    {language === "en"
                        ? "Hami can show false information about different topics, including people. So, check whether his answers are correct or not."
                        : "Hami, kişiler de dahil olmak üzere farklı konular hakkında yanlış bilgiler gösterebilir. Bu nedenle, verdiği yanıtların doğru olup olmadığını kontrol edin."
                    }
                </p>
            </div>

            {/* Text Section */}
            <div className='result-box flex flex-col h-[80%] px-6 text-white  mt-[20px]'>
                <div className={`visibilityEffect ${showResult ? 'showResultVisible' : 'showResultHidden'}`}>
                    {showResult
                        ? <ResultScreen userInfos={userInfos} language={language} theme={theme} />
                        : <WelcomeScreen language={language} theme={theme} />
                    }
                </div>
            </div>

            {/* Input Section */}
            <div className='input-bar flex flex-col  h-[20%] px-6 justify-center mt-[20px]'>
                <InputButton theme={theme} language={language} />
            </div>

        </>
    )
}

export default GeneratorBar;