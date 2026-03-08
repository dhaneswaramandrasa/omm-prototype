import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/stores/simulationStore';
import { MOCK_PARTNERS } from '@/lib/mockData';

const MOCK_APP_ID = 'APP-77082553';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { selectedPartnerId } = useSimulationStore();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const partner = (MOCK_PARTNERS.find((p) => p.partnerId === selectedPartnerId) ?? MOCK_PARTNERS[0])!;

  return (
    <div className="max-w-md mx-auto text-center py-8">
      {/* Success animation */}
      <div className="w-24 h-24 rounded-full bg-success/10 border-4 border-success/30 flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">✅</span>
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Aplikasi Berhasil Diajukan!
      </h1>
      <p className="text-text-secondary mb-6">
        Pengajuan Anda telah diterima dan sedang menunggu tinjauan dari {partner.partnerName}.
      </p>

      {/* App ID */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">Application ID</p>
        <p className="font-mono text-2xl font-bold text-primary-blue tracking-wider">{MOCK_APP_ID}</p>
        <p className="text-xs text-text-secondary mt-1">Simpan ID ini untuk melacak status aplikasi Anda</p>
      </div>

      {/* Partner info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏦</span>
          <span className="font-semibold text-text-primary">{partner.partnerName}</span>
        </div>
        <div className="space-y-1 text-sm text-text-secondary">
          <p>⏱ Estimasi respons: <strong className="text-text-primary">2–3 hari kerja</strong></p>
          <p>📧 Notifikasi via email saat ada pembaruan status</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/merchant/tracking')}
          className="w-full bg-primary-blue text-white rounded-xl py-3.5 font-semibold hover:bg-primary-blue/90 transition-colors"
        >
          Lacak Aplikasi →
        </button>
        <button
          onClick={() => navigate('/merchant/dashboard')}
          className="w-full border border-gray-300 text-text-secondary rounded-xl py-3.5 font-medium hover:bg-gray-50 transition-colors"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
