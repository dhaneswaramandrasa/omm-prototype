import { MOCK_SCORE_FACTORS, MOCK_DATA_ACCESS_LOGS, MOCK_MITRA_SCORE } from '@/lib/mockData';

const OVERVIEW_STATS = [
  { label: 'Merchant Aktif',     value: '12.847', icon: '🏪', delta: '+8.2%', deltaPositive: true },
  { label: 'Avg Mitra Score',    value: '742',    icon: '⭐', delta: '+14 poin', deltaPositive: true },
  { label: 'Scored This Month',  value: '2.481',  icon: '📊', delta: '+12.3%', deltaPositive: true },
  { label: 'Coverage Rate',      value: '97.2%',  icon: '🎯', delta: '+1.4%', deltaPositive: true },
];

export default function DataIntelligencePage() {
  const maxWeight = Math.max(...MOCK_SCORE_FACTORS.map((f) => f.weight));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-primary-blue text-white p-6 mb-6">
        <h1 className="text-2xl font-bold">Data Intelligence</h1>
        <p className="text-blue-200 mt-1 text-sm">Mitra Score engine, analytics, dan audit log akses data merchant</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {OVERVIEW_STATS.map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <p className="text-xs text-blue-300">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className={`text-xs mt-0.5 ${stat.deltaPositive ? 'text-green-400' : 'text-red-300'}`}>
                {stat.delta}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Score Factors — left 3/5 */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-text-primary mb-1">Mitra Score Factor Weights</h2>
            <p className="text-xs text-text-secondary mb-5">Bobot dan performa tiap faktor dalam model scoring</p>

            <div className="space-y-4">
              {MOCK_SCORE_FACTORS.map((factor) => (
                <div key={factor.factor}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-medium text-text-primary">{factor.factor}</span>
                      <p className="text-xs text-text-secondary">{factor.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-sm font-bold text-text-primary">{factor.score}</span>
                      <p className="text-xs text-text-secondary">{factor.weight}% bobot</p>
                    </div>
                  </div>
                  {/* Weight bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          factor.score >= 750
                            ? 'bg-success'
                            : factor.score >= 680
                              ? 'bg-accent-blue'
                              : 'bg-warning'
                        }`}
                        style={{ width: `${(factor.weight / maxWeight) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                      <div
                        className="h-full bg-primary-blue/40 rounded-full"
                        style={{ width: `${(factor.score / 850) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <div className="w-3 h-1.5 bg-success rounded-full" /> Baik (≥750)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <div className="w-3 h-1.5 bg-accent-blue rounded-full" /> Normal (680–749)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <div className="w-3 h-1.5 bg-warning rounded-full" /> Perlu Perhatian (&lt;680)
              </div>
            </div>
          </div>
        </div>

        {/* Right side — score snapshot */}
        <div className="lg:col-span-2 space-y-4">
          {/* Platform score distribution */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-3 text-sm">Distribusi Tier Merchant</h3>
            {[
              { tier: 'Excellent', count: 1840, pct: 14, color: 'bg-success' },
              { tier: 'Good',      count: 6420, pct: 50, color: 'bg-accent-blue' },
              { tier: 'Fair',      count: 3580, pct: 28, color: 'bg-warning' },
              { tier: 'Poor',      count: 1007, pct: 8,  color: 'bg-error' },
            ].map((t) => (
              <div key={t.tier} className="mb-2">
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs text-text-secondary">{t.tier}</span>
                  <span className="text-xs font-semibold text-text-primary">{t.count.toLocaleString('id-ID')} ({t.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sample score card */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-3 text-sm">Contoh Score — MER-001</h3>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-5xl font-bold text-gold">{MOCK_MITRA_SCORE.mitraScore}</span>
              <div className="mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/30">
                  {MOCK_MITRA_SCORE.tierLabel}
                </span>
                <p className="text-xs text-text-secondary mt-1">Persentil ke-{MOCK_MITRA_SCORE.percentile}</p>
              </div>
            </div>
            {Object.entries(MOCK_MITRA_SCORE.factors).map(([key, val]) => {
              const labelMap: Record<string, string> = {
                monthlyRevenue: 'Monthly Revenue',
                growthRate: 'Growth Rate',
                transactionConsistency: 'Consistency',
                tenureOnPlatform: 'Tenure',
                categoryRisk: 'Category Risk',
              };
              return (
                <div key={key} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-text-secondary">{labelMap[key] ?? key}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-blue/60 rounded-full" style={{ width: `${(val.score / 850) * 100}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-text-primary w-8 text-right">{val.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Access Log */}
      <div className="bg-card rounded-2xl border border-gray-200 p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-text-primary">Audit Log Akses Data</h2>
            <p className="text-xs text-text-secondary mt-0.5">Log semua akses data merchant oleh partner — sesuai UU PDP</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Timestamp</th>
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Partner</th>
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Merchant ID</th>
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Data Type</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Action</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA_ACCESS_LOGS.map((log, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-2">
                    <span className="font-mono text-xs text-text-secondary">{log.timestamp}</span>
                  </td>
                  <td className="py-2.5 px-2 font-medium text-text-primary text-xs">{log.partner}</td>
                  <td className="py-2.5 px-2">
                    <span className="font-mono text-xs text-text-secondary">{log.merchantId}</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-medium">
                      {log.dataType}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center text-xs text-text-secondary">{log.action}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium border border-success/20">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-gray-100">
          ℹ️ Semua akses data merchant direkam sesuai UU PDP No. 27/2022. Partner hanya menerima data agregat — tidak ada raw transaction records yang dibagikan.
        </p>
      </div>
    </div>
  );
}
