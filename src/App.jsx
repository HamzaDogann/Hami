import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from "./providers/ThemeContext.jsx";
import { LanguageProvider } from "./providers/LanguageContext.jsx"
import { UserProvider, useUser } from './providers/userAccountContext.jsx';
import { ModalProvider } from './providers/AlertModalContext.jsx';
import { ConfirmProvider } from './providers/ConfirmContext.jsx';
import { FavChatsProvider } from './providers/FavoriteChatsContext.jsx';
import { FavImagesProvider } from './providers/FavoriteImagesContext.jsx';
import { AIChatProvider } from "./providers/AIChatContext.jsx";
import { AIImageProvider } from "./providers/AImageContext.jsx";

import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage/LoginHomePages.jsx';
import MenuPage from './pages/MenuPage/MenuPage.jsx';
import ImageGeneratorPage from "./pages/ImageGeneratorPage/ImageGeneratorPage.jsx";
import FavoriteImagesPage from './pages/favoriteImagesPage/FavoriteImagesPage.jsx';

// Loaded on demand: it pulls in the markdown + syntax highlighting libraries, which are the heaviest part of the app.
const TextGeneratorPage = lazy(() => import('./pages/textGeneratorPage/TextGeneratorPage.jsx'));

// "/" is the login page until a profile exists, the menu afterwards.
const HomeRoute = () => {
  const { userAccount } = useUser();
  return userAccount ? <MenuPage /> : <LoginPage />;
};

const protect = (page) => <ProtectedRoute>{page}</ProtectedRoute>;

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <ModalProvider>
            <ConfirmProvider>
              <FavChatsProvider>
                <FavImagesProvider>
                  <AIChatProvider>
                    <AIImageProvider>
                      <Suspense fallback={null}>
                        <Routes>
                          <Route path="/" element={<HomeRoute />} />
                          <Route path="/menu" element={protect(<MenuPage />)} />
                          <Route path="/text-generator" element={protect(<TextGeneratorPage />)} />
                          <Route path="/image-generator" element={protect(<ImageGeneratorPage />)} />
                          <Route path="/favorite-images" element={protect(<FavoriteImagesPage />)} />
                          {/* If any page not found */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </AIImageProvider>
                  </AIChatProvider>
                </FavImagesProvider>
              </FavChatsProvider>
            </ConfirmProvider>
          </ModalProvider>
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
