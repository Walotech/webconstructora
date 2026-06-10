import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/enquiries
 * Envía un nuevo mensaje de contacto o planificación de inversión.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, project_interest_id, custom_estimate_summary, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Los campos nombre, email y mensaje son obligatorios.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado, simulamos éxito (fallback offline/desarrollo local)
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      console.log('Simulating offline enquiry save:', {
        name,
        email,
        phone,
        project_interest_id,
        custom_estimate_summary,
        message,
        created_at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, message: 'Consulta registrada correctamente (Offline fallback)' });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('enquiries')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          project_interest_id: project_interest_id || null,
          custom_estimate_summary: custom_estimate_summary || null,
          message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error inserting enquiry:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error en POST /api/enquiries:', err);
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}
