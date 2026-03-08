import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/stores/simulationStore';
import { PartnerCard } from '@/components/PartnerCard';
import { formatRupiah } from '@omm/shared';
import { MOCK_PARTNERS, MOCK_INELIGIBLE_PARTNERS } from '@/lib/mockData';

export default function SimulationStep2Page() {
  const navigate = useNavigate();
  const { amount, tenor, selectedPartnerId, setSelectedPartner } = useSimulationStore();

  if (!amount || !tenor) {
    navigate('/merchant/simulate/step1', { replace: true });
    return null;
  }

  const handleSelect = (partnerId: string) => {
    setSelectedPartner(partnerId);
  };

  const handleNext = () => {
    if (!selectedPartnerId) return;
    navigate('/merchant/offer-confirmation');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">✓</div>
          <span className="text-sm font-semibold text-success">Simulasi</span>
        </div>
        <div className="flex-1 max-w-16 h-0.5 bg-accent-blue" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center text-sm font-bold">2</div>
          <span className="text-sm font-semibold text-primary-blue">Pilih Mitra</span>
        </div>
      </div>

      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-text-primary">
          Pilih <span className="text-accent-blue">Mitra Terbaik</span>
        </h1>
      </div>

      {/* Summary row */}
      <div className="flex items-center justify-center gap-4 text-sm text-text-secondary mb-6">
        <span>Modal: <strong className="text-text-primary">{formatRupiah(amount)}</strong></span>
        <span>•</span>
        <span>Tenor: <strong className="text-text-primary">{tenor} Bulan</strong></span>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-accent-blue">
        <span className="text-lg">🛡️</span>
        <div>
          <p className="font-semibold">Mitra yang ditampilkan sesuai profil Anda</p>
          <p className="text-blue-600/70 text-xs mt-0.5">
            Semua keputusan kredit dibuat oleh mitra. Olsera hanya memfasilitasi koneksi antara Anda dengan mitra yang tepat.
          </p>
        </div>
      </div>

      {/* Available partners */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Mitra yang Tersedia ({MOCK_PARTNERS.length})
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {MOCK_PARTNERS.map((partner) => (
            <PartnerCard
              key={partner.partnerId}
              partner={partner}
              selected={selectedPartnerId === partner.partnerId}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Ineligible partners */}
      {MOCK_INELIGIBLE_PARTNERS.length > 0 && (
        <div className="mb-8">
          <div className="h-px bg-gray-200 mb-4" />
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Tidak Memenuhi Kriteria
          </h2>
          <div className="space-y-2">
            {MOCK_INELIGIBLE_PARTNERS.map((p) => (
              <div key={p.partnerId} className="rounded-xl border border-gray-200 p-4 bg-gray-50 opacity-70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-secondary">{p.partnerName}</p>
                    <p className="text-xs text-text-secondary/70 mt-0.5 capitalize">{p.partnerType}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">{p.reasonLabel}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/merchant/simulate/step1')}
          className="flex-1 border border-gray-300 text-text-secondary rounded-xl py-3.5 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          ← Ubah Nominal & Tenor
        </button>
        <button
          disabled={!selectedPartnerId}
          onClick={handleNext}
          className="flex-2 bg-primary-blue text-white rounded-xl py-3.5 px-6 font-semibold text-sm hover:bg-primary-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Lanjut ke Konfirmasi →
        </button>
      </div>
    </div>
  );
}
