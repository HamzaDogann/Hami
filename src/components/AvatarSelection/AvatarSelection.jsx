//Providers
import { useTheme } from '../../providers/ThemeContext';

//Avatars
import Avatars from './avatars'; // Array
import Avatar from './Avatar'; // Component

//Styles
import "./avatarSelection.css"

const AvatarSelectionPage = ({ selectedAvatar, handleAvatarSelect }) => {

    const { darkMode } = useTheme();

    return (
        <div className={`h-auto rounded-[20px] flex justify-center backdrop-blur-sm ${!darkMode ? "bg-[#1212124c]" : "bg-[#c2c2c23d]"} flex-col items-center   p-2 w-full mt-3 ${darkMode ? 'text-black border-black' : 'text-gray-300 border-sky-100'}`}>
            {/* Avatars */}
            <div className='small-screen grid  sm:grid-cols-3  md:grid-cols-5 gap-3 '>
                {Avatars.map((avatar) => (
                    <Avatar
                        key={avatar.id}
                        id={avatar.id}
                        AvatarImage={avatar.AvatarImage}
                        isSelected={selectedAvatar === avatar.id}
                        onSelect={handleAvatarSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default AvatarSelectionPage;
