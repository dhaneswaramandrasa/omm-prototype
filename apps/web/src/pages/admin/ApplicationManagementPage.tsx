import { useState } from 'react';
import { formatRupiahShort } from '@omm/shared';
import { MOCK_ALL_APPLICATIONS } from '@/lib/mockData';
import { SLATimer } from '@/components/SLATimer';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'bg-warning/10 text-warning border border-warning/30' },
  reviewing:  { label: 'Reviewing', className: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30' },
  approved:   { label: 'Approved',  className: 'bg-success/10 text-success border border-success/30' },
  rejected:   { label: 'Rejected',  className: 'bg-error/10 text-error border border-error/30' },
  sla_breach: { label: 'SLA Breach',className: 'bg-error/20 text-error border border-error/50' },
};

const SUMMARY_CARDS = [
  { label: 'Total Pengajuan', value: 2847, icon: '📋', color: 'text-primary-blue' },
  { label: 'Pending Review',  value: 312,  icon: '⏳', color: 'text-warning' },
  { label: 'Disetujui Hari Ini', value: 148, icon: '✅', color: 'text-success' },
  { label: 'SLA Breach',      value: 3,    icon: '🚨', color: 'text-error' },
];

export default function AdminApplicationManagementPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = MOCK_ALL_APPLICATIONS.filter((a) => {
    const matchSearch =
      search === '' ||
      a.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      a.applicationId.toLowerCase().includes(search.toLowerCase()) ||
      a.partner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Semua Pengajuan</h1>
        <p className="text-sm text-text-secondary mt-1">Kelola dan monitor semua aplikasi kredit di platform</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.label} className="bg-card rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-text-secondary">{card.label}</p>
            </div>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>

      {/* Filter & Search bar */}
      <div className="bg-card rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">🔍</span>
            <input
              type="text"
              placeholder="Cari ID aplikasi, merchant, atau partner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue/30 bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="sla_breach">SLA Breach</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">ID Aplikasi</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Merchant</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Partner</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Jumlah</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">SLA Timer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => {
                const statusCfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG['pending']!;
                const isBreach = app.status === 'sla_breach';
                return (
                  <tr
                    key={app.applicationId}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isBreach ? 'bg-red-50/50' : ''}`}
                  >
                    <td className="py-3 px-2">
                      <span className="font-mono text-xs text-text-secondary">{app.applicationId}</span>
                    </td>
                    <td className="py-3 px-2">
                      <p className="font-medium text-text-primary">{app.merchantName}</p>
                      <p className="text-xs text-text-secondary">{app.merchantId}</p>
                    </td>
                    <td className="py-3 px-2 text-text-secondary">{app.partner}</td>
                    <td className="py-3 px-2 text-right font-semibold text-text-primary">
                      {formatRupiahShort(app.amount)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusCfg.className}`}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      {app.slaRemainingSeconds > 0 ? (
                        <SLATimer remainingSeconds={app.slaRemainingSeconds} />
                      ) : isBreach ? (
                        <span className="text-xs font-semibold text-error">SLA Dilanggar</span>
                      ) : (
                        <span className="text-xs text-text-secondary">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-secondary text-sm">
                    Tidak ada hasil untuk filter saat ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination stub */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Menampilkan {filtered.length} dari 2.847 pengajuan
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, '...', 48].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  page === 1
                    ? 'bg-primary-blue text-white'
                    : 'border border-gray-200 text-text-secondary hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
