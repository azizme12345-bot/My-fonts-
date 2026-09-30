interface AdPlaceholderProps {
  className?: string;
  size?: 'banner' | 'box';
}

export function AdPlaceholder({ className = '', size = 'banner' }: AdPlaceholderProps) {
  return (
    <div 
      className={`bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-neutral-400 my-8 ${
        size === 'banner' ? 'h-24 sm:h-28' : 'h-64'
      } ${className}`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
        <span className="w-2 h-2 rounded-full bg-neutral-300"></span>
        Sponsored Advertisement
      </div>
      <p className="text-xs text-neutral-500">
        Future AdSense / Sponsor Slot (Clean & Non-Intrusive)
      </p>
    </div>
  );
}
