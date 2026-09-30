import { useState } from 'react';
import { Font } from '../data/fonts';
import { FontCard } from '../components/FontCard';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Heart, Download, Copy, Check, ArrowLeft, ShieldCheck, User, FileText, HardDrive, Sparkles } from 'lucide-react';

interface FontDetailViewProps {
  font: Font;
  allFonts: Font[];
  isFavorite: boolean;
  onToggleFavorite: (fontId: string, e: React.MouseEvent) => void;
  onSelectFont: (font: Font) => void;
  onDownload: (font: Font, e: React.MouseEvent) => void;
  navigate: (route: string) => void;
}

export function FontDetailView({
  font,
  allFonts,
  isFavorite,
  onToggleFavorite,
  onSelectFont,
  onDownload,
  navigate,
}: FontDetailViewProps) {
  const [customText, setCustomText] = useState(font.previewText);
  const [fontSize, setFontSize] = useState(42);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const relatedFonts = allFonts
    .filter((f) => f.language === font.language && f.id !== font.id)
    .slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    setDownloaded(true);
    onDownload(font, e);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const isRTL = font.language === 'Urdu' || font.language === 'Arabic';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('fonts')}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Font Directory</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-indigo-50/50 via-white to-white border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                {font.language}
              </span>
              <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs font-medium rounded-full">
                {font.category}
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {font.license}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
              {font.name}
            </h1>
            <p className="text-neutral-600 text-base max-w-2xl leading-relaxed">
              {font.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => onToggleFavorite(font.id, e)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-2 text-sm font-semibold ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500 border-rose-200'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleDownload}
              className={`px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg flex items-center gap-2 ${
                downloaded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Font ({font.fontFormat})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Font Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-neutral-50/70 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">Designer</div>
              <div className="text-sm font-bold text-neutral-900">{font.designer}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">Format</div>
              <div className="text-sm font-bold text-neutral-900">{font.fontFormat} Typeface</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">File Size</div>
              <div className="text-sm font-bold text-neutral-900">{font.fileSize}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium">Downloads</div>
              <div className="text-sm font-bold text-neutral-900">{font.downloadCount.toLocaleString()}+</div>
            </div>
          </div>
        </div>

        {/* Live Preview Testing Box */}
        <div className="p-8 sm:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-neutral-900 text-lg">Interactive Type Tester</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-semibold">Size: {fontSize}px</span>
                <input
                  type="range"
                  min="24"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-32 accent-indigo-600 cursor-pointer"
                />
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          {/* Text Input */}
          <textarea
            rows={2}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-neutral-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner"
            dir={isRTL ? 'rtl' : 'ltr'}
          />

          {/* Rendered Preview Box */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 sm:p-12 min-h-[220px] flex items-center justify-center overflow-x-auto">
            <div
              className={`w-full text-neutral-900 text-center transition-all`}
              style={{
                fontFamily: font.cssFontFamily,
                fontSize: `${fontSize}px`,
                lineHeight: 1.6,
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {customText || font.previewText}
            </div>
          </div>
        </div>
      </div>

      {/* Ad Placeholder */}
      <AdPlaceholder size="banner" />

      {/* Related Fonts */}
      {relatedFonts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-2xl font-bold text-neutral-900">Related {font.language} Fonts</h2>
            <p className="text-neutral-500 text-sm">More typefaces from the same linguistic family</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedFonts.map((related) => (
              <FontCard
                key={related.id}
                font={related}
                isFavorite={false}
                onToggleFavorite={onToggleFavorite}
                onSelectFont={onSelectFont}
                onDownload={onDownload}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
