import { formatDate } from '@omm/shared';
import { cn } from '@/lib/utils';

export interface AuditEvent {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
}

interface AuditTrailProps {
  events: AuditEvent[];
  className?: string;
}

export function AuditTrail({ events, className }: AuditTrailProps) {
  if (events.length === 0) {
    return (
      <div className={cn('py-8 text-center text-sm text-text-secondary', className)}>
        Belum ada aktivitas
      </div>
    );
  }

  return (
    <ol className={cn('relative border-l border-gray-200', className)}>
      {events.map((event, index) => (
        <li key={event.id} className={cn('ml-4', index < events.length - 1 && 'mb-6')}>
          {/* Dot */}
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary-blue" />
          {/* Content */}
          <p className="text-sm font-semibold text-text-primary">{event.action}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <span>{event.actor}</span>
            <span>·</span>
            <time dateTime={event.timestamp}>{formatDate(event.timestamp)}</time>
          </div>
        </li>
      ))}
    </ol>
  );
}
