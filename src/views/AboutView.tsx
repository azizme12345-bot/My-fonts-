import { ShieldCheck, Sparkles, FileText, Lock, Copyright } from 'lucide-react';

export function AboutView() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 border-b border-neutral-200 pb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>About Fontora</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Empowering Multilingual Typography
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Fontora is the ultimate professional platform for discovering, previewing, and downloading high-quality fonts for Urdu, Arabic, Hindi, English, and Roman Urdu creators.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-neutral-700 leading-relaxed">
        {/* Mission */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-neutral-900">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              🎯
            </div>
            <h2 className="text-xl font-bold">Our Mission</h2>
          </div>
          <p>
            Typography bridges culture, expression, and digital design. While Latin typography has enjoyed countless discovery tools, South Asian and Middle Eastern scripts like Nastaleeq, Arabic Calligraphy, and Devanagari often lacked a unified, lightning-fast discovery platform. Fontora solves this with gorgeous previews and instant downloads.
          </p>
        </div>

        {/* Licensing */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-neutral-900">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">SIL Open Font License (OFL)</h2>
          </div>
          <p>
            All fonts cataloged on Fontora are distributed under the terms of the SIL Open Font License 1.1 or equivalent open-source licenses. You are free to use these typefaces in commercial projects, print media, websites, video editing, and software applications without royalties.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-neutral-900">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">Privacy Policy & Local Storage</h2>
          </div>
          <p>
            Fontora values your privacy. We do not track personal user accounts. Favorites and preferences are stored locally in your browser's <code className="bg-neutral-100 px-2 py-0.5 rounded text-xs">localStorage</code>. No registration is required to download or preview fonts.
          </p>
        </div>

        {/* Terms & DMCA */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-neutral-900">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Copyright className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">DMCA & Copyright Compliance</h2>
          </div>
          <p>
            We strictly respect intellectual property rights. If you are a font designer or copyright holder and believe any asset requires attribution updates or removal, please contact our legal desk at <span className="font-semibold text-indigo-600">support@fontora-fonts.com</span> for immediate resolution.
          </p>
        </div>
      </div>
    </div>
  );
}
