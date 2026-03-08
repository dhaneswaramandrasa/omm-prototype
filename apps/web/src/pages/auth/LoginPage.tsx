import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { DEMO_CREDENTIALS } from '@/lib/mockData';

const ROLE_HOMES: Record<string, string> = {
  merchant:   '/merchant/dashboard',
  partner:    '/partner/dashboard',
  admin:      '/admin/dashboard',
  data:       '/data/dashboard',
  management: '/management/dashboard',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  if (isAuthenticated() && role) {
    navigate(ROLE_HOMES[role] ?? '/login', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600)); // simulate network

    const cred = DEMO_CREDENTIALS[email.toLowerCase()];
    if (!cred || cred.password !== password) {
      setError('Email atau password salah. Coba: merchant@demo.com / demo123');
      setLoading(false);
      return;
    }

    setAuth(
      {
        id: `user-${email}`,
        email,
        name: cred.name,
        role: cred.role as import('@/stores/authStore').UserRole,
        ...(cred.merchantId ? { merchantId: cred.merchantId } : {}),
        ...(cred.partnerId  ? { partnerId:  cred.partnerId  } : {}),
      },
      'mock-access-token-' + Date.now()
    );

    navigate(ROLE_HOMES[cred.role] ?? '/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary-blue">Olsera Mitra Modal</span>
          <span className="text-sm text-text-secondary">× Trustera</span>
        </div>
        <p className="mt-1 text-sm text-text-secondary">Platform Agregator Keuangan</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-xl font-bold text-text-primary mb-1">Masuk ke Akun Anda</h1>
        <p className="text-sm text-text-secondary mb-6">Gunakan email dan password yang terdaftar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@demo.com"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-error bg-error/5 border border-error/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-blue text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-primary-blue/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-text-secondary">
          Lupa password?{' '}
          <a href="#" className="text-accent-blue hover:underline">Reset di sini</a>
        </p>
      </div>

      {/* Demo hint */}
      <div className="mt-6 w-full max-w-sm bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-accent-blue mb-2">Demo Accounts</p>
        <div className="space-y-1 text-xs text-text-secondary">
          {Object.entries(DEMO_CREDENTIALS).map(([email, d]) => (
            <button
              key={email}
              onClick={() => { setEmail(email); setPassword(d.password); }}
              className="w-full text-left flex justify-between hover:text-text-primary transition-colors py-0.5"
            >
              <span>{email}</span>
              <span className="capitalize text-text-secondary/70">{d.role}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-text-secondary/60">Password semua akun: demo123</p>
      </div>
    </div>
  );
}
