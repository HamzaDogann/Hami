import Header from './Header';
import Footer from './Footer/Footer';
import { useTheme } from '../providers/ThemeContext';

// Shared frame of the generator pages: themed background, header on top, footer at the bottom.
const PageLayout = ({ className, children }) => {
    const { isLightTheme } = useTheme();

    return (
        <div className={`${className} ${isLightTheme ? "bg-white " : "bg-[#161616]"}`}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default PageLayout;
