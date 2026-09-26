import { useTheme } from '../../providers/ThemeContext';

import { RiSunFill, RiMoonFill } from 'react-icons/ri';

const DarkModeToggle = () => {

  const { isLightTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${isLightTheme ? 'bg-gray-700 text-white' : 'bg-[#e2e2e2] text-gray-800'} p-2 px-2.5 rounded-full`}>
      <span className="transition duration-300 ease-in-out text-[24px] transform">
        {isLightTheme ? (<RiMoonFill />) : (<RiSunFill />)}
      </span>
    </button>
  );
};

export default DarkModeToggle;
