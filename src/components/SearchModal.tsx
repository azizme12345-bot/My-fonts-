import { useState, useEffect, useRef } from 'react';
import { Font } from '../data/fonts';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fonts: Font[];
  onSelectFont: (font: Font) => void;
}

export function SearchModal({ isOpen, onClose, fonts, onSelectFont }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFonts = query.trim() === ''
    ? fonts.slice(0, 5)
    : fonts.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.language.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase()) ||
        f.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        f.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-6 py-4 border-b border-neutral-200 gap-3">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fonts by name, language (Urdu, Arabic, etc.), or category..."
            className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-lg font-medium focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-neutral-400 px-3 py-1 uppercase tracking-wider flex items-center justify-between">
            <span>{query.trim() === '' ? 'Popular Recommendations' : `Matching Results (${filteredFonts.length})`}</span>
            <span className="flex items-center gap-1 text-[10px] text-neutral-400">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Instant Search
            </span>
          </div>

          {filteredFonts.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="font-medium text-base">No fonts found matching "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for "Nastaleeq", "Arabic", "Serif", or "Poppins"</p>
            </div>
          ) : (
            filteredFonts.map((font) => (
              <div
                key={font.id}
                onClick={() => {
                  onSelectFont(font);
                  onClose();
                }}
                className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 cursor-pointer transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-semibold rounded-full">
                      {font.language}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[10px] font-medium rounded-full">
                      {font.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors text-base">
                    {font.name}
                  </h4>
                  <p 
                    className="text-sm text-neutral-600 line-clamp-1" 
                    style={{ fontFamily: font.cssFontFamily }}
                  >
                    {font.previewText}
                  </p>
                </div>
                <div className="pl-4 flex items-center text-neutral-400 group-hover:text-indigo-600 transition-colors">
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Press ESC to close</span>
          <span>Fontora Directory v2.4</span>
        </div>
      </div>
    </div>
  );
}
