import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

interface TopNavProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function TopNav({ onMenuToggle, className }: TopNavProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleSignOut = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

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

      <div className="ml-auto flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-white leading-tight">{user.name}</span>
            <span className="text-xs text-white/60 capitalize">{user.role}</span>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Sign out"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
