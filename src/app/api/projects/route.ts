import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PROJECTS } from '@/data';

/**
 * GET /api/projects
 * Retorna el listado de proyectos.
 * En producción: lee de Supabase.
 * Fallback: retorna los datos estáticos de data.ts si Supabase no está configurado.
 */
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado aún, usa datos estáticos
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      return NextResponse.json({ projects: PROJECTS });
    }

    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      // Fallback a datos estáticos si hay error de conexión
      return NextResponse.json({ projects: PROJECTS });
    }

    return NextResponse.json({ projects: projects ?? [] });

  } catch (err) {
    console.error('Error en GET /api/projects:', err);
    return NextResponse.json({ projects: PROJECTS });
  }
}
