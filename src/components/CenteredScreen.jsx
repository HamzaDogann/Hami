import Header from './Header';
import AnimationBackground from './AnimationBackground';
import { useTheme } from '../providers/ThemeContext';

// Full-screen frame of the login and menu pages: themed, header on top, animated background behind.
const CenteredScreen = ({ children }) => {
    const { isLightTheme } = useTheme();

    return (
        <div className={`${isLightTheme ? 'light-theme' : 'dark-theme'} h-screen w-full flex flex-col items-center justify-center relative `}>
            <Header />
            {children}
            <AnimationBackground />
        </div>
    );
};

export default CenteredScreen;
