import { formatRupiahShort } from '@omm/shared';
import {
  MOCK_EXEC_STATS,
  MOCK_ECOSYSTEM_FLOW,
  MOCK_PARTNER_YIELD,
  MOCK_MERCHANT_GROWTH,
  MOCK_STRATEGIC_METRICS,
} from '@/lib/mockData';

const KPI_CARDS = [
  {
    label: 'Total Pengajuan YTD',
    value: MOCK_EXEC_STATS.totalApplications.toLocaleString('id-ID'),
    delta: `+${MOCK_EXEC_STATS.appsDelta}%`,
    icon: '📋',
    sub: 'vs. periode lalu',
  },
  {
    label: 'Approval Rate',
    value: `${MOCK_EXEC_STATS.approvalRate}%`,
    delta: `+${MOCK_EXEC_STATS.approvalDelta}%`,
    icon: '✅',
    sub: 'rata-rata platform',
  },
  {
    label: 'Total Volume',
    value: formatRupiahShort(MOCK_EXEC_STATS.totalVolume),
    delta: `+${MOCK_EXEC_STATS.volumeDelta}%`,
    icon: '💰',
    sub: 'disalurkan YTD',
  },
  {
    label: 'Conversion Rate',
    value: `${MOCK_EXEC_STATS.conversionRate}%`,
    delta: `+${MOCK_EXEC_STATS.conversionDelta}%`,
    icon: '🎯',
    sub: 'aplikasi → kontrak',
  },
];

const maxGrowth = Math.max(...MOCK_MERCHANT_GROWTH.map((m) => m.count));

