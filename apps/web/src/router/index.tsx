import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../stores/authStore';

// Layouts
import { MerchantLayout } from '@/components/layouts/MerchantLayout';
import { PartnerLayout }  from '@/components/layouts/PartnerLayout';

// Auth
import LoginPage from '@/pages/auth/LoginPage';

// Merchant
import MerchantDashboardPage    from '@/pages/merchant/DashboardPage';
import SimulationStep1Page      from '@/pages/merchant/SimulationStep1Page';
import SimulationStep2Page      from '@/pages/merchant/SimulationStep2Page';
import OfferConfirmationPage    from '@/pages/merchant/OfferConfirmationPage';
import ConsentPage              from '@/pages/merchant/ConsentPage';
import SuccessPage              from '@/pages/merchant/SuccessPage';
import TrackingPage             from '@/pages/merchant/TrackingPage';

// Partner
import PartnerDashboardPage     from '@/pages/partner/DashboardPage';
import ApplicationDetailPage    from '@/pages/partner/ApplicationDetailPage';

// ─── Role homes ───────────────────────────────────────────────────────────────

const ROLE_HOMES: Record<UserRole, string> = {
  merchant:   '/merchant/dashboard',
  partner:    '/partner/dashboard',
  admin:      '/admin/dashboard',
  data:       '/data/dashboard',
  management: '/management/dashboard',
};

// ─── Route guard ──────────────────────────────────────────────────────────────

function RequireAuth({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (role && !allowedRoles.includes(role)) return <Navigate to={ROLE_HOMES[role]} replace />;
  return <Outlet />;
}

// ─── Stub pages for portals not built yet ────────────────────────────────────

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-5xl mb-4">🚧</div>
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>
      <p className="text-text-secondary mt-2">Sedang dalam pengembangan</p>
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  // Public
  { path: '/login', element: <LoginPage /> },
  { path: '/',      element: <Navigate to="/login" replace /> },

  // ── Merchant portal ──────────────────────────────────────────────────────
  {
    path: '/merchant',
    element: <RequireAuth allowedRoles={['merchant']} />,
    children: [
      {
        element: <MerchantLayout />,
        children: [
          { index: true,                  element: <Navigate to="/merchant/dashboard" replace /> },
          { path: 'dashboard',            element: <MerchantDashboardPage /> },
          { path: 'simulate/step1',       element: <SimulationStep1Page /> },
          { path: 'simulate/step2',       element: <SimulationStep2Page /> },
          { path: 'offer-confirmation',   element: <OfferConfirmationPage /> },
          { path: 'consent',             element: <ConsentPage /> },
          { path: 'success',             element: <SuccessPage /> },
          { path: 'tracking',            element: <TrackingPage /> },
          { path: 'applications',        element: <MerchantDashboardPage /> },
          { path: 'support',             element: <ComingSoon title="Support Tickets" /> },
          { path: 'profile',             element: <ComingSoon title="Profil Usaha" /> },
        ],
      },
    ],
  },

  // ── Partner portal ───────────────────────────────────────────────────────
  {
    path: '/partner',
    element: <RequireAuth allowedRoles={['partner']} />,
    children: [
      {
        element: <PartnerLayout />,
        children: [
          { index: true,                       element: <Navigate to="/partner/dashboard" replace /> },
          { path: 'dashboard',                 element: <PartnerDashboardPage /> },
          { path: 'applications/:id',          element: <ApplicationDetailPage /> },
          { path: 'products',                  element: <ComingSoon title="Product Catalog" /> },
          { path: 'history',                   element: <ComingSoon title="Application History" /> },
          { path: 'support',                   element: <ComingSoon title="Support" /> },
        ],
      },
    ],
  },

  // ── Admin portal ─────────────────────────────────────────────────────────
  {
    path: '/admin',
    element: <RequireAuth allowedRoles={['admin']} />,
    children: [
      { path: 'dashboard', element: <ComingSoon title="Admin Dashboard" /> },
      { index: true,       element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },

  // ── Data portal ──────────────────────────────────────────────────────────
  {
    path: '/data',
    element: <RequireAuth allowedRoles={['data']} />,
    children: [
      { path: 'dashboard', element: <ComingSoon title="Data Intelligence" /> },
      { index: true,       element: <Navigate to="/data/dashboard" replace /> },
    ],
  },

  // ── Management portal ────────────────────────────────────────────────────
  {
    path: '/management',
    element: <RequireAuth allowedRoles={['management']} />,
    children: [
      { path: 'dashboard', element: <ComingSoon title="Executive Dashboard" /> },
      { index: true,       element: <Navigate to="/management/dashboard" replace /> },
    ],
  },

  // Catch-all
  { path: '*', element: <Navigate to="/login" replace /> },
]);
