import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/stores/simulationStore';
import { formatRupiah, formatPercent } from '@omm/shared';
import { MOCK_PARTNERS } from '@/lib/mockData';

function estimateInstallment(amount: number, rate: number, tenorMonths: number, rateType: string): number {
  if (rateType === 'flat') {
    return Math.round((amount + amount * rate * (tenorMonths / 12)) / tenorMonths);
  }
  // effective rate
  const monthlyRate = rate / 12;
  if (monthlyRate === 0) return Math.round(amount / tenorMonths);
  return Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) / (Math.pow(1 + monthlyRate, tenorMonths) - 1));
}

const PARTNER_TYPE_LABELS: Record<string, string> = {
  bank: 'Bank',
  fintech: 'Fintech',
  multifinance: 'Multifinance',
};

export default function OfferConfirmationPage() {
  const navigate = useNavigate();
  const { amount, tenor, selectedPartnerId } = useSimulationStore();

  const partner = MOCK_PARTNERS.find((p) => p.partnerId === selectedPartnerId);

  if (!amount || !tenor || !partner) {
    navigate('/merchant/simulate/step2', { replace: true });
    return null;
  }

  const monthly = estimateInstallment(amount, partner.interestRate, tenor, partner.rateType);
  const total = monthly * tenor;
  const totalInterest = total - amount;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-1">Konfirmasi Penawaran</h1>
      <p className="text-text-secondary text-sm mb-6">Tinjau detail sebelum melanjutkan ke persetujuan data</p>

      {/* Partner badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center">
          <span className="text-primary-blue font-bold text-lg">{partner.partnerName.charAt(0)}</span>
        </div>
        <div>
          <p className="font-bold text-text-primary">{partner.partnerName}</p>
          <p className="text-xs text-text-secondary">{PARTNER_TYPE_LABELS[partner.partnerType]}</p>
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-card rounded-2xl border border-gray-200 p-6 mb-4">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">Detail Pinjaman</h3>
        <div className="space-y-3">
          {[
            { label: 'Nominal Pinjaman', value: formatRupiah(amount), highlight: true },
            { label: 'Jangka Waktu',     value: `${tenor} Bulan` },
            { label: 'Suku Bunga',       value: `${formatPercent(partner.interestRate)} / tahun` },
            { label: 'Tipe Bunga',       value: partner.rateType === 'flat' ? 'Flat' : 'Efektif' },
            { label: 'Est. Cicilan / Bulan', value: formatRupiah(monthly), highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
              <span className="text-sm text-text-secondary">{label}</span>
              <span className={`text-sm font-semibold ${highlight ? 'text-accent-blue' : 'text-text-primary'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total cost */}
      <div className="bg-primary-blue/5 border border-primary-blue/20 rounded-xl p-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Total Pembayaran</span>
          <span className="font-bold text-text-primary">{formatRupiah(total)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-text-secondary">Total Bunga</span>
          <span className="font-medium text-warning">{formatRupiah(totalInterest)}</span>
        </div>
      </div>

      {/* Key terms */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-xs text-yellow-700 space-y-1">
        <p className="font-semibold">⚠️ Ketentuan Penting</p>
        <p>• Keputusan kredit sepenuhnya oleh {partner.partnerName}</p>
        <p>• Pencairan dana langsung dari {partner.partnerName} ke rekening Anda</p>
        <p>• Estimasi cicilan bersifat indikatif — angka final ditentukan mitra</p>
        <p>• Olsera hanya sebagai platform penghubung, bukan pemberi pinjaman</p>
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/merchant/simulate/step2')}
          className="flex-1 border border-gray-300 text-text-secondary rounded-xl py-3.5 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          ← Pilih Mitra Lain
        </button>
        <button
          onClick={() => navigate('/merchant/consent')}
          className="flex-2 bg-primary-blue text-white rounded-xl py-3.5 px-6 font-semibold text-sm hover:bg-primary-blue/90 transition-colors"
        >
          Lanjut ke Persetujuan Data →
        </button>
      </div>
    </div>
  );
}
