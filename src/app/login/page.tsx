'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ShieldAlert, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      // Si no está configurado Supabase, permitimos login offline de desarrollo
      if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
        console.log('Offline Mode: Simulating successful login');
        // Usar cookie mock temporal para que el middleware en desarrollo local deje pasar
        document.cookie = 'sb-access-token=mock-token; path=/';
        router.push('/admin');
        return;
      }

      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.refresh();
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-stone-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        
        {/* Branding header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/20 border border-emerald-900/30 mb-6 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
              Control de Accesos Autor
            </span>
          </div>
          <h1 className="text-4xl font-sans font-light tracking-tight text-white">
            AURA <span className="font-semibold text-emerald-300">Habitats</span>
          </h1>
          <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mt-2">
            Panel de Gestión Interno
          </p>
        </div>

        {/* Login Card Container */}
        <div className="bg-stone-900/90 border border-stone-850 p-6 sm:p-8 backdrop-blur-md relative">
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="p-4 border border-red-500/20 bg-red-950/15 text-red-400 text-xs font-light flex items-start gap-3 rounded-none">
                <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Error de autenticación</p>
                  <p className="opacity-90 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/10 transition-all rounded-none"
                placeholder="admin@aurahabitats.com"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/10 transition-all rounded-none"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  Verificando Firma...
                </>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Back Link */}
        <div className="text-center font-mono text-[9px] uppercase tracking-wider">
          <a href="/" className="text-stone-500 hover:text-emerald-400 transition-colors">
            ← Volver al showroom público
          </a>
        </div>

      </div>
    </main>
  );
}
