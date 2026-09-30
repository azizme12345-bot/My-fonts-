import { useState } from 'react';
import { Font } from '../data/fonts';
import { Heart, Download, ArrowRight, Check } from 'lucide-react';

interface FontCardProps {
  font: Font;
  isFavorite: boolean;
  onToggleFavorite: (fontId: string, e: React.MouseEvent) => void;
  onSelectFont: (font: Font) => void;
  onDownload: (font: Font, e: React.MouseEvent) => void;
}

export function FontCard({
  font,
  isFavorite,
  onToggleFavorite,
  onSelectFont,
  onDownload,
}: FontCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloaded(true);
    onDownload(font, e);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const isRTL = font.language === 'Urdu' || font.language === 'Arabic';

  return (
    <div
      onClick={() => onSelectFont(font)}
      className="group bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:border-indigo-200"
    >
      {/* Card Header */}
      <div className="p-5 pb-3 flex items-start justify-between gap-3 border-b border-neutral-100 bg-neutral-50/50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
              {font.language}
            </span>
            <span className="px-2.5 py-0.5 bg-neutral-200/70 text-neutral-700 text-xs font-medium rounded-full">
              {font.category}
            </span>
          </div>
          <h3 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors text-lg">
            {font.name}
          </h3>
        </div>

        <button
          onClick={(e) => onToggleFavorite(font.id, e)}
          className={`p-2 rounded-xl transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 scale-105'
              : 'bg-white text-neutral-400 hover:text-rose-500 hover:bg-rose-50 border border-neutral-200'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Font Live Preview Box */}
      <div className="p-6 bg-white flex-1 flex flex-col justify-center min-h-[140px] max-h-[180px] overflow-hidden relative border-b border-neutral-100">
        <div
          className={`text-2xl sm:text-3xl text-neutral-800 transition-all leading-relaxed line-clamp-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{ fontFamily: font.cssFontFamily }}
        >
          {font.previewText}
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] text-neutral-400 font-mono">
          {font.fontFormat} • {font.fileSize}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-white flex items-center justify-between gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectFont(font);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-indigo-600 transition-colors"
        >
          <span>Preview & Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleDownloadClick}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
            downloaded
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 hover:bg-indigo-600 text-white'
          }`}
        >
          {downloaded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
