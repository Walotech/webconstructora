import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createHash } from 'crypto';

/**
 * Middleware de Next.js — Autenticación Dual:
 *
 * Para rutas web /admin/*:
 *   - Verifica sesión de Supabase Auth (cookie)
 *   - Redirige a /login si no hay sesión válida
 *
 * Para rutas API /api/admin/*:
 *   - Acepta sesión cookie O cabecera x-api-key
 *   - Devuelve 401 si ninguna es válida
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Protección de rutas de API admin ───────────────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    const apiKey = request.headers.get('x-api-key');

    // Intentar validación con x-api-key si está presente
    if (apiKey) {
      try {
        const keyHash = createHash('sha256').update(apiKey).digest('hex');
        const { createServiceClient } = await import('@/lib/supabase/server');
        const supabase = await createServiceClient();

        const { data: keyRecord } = await supabase
          .from('api_keys')
          .select('id, is_active, expires_at')
          .eq('key_hash', keyHash)
          .eq('is_active', true)
          .single();

        if (keyRecord) {
          // Verificar expiración
          if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
            return NextResponse.json({ error: 'API Key expirada' }, { status: 401 });
          }
          // Key válida — permitir acceso
          return NextResponse.next();
        }
      } catch {
        return NextResponse.json({ error: 'Error validando API Key' }, { status: 500 });
      }

      return NextResponse.json({ error: 'API Key inválida o desactivada' }, { status: 401 });
    }

    // Sin x-api-key: verificar sesión cookie
    const { user } = await updateSession(request);
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado. Provee sesión válida o cabecera x-api-key.' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // ─── Protección de rutas del panel web admin ─────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const { supabaseResponse, user } = await updateSession(request);

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    return supabaseResponse;
  }

  // ─── Redirigir /login a /admin si ya hay sesión ─────────────────────────────
  if (pathname === '/login') {
    const { supabaseResponse, user } = await updateSession(request);
    if (user) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = '/admin';
      return NextResponse.redirect(adminUrl);
    }
    return supabaseResponse;
  }

  // ─── Para todas las demás rutas, actualizar sesión y continuar ───────────────
  const { supabaseResponse } = await updateSession(request);
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/login',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
