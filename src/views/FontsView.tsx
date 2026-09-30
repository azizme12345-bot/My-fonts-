import { useState, useMemo } from 'react';
import { Font, LANGUAGES, CATEGORIES_BY_LANGUAGE } from '../data/fonts';
import { FontCard } from '../components/FontCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface FontsViewProps {
  fonts: Font[];
  favorites: string[];
  onToggleFavorite: (fontId: string, e: React.MouseEvent) => void;
  onSelectFont: (font: Font) => void;
  onDownload: (font: Font, e: React.MouseEvent) => void;
  initialLanguage?: string;
  initialCategory?: string;
}

export function FontsView({
  fonts,
  favorites,
  onToggleFavorite,
  onSelectFont,
  onDownload,
  initialLanguage = 'All',
  initialCategory = 'All',
}: FontsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popularity' | 'downloads' | 'name'>('popularity');

  const categoriesForLang = selectedLanguage === 'All'
    ? []
    : CATEGORIES_BY_LANGUAGE[selectedLanguage] || [];

  const filteredFonts = useMemo(() => {
    return fonts
      .filter((font) => {
        const matchesLang = selectedLanguage === 'All' || font.language === selectedLanguage;
        const matchesCat = selectedCategory === 'All' || font.category === selectedCategory;
        const matchesQuery =
          searchQuery.trim() === '' ||
          font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          font.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          font.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          font.language.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesLang && matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.popularity - a.popularity;
      });
  }, [fonts, selectedLanguage, selectedCategory, searchQuery, sortBy]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setSelectedCategory('All'); // Reset category when language changes
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Font Directory</span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 mt-1">
            Explore All Fonts
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Browse our complete collection of {fonts.length} professional multilingual typefaces.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
          >
            <option value="popularity">Most Popular</option>
            <option value="downloads">Highest Downloads</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-sm space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fonts by name, style, or keywords (e.g., Nastaleeq, Amiri, Sans)..."
            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-12 pr-10 py-3.5 text-neutral-900 placeholder:text-neutral-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Language Tabs */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
            Filter by Language:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLanguageChange('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedLanguage === 'All'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Languages
            </button>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedLanguage === lang
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories (if language selected) */}
        {selectedLanguage !== 'All' && categoriesForLang.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
              {selectedLanguage} Categories:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All {selectedLanguage}
              </button>
              {categoriesForLang.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-sm text-neutral-500 px-1">
        <div>
          Showing <span className="font-bold text-neutral-900">{filteredFonts.length}</span> fonts
          {selectedLanguage !== 'All' && <span> in <span className="font-semibold text-indigo-600">{selectedLanguage}</span></span>}
          {selectedCategory !== 'All' && <span> ({selectedCategory})</span>}
        </div>
        {(selectedLanguage !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSelectedLanguage('All');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-indigo-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Fonts Grid */}
      {filteredFonts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-xl font-bold text-neutral-900">No matching fonts found</h3>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            Try adjusting your search terms or clearing language and category filters.
          </p>
          <button
            onClick={() => {
              setSelectedLanguage('All');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-indigo-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFonts.map((font) => (
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
      )}

      {/* Ad Placeholder */}
      <AdPlaceholder size="banner" />
    </div>
  );
}
