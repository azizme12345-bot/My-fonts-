import { useState } from 'react';
import { Search, Heart, Menu, X, Sparkles, Globe } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string, params?: any) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenPublisherConsole: () => void;
}

export function Header({
  currentRoute,
  navigate,
  favoritesCount,
  onOpenSearch,
  onOpenPublisherConsole,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-indigo-600 transition-colors">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              Fontora <Sparkles className="w-4 h-4 text-indigo-500 hidden sm:inline" />
            </span>
            <span className="text-xs text-neutral-500 hidden sm:block font-medium tracking-wide">
              Typography Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-neutral-600">
          <button 
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-indigo-600 ${currentRoute === 'home' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('fonts')}
            className={`transition-colors hover:text-indigo-600 ${currentRoute === 'fonts' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            Fonts
          </button>
          <button 
            onClick={() => handleNav('categories')}
            className={`transition-colors hover:text-indigo-600 ${currentRoute === 'categories' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            Categories
          </button>
          <button 
            onClick={() => handleNav('favorites')}
            className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 ${currentRoute === 'favorites' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-rose-100 text-rose-700 text-xs rounded-full font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => handleNav('about')}
            className={`transition-colors hover:text-indigo-600 ${currentRoute === 'about' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            About
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPublisherConsole}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-colors border border-indigo-200 shadow-2xs"
            title="Publisher & Google Search Console Console"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Search Console</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl text-sm font-medium transition-colors border border-neutral-200/80 shadow-2xs"
            title="Search fonts"
          >
            <Search className="w-4 h-4 text-neutral-500" />
            <span className="hidden sm:inline text-neutral-400">Search fonts...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white text-neutral-500 text-[10px] rounded border border-neutral-300 font-mono">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => handleNav('favorites')}
            className="md:hidden relative p-2.5 text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
            aria-label="Favorites"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${currentRoute === 'home' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('fonts')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${currentRoute === 'fonts' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'}`}
          >
            Browse Fonts
          </button>
          <button
            onClick={() => handleNav('categories')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${currentRoute === 'categories' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'}`}
          >
            Categories
          </button>
          <button
            onClick={() => handleNav('favorites')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors flex items-center justify-between ${currentRoute === 'favorites' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'}`}
          >
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs rounded-full font-bold">
                {favoritesCount} saved
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${currentRoute === 'about' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'}`}
          >
            About & Licenses
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPublisherConsole();
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-medium text-base bg-indigo-50 text-indigo-700 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>Search Console & Indexing</span>
          </button>
        </div>
      )}
    </header>
  );
}
