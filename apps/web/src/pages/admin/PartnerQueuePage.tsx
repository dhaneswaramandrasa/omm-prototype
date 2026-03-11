import { MOCK_PARTNER_QUEUE } from '@/lib/mockData';

const RISK_CONFIG: Record<string, { label: string; className: string }> = {
  low:    { label: 'Low Risk',    className: 'bg-success/10 text-success border border-success/30' },
  medium: { label: 'Med Risk',    className: 'bg-warning/10 text-warning border border-warning/30' },
  high:   { label: 'High Risk',   className: 'bg-error/10 text-error border border-error/30' },
};

const SLA_CONFIG: Record<string, { className: string }> = {
  ok:      { className: 'text-success' },
  warning: { className: 'text-warning' },
  overdue: { className: 'text-error' },
};

const TYPE_LABELS: Record<string, string> = {
  bank:         'Bank',
  fintech:      'Fintech',
  multifinance: 'Multifinance',
};

const SUMMARY_STATS = [
  { label: 'Total Antrian',    value: 4,   icon: '📂', color: 'text-primary-blue' },
  { label: 'Active Review',    value: 3,   icon: '🔄', color: 'text-accent-blue' },
  { label: 'Overdue',          value: 1,   icon: '🚨', color: 'text-error' },
  { label: 'Disetujui Bulan Ini', value: 2, icon: '✅', color: 'text-success' },
];

const ONBOARDING_STAGES = [
  'Application Received',
  'KYC AML',
  'Legal Docs',
  'Trustera Meeting',
  'API Security Review',
  'Sandbox Testing',
  'Go Live',
];

export default function AdminPartnerQueuePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Partner Onboarding Queue</h1>
        <p className="text-sm text-text-secondary mt-1">Monitor dan kelola proses onboarding partner lembaga keuangan baru</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Onboarding stage legend */}
      <div className="bg-card rounded-2xl border border-gray-200 p-5 mb-6">
        <h3 className="font-semibold text-text-primary mb-3 text-sm">Tahapan Onboarding</h3>
        <div className="flex flex-wrap gap-2">
          {ONBOARDING_STAGES.map((stage, i) => (
            <div key={stage} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span className="w-5 h-5 rounded-full bg-primary-blue/10 text-primary-blue font-bold flex items-center justify-center text-[10px]">
                {i + 1}
              </span>
              <span>{stage}</span>
              {i < ONBOARDING_STAGES.length - 1 && <span className="text-gray-300 ml-1">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Queue table */}
      <div className="bg-card rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text-primary">Antrian Aktif</h2>
          <button className="text-xs px-3 py-1.5 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors">
            + Tambah Partner
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_PARTNER_QUEUE.map((partner) => {
            const risk = RISK_CONFIG[partner.risk] ?? RISK_CONFIG['low']!;
            const sla = SLA_CONFIG[partner.slaStatus] ?? SLA_CONFIG['ok']!;
            const typeLabel = TYPE_LABELS[partner.type] ?? partner.type;

            return (
              <div
                key={partner.id}
                className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Company info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-text-primary text-sm">{partner.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary border border-gray-200">
                        {typeLabel}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${risk.className}`}>
                        {risk.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span>PIC: {partner.contact}</span>
                      <span>·</span>
                      <span>Submit: {partner.submittedAt}</span>
                      <span>·</span>
                      <span className={`font-semibold ${sla.className}`}>SLA: {partner.slaLabel}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="lg:w-64">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-text-secondary">{partner.currentStage}</span>
                      <span className="text-xs font-bold text-text-primary">{partner.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          partner.progress >= 80
                            ? 'bg-success'
                            : partner.progress >= 50
                              ? 'bg-accent-blue'
                              : partner.risk === 'high'
                                ? 'bg-warning'
                                : 'bg-accent-blue'
                        }`}
                        style={{ width: `${partner.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-text-secondary hover:bg-gray-50 transition-colors">
                      Detail
                    </button>
                    <button className="text-xs px-3 py-1.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-lg hover:bg-accent-blue/20 transition-colors font-medium">
                      Advance Stage
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
