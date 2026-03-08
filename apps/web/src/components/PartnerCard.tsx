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
  const isExternal = Boolean(partner.externalUrl);
  const isComingSoon = Boolean(partner.comingSoon);

  // ── External partner: open URL in new tab ──────────────────────────────────
  if (isExternal && partner.externalUrl) {
    return (
      <div className={cn('w-full rounded-2xl border-2 border-accent-blue/40 bg-card p-4 relative overflow-hidden', className)}>
        {/* Live badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-success/10 border border-success/30 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold text-success uppercase tracking-wide">Live</span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2 pr-16">
          <span className="font-bold text-text-primary text-base">{partner.partnerName}</span>
          <span className="rounded-full border bg-gray-50 px-2 py-0.5 text-xs text-text-secondary">
            {PARTNER_TYPE_LABELS[partner.partnerType] ?? partner.partnerType}
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-accent-blue text-lg">{formatPercent(partner.interestRate)}/bln</span>
          <span className="text-text-secondary">{RATE_TYPE_LABELS[partner.rateType] ?? partner.rateType}</span>
          <span className="text-text-secondary">{partner.minTenor}–{partner.maxTenor} bulan</span>
        </div>

        {(partner.minAmount != null || partner.maxAmount != null) && (
          <p className="mb-2 text-xs text-text-secondary">
            Limit:{' '}
            <span className="font-medium text-text-primary">
              {partner.minAmount != null ? formatRupiah(partner.minAmount) : '—'}
              {' – '}
              {partner.maxAmount != null ? formatRupiah(partner.maxAmount) : '—'}
            </span>
          </p>
        )}

        <p className="mb-3 text-sm text-text-secondary">
          Cicilan est.{' '}
          <span className="font-medium text-text-primary">
            {formatRupiah(partner.estimatedMonthlyInstallment)}/bln
          </span>
        </p>

        {partner.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {partner.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs text-accent-blue font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={partner.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-accent-blue text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-accent-blue/90 transition-colors"
        >
          Daftar Langsung
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <p className="text-[10px] text-text-secondary/60 text-center mt-1.5">
          Anda akan diarahkan ke halaman mitra
        </p>
      </div>
    );
  }

  // ── Coming soon partner ────────────────────────────────────────────────────
  if (isComingSoon) {
    return (
      <div className={cn('w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-4 relative', className)}>
        <div className="absolute top-3 right-3 bg-warning/10 border border-warning/30 rounded-full px-2 py-0.5">
          <span className="text-[10px] font-bold text-warning uppercase tracking-wide">Segera Hadir</span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2 pr-24">
          <span className="font-bold text-text-primary text-base">{partner.partnerName}</span>
          <span className="rounded-full border bg-gray-100 px-2 py-0.5 text-xs text-text-secondary">
            {PARTNER_TYPE_LABELS[partner.partnerType] ?? partner.partnerType}
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-accent-blue text-lg">{formatPercent(partner.interestRate)}/bln</span>
          <span className="text-text-secondary">{RATE_TYPE_LABELS[partner.rateType] ?? partner.rateType}</span>
          <span className="text-text-secondary">{partner.minTenor}–{partner.maxTenor} bulan</span>
        </div>

        {(partner.minAmount != null || partner.maxAmount != null) && (
          <p className="mb-2 text-xs text-text-secondary">
            Limit:{' '}
            <span className="font-medium text-text-primary">
              {partner.minAmount != null ? formatRupiah(partner.minAmount) : '—'}
              {' – '}
              {partner.maxAmount != null ? formatRupiah(partner.maxAmount) : '—'}
            </span>
          </p>
        )}

        <p className="mb-3 text-sm text-text-secondary">
          Cicilan est.{' '}
          <span className="font-medium text-text-primary">
            {formatRupiah(partner.estimatedMonthlyInstallment)}/bln
          </span>
        </p>

        {partner.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {partner.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-400 rounded-xl py-2.5 px-4 text-sm font-semibold cursor-not-allowed">
          URL Belum Tersedia — Segera Hadir
        </div>
      </div>
    );
  }

  // ── Normal (Olsera flow) partner ───────────────────────────────────────────
  return (
    <button
      type="button"
      onClick={() => onSelect?.(partner.partnerId)}
      className={cn(
        'w-full rounded-2xl border bg-card p-4 text-left transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue',
        selected
          ? 'border-accent-blue ring-2 ring-accent-blue/20'
          : 'border-gray-200 hover:border-accent-blue/50',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-text-primary">{partner.partnerName}</span>
            <span className="rounded-full border bg-gray-50 px-2 py-0.5 text-xs text-text-secondary">
              {PARTNER_TYPE_LABELS[partner.partnerType] ?? partner.partnerType}
            </span>
          </div>

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

          <p className="mb-2 text-sm text-text-secondary">
            Cicilan est.{' '}
            <span className="font-medium text-text-primary">
              {formatRupiah(partner.estimatedMonthlyInstallment)}/bln
            </span>
          </p>

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
