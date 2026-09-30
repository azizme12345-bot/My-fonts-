import { useState } from 'react';
import { Font } from '../data/fonts';
import { Type, Sliders, RotateCcw, Copy, Check, AlignLeft, AlignCenter, AlignRight, Bold } from 'lucide-react';

interface LivePreviewToolProps {
  fonts: Font[];
  selectedFontId?: string;
  onSelectFont: (font: Font) => void;
}

export function LivePreviewTool({ fonts, selectedFontId, onSelectFont }: LivePreviewToolProps) {
  const [activeFontId, setActiveFontId] = useState<string>(
    selectedFontId || fonts[0]?.id || 'jameel-noori-nastaleeq'
  );
  const currentFont = fonts.find((f) => f.id === activeFontId) || fonts[0];

  const defaultSampleText =
    currentFont.language === 'Urdu'
      ? 'اپنا متن یہاں لکھیں اور اردو خوش خطی کا جادو دیکھیں'
      : currentFont.language === 'Arabic'
      ? 'اكتب النص الخاص بك هنا واستمتع بجمال الخط العربي'
      : currentFont.language === 'Hindi'
      ? 'यहाँ अपना पाठ लिखें और सुंदर देवनागरी फॉन्ट का आनंद लें'
      : currentFont.language === 'Roman Urdu'
      ? 'Yahan apna text likhein aur Fontora ka kamaal dekhein!'
      : 'Type your custom typography preview here and experience perfection.';

  const [customText, setCustomText] = useState(defaultSampleText);
  const [fontSize, setFontSize] = useState(36);
  const [isBold, setIsBold] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [copied, setCopied] = useState(false);

  const handleFontChange = (fontId: string) => {
    setActiveFontId(fontId);
    const newF = fonts.find((f) => f.id === fontId);
    if (newF) {
      setCustomText(newF.previewText);
    }
  };

  const handleReset = () => {
    setCustomText(currentFont.previewText);
    setFontSize(36);
    setIsBold(false);
    setLetterSpacing(0);
    setLineHeight(1.6);
    setTextAlign('center');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRTL = currentFont.language === 'Urdu' || currentFont.language === 'Arabic';

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden my-8">
      {/* Tool Header */}
      <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Type className="w-4 h-4" />
            Interactive Playground
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Live Font Preview Studio</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Test any custom text across Urdu, Arabic, Hindi, English, and Roman Urdu fonts instantly.
          </p>
        </div>

        {/* Font Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-neutral-400 font-medium hidden sm:inline">Selected Font:</label>
          <select
            value={activeFontId}
            onChange={(e) => handleFontChange(e.target.value)}
            className="bg-neutral-800 text-white border border-neutral-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {fonts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.language})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-neutral-50 border-b border-neutral-200 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Font Size */}
        <div className="space-y-1.5 col-span-1 sm:col-span-1">
          <div className="flex justify-between text-xs text-neutral-600 font-semibold">
            <span>Size</span>
            <span>{fontSize}px</span>
          </div>
          <input
            type="range"
            min="20"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Letter Spacing */}
        <div className="space-y-1.5 col-span-1 sm:col-span-1">
          <div className="flex justify-between text-xs text-neutral-600 font-semibold">
            <span>Tracking</span>
            <span>{letterSpacing}px</span>
          </div>
          <input
            type="range"
            min="-2"
            max="12"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Line Height */}
        <div className="space-y-1.5 col-span-1 sm:col-span-1">
          <div className="flex justify-between text-xs text-neutral-600 font-semibold">
            <span>Line Height</span>
            <span>{lineHeight}</span>
          </div>
          <input
            type="range"
            min="1.1"
            max="2.5"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Text Alignment */}
        <div className="space-y-1.5 col-span-1 sm:col-span-1">
          <span className="text-xs text-neutral-600 font-semibold block">Alignment</span>
          <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setTextAlign('left')}
              className={`flex-1 p-1.5 rounded-lg flex items-center justify-center transition-colors ${
                textAlign === 'left' ? 'bg-indigo-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTextAlign('center')}
              className={`flex-1 p-1.5 rounded-lg flex items-center justify-center transition-colors ${
                textAlign === 'center' ? 'bg-indigo-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTextAlign('right')}
              className={`flex-1 p-1.5 rounded-lg flex items-center justify-center transition-colors ${
                textAlign === 'right' ? 'bg-indigo-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bold Toggle */}
        <div className="space-y-1.5 col-span-1 sm:col-span-1">
          <span className="text-xs text-neutral-600 font-semibold block">Style</span>
          <button
            onClick={() => setIsBold(!isBold)}
            className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold transition-all ${
              isBold
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
            <span>{isBold ? 'Bold Active' : 'Regular'}</span>
          </button>
        </div>

        {/* Actions: Copy & Reset */}
        <div className="space-y-1.5 col-span-2 sm:col-span-1 flex items-end gap-2">
          <button
            onClick={handleCopyText}
            className="flex-1 py-2 px-3 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            title="Copy preview text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white hover:bg-neutral-100 text-neutral-500 border border-neutral-200 rounded-xl transition-colors shadow-2xs"
            title="Reset controls"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-b border-neutral-200">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
          Type Your Custom Text Here:
        </label>
        <textarea
          rows={2}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type or paste any text here to preview..."
          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg resize-none shadow-inner"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      {/* Live Preview Display Box */}
      <div className="p-8 sm:p-12 bg-white min-h-[220px] flex items-center justify-center overflow-x-auto relative">
        <div
          className={`w-full text-neutral-900 transition-all ${
            textAlign === 'left'
              ? 'text-left'
              : textAlign === 'right'
              ? 'text-right'
              : 'text-center'
          }`}
          style={{
            fontFamily: currentFont.cssFontFamily,
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? 700 : 400,
            letterSpacing: `${letterSpacing}px`,
            lineHeight: lineHeight,
          }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {customText || 'Start typing above to preview...'}
        </div>

        <div className="absolute bottom-3 right-4 flex items-center gap-2 text-xs text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 font-mono">
          <span>{currentFont.name}</span>
          <span>•</span>
          <span>{currentFont.language}</span>
        </div>
      </div>
    </div>
  );
}
