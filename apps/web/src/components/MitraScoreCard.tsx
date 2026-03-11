import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { MitraTier } from '@omm/shared';

interface MitraScoreCardProps {
  score: number;
  tier: MitraTier;
  tierLabel: string;
  explanation?: string;
  loading?: boolean;
  className?: string;
}

const TIER_CONFIG: Record<MitraTier, { label: string; badgeClass: string }> = {
  excellent: { label: 'Excellent', badgeClass: 'bg-success/10 text-success border-success/30' },
  good: { label: 'Good', badgeClass: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30' },
  fair: { label: 'Fair', badgeClass: 'bg-warning/10 text-warning border-warning/30' },
  poor: { label: 'Poor', badgeClass: 'bg-error/10 text-error border-error/30' },
};

export function MitraScoreCard({
  score,
  tier,
  tierLabel,
  explanation,
  loading,
  className,
}: MitraScoreCardProps) {
  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardContent className="p-6">
          <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
          <div className="mb-2 h-12 w-20 rounded bg-gray-200" />
          <div className="h-6 w-16 rounded bg-gray-200" />
        </CardContent>
      </Card>
    );
  }

  const tierConfig = TIER_CONFIG[tier];

  return (
    <Card className={cn('bg-card', className)}>
      <CardContent className="p-6">
        <p className="mb-2 text-sm font-medium text-text-secondary">Mitra Score</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-gold">{score}</span>
          <div className="mb-1 flex flex-col gap-1">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                tierConfig.badgeClass
              )}
            >
              {tierLabel || tierConfig.label}
            </span>
          </div>
        </div>
        {explanation && (
          <p className="mt-3 text-sm text-text-secondary">{explanation}</p>
        )}
      </CardContent>
    </Card>
  );
}
