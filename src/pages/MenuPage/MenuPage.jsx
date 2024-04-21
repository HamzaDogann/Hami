//React Hooks - Router
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Providers
import { useTheme } from '../../providers/ThemeContext'

//Components
import Header from '../../components/Header'
import HamiLogo from '../../components/HamiLogo'
import TextGeneratorMenu from './TextGeneratorMenu/TextGeneratorMenu'
import ImageGeneratorMenu from './ImageGeneratorMenu/ImageGeneratorMenu'
import AnimationBackground from '../../components/AnimationBackground'

//Styles
import "../MenuPage/menuPage.css"



const MenuPage = () => {

    const { darkMode } = useTheme();

    const navigate = useNavigate();

    useEffect(() => {

        const userAccount = JSON.parse(localStorage.getItem("userAccount"));
        if (!userAccount || userAccount.length === 0) {
            navigate("/");
        }
    }, []);

    return (
        <div className={`${darkMode ? 'light-theme' : 'dark-theme'} h-screen w-full flex flex-col items-center justify-center relative `}>
            <Header />

            <div className='menu-hami-logo'>
                <HamiLogo />
            </div>

            <div className='generations-button mt-7'>
                <TextGeneratorMenu />
                <ImageGeneratorMenu />
            </div>

            <AnimationBackground />
        </div>
    )
}

export default MenuPage