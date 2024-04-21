//Providers
import { useLanguage } from '../../providers/LanguageContext';

const LanguageModeToggle = () => {

  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      style={{ backgroundImage: "linear-gradient(45deg, rgb(179, 79, 166), rgb(0, 36, 155))" }}
      onClick={toggleLanguage}
      className="text-white rounded-full py-2 px-0.5 focus:outline-none transition duration-300 ease-in-out mr-2 z-1"
      title={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}>
      <span className="transition duration-300 mx-2 ease-in-out transform">
        <span style={{ fontSize: "18px" }} className="font-bold">{language === 'en' ? 'EN' : 'TR'}</span>
      </span>
    </button>
  );
};

export default LanguageModeToggle;
