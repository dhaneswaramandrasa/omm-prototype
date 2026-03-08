import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../stores/authStore';

const ROLE_HOMES: Record<UserRole, string> = {
  merchant: '/merchant',
  partner: '/partner',
  admin: '/admin',
  data: '/data',
  management: '/management',
};

function RequireAuth({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_HOMES[role]} replace />;
  }

  return <Outlet />;
}

// Stub pages — replaced in E3/E4/E5/E6/E10 tickets
function LoginPage() {
  return <div>Login Page (implemented in E3)</div>;
}
function MerchantDashboard() {
  return <div>Merchant Dashboard (implemented in E4)</div>;
}
function PartnerDashboard() {
  return <div>Partner Dashboard (implemented in E5)</div>;
}
function AdminDashboard() {
  return <div>Admin Dashboard (implemented in E6)</div>;
}
function DataDashboard() {
  return <div>Data Dashboard (implemented in E10)</div>;
}
function ManagementDashboard() {
  return <div>Management Dashboard (implemented in E10)</div>;
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/merchant',
    element: <RequireAuth allowedRoles={['merchant']} />,
    children: [{ index: true, element: <MerchantDashboard /> }],
  },
  {
    path: '/partner',
    element: <RequireAuth allowedRoles={['partner']} />,
    children: [{ index: true, element: <PartnerDashboard /> }],
  },
  {
    path: '/admin',
    element: <RequireAuth allowedRoles={['admin']} />,
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  {
    path: '/data',
    element: <RequireAuth allowedRoles={['data']} />,
    children: [{ index: true, element: <DataDashboard /> }],
  },
  {
    path: '/management',
    element: <RequireAuth allowedRoles={['management']} />,
    children: [{ index: true, element: <ManagementDashboard /> }],
  },
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);
