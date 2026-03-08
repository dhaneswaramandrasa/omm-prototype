import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/stores/simulationStore';
import { MOCK_PARTNERS } from '@/lib/mockData';

const DATA_SCOPE = [
  'Data transaksi historis (12 bulan terakhir)',
  'Rata-rata pendapatan bulanan',
  'Tim pertumbuhan bisnis',
  'Kategori produk teratas',
  'Mitra Score (skor kredit berbasis AI)',
  'Status verifikasi Olsera Merchant',
  'Durasi bergabung dengan Olsera',
];

export default function ConsentPage() {
  const navigate = useNavigate();
  const { selectedPartnerId } = useSimulationStore();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const partner = MOCK_PARTNERS.find((p) => p.partnerId === selectedPartnerId);

  if (!partner) {
    navigate('/merchant/simulate/step2', { replace: true });
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API call
    navigate('/merchant/success');
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-2xl">🛡️</div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Persetujuan Data</h1>
          <p className="text-sm text-text-secondary">Transparansi adalah prioritas kami</p>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-2">
        Data berikut akan dibagikan ke mitra untuk evaluasi kelayakan kredit:
      </p>
      <p className="text-sm font-semibold text-primary-blue mb-4">
        Partner: {partner.partnerName}
      </p>

      {/* Data scope list */}
      <div className="bg-card rounded-2xl border border-gray-200 p-5 mb-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Data Agregat yang Dibagikan</h3>
        <p className="text-xs text-text-secondary mb-3">
          Data berikut akan digunakan mitra untuk evaluasi kelayakan kredit:
        </p>
        <div className="space-y-2.5">
          {DATA_SCOPE.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-success/10 flex-shrink-0">
                <span className="text-success text-xs">✓</span>
              </div>
              <span className="text-sm text-text-primary">{item}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-text-secondary">↓ Scroll ke bawah untuk melanjutkan</p>
        </div>
      </div>

      {/* Consent checkbox */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-accent-blue"
          />
          <span className="text-sm text-text-primary">
            Saya telah membaca dan menyetujui pembagian data di atas.{' '}
            <span className="text-text-secondary">
              Keputusan kredit diambil sepenuhnya oleh {partner.partnerName} dan bukan oleh Olsera.
            </span>
          </span>
        </label>
      </div>

      {/* Legal text */}
      <p className="text-xs text-text-secondary text-center mb-6 px-2">
        Persetujuan ini dapat dicabut sewaktu-waktu sesuai UU PDP (Perlindungan Data Pribadi).
        Data hanya digunakan untuk keperluan evaluasi kredit.
      </p>

      {/* CTA */}
      <button
        disabled={!agreed || loading}
        onClick={handleSubmit}
        className="w-full bg-primary-blue text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-blue/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Mengajukan...' : 'Setuju & Ajukan Pinjaman'}
      </button>

      <p className="text-center text-xs text-text-secondary mt-3">
        Olsera adalah platform penghubung, bukan pemberi pinjaman.
        Keputusan kredit dibuat oleh mitra finansial pilihan Anda.
      </p>
    </div>
  );
}
