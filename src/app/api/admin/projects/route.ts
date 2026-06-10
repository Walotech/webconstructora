import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * POST /api/admin/projects
 * Crea un nuevo proyecto e inserta sus relaciones de materiales.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      category,
      location,
      image_url,
      area,
      year,
      description,
      long_description,
      architect,
      status,
      highlights,
      materials, // Array de IDs de materiales
    } = body;

    if (!name || !category || !location || !status) {
      return NextResponse.json(
        { error: 'Los campos nombre, categoría, ubicación y estado son requeridos.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado, devolvemos éxito simulado
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      console.log('Simulating project creation:', body);
      const mockProject = {
        id: crypto.randomUUID(),
        ...body,
        created_at: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, project: mockProject });
    }

    const supabase = await createServiceClient();

    // 1. Insertar el proyecto
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          name,
          category,
          location,
          image_url: image_url || '',
          area: area || '',
          year: year || '',
          description: description || '',
          long_description: long_description || '',
          architect: architect || '',
          status,
          highlights: highlights || [],
        },
      ])
      .select()
      .single();

    if (projectError) {
      console.error('Error creating project in Supabase:', projectError);
      return NextResponse.json({ error: projectError.message }, { status: 500 });
    }

    // 2. Insertar relaciones de materiales si se proporcionan
    if (materials && Array.isArray(materials) && materials.length > 0) {
      const relationRows = materials.map((materialId: string) => ({
        project_id: project.id,
        material_id: materialId,
      }));

      const { error: relationError } = await supabase
        .from('project_materials')
        .insert(relationRows);

      if (relationError) {
        console.error('Error linking project materials:', relationError);
        // Retornamos el proyecto creado pero con advertencia de que no se asociaron los materiales
        return NextResponse.json({
          success: true,
          project,
          warning: 'Proyecto creado pero hubo un error asociando materiales: ' + relationError.message,
        });
      }
    }

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    console.error('Error en POST /api/admin/projects:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
