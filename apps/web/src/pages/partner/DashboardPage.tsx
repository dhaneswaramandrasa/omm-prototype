import { useNavigate } from 'react-router-dom';
import { SLATimer } from '@/components/SLATimer';
import { StatusBadge } from '@/components/StatusBadge';
import { formatRupiah, formatRupiahShort } from '@omm/shared';
import { MOCK_PARTNER_STATS, MOCK_PARTNER_APPLICATIONS } from '@/lib/mockData';

const TIER_COLORS: Record<string, string> = {
  excellent: 'text-gold font-bold',
  good:      'text-success font-bold',
  fair:      'text-warning font-semibold',
  poor:      'text-error font-semibold',
};

const TIER_LABELS: Record<string, string> = {
  excellent: 'Excellent',
  good:      'Good',
  fair:      'Fair',
  poor:      'Poor',
};

export default function PartnerDashboardPage() {
  const navigate = useNavigate();
  const s = MOCK_PARTNER_STATS;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-primary-blue text-white p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Partner Dashboard</h1>
            <p className="text-blue-200 mt-1">{s.partnerName} — Lending Portal</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-right">
            <p className="text-xs text-blue-300">Partner ID</p>
            <p className="font-mono font-bold">{s.partnerId}</p>
          </div>
        </div>

        {/* 4 stat cards in header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {[
            { label: 'Total Aplikasi',   value: s.totalApplications.toLocaleString('id-ID'), delta: `+${s.totalDelta}%` },
            { label: 'Pending Review',   value: s.pendingReview.toString(),                   delta: `+${s.pendingDelta}%`, warn: true },
            { label: 'Approved Rate',    value: `${s.approvedRate}%`,                         delta: `+${s.approvedDelta}%` },
            { label: 'Total Disbursed',  value: formatRupiahShort(s.totalDisbursed),          delta: `+${s.disbursedDelta}%` },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4">
              <p className="text-xs text-blue-300 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.warn ? 'text-warning' : 'text-white'}`}>{stat.value}</p>
              <p className="text-xs text-green-400 mt-0.5">{stat.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Credit responsibility disclaimer */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-yellow-800">Tanggung Jawab Keputusan Kredit</p>
          <p className="text-xs text-yellow-700 mt-0.5">
            Mitra bertanggung jawab penuh atas setiap keputusan kredit. Olsera hanya menyediakan data agregat merchant untuk membantu analisa.
          </p>
        </div>
      </div>

      {/* Pending applications table */}
      <div className="bg-card rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-text-primary">Aplikasi Pending</h2>
          <button className="text-xs border border-gray-300 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-gray-50 transition-colors">
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['APPLICATION ID', 'MERCHANT', 'MITRA SCORE', 'AMOUNT', 'TENOR', 'SLA', 'STATUS', 'ACTION'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PARTNER_APPLICATIONS.map((app) => (
                <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{app.applicationId}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{app.merchantName}</p>
                    <p className="text-xs text-text-secondary">{app.merchantId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-base ${TIER_COLORS[app.mitraTier]}`}>{app.mitraScore}</span>
                    <span className={`ml-1 text-xs ${TIER_COLORS[app.mitraTier]}`}>{TIER_LABELS[app.mitraTier]}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatRupiah(app.amount)}</td>
                  <td className="px-4 py-3 text-text-secondary">{app.tenorMonths} bln</td>
                  <td className="px-4 py-3">
                    <SLATimer remainingSeconds={app.slaRemainingSeconds} />
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/partner/applications/${app.applicationId}`)}
                      className="text-xs text-accent-blue hover:underline font-medium whitespace-nowrap"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
