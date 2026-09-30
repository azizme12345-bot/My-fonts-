import { useState } from 'react';
import { Font, LANGUAGES, CATEGORIES_BY_LANGUAGE } from '../data/fonts';
import { FontCard } from '../components/FontCard';
import { LivePreviewTool } from '../components/LivePreviewTool';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Search, Sparkles, ArrowRight, Download, Globe, ShieldCheck, Zap } from 'lucide-react';

interface HomeViewProps {
  fonts: Font[];
  favorites: string[];
  onToggleFavorite: (fontId: string, e: React.MouseEvent) => void;
  onSelectFont: (font: Font) => void;
  onDownload: (font: Font, e: React.MouseEvent) => void;
  navigate: (route: string, params?: any) => void;
  onOpenSearch: () => void;
}

export function HomeView({
  fonts,
  favorites,
  onToggleFavorite,
  onSelectFont,
  onDownload,
  navigate,
  onOpenSearch,
}: HomeViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const popularFonts = fonts.filter((f) => f.isPopular || f.popularity > 90);
  const filteredFonts = selectedLanguage === 'All'
    ? popularFonts
    : fonts.filter((f) => f.language === selectedLanguage);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white pt-12 pb-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Discover & Download Professional Fonts</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-[1.15]">
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Perfect Font</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Discover beautiful Urdu, Arabic, Hindi, English, and Roman Urdu fonts. Preview them instantly and download with absolute ease.
            </p>

            {/* Large Search Box */}
            <div className="pt-4 max-w-2xl mx-auto">
              <div 
                onClick={onOpenSearch}
                className="flex items-center gap-3 bg-white border border-neutral-300 hover:border-indigo-400 p-3.5 sm:p-4 rounded-2xl shadow-lg cursor-pointer transition-all group"
              >
                <Search className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 transition-colors ml-2" />
                <span className="flex-1 text-left text-neutral-400 text-base font-medium">
                  Search fonts by name, language or style (e.g., Nastaleeq, Arabic)...
                </span>
                <span className="hidden sm:inline px-3 py-1 bg-neutral-100 group-hover:bg-indigo-50 group-hover:text-indigo-700 text-neutral-600 text-xs font-semibold rounded-xl transition-colors border border-neutral-200">
                  Search ⌘K
                </span>
              </div>
            </div>

            {/* Language Filter Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedLanguage('All')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedLanguage === 'All'
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                All Languages
              </button>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedLanguage === lang
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Typography Visual Banner */}
          <div className="mt-16 bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                  Featured Showcase
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Typography Crafted for Multilingual Excellence
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Every font in our directory is verified for digital screens, licensing clarity, and high-performance rendering.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => navigate('fonts')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <span>Explore All Fonts</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Preview Grid */}
              <div className="grid grid-cols-1 gap-3">
                <div 
                  onClick={() => onSelectFont(fonts[0])}
                  className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-700 cursor-pointer hover:border-indigo-500 transition-all"
                >
                  <div className="text-xs text-indigo-400 font-semibold mb-1">Urdu • Nastaleeq</div>
                  <div className="text-xl sm:text-2xl text-white font-serif" dir="rtl" style={{ fontFamily: '"Noto Nastaleeq Urdu", serif' }}>
                    {fonts[0].previewText}
                  </div>
                </div>
                <div 
                  onClick={() => onSelectFont(fonts[3])}
                  className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-700 cursor-pointer hover:border-indigo-500 transition-all"
                >
                  <div className="text-xs text-indigo-400 font-semibold mb-1">Arabic • Traditional</div>
                  <div className="text-xl sm:text-2xl text-white font-serif" dir="rtl" style={{ fontFamily: '"Amiri", serif' }}>
                    {fonts[3].previewText}
                  </div>
                </div>
                <div 
                  onClick={() => onSelectFont(fonts[6])}
                  className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-700 cursor-pointer hover:border-indigo-500 transition-all"
                >
                  <div className="text-xs text-indigo-400 font-semibold mb-1">English • Serif</div>
                  <div className="text-xl sm:text-2xl text-white font-serif" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {fonts[6].previewText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Fonts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" /> Trending Now
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Popular Fonts {selectedLanguage !== 'All' ? `(${selectedLanguage})` : ''}
            </h2>
          </div>
          <button
            onClick={() => navigate('fonts')}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start sm:self-auto"
          >
            <span>View all fonts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFonts.slice(0, 6).map((font) => (
            <FontCard
              key={font.id}
              font={font}
              isFavorite={favorites.includes(font.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectFont={onSelectFont}
              onDownload={onDownload}
            />
          ))}
        </div>
      </section>

      {/* Ad Placeholder 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder size="banner" />
      </div>

      {/* Live Font Preview Studio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Interactive Font Preview Studio
          </h2>
          <p className="text-neutral-600 text-sm mt-2">
            Test any typography combination in real time before downloading.
          </p>
        </div>
        <LivePreviewTool fonts={fonts} onSelectFont={onSelectFont} />
      </section>

      {/* Categories Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Explore Styles</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Browse by Category</h2>
          </div>
          <button
            onClick={() => navigate('categories')}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LANGUAGES.map((lang) => {
            const categories = CATEGORIES_BY_LANGUAGE[lang] || [];
            return (
              <div
                key={lang}
                onClick={() => navigate('fonts', { language: lang })}
                className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-lg hover:border-indigo-300 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {lang[0]}
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    {lang} Fonts
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {categories.slice(0, 3).join(', ')}...
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Features Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">100% Free & Open License</h3>
              <p className="text-neutral-600 text-sm mt-1">
                All fonts featured on Fontora are cleared under SIL Open Font License for commercial and personal projects.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">Multilingual Mastery</h3>
              <p className="text-neutral-600 text-sm mt-1">
                Specialized support for Nastaleeq, Arabic Calligraphy, Devanagari, and Roman Urdu typesetting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">Instant TTF / WOFF Download</h3>
              <p className="text-neutral-600 text-sm mt-1">
                Download actual font files immediately with zero friction, sign-ups, or hidden redirects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
