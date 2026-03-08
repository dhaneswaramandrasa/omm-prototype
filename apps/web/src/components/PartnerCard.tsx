import { cn } from '@/lib/utils';
import { formatRupiah, formatPercent } from '@omm/shared';
import type { Partner } from '@omm/shared';

interface PartnerCardProps {
  partner: Partner;
  selected?: boolean;
  onSelect?: (partnerId: string) => void;
  className?: string;
}

const PARTNER_TYPE_LABELS: Record<string, string> = {
  bank: 'Bank',
  fintech: 'Fintech',
  multifinance: 'Multifinance',
};

const RATE_TYPE_LABELS: Record<string, string> = {
  effective: 'Efektif',
  flat: 'Flat',
};

export function PartnerCard({ partner, selected, onSelect, className }: PartnerCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(partner.partnerId)}
      className={cn(
        'w-full rounded-lg border bg-card p-4 text-left transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue',
        selected
          ? 'border-accent-blue ring-2 ring-accent-blue/20'
          : 'border-gray-200 hover:border-accent-blue/50',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-text-primary">{partner.partnerName}</span>
            <span className="rounded-full border bg-gray-50 px-2 py-0.5 text-xs text-text-secondary">
              {PARTNER_TYPE_LABELS[partner.partnerType] ?? partner.partnerType}
            </span>
          </div>

          {/* Rate */}
          <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-accent-blue text-lg">
              {formatPercent(partner.interestRate)}
            </span>
            <span className="text-text-secondary">
              {RATE_TYPE_LABELS[partner.rateType] ?? partner.rateType}
            </span>
            <span className="text-text-secondary">
              {partner.minTenor}–{partner.maxTenor} bulan
            </span>
          </div>

          {/* Installment estimate */}
          <p className="mb-2 text-sm text-text-secondary">
            Cicilan est.{' '}
            <span className="font-medium text-text-primary">
              {formatRupiah(partner.estimatedMonthlyInstallment)}/bln
            </span>
          </p>

          {/* Tags */}
          {partner.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {partner.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-blue/10 px-2 py-0.5 text-xs text-primary-blue"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg
          className={cn(
            'mt-1 h-5 w-5 flex-shrink-0 transition-colors',
            selected ? 'text-accent-blue' : 'text-gray-300'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
