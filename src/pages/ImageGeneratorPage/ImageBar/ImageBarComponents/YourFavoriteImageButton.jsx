//React Hooks - Router
import { useTheme } from '../../../../providers/ThemeContext'
import { useLanguage } from '../../../../providers/LanguageContext'
import { Link } from "react-router-dom"

//Styles
import { IoMdImages } from "react-icons/io";


const YourFavoriteImageButton = () => {

  const { darkMode } = useTheme();
  const { language } = useLanguage();

  return (
    <button className={`favorites-button relative ${!darkMode ? "text-[#ffffff]" : "bg-[#ebebebdf] text-[#1e1e1e]"}`}>
      <span>{`${language === "en" ? "Your Favorite Images" : "Favori Resimleriniz"}`}</span>
      <span className='ml-2 text-[24px]'><IoMdImages /></span>
      <Link className='w-full h-full absolute' to="/favorite-images"></Link>
    </button>
  )
}

export default YourFavoriteImageButton