import { useEffect, useState } from 'react';
import { formatTimer } from '@omm/shared';
import { cn } from '@/lib/utils';

const SLA_WARNING_THRESHOLD = 1800; // 30 minutes

interface SLATimerProps {
  remainingSeconds: number;
  className?: string;
}

export function SLATimer({ remainingSeconds, className }: SLATimerProps) {
  const [seconds, setSeconds] = useState(remainingSeconds);

  useEffect(() => {
    setSeconds(remainingSeconds);
  }, [remainingSeconds]);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const isUrgent = seconds < SLA_WARNING_THRESHOLD;
  const isExpired = seconds <= 0;

  return (
    <span
      className={cn(
        'font-mono text-sm font-semibold tabular-nums',
        isExpired ? 'text-error' : isUrgent ? 'text-error' : 'text-text-primary',
        className
      )}
    >
      {isExpired ? '0:00:00' : formatTimer(seconds)}
    </span>
  );
}
