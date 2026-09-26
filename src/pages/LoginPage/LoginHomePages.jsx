import { useCallback, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../providers/ThemeContext';
import { useLanguage } from '../../providers/LanguageContext';
import { useUser } from '../../providers/userAccountContext';
import { useModal } from '../../providers/AlertModalContext';

import CenteredScreen from '../../components/CenteredScreen';
import NextButton from '../../components/ButtonComponents/NextButton';
import AvatarSelectionPage from '../../components/AvatarSelection/AvatarSelection';
import HamiLogoAndInfos from "./HamiLogoAndInfos/HamiLogoAndInfos";

const LoginHomePage = () => {

    const navigate = useNavigate();
    const { isLightTheme } = useTheme();
    const { t } = useLanguage();
    const { updateUserAccount } = useUser();
    const { showAlert } = useModal();

    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const showForm = useCallback(() => setIsFormVisible(true), []);

    const handleUserUpdate = () => {
        const trimmedName = username.trim();

        if (!selectedAvatar || !trimmedName) {
            showAlert(t("chooseUsernameAndAvatar"));
            return;
        }

        updateUserAccount({ avatarId: selectedAvatar, username: trimmedName });
        navigate('/menu');
    };

    return (
        <CenteredScreen>
            <HamiLogoAndInfos onIntroFinished={showForm} />

            {/* Get User Infos Box */}
            {isFormVisible &&
                <div className="hami-login-box relative z-10 flex w-full flex-col h-auto  items-center">
                    <div className="-mb-10 mt-5 flex flex-col items-center">
                        <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className={`mt-4 p-3 rounded-[20px] flex justify-center backdrop-blur-sm ${!isLightTheme ? "bg-[#1212124c]" : "bg-[#c2c2c23d]"} w-custom-small-screen w-custom-300 sm:w-custom-420 md:w-custom-650 xl:w-custom-650 
                                focus:outline-none transition duration-300 ease-in-out${isLightTheme
                                    ? 'text-black placeholder:text-black border-gray-800'
                                    : ' text-white placeholder:text-gray-300 border-gray-300'
                                }`}
                            type="text"
                            maxLength={12}
                            placeholder={t("usernamePlaceholder")}
                        />
                        <AvatarSelectionPage handleAvatarSelect={setSelectedAvatar} selectedAvatar={selectedAvatar} />

                        <NextButton onClick={handleUserUpdate} />
                    </div>
                </div>
            }
        </CenteredScreen>
    );
}

export default LoginHomePage;
