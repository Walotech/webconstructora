import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Cliente Supabase para uso en Server Components y API Routes.
 * Lee las cookies de sesión para mantener la autenticación del admin.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // En Server Components, las cookies solo se pueden leer, no escribir.
            // El middleware actualiza las cookies de sesión en ese caso.
          }
        },
      },
    }
  );
}

/**
 * Cliente Supabase con Service Role Key para operaciones de admin.
 * NUNCA usar en Client Components — solo en Server Components y API Routes.
 * Bypasea RLS de Supabase para operaciones administrativas.
 */
export async function createServiceClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
