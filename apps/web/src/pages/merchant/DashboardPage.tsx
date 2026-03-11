import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { formatRupiah, formatRupiahShort } from '@omm/shared';
import { MOCK_MERCHANT, MOCK_MITRA_SCORE, MOCK_MY_APPLICATIONS } from '@/lib/mockData';

const TABS = ['Overview', 'Improvement Guide', 'My Applications', 'Wealth Summary', 'Learning & Certification'];

const ACHIEVEMENTS = [
  { icon: '🥇', title: 'First Application', earned: true },
  { icon: '📊', title: 'Score Achiever',   earned: true },
  { icon: '📚', title: 'Learning Master',  earned: false },
  { icon: '🏗️', title: 'Wealth Builder',   earned: false },
];

export default function MerchantDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const scorePercent = Math.round((MOCK_MITRA_SCORE.mitraScore / MOCK_MITRA_SCORE.maxScore) * 100);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header card */}
      <div className="rounded-2xl bg-primary-blue text-white p-6 mb-6">
        <p className="text-blue-200 text-sm mb-1">Selamat datang, {MOCK_MERCHANT.ownerName}</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Dashboard Merchant</h1>
          <div className="text-right">
            <div className="text-xs text-blue-300 uppercase tracking-wide">ATRI Score</div>
            <div className="text-5xl font-black text-gold leading-none">{MOCK_MITRA_SCORE.atriScore}</div>
            <div className="text-sm text-green-400 mt-1">+{MOCK_MITRA_SCORE.delta} pts bulan ini</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-blue-200 mb-1">
            <span className="font-medium">ATRI Scoring</span>
            <span>{MOCK_MITRA_SCORE.mitraScore}/{MOCK_MITRA_SCORE.maxScore} • Top {MOCK_MITRA_SCORE.percentile}% merchants</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-semibold">
              🥇 Gold Tier
            </span>
            <span className="text-xs text-blue-200">{MOCK_MITRA_SCORE.maxScore}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary-blue text-white'
                : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Connected Stores" value={MOCK_MERCHANT.stores.length.toString()} />
            <StatCard
              title="Business Valuation"
              value={formatRupiahShort(MOCK_MERCHANT.stores.reduce((a, s) => a + s.monthlyRevenue * 12, 0))}
              delta={8.5}
              deltaType="increase"
            />
            <StatCard title="Certificates Earned" value="5" />
            <StatCard title="Learning Points" value="340" />
          </div>

          {/* CTA: Simulate loan */}
          <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-semibold text-text-primary">Butuh Modal Usaha?</p>
              <p className="text-sm text-text-secondary">Simulasikan pinjaman dan temukan mitra terbaik untuk bisnis Anda</p>
            </div>
            <button
              onClick={() => navigate('/merchant/simulate/step1')}
              className="bg-primary-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-blue/90 transition-colors whitespace-nowrap"
            >
              Simulasi Pinjaman →
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Connected Stores */}
            <div className="bg-card rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-text-primary mb-4">📍 Connected Stores & Business</h3>
              <div className="space-y-3">
                {MOCK_MERCHANT.stores.map((store) => (
                  <div key={store.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{store.storeName}</p>
                      <p className="text-xs text-text-secondary">{store.location} · Monthly Revenue: {formatRupiah(store.monthlyRevenue)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      store.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {store.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-text-primary mb-4">🏆 Achievements & Rewards</h3>
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.title}
                    className={`rounded-xl border p-3 text-center ${
                      a.earned
                        ? 'border-gold/40 bg-gold/5'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{a.icon}</div>
                    <p className="text-xs font-medium text-text-primary">{a.title}</p>
                    <p className={`text-xs mt-0.5 ${a.earned ? 'text-success' : 'text-text-secondary'}`}>
                      {a.earned ? '✓ Earned' : 'Locked'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-accent-blue">Next Challenge</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Complete 3 more courses to unlock "Learning Master" badge and earn +100 points
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'My Applications' && (
        <div className="bg-card rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Riwayat Pengajuan</h3>
            <button
              onClick={() => navigate('/merchant/simulate/step1')}
              className="text-sm text-accent-blue hover:underline"
            >
              + Ajukan Baru
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['ID Aplikasi', 'Partner', 'Nominal', 'Tenor', 'Status', 'Tanggal'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_MY_APPLICATIONS.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate('/merchant/tracking')}
                >
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{app.applicationId}</td>
                  <td className="px-4 py-3 font-medium">{app.partnerName}</td>
                  <td className="px-4 py-3">{formatRupiah(app.amount)}</td>
                  <td className="px-4 py-3">{app.tenorMonths} bln</td>
                  <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">
                    {new Date(app.submittedAt).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(activeTab === 'Improvement Guide' || activeTab === 'Wealth Summary' || activeTab === 'Learning & Certification') && (
        <div className="bg-card rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">🚧</div>
          <p className="font-semibold text-text-primary">{activeTab}</p>
          <p className="text-sm text-text-secondary mt-1">Fitur ini akan tersedia segera</p>
        </div>
      )}
    </div>
  );
}
