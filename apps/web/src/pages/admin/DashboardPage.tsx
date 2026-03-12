import { useNavigate } from 'react-router-dom';
import { formatRupiahShort } from '@omm/shared';
import {
  MOCK_ADMIN_STATS,
  MOCK_PARTNER_PERFORMANCE,
  MOCK_SLA_ALERTS,
  MOCK_SYSTEM_HEALTH,
} from '@/lib/mockData';

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  excellent: { label: 'Excellent', className: 'bg-success/10 text-success border border-success/30' },
  good:      { label: 'Good',      className: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30' },
  warning:   { label: 'Warning',   className: 'bg-warning/10 text-warning border border-warning/30' },
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const s = MOCK_ADMIN_STATS;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl bg-primary-blue text-white p-6 mb-6">
        <h1 className="text-2xl font-bold">Olsera Admin Dashboard</h1>
        <p className="text-blue-200 mt-1 text-sm">Platform Operations & Partner Management</p>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {[
            { label: 'Total Applications', value: s.totalApplications.toLocaleString('id-ID'), delta: `+${s.totalDelta}%`, icon: '📋' },
            { label: 'Active Partners',    value: s.activePartners.toString(),                  delta: `+${s.partnersDelta}`,  icon: '🤝' },
            { label: 'SLA Breaches',       value: s.slaBreaches.toString(),                     delta: `${s.breachesDelta}`,   icon: '⚠️', red: s.slaBreaches > 0 },
            { label: 'Total Volume',       value: formatRupiahShort(s.totalVolume),              delta: `+${s.volumeDelta}%`,   icon: '💰' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <p className="text-xs text-blue-300">{stat.label}</p>
              </div>
              <p className={`text-2xl font-bold ${stat.red ? 'text-error' : 'text-white'}`}>{stat.value}</p>
              <p className={`text-xs mt-0.5 ${stat.red ? 'text-red-300' : 'text-green-400'}`}>{stat.delta}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Partner Performance – left 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-text-primary mb-1">Partner Performance</h2>
            <p className="text-xs text-text-secondary mb-4">Real-time partner metrics and SLA compliance</p>

            <div className="space-y-4">
              {MOCK_PARTNER_PERFORMANCE.map((p) => {
                const badge = BADGE_CONFIG[p.badge] ?? BADGE_CONFIG['good']!;
                return (
                  <div key={p.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold text-primary-blue flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-text-primary">{p.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.className}`}>{badge.label}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">{p.apps.toLocaleString('id-ID')} aplikasi</p>
                      {/* Approval rate bar */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${p.approvalRate >= 70 ? 'bg-success' : p.approvalRate >= 60 ? 'bg-accent-blue' : 'bg-warning'}`}
                            style={{ width: `${p.approvalRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-primary w-8">{p.approvalRate}%</span>
                      </div>
                    </div>
                    {/* SLA */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-text-secondary">Avg SLA Response</p>
                      <p className="font-semibold text-sm text-text-primary">{p.avgSlaHours} jam</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin/applications')}
                className="w-full flex items-center justify-between bg-primary-blue text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary-blue/90 transition-colors"
              >
                <span>View All Applications →</span>
              </button>
              <button
                onClick={() => navigate('/admin/partners')}
                className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 transition-colors"
              >
                Partner Management
              </button>
              <button className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-secondary hover:bg-gray-50 transition-colors">
                System Health
              </button>
            </div>
          </div>

          {/* SLA Alerts */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <span>⚠️</span> SLA Alerts
            </h3>
            <div className="space-y-3">
              {MOCK_SLA_ALERTS.map((alert) => (
                <div key={alert.partnerId} className="bg-white rounded-xl border border-amber-200 p-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.type === 'breach' ? 'bg-error' : 'bg-warning'}`} />
                    <p className="text-xs font-semibold text-text-primary">{alert.partnerName}</p>
                    <span className={`text-xs px-1.5 rounded font-medium ${alert.type === 'breach' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                      {alert.type === 'breach' ? 'SLA Breach' : 'High Response Time'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary pl-4">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-primary-blue rounded-2xl p-5 text-white">
            <h3 className="font-semibold mb-3">System Health</h3>
            {[
              { label: 'API Uptime',         value: `${MOCK_SYSTEM_HEALTH.apiUptime}%`,   good: true },
              { label: 'Avg Response Time',   value: `${MOCK_SYSTEM_HEALTH.avgResponseMs}ms`, good: MOCK_SYSTEM_HEALTH.avgResponseMs < 200 },
              { label: 'Active Sessions',     value: MOCK_SYSTEM_HEALTH.activeSessions.toLocaleString('id-ID'), good: true },
            ].map(({ label, value, good }) => (
              <div key={label} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                <span className="text-sm text-blue-200">{label}</span>
                <span className={`text-sm font-bold ${good ? 'text-green-400' : 'text-warning'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
