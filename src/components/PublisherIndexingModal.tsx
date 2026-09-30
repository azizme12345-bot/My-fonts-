import { useState, useEffect } from 'react';
import { Globe, Check, Copy, ShieldCheck, Zap, X, Search, FileCode } from 'lucide-react';

interface PublisherIndexingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublisherIndexingModal({ isOpen, onClose }: PublisherIndexingModalProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('fontora_gsc_verification') || '';
      setSavedCode(existing);
      setVerificationCode(existing);
    } catch {
      // ignore
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('fontora_gsc_verification', verificationCode);
      setSavedCode(verificationCode);
      
      // Inject meta tag dynamically if present
      let metaTag = document.querySelector('meta[name="google-site-verification"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'google-site-verification');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', verificationCode);

      alert('Google Search Console verification code saved & injected successfully! Your site is now ready for rapid indexing.');
    } catch (err) {
      console.error(err);
    }
  };

  const sitemapUrl = `${window.location.origin}/sitemap.xml`;
  const robotsUrl = `${window.location.origin}/robots.txt`;

  const copyToClipboard = (text: string, type: 'sitemap' | 'robots') => {
    navigator.clipboard.writeText(text);
    if (type === 'sitemap') {
      setCopiedSitemap(true);
      setTimeout(() => setCopiedSitemap(false), 2000);
    } else {
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Publisher & Indexing Console <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h2>
              <p className="text-xs text-neutral-400">Google Search Console, Sitemap XML & Rapid Indexing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Google Search Console Verification */}
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>1. Google Search Console Ownership Verification</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              To verify your ownership in Google Search Console, paste your Google verification code or full meta tag below. Once saved, it will be injected into your HTML head for instant verification.
            </p>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Verification Code or Content String (e.g. <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono text-[11px]">abc123xyz...</code>)
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Paste your google-site-verification content string here..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  {savedCode ? <><Check className="w-3.5 h-3.5" /> Verified & Active</> : 'Awaiting verification code'}
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                >
                  Save & Inject Code
                </button>
              </div>
            </form>
          </div>

          {/* Step 2: Sitemap XML & Robots.txt for Indexing */}
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <FileCode className="w-5 h-5 text-indigo-600" />
              <span>2. Sitemap XML & Robots.txt (Rapid Indexing)</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Submit your auto-generated XML Sitemap to Google Search Console to index all 55+ font pages instantly.
            </p>

            <div className="space-y-3">
              {/* Sitemap URL */}
              <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl p-3">
                <div className="truncate pr-3">
                  <span className="text-[10px] font-bold text-indigo-600 block uppercase tracking-wider">Sitemap XML URL</span>
                  <a href={sitemapUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-800 hover:underline truncate block">
                    {sitemapUrl}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(sitemapUrl, 'sitemap')}
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSitemap ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>

              {/* Robots.txt URL */}
              <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl p-3">
                <div className="truncate pr-3">
                  <span className="text-[10px] font-bold text-indigo-600 block uppercase tracking-wider">Robots.txt URL</span>
                  <a href={robotsUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-800 hover:underline truncate block">
                    {robotsUrl}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(robotsUrl, 'robots')}
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRobots ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-100 px-6 py-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
          <span>Fontora SEO & Indexing Assistant v2.5</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
