import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Actualiza la sesión de Supabase en cada request del middleware.
 * Requerido por @supabase/ssr para mantener las cookies frescas.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si Supabase no está configurado, entramos en modo offline/simulado
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('xxxxxxxxxxxx') || supabaseAnonKey.includes('xxxxxxxxxxxx')) {
    const mockCookie = request.cookies.get('sb-access-token');
    const user = mockCookie 
      ? { 
          id: 'mock-user-id-uuid-1234', 
          email: 'admin@aurahabitats.com',
          user_metadata: { full_name: 'Administrador Local' } 
        } as any 
      : null;
    return { supabaseResponse, user };
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refrescar la sesión del usuario (importante: no eliminar esta llamada)
    const { data: { user } } = await supabase.auth.getUser();

    return { supabaseResponse, user };
  } catch (err) {
    console.error('Error refreshing Supabase session in middleware:', err);
    return { supabaseResponse, user: null };
  }
}

