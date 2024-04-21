//React Hooks - Router
import { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom';

// Providers
import { useTheme } from '../../providers/ThemeContext';
import { useLanguage } from '../../providers/LanguageContext';
import { useUser } from '../../providers/userAccountContext';

// Other Components
import Header from '../../components/Header';
import AnimationBackground from '../../components/AnimationBackground';
import NextButton from '../../components/ButtonComponents/NextButton';
import AvatarSelectionPage from '../../components/AvatarSelection/AvatarSelection';
import Modal from "../../components/ModalComponent/Modal";
import HamiLogoAndInfos from "./HamiLogoAndInfos/HamiLogoAndInfos";


const LoginHomePage = () => {

    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const { language } = useLanguage();
    const userNameInputRef = useRef(null);
    const { updateUserAccount } = useUser();
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const [isLoginBox, setIsLoginBox] = useState(false);
    const [showModal, setShowModal] = useState(false);


    // Selected Avatar
    const handleAvatarSelect = (avatarId) => {
        setSelectedAvatar(avatarId);
    };

    //Selected User Infos
    const handleUserUpdate = () => {
        if (!selectedAvatar || userNameInputRef.current.value.trim() === '') {
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 3750);
        } else {
            const newUserAccount = {
                avatarId: selectedAvatar,
                username: userNameInputRef.current.value,
            };
            updateUserAccount(newUserAccount);
            localStorage.setItem("userAccount", JSON.stringify(newUserAccount))
            navigate('/menu');

        }
    };

    return (
        <div className={`${darkMode ? 'light-theme' : 'dark-theme'} h-screen w-full flex flex-col items-center justify-center relative `}>

            {/* Header */}
            <Header />

            <HamiLogoAndInfos setIsLoginBox={setIsLoginBox} />

            {/*Get User Infos Box */}
            {isLoginBox &&
                <div className="hami-login-box relative z-10 flex w-full flex-col h-auto  items-center">
                    <div className="-mb-10 mt-5 flex flex-col items-center">
                        <input
                            ref={userNameInputRef}
                            className={`mt-4 p-3 rounded-[20px] flex justify-center backdrop-blur-sm ${!darkMode ? "bg-[#1212124c]" : "bg-[#c2c2c23d]"} w-custom-small-screen w-custom-300 sm:w-custom-420 md:w-custom-650 xl:w-custom-650 
                                focus:outline-none transition duration-300 ease-in-out${darkMode
                                    ? 'text-black placeholder:text-black border-gray-800'
                                    : ' text-white placeholder:text-gray-300 border-gray-300'
                                }`}
                            type="text"
                            maxLength={12} placeholder={language === 'en' ? 'Please choose a username' : 'Kullanıcı adı belirleyin'}
                        />
                        <AvatarSelectionPage handleAvatarSelect={handleAvatarSelect} selectedAvatar={selectedAvatar} />

                        <NextButton handleUserUpdate={handleUserUpdate} userNameInputRef={userNameInputRef} selectedAvatar={selectedAvatar} />

                        {showModal && (
                            <Modal content={language === "en" ? "Please choose a username and avatar" : "Lütfen bir kullanıcı adı ve avatar belirleyin"} />
                        )}
                    </div>
                </div>

            }

            {/* Background Animation */}
            <AnimationBackground />
        </div>
    );
}

export default LoginHomePage;
