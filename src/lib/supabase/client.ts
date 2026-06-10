import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente Supabase para uso en Client Components (browser).
 * Usa NEXT_PUBLIC_ variables que son seguras de exponer al cliente.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
