import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type DeltaType = 'increase' | 'decrease' | 'neutral';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: number;
  deltaType?: DeltaType;
  loading?: boolean;
  className?: string;
}

function DeltaArrow({ type }: { type: DeltaType }) {
  if (type === 'increase') {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (type === 'decrease') {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return null;
}

export function StatCard({ title, value, delta, deltaType = 'neutral', loading, className }: StatCardProps) {
  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardContent className="p-6">
          <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-32 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-16 rounded bg-gray-200" />
        </CardContent>
      </Card>
    );
  }

  const deltaColor =
    deltaType === 'increase'
      ? 'text-success'
      : deltaType === 'decrease'
        ? 'text-error'
        : 'text-text-secondary';

  return (
    <Card className={cn('bg-card', className)}>
      <CardContent className="p-6">
        <p className="mb-1 text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        {delta !== undefined && (
          <div className={cn('mt-2 flex items-center gap-1 text-sm font-medium', deltaColor)}>
            <DeltaArrow type={deltaType} />
            <span>{Math.abs(delta)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
