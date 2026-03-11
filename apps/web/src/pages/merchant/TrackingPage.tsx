import { useNavigate } from 'react-router-dom';
import { SLATimer } from '@/components/SLATimer';
import { formatRupiah } from '@omm/shared';
import { MOCK_APPLICATION_DETAIL, MOCK_PARTNER_APPLICATIONS } from '@/lib/mockData';

const STAGE_LABELS: Record<string, string> = {
  submitted:         'Aplikasi Diterima',
  partner_review:    'Verifikasi Data',
  credit_assessment: 'Review Kredit',
  final_decision:    'Keputusan Akhir',
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  submitted:         'Aplikasi Anda telah diterima oleh sistem',
  partner_review:    'Partner sedang memverifikasi data Anda',
  credit_assessment: 'Tim kredit akan meninjau kelayakan',
  final_decision:    'Keputusan persetujuan atau penolakan',
};

export default function TrackingPage() {
  const navigate = useNavigate();
  const app = MOCK_APPLICATION_DETAIL;
  // SLA from partner application (simulating in-progress review)
  const slaSeconds = MOCK_PARTNER_APPLICATIONS[0]?.slaRemainingSeconds ?? 5025;

  const activeStageIndex = app.timeline.findIndex((t) => t.status === 'in_progress');

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Status <span className="text-accent-blue">Aplikasi</span>
          </h1>
          <p className="text-text-secondary text-sm mt-1">Pantau perkembangan aplikasi permodalan Anda</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-secondary uppercase tracking-wide">Application ID</p>
          <p className="font-mono font-bold text-lg text-text-primary">{app.applicationId}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Timeline – left col */}
        <div className="lg:col-span-3">
          {/* Active stage highlight */}
          {activeStageIndex !== -1 && (
            <div className="bg-primary-blue rounded-2xl p-5 mb-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-300 text-xs font-medium uppercase tracking-wide">Tahap Saat Ini</span>
              </div>
              <p className="font-bold text-lg">{activeStageIndex >= 0 ? STAGE_LABELS[app.timeline[activeStageIndex]!.stage] : ''}</p>
              <div className="flex items-center gap-2 mt-3">
                <SLATimer remainingSeconds={slaSeconds} className="text-white text-2xl" />
                <span className="text-blue-200 text-xs">tersisa</span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all"
                  style={{ width: `${Math.round((1 - slaSeconds / 21600) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-5">Timeline Proses</h3>
            <div className="space-y-0">
              {app.timeline.map((event, i) => {
                const isDone       = event.status === 'done';
                const isInProgress = event.status === 'in_progress';
                const isPending    = event.status === 'pending';
                const isLast       = i === app.timeline.length - 1;

                return (
                  <div key={event.stage} className="flex gap-4">
                    {/* Icon + connector */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        isDone       ? 'bg-success border-success text-white'
                        : isInProgress ? 'bg-warning border-warning text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}>
                        {isDone ? '✓' : isInProgress ? '⏳' : <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-1 ${isDone ? 'bg-success' : 'bg-gray-200'}`} style={{ minHeight: 24 }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-5 flex-1 ${isLast ? 'pb-0' : ''}`}>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold ${isPending ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {STAGE_LABELS[event.stage]}
                        </p>
                        {isInProgress && (
                          <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full font-medium">
                            Sedang Diproses
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">{STAGE_DESCRIPTIONS[event.stage]}</p>
                      {event.timestamp && (
                        <p className="text-xs text-text-secondary/60 mt-1">
                          {new Date(event.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar – right col */}
        <div className="lg:col-span-2 space-y-4">
          {/* Application Summary */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-4">Detail Aplikasi</h3>
            {[
              { label: 'Partner',       value: app.partnerName },
              { label: 'Nominal',       value: formatRupiah(app.amount) },
              { label: 'Tenor',         value: `${app.tenorMonths} Bulan` },
              { label: 'Tanggal Ajuan', value: new Date(app.submittedAt).toLocaleDateString('id-ID') },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-text-secondary">{label}</span>
                <span className="text-xs font-semibold text-text-primary">{value}</span>
              </div>
            ))}
          </div>

          {/* Trustera info */}
          <div className="bg-card rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>🔷</span>
              <p className="font-semibold text-sm text-text-primary">Trustera Account</p>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              Dana dari {app.partnerName} akan masuk ke akun Trustera Anda. Riwayat lengkap tersedia di Trustera.
            </p>
            <p className="text-xs text-text-secondary">
              Status Pencairan: <strong className="text-warning">Menunggu Persetujuan</strong>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-yellow-700 mb-1">⚠️ Keputusan oleh Mitra</p>
            <p className="text-xs text-yellow-600">
              Semua keputusan kredit dibuat sepenuhnya oleh {app.partnerName}. Olsera hanya memfasilitasi koneksi.
            </p>
          </div>

          <button
            onClick={() => navigate('/merchant/dashboard')}
            className="w-full border border-gray-300 text-text-secondary rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
