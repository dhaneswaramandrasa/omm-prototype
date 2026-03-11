import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TopNav } from '@/components/nav/TopNav';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/management', label: 'Executive Dashboard', end: true },
  { to: '/management/financials', label: 'Financials',         end: false },
  { to: '/management/partners',   label: 'Partner Strategy',   end: false },
  { to: '/management/risk',       label: 'Risk Overview',      end: false },
];

export function ManagementLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <TopNav onMenuToggle={() => setSidebarOpen((o) => !o)} />

      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            'fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-56 overflow-y-auto border-r bg-white transition-transform duration-200 lg:sticky lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <nav className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-blue text-white'
                      : 'text-text-secondary hover:bg-bg hover:text-text-primary'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
