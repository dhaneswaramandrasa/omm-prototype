import { cn } from '@/lib/utils';

interface TopNavProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function TopNav({ onMenuToggle, className }: TopNavProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center border-b bg-primary-blue px-4 shadow-sm',
        className
      )}
    >
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="mr-4 rounded-md p-2 text-white/80 hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-white">Olsera Mitra Modal</span>
        <span className="text-xs font-medium text-white/70">× Trustera</span>
      </div>
    </header>
  );
}
