import { cn } from '@/lib/utils';
import type { ApplicationStatus } from '@omm/shared';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; className: string }> = {
  pending: {
    label: 'Menunggu',
    className: 'bg-warning/10 text-warning border-warning/30',
  },
  reviewing: {
    label: 'Ditinjau',
    className: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  },
  approved: {
    label: 'Disetujui',
    className: 'bg-success/10 text-success border-success/30',
  },
  rejected: {
    label: 'Ditolak',
    className: 'bg-gray-100 text-gray-500 border-gray-200',
  },
  sla_breach: {
    label: 'SLA Breach',
    className: 'bg-error/10 text-error border-error/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
