import { Link } from "react-router-dom"

import { useTheme } from '../../../../providers/ThemeContext'
import { useLanguage } from '../../../../providers/LanguageContext'

import { IoMdImages } from "react-icons/io";

const YourFavoriteImageButton = () => {

  const { isLightTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button className={`favorites-button relative ${!isLightTheme ? "text-[#ffffff]" : "bg-[#ebebebdf] text-[#1e1e1e]"}`}>
      <span>{t("yourFavoriteImages")}</span>
      <span className='ml-2 text-[24px]'><IoMdImages /></span>
      <Link className='w-full h-full absolute' to="/favorite-images"></Link>
    </button>
  )
}

export default YourFavoriteImageButton
