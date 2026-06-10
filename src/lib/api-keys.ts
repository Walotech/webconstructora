import { createHash } from 'crypto';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * Genera el hash SHA-256 de una API Key en texto plano.
 * @param rawKey  La clave en texto plano que el usuario recibirá
 * @returns       Hash SHA-256 en hexadecimal (lo que se guarda en DB)
 */
export function hashKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/**
 * Genera una API Key segura aleatoria.
 * Formato: aura_sk_[32 bytes hex]
 */
export function generateApiKey(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const hex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `aura_sk_${hex}`;
}

/**
 * Valida una API Key cruda contra la base de datos.
 * Hashea la key y busca en la tabla api_keys.
 *
 * @param rawKey  La clave en texto plano del header x-api-key
 * @returns       El registro de la clave si es válida, null si no lo es
 */
export async function validateApiKey(rawKey: string): Promise<{
  id: string;
  profile_id: string;
  name: string;
} | null> {
  const keyHash = hashKey(rawKey);
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from('api_keys')
    .select('id, profile_id, name, is_active, expires_at')
    .eq('key_hash', keyHash)
    .single();

  if (error || !data) return null;
  if (!data.is_active) return null;
  if (data.expires_at && new Date(data.expires_at) < new Date()) return null;

  return {
    id: data.id,
    profile_id: data.profile_id,
    name: data.name,
  };
}
