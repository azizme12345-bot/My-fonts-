import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                F
              </div>
              <span className="font-bold text-xl text-white tracking-tight flex items-center gap-1.5">
                Fontora <Sparkles className="w-4 h-4 text-indigo-400" />
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              The premier typography discovery and download platform for Urdu, Arabic, Hindi, English, and Roman Urdu creators.
            </p>
            <div className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Fontora Inc. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Discovery</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
                  Featured Fonts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  All Font Library
                </button>
              </li>
              <li>
                <button onClick={() => navigate('categories')} className="hover:text-white transition-colors">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => navigate('favorites')} className="hover:text-white transition-colors">
                  My Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Languages</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  Urdu Fonts (Nastaleeq & Naskh)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  Arabic Calligraphy & Modern
                </button>
              </li>
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  Hindi Devanagari Fonts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  English Serif & Sans
                </button>
              </li>
              <li>
                <button onClick={() => navigate('fonts')} className="hover:text-white transition-colors">
                  Roman Urdu Typography
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Licensing */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Legal & License</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  SIL Open Font License
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  DMCA & Copyright
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            Built with precision for designers, publishers, and developers worldwide.
          </p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Fontora Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
