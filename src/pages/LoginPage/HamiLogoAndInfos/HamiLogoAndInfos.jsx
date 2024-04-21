//React Hooks
import { useState, useEffect } from "react"

//Providers
import { useLanguage } from "../../../providers/LanguageContext";
//Component
import HamiLogo from '../../../components/HamiLogo';


const HamiLogoAndInfos = ({ setIsLoginBox }) => {

    const { language } = useLanguage();

    //Animation States
    const [isHamiLogo, setIsHamiLogo] = useState(false);
    const [isHamiInfo, setIsHamiInfo] = useState(false);
    const [isHamiInfo2, setIsHamiInfo2] = useState(false);
    const [isHamiInfo3, setIsHamiInfo3] = useState(false);
    const [isLoginHamiLogo, setIsLoginHamiLogo] = useState(false);

    useEffect(() => {
        setIsHamiLogo(true);

        setTimeout(() => {
            setIsHamiLogo(false);
        }, 1600);

        setTimeout(() => {
            setIsHamiInfo(true)
        }, 2200);


        setTimeout(() => {
            setIsHamiInfo(false)
        }, 4200);

        setTimeout(() => {
            setIsHamiInfo2(true);
        }, 4800);

        setTimeout(() => {

            setIsHamiInfo2(false);
        }, 7200);

        setTimeout(() => {

            setIsHamiInfo3(true);
        }, 7600);

        setTimeout(() => {

            setIsHamiInfo3(false);
        }, 11400);

        setTimeout(() => {
            setIsLoginHamiLogo(true);
            setIsLoginBox(true);
        }, 12200);

    }, [])

    return (
        <>
            <div className="hami-logo-box">
                {isHamiLogo &&
                    <HamiLogo />
                }
                {isHamiInfo &&
                    <p className={`hami-login-info`}>
                        {language === "en" ? "Text and Image Generator" : "Yazı ve Resim Üretici"}
                    </p>
                }
                {isHamiInfo2 &&
                    <p className="hami-login-info">
                        {language === "en" ? "Are you ready for a great AI experience?" : "Harika bir yapay zeka deneyimine hazır mısın?"}
                    </p>
                }
                {isHamiInfo3 &&
                    <p className="hami-login-info">  
                        {language === "en" ? "Start by choosing a username and avatar" : "Bir kullanıcı adı ve avatar seçerek başla"}
                    </p>

                }
            </div>

            {isLoginHamiLogo &&
                <div className="hami-logo-box">
                    <HamiLogo />
                </div>
            }
        </>
    )
}

export default HamiLogoAndInfos