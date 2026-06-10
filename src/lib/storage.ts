import { createServiceClient } from '@/lib/supabase/server';

/**
 * Sube un archivo al bucket 'aura-assets' de Supabase Storage.
 * Retorna la URL pública del archivo subido.
 *
 * @param file      Buffer con el contenido del archivo
 * @param path      Ruta dentro del bucket (ej: 'projects/mi-imagen.webp')
 * @param mimeType  Tipo MIME del archivo (ej: 'image/webp')
 */
export async function uploadFile(
  file: Buffer,
  path: string,
  mimeType: string
): Promise<string> {
  const supabase = await createServiceClient();

  const { error } = await supabase.storage
    .from('aura-assets')
    .upload(path, file, {
      contentType: mimeType,
      upsert: true, // Sobreescribe si ya existe el archivo con ese nombre
    });

  if (error) {
    throw new Error(`Error al subir archivo: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('aura-assets')
    .getPublicUrl(path);

  return publicUrl;
}

/**
 * Elimina un archivo del bucket 'aura-assets'.
 * @param path  Ruta del archivo dentro del bucket
 */
export async function deleteFile(path: string): Promise<void> {
  const supabase = await createServiceClient();

  const { error } = await supabase.storage
    .from('aura-assets')
    .remove([path]);

  if (error) {
    throw new Error(`Error al eliminar archivo: ${error.message}`);
  }
}

/**
 * Extrae el path relativo de una URL pública de Supabase Storage.
 * Útil para eliminar un archivo usando su URL.
 *
 * @param publicUrl  URL pública completa del archivo
 * @returns          Path relativo dentro del bucket
 */
export function extractPathFromUrl(publicUrl: string): string {
  const marker = '/aura-assets/';
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) throw new Error('URL no pertenece al bucket aura-assets');
  return publicUrl.slice(idx + marker.length);
}
