import { Outlet } from 'react-router-dom';
import { TopNav } from '@/components/nav/TopNav';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
