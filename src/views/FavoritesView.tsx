import { Font } from '../data/fonts';
import { FontCard } from '../components/FontCard';
import { Heart, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  fonts: Font[];
  favorites: string[];
  onToggleFavorite: (fontId: string, e: React.MouseEvent) => void;
  onSelectFont: (font: Font) => void;
  onDownload: (font: Font, e: React.MouseEvent) => void;
  navigate: (route: string) => void;
}

export function FavoritesView({
  fonts,
  favorites,
  onToggleFavorite,
  onSelectFont,
  onDownload,
  navigate,
}: FavoritesViewProps) {
  const favoriteFonts = fonts.filter((f) => favorites.includes(f.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-500" /> Saved Collections
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900">
            My Favorites ({favoriteFonts.length})
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Access your bookmarked typefaces instantly. Saved locally in your browser session.
          </p>
        </div>

        {favoriteFonts.length > 0 && (
          <button
            onClick={() => navigate('fonts')}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <span>Explore More Fonts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteFonts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900">No favorite fonts yet</h3>
            <p className="text-neutral-500 text-sm">
              Click the heart icon on any font card while browsing to save it here for quick comparison and downloading.
            </p>
          </div>
          <button
            onClick={() => navigate('fonts')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg inline-flex items-center gap-2"
          >
            <span>Browse Font Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteFonts.map((font) => (
            <FontCard
              key={font.id}
              font={font}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectFont={onSelectFont}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}
