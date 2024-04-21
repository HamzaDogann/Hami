//Providers
import { useLanguage } from '../../../providers/LanguageContext';

const TitleComponent = () => {
  const { language } = useLanguage();
  return (
    <h1 className='title-h1'>{language === "en" ? "Favorite Images" : "Favori Resimler"}</h1>
  )
}

export default TitleComponent