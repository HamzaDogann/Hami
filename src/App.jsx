//Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ThemeProvider } from "./providers/ThemeContext.jsx";
import { LanguageProvider } from "./providers/LanguageContext.jsx"
import { UserProvider } from './providers/userAccountContext.jsx';
import { ModalProvider } from './providers/AlertModalContext.jsx';
import AIChatContextProvider from "./providers/AIChatContext.jsx";
import AImageContextProvider from "./providers/AImageContext.jsx";

// Pages
import LoginPage from './pages/LoginPage/LoginHomePages.jsx';
import MenuPage from './pages/MenuPage/MenuPage.jsx';
import TextGeneratorPage from "./pages/textGeneratorPage/TextGeneratorPage.jsx";
import ImageGeneratorPage from "./pages/ImageGeneratorPage/ImageGeneratorPage.jsx";
import FavoriteImagesPage from './pages/favoriteImagesPage/FavoriteImagesPage.jsx';

function App() {

  // User Infos
  const userInfos = localStorage.getItem('userAccount');

  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <ModalProvider>
            <AIChatContextProvider>
              <AImageContextProvider>
                <Routes>
                  {!userInfos && <Route path="/" element={<LoginPage />} />}
                  {userInfos && <Route path="/" element={<MenuPage />} />}
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/text-generator" element={<TextGeneratorPage />} />
                  <Route path="/image-generator" element={<ImageGeneratorPage />} />
                  <Route path="/favorite-images" element={<FavoriteImagesPage />} />
                  {/* If any page not found */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AImageContextProvider>
            </AIChatContextProvider>
          </ModalProvider>
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider >
  );
}

export default App;
