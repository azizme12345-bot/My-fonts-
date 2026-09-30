import { useState, useEffect } from 'react';
import { FONTS_DATA, Font } from './data/fonts';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { PublisherIndexingModal } from './components/PublisherIndexingModal';
import { HomeView } from './views/HomeView';
import { FontsView } from './views/FontsView';
import { CategoriesView } from './views/CategoriesView';
import { FavoritesView } from './views/FavoritesView';
import { FontDetailView } from './views/FontDetailView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<{ language?: string; category?: string }>({});
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPublisherModalOpen, setIsPublisherModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fontora_favorites');
      return saved ? JSON.parse(saved) : ['jameel-noori-nastaleeq', 'amiri-arabic', 'poppins-sans'];
    } catch {
      return [];
    }
  });

  // Load saved Google Search Console verification on startup
  useEffect(() => {
    try {
      const savedGSC = localStorage.getItem('fontora_gsc_verification');
      if (savedGSC) {
        let metaTag = document.querySelector('meta[name="google-site-verification"]');
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', 'google-site-verification');
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', savedGSC);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fontora_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites', err);
    }
  }, [favorites]);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (route: string, params?: { language?: string; category?: string }) => {
    setCurrentRoute(route);
    if (params) {
      setRouteParams(params);
    } else {
      setRouteParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFont = (font: Font) => {
    setSelectedFont(font);
    setCurrentRoute('font-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (fontId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const isFav = prev.includes(fontId);
      const next = isFav ? prev.filter((id) => id !== fontId) : [...prev, fontId];
      showToast(isFav ? 'Removed from favorites' : 'Added to favorites successfully!');
      return next;
    });
  };

  const handleDownloadFont = (font: Font, e: React.MouseEvent) => {
    e.stopPropagation();
    const anchor = document.createElement('a');
    anchor.href = font.fontFileUrl;
    anchor.download = `${font.slug}-${font.fontFormat.toLowerCase()}.${font.fontFormat.toLowerCase()}`;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    showToast(`Downloading ${font.name} (${font.fontFormat}) successfully!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 text-neutral-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold animate-in slide-in-from-bottom-5 duration-200 border border-neutral-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenPublisherConsole={() => setIsPublisherModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            fonts={FONTS_DATA}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectFont={handleSelectFont}
            onDownload={handleDownloadFont}
            navigate={navigate}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />
        )}

        {currentRoute === 'fonts' && (
          <FontsView
            fonts={FONTS_DATA}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectFont={handleSelectFont}
            onDownload={handleDownloadFont}
            initialLanguage={routeParams.language || 'All'}
            initialCategory={routeParams.category || 'All'}
          />
        )}

        {currentRoute === 'categories' && (
          <CategoriesView fonts={FONTS_DATA} navigate={navigate} />
        )}

        {currentRoute === 'favorites' && (
          <FavoritesView
            fonts={FONTS_DATA}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectFont={handleSelectFont}
            onDownload={handleDownloadFont}
            navigate={navigate}
          />
        )}

        {currentRoute === 'font-detail' && selectedFont && (
          <FontDetailView
            font={selectedFont}
            allFonts={FONTS_DATA}
            isFavorite={favorites.includes(selectedFont.id)}
            onToggleFavorite={handleToggleFavorite}
            onSelectFont={handleSelectFont}
            onDownload={handleDownloadFont}
            navigate={navigate}
          />
        )}

        {currentRoute === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        fonts={FONTS_DATA}
        onSelectFont={handleSelectFont}
      />

      {/* Publisher Indexing & Google Search Console Modal */}
      <PublisherIndexingModal
        isOpen={isPublisherModalOpen}
        onClose={() => setIsPublisherModalOpen(false)}
      />
    </div>
  );
}