export default function ExecutiveDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-primary-blue text-white p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">Executive Dashboard</p>
            <h1 className="text-3xl font-bold">Olsera Mitra Modal</h1>
            <p className="text-blue-200 text-sm mt-1">Platform Performance Overview — Q1 2026</p>
          </div>
          <div className="text-right">
            <p className="text-blue-300 text-xs">Last updated</p>
            <p className="text-white text-sm font-semibold">9 Maret 2026, 14:32</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.label} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{kpi.icon}</span>
                <p className="text-xs text-blue-300">{kpi.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-green-400 mt-0.5">{kpi.delta} {kpi.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem Flow */}
      <div className="bg-card rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-text-primary mb-1">Platform Ecosystem Flow</h2>
        <p className="text-xs text-text-secondary mb-6">Olsera sebagai orchestrator — menghubungkan merchant dengan lembaga keuangan</p>

        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {/* Merchants */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary-blue/10 border-2 border-primary-blue/20 flex flex-col items-center justify-center mb-3 mx-auto">
              <span className="text-2xl">🏪</span>
            </div>
            <p className="text-2xl font-bold text-primary-blue">{MOCK_ECOSYSTEM_FLOW.merchants.toLocaleString('id-ID')}</p>
            <p className="text-xs text-text-secondary mt-0.5">Micro-Merchants</p>
            <p className="text-xs text-text-secondary">Olsera POS</p>
          </div>

          {/* Arrow + Olsera */}
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="flex items-center w-full mb-2">
              <div className="flex-1 h-0.5 bg-primary-blue/30" />
              <div className="w-2 h-2 rounded-full bg-primary-blue/40 mx-1" />
              <div className="flex-1 h-0.5 bg-primary-blue/30" />
            </div>
            <div className="bg-primary-blue text-white rounded-2xl px-5 py-3 text-center shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Olsera</p>
              <p className="text-lg font-bold mt-0.5">Mitra Modal</p>
              <div className="mt-2 pt-2 border-t border-white/20">
                <p className="text-xs text-blue-200">Avg Mitra Score</p>
                <p className="text-xl font-bold text-gold">{MOCK_ECOSYSTEM_FLOW.mitraScore}</p>
              </div>
            </div>
            <div className="flex items-center w-full mt-2">
              <div className="flex-1 h-0.5 bg-accent-blue/30" />
              <div className="w-2 h-2 rounded-full bg-accent-blue/40 mx-1" />
              <div className="flex-1 h-0.5 bg-accent-blue/30" />
            </div>
          </div>

          {/* Capital Sources */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-success/10 border-2 border-success/20 flex flex-col items-center justify-center mb-3 mx-auto">
              <span className="text-2xl">🏦</span>
            </div>
            <p className="text-2xl font-bold text-success">{MOCK_ECOSYSTEM_FLOW.capitalSources}</p>
            <p className="text-xs text-text-secondary mt-0.5">Capital Sources</p>
            <p className="text-xs text-text-secondary">Bank + Fintech</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-text-secondary">Model</p>
            <p className="text-sm font-semibold text-text-primary">Aggregator + Trustera</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-xs text-text-secondary">Credit Decision</p>
            <p className="text-sm font-semibold text-text-primary">100% oleh Partner</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-xs text-text-secondary">Data Protection</p>
            <p className="text-sm font-semibold text-text-primary">UU PDP Compliant</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Partner Yield Table */}
        <div className="bg-card rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-text-primary mb-1">Partner Performance</h2>
          <p className="text-xs text-text-secondary mb-4">Volume dan approval rate per lembaga keuangan</p>

          <div className="space-y-3">
            {MOCK_PARTNER_YIELD.map((p, i) => {
              const maxVol = MOCK_PARTNER_YIELD.reduce((max, x) => Math.max(max, x.volume), 0);
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-blue/10 text-primary-blue text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-text-primary">{p.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-text-primary">{formatRupiahShort(p.volume)}</span>
                      <span className="text-xs text-text-secondary ml-2">·</span>
                      <span className="text-xs text-success font-medium ml-1">{p.approvalRate}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-blue rounded-full"
                      style={{ width: `${(p.volume / maxVol) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{p.apps.toLocaleString('id-ID')} aplikasi</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merchant Growth Chart */}
        <div className="bg-card rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-text-primary mb-1">Merchant Growth</h2>
          <p className="text-xs text-text-secondary mb-4">Aplikasi masuk per bulan (okt 2025 – mar 2026)</p>

          <div className="flex items-end gap-2 h-40">
            {MOCK_MERCHANT_GROWTH.map((m) => {
              const heightPct = (m.count / maxGrowth) * 100;
              const isLatest = m.month === 'Mar';
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-text-primary">{m.count >= 1000 ? `${(m.count / 1000).toFixed(1)}k` : m.count}</span>
                  <div className="w-full rounded-t-md relative" style={{ height: `${heightPct * 0.7}%` }}>
                    <div
                      className={`absolute inset-0 rounded-t-md ${isLatest ? 'bg-primary-blue' : 'bg-primary-blue/30'}`}
                    />
                  </div>
                  <span className={`text-xs ${isLatest ? 'font-bold text-primary-blue' : 'text-text-secondary'}`}>
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-text-secondary">Growth 6 bulan</p>
              <p className="text-lg font-bold text-success">+102.8%</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Target Q1</p>
              <p className="text-lg font-bold text-text-primary">3.000</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Progress</p>
              <p className="text-lg font-bold text-accent-blue">96%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Metrics */}
      <div className="bg-primary-blue rounded-2xl p-6 text-white">
        <h2 className="font-semibold mb-4">Strategic Health Indicators</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200">Digital Loan Penetration</span>
              <span className="text-xs text-blue-300">Target: 40%</span>
            </div>
            <p className="text-3xl font-bold text-white">{MOCK_STRATEGIC_METRICS.digitalPenetration}%</p>
            <div className="mt-2 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${(MOCK_STRATEGIC_METRICS.digitalPenetration / 40) * 100}%` }}
              />
            </div>
            <p className="text-xs text-green-400 mt-1">+4.2% vs. bulan lalu</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200">Merchant Retention Rate</span>
              <span className="text-xs text-blue-300">Target: 90%</span>
            </div>
            <p className="text-3xl font-bold text-white">{MOCK_STRATEGIC_METRICS.retentionRate}%</p>
            <div className="mt-2 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${MOCK_STRATEGIC_METRICS.retentionRate}%` }}
              />
            </div>
            <p className="text-xs text-green-400 mt-1">✓ Di atas target</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200">Net Promoter Score</span>
              <span className="text-xs text-blue-300">Target: 65</span>
            </div>
            <p className="text-3xl font-bold text-white">{MOCK_STRATEGIC_METRICS.npsScore}</p>
            <div className="mt-2 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${(MOCK_STRATEGIC_METRICS.npsScore / 100) * 100}%` }}
              />
            </div>
            <p className="text-xs text-green-400 mt-1">+7 poin vs. Q4 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
