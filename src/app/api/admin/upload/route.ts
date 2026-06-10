import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('path') as string) || 'temp';

    if (!file) {
      return NextResponse.json({ error: 'No se ha proporcionado ningún archivo.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Normalizar el nombre del archivo para evitar caracteres problemáticos
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${crypto.randomUUID()}-${sanitizedFilename}`;
    const storagePath = `${folder}/${uniqueFilename}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado, devolvemos una imagen simulada/placeholder
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      console.log('Simulating file upload for file:', file.name, 'in folder:', folder);
      // Para desarrollo/pruebas locales sin Supabase, retornamos un placeholder estático
      const mockUrl = `/assets/${folder}/${sanitizedFilename}`.replace(/\/+/g, '/');
      return NextResponse.json({
        success: true,
        url: mockUrl,
      });
    }

    const publicUrl = await uploadFile(buffer, storagePath, file.type);

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err: any) {
    console.error('Error en POST /api/admin/upload:', err);
    return NextResponse.json({ error: err.message || 'Error al procesar la subida' }, { status: 500 });
  }
}
