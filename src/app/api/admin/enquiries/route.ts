import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * GET /api/admin/enquiries
 * Obtiene todas las consultas registradas en la base de datos (ordenadas por fecha descendente).
 */
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      return NextResponse.json({ enquiries: [] });
    }

    const supabase = await createServiceClient();
    const { data: enquiries, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching enquiries from Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ enquiries: enquiries ?? [] });
  } catch (err: any) {
    console.error('Error en GET /api/admin/enquiries:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/enquiries
 * Actualiza el estado (status) de una consulta.
 * Body: { id: string, status: 'pending' | 'reviewed' | 'contacted' }
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'El ID y el estado son requeridos.' },
        { status: 400 }
      );
    }

    if (!['pending', 'reviewed', 'contacted'].includes(status)) {
      return NextResponse.json(
        { error: 'Estado inválido. Debe ser pending, reviewed o contacted.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      return NextResponse.json({ success: true, message: 'Simulado (Offline fallback)' });
    }

    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating enquiry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error en PATCH /api/admin/enquiries:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/enquiries
 * Elimina una consulta por ID.
 * Acepta ID por search params (?id=xxx) o por body { id: xxx }
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // Body no es JSON o no existe
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: 'El ID de la consulta es requerido.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      return NextResponse.json({ success: true, message: 'Simulado (Offline fallback)' });
    }

    const supabase = await createServiceClient();
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting enquiry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Consulta eliminada' });
  } catch (err: any) {
    console.error('Error en DELETE /api/admin/enquiries:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
