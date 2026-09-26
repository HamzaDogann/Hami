import CenteredScreen from '../../components/CenteredScreen'
import HamiLogo from '../../components/HamiLogo'
import TextGeneratorMenu from './TextGeneratorMenu/TextGeneratorMenu'
import ImageGeneratorMenu from './ImageGeneratorMenu/ImageGeneratorMenu'

import "../MenuPage/menuPage.css"

const MenuPage = () => (
    <CenteredScreen>
        <div className='menu-hami-logo'>
            <HamiLogo />
        </div>

        <div className='generations-button mt-7'>
            <TextGeneratorMenu />
            <ImageGeneratorMenu />
        </div>
    </CenteredScreen>
)

export default MenuPage
