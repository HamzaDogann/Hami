//Providers
import { useTheme } from '../../providers/ThemeContext';

// Icons
import { RiSunFill, RiMoonFill } from 'react-icons/ri';

const DarkModeToggle = () => {

  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-[#e2e2e2] text-gray-800'} p-2 px-2.5 rounded-full`}>
      <span className="transition duration-300 ease-in-out text-[24px] transform">
        {darkMode ? (<RiMoonFill />) : (<RiSunFill />)}
      </span>
    </button>
  );
};

export default DarkModeToggle;
