'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, FolderKanban, LogOut, Menu, X, Landmark } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
        // Mock offline logout
        document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        router.push('/login');
        return;
      }

      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    {
      name: 'Consultas (Leads)',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Portafolio Proyectos',
      href: '/admin/projects',
      icon: FolderKanban,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row relative">
      
      {/* Mobile Top Navbar Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-stone-900 border-b border-stone-850 z-30">
        <div className="flex items-center space-x-2">
          <Landmark className="w-5 h-5 text-emerald-400" />
          <span className="font-sans font-light tracking-wide text-white text-base">
            AURA <span className="font-semibold text-emerald-300">Habitats</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-stone-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Panel Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-stone-900 border-r border-stone-850 flex flex-col justify-between p-6 z-40 transition-transform duration-300 md:translate-x-0 md:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="hidden md:flex items-center space-x-2 pb-6 border-b border-stone-850/60">
            <Landmark className="w-6 h-6 text-emerald-400" />
            <span className="font-sans font-light tracking-wide text-white text-lg">
              AURA <span className="font-semibold text-emerald-300">Habitats</span>
            </span>
          </div>

          {/* Links list */}
          <nav className="space-y-2">
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-3 px-3">
              Administración
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 font-mono text-xs uppercase tracking-wider transition-all rounded-none ${
                    isActive
                      ? 'bg-emerald-400/5 text-emerald-300 border-l-2 border-emerald-450 pl-[10px]'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-950/30'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar (Logout) */}
        <div className="pt-6 border-t border-stone-850/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-3 py-3 border border-stone-800 bg-stone-950 hover:bg-red-950/10 hover:border-red-900/30 hover:text-red-400 text-stone-400 font-mono text-xs uppercase tracking-widest transition-all rounded-none cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen bg-stone-950 p-6 md:p-10 lg:p-12 overflow-x-hidden z-10">
        {/* Background glow shadow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/2 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-8 relative">
          {children}
        </div>
      </main>

      {/* Mobile drawer background overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-30 backdrop-blur-sm"
        />
      )}

    </div>
  );
}
