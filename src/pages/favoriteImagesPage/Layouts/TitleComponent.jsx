import { useLanguage } from '../../../providers/LanguageContext';

const TitleComponent = () => {
  const { t } = useLanguage();
  return <h1 className='title-h1'>{t("favoriteImages")}</h1>
}

export default TitleComponent
