import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MitraScoreCard } from '@/components/MitraScoreCard';
import { formatRupiah, formatPercent } from '@omm/shared';
import { MOCK_PARTNER_APP_DETAIL } from '@/lib/mockData';

export default function ApplicationDetailPage() {
  const navigate = useNavigate();
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [confirmModal, setConfirmModal] = useState<'approve' | 'reject' | null>(null);
  const [loading, setLoading] = useState(false);

  // In a real app, fetch by `id`. For demo, always use mock detail.
  const app = MOCK_PARTNER_APP_DETAIL;

  const handleDecision = async (type: 'approved' | 'rejected') => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDecision(type);
    setConfirmModal(null);
    setLoading(false);
  };


  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/partner/dashboard')}
        className="text-sm text-text-secondary hover:text-text-primary mb-4 inline-flex items-center gap-1"
      >
        ← Kembali ke Dashboard
      </button>

      {/* Title row */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Application Detail</h1>
          <p className="text-sm text-text-secondary">Review data merchant dan buat keputusan kredit</p>
        </div>
        <div className="font-mono font-bold text-lg text-text-primary">{app.applicationId}</div>
      </div>

      {/* Decision banner */}
      {decision && (
        <div className={`rounded-xl p-4 mb-6 text-center font-semibold ${
          decision === 'approved'
            ? 'bg-success/10 border border-success/30 text-success'
            : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {decision === 'approved' ? '✅ Aplikasi Disetujui' : '❌ Aplikasi Ditolak'}
          {decision === 'rejected' && (
            <p className="text-xs font-normal text-error/70 mt-1">Data merchant akan dihapus dari sistem sesuai kebijakan UU PDP.</p>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-5">
          {/* AI Score */}
          <MitraScoreCard
            score={app.mitraScore}
            tier={app.mitraTier}
            tierLabel={app.mitraTier.charAt(0).toUpperCase() + app.mitraTier.slice(1)}
            explanation="Score dihitung berdasarkan analisis AI terhadap data transaksi, pertumbuhan bisnis, dan profil resiko merchant."
          />

          {/* Merchant data */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              <h3 className="font-semibold text-text-primary">Data Agregat Merchant</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Revenue Bulanan',   value: formatRupiah(app.merchantData.monthlyRevenue), accent: 'bg-blue-50 border-blue-200' },
                {
                  label: 'Growth Rate',
                  value: formatPercent(app.merchantData.growthRate),
                  accent: app.merchantData.growthRate >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200',
                  positive: app.merchantData.growthRate >= 0,
                },
                { label: 'Rata-rata Transaksi',    value: formatRupiah(app.merchantData.avgTransactionValue), accent: 'bg-gray-50 border-gray-200' },
                { label: 'Volume Transaksi',       value: `${app.merchantData.monthlyTransactionVolume.toLocaleString('id-ID')} / bulan`, accent: 'bg-gray-50 border-gray-200' },
                { label: 'Durasi di Olsera',       value: `${app.merchantData.platformTenureMonths} bulan`, accent: 'bg-gray-50 border-gray-200' },
                { label: 'Peak Sales Day',         value: app.merchantData.peakSalesDay, accent: 'bg-gray-50 border-gray-200' },
              ].map(({ label, value, accent, positive }) => (
                <div key={label} className={`rounded-xl border p-3 ${accent}`}>
                  <p className="text-xs text-text-secondary mb-1">{label}</p>
                  <p className={`font-bold text-sm ${positive === true ? 'text-success' : positive === false ? 'text-error' : 'text-text-primary'}`}>
                    {positive === true && '+'}
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Top categories */}
            <div>
              <p className="text-xs font-semibold text-text-secondary mb-2">Top Categories</p>
              <div className="flex flex-wrap gap-2">
                {app.merchantData.topCategories.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Consent Proof */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success text-xs">✓</div>
              <h3 className="font-semibold text-text-primary">Consent Proof</h3>
            </div>
            <p className="text-xs text-text-secondary mb-2">Merchant telah memberikan persetujuan berbagi data</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-text-secondary">Consent ID</p>
                <p className="font-mono font-semibold text-text-primary">{app.consentProof.consentId}</p>
              </div>
              <div>
                <p className="text-text-secondary">Timestamp</p>
                <p className="font-semibold text-text-primary">
                  {new Date(app.consentProof.consentedAt).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Application Summary */}
          <div className="bg-card rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-text-primary mb-4">Application Summary</h3>
            {[
              { label: 'Merchant',          value: app.merchantName },
              { label: 'Merchant ID',       value: app.merchantId },
              { label: 'Amount Requested',  value: formatRupiah(app.amount), blue: true },
              { label: 'Tenor',             value: `${app.tenorMonths} Bulan` },
              { label: 'Submitted',         value: new Date(app.submittedAt).toLocaleDateString('id-ID') },
            ].map(({ label, value, blue }) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className={`font-semibold ${blue ? 'text-accent-blue' : 'text-text-primary'}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          {!decision && (
            <div className="space-y-3">
              <button
                onClick={() => setConfirmModal('approve')}
                className="w-full bg-success text-white rounded-xl py-3.5 font-semibold hover:bg-success/90 transition-colors flex items-center justify-center gap-2"
              >
                ✓ Approve Application
              </button>
              <button
                onClick={() => setConfirmModal('reject')}
                className="w-full border-2 border-error text-error rounded-xl py-3.5 font-semibold hover:bg-error/5 transition-colors flex items-center justify-center gap-2"
              >
                ✕ Reject Application
              </button>

              {/* Data deletion warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                <p className="font-semibold mb-1">⚠️ Perhatian</p>
                <p>Penolakan akan menghapus data merchant dari sistem secara permanen sesuai kebijakan perlindungan data Olsera.</p>
              </div>
            </div>
          )}

          {decision && (
            <button
              onClick={() => navigate('/partner/dashboard')}
              className="w-full border border-gray-300 text-text-secondary rounded-xl py-3.5 font-medium hover:bg-gray-50 transition-colors"
            >
              ← Kembali ke Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-text-primary text-lg mb-2">
              {confirmModal === 'approve' ? '✅ Konfirmasi Persetujuan' : '❌ Konfirmasi Penolakan'}
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              {confirmModal === 'approve'
                ? `Yakin menyetujui aplikasi ${app.applicationId} dari ${app.merchantName}?`
                : `Yakin menolak aplikasi ini? Data merchant akan dihapus secara permanen dari sistem.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                disabled={loading}
                className="flex-1 border border-gray-300 text-text-secondary rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDecision(confirmModal === 'approve' ? 'approved' : 'rejected')}
                disabled={loading}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors ${
                  confirmModal === 'approve' ? 'bg-success hover:bg-success/90' : 'bg-error hover:bg-error/90'
                }`}
              >
                {loading ? 'Memproses...' : 'Ya, Konfirmasi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
