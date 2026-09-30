import { LANGUAGES, CATEGORIES_BY_LANGUAGE, Font } from '../data/fonts';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoriesViewProps {
  fonts: Font[];
  navigate: (route: string, params?: any) => void;
}

export function CategoriesView({ fonts, navigate }: CategoriesViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Taxonomy</span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 mt-1">
          Font Categories & Languages
        </h1>
        <p className="text-neutral-600 text-sm mt-1">
          Explore our structured library categorized by linguistic scripts and aesthetic design styles.
        </p>
      </div>

      {/* Language sections */}
      <div className="space-y-12">
        {LANGUAGES.map((lang) => {
          const categories = CATEGORIES_BY_LANGUAGE[lang] || [];
          const langFonts = fonts.filter((f) => f.language === lang);

          return (
            <div key={lang} className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {lang[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">{lang} Fonts</h2>
                    <p className="text-xs text-neutral-500">{langFonts.length} typefaces available in directory</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('fonts', { language: lang })}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
                >
                  <span>Browse All {lang}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category pills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat) => {
                  const catCount = langFonts.filter((f) => f.category === cat).length;
                  return (
                    <div
                      key={cat}
                      onClick={() => navigate('fonts', { language: lang, category: cat })}
                      className="group bg-neutral-50 hover:bg-indigo-50/70 p-5 rounded-2xl border border-neutral-200 hover:border-indigo-200 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                            {lang} Style
                          </span>
                          <span className="px-2 py-0.5 bg-neutral-200 group-hover:bg-indigo-200 group-hover:text-indigo-800 text-neutral-700 text-[10px] font-bold rounded-full transition-colors">
                            {catCount > 0 ? `${catCount} fonts` : 'Explore'}
                          </span>
                        </div>
                        <h3 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors text-lg">
                          {cat}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs font-semibold text-neutral-600 group-hover:text-indigo-600">
                        <span>View collection</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
