import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percent: number;
  label?: string;
  valueDisplay?: string;
  className?: string;
}

export function ProgressBar({ percent, label, valueDisplay, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={cn('w-full', className)}>
      {(label || valueDisplay) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && <span className="text-text-secondary">{label}</span>}
          {valueDisplay && <span className="font-medium text-text-primary">{valueDisplay}</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-accent-blue transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
