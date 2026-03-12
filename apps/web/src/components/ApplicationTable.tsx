import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import { SLATimer } from './SLATimer';
import { formatRupiah, formatDate } from '@omm/shared';
import type { ApplicationStatus } from '@omm/shared';

// ─── Column definition ────────────────────────────────────────────────────────

export type ColumnKey =
  | 'applicationId'
  | 'partnerName'
  | 'merchantName'
  | 'amount'
  | 'tenorMonths'
  | 'status'
  | 'submittedAt'
  | 'slaTimer'
  | 'mitraScore';

export interface ApplicationRow {
  applicationId: string;
  partnerName?: string;
  merchantName?: string;
  amount: number;
  tenorMonths: number;
  status: ApplicationStatus;
  submittedAt: string;
  slaRemainingSeconds?: number;
  mitraScore?: number;
}

interface ColumnDef {
  key: ColumnKey;
  label: string;
  className?: string;
}

const COLUMN_DEFS: Record<ColumnKey, ColumnDef> = {
  applicationId: { key: 'applicationId', label: 'ID Aplikasi', className: 'font-mono text-xs' },
  partnerName:   { key: 'partnerName',   label: 'Mitra' },
  merchantName:  { key: 'merchantName',  label: 'Merchant' },
  amount:        { key: 'amount',        label: 'Jumlah Pinjaman' },
  tenorMonths:   { key: 'tenorMonths',   label: 'Tenor' },
  status:        { key: 'status',        label: 'Status' },
  submittedAt:   { key: 'submittedAt',   label: 'Tanggal Ajuan' },
  slaTimer:      { key: 'slaTimer',      label: 'SLA Tersisa' },
  mitraScore:    { key: 'mitraScore',    label: 'Mitra Score' },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ApplicationTableProps {
  rows: ApplicationRow[];
  columns: ColumnKey[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: ApplicationRow) => void;
  className?: string;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 rounded bg-gray-200 animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

function CellValue({ col, row }: { col: ColumnKey; row: ApplicationRow }) {
  switch (col) {
    case 'applicationId':
      return <span className="font-mono text-xs text-text-secondary">{row.applicationId}</span>;
    case 'partnerName':
      return <span>{row.partnerName ?? '—'}</span>;
    case 'merchantName':
      return <span>{row.merchantName ?? '—'}</span>;
    case 'amount':
      return <span className="font-medium">{formatRupiah(row.amount)}</span>;
    case 'tenorMonths':
      return <span>{row.tenorMonths} bln</span>;
    case 'status':
      return <StatusBadge status={row.status} />;
    case 'submittedAt':
      return <span className="text-text-secondary text-sm">{formatDate(row.submittedAt)}</span>;
    case 'slaTimer':
      return row.slaRemainingSeconds !== undefined ? (
        <SLATimer remainingSeconds={row.slaRemainingSeconds} />
      ) : (
        <span className="text-text-secondary">—</span>
      );
    case 'mitraScore':
      return row.mitraScore !== undefined ? (
        <span className="font-semibold text-gold">{row.mitraScore}</span>
      ) : (
        <span className="text-text-secondary">—</span>
      );
    default:
      return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ApplicationTable({
  rows,
  columns,
  loading = false,
  emptyMessage = 'Tidak ada data aplikasi.',
  onRowClick,
  className,
}: ApplicationTableProps) {
  const colDefs = columns.map((k) => COLUMN_DEFS[k]);

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-gray-200 bg-card', className)}>
      <table className="w-full text-sm text-left">
        {/* Header */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {colDefs.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-text-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.applicationId}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-gray-50'
                )}
              >
                {colDefs.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 whitespace-nowrap', col.className)}>
                    <CellValue col={col.key} row={row} />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
