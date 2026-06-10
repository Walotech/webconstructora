import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * PUT /api/admin/projects/[id]
 * Actualiza los datos de un proyecto y re-asocia sus materiales.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    if (!id) {
      return NextResponse.json({ error: 'ID de proyecto requerido.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado, simulamos éxito
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      console.log('Simulating project update for ID:', id, 'Data:', body);
      return NextResponse.json({ success: true, project: { id, ...body } });
    }

    const supabase = await createServiceClient();

    // 1. Actualizar el registro del proyecto
    const { data: project, error: updateError } = await supabase
      .from('projects')
      .update({
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
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating project in Supabase:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 2. Actualizar las relaciones de materiales
    // Primero, eliminamos las existentes para este proyecto
    const { error: deleteRelationsError } = await supabase
      .from('project_materials')
      .delete()
      .eq('project_id', id);

    if (deleteRelationsError) {
      console.error('Error removing old project-material relations:', deleteRelationsError);
      return NextResponse.json({
        success: true,
        project,
        warning: 'Proyecto actualizado, pero no se pudieron limpiar las relaciones antiguas de materiales: ' + deleteRelationsError.message,
      });
    }

    // Luego insertamos las nuevas relaciones si se proporcionan
    if (materials && Array.isArray(materials) && materials.length > 0) {
      const relationRows = materials.map((materialId: string) => ({
        project_id: id,
        material_id: materialId,
      }));

      const { error: insertRelationsError } = await supabase
        .from('project_materials')
        .insert(relationRows);

      if (insertRelationsError) {
        console.error('Error adding new project-material relations:', insertRelationsError);
        return NextResponse.json({
          success: true,
          project,
          warning: 'Proyecto actualizado, pero hubo un error asociando los nuevos materiales: ' + insertRelationsError.message,
        });
      }
    }

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    console.error('Error en PUT /api/admin/projects/[id]:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Elimina un proyecto de la base de datos (las relaciones de materiales se borran por CASCADE en BD).
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID de proyecto requerido.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Si Supabase no está configurado, simulamos éxito
    if (!supabaseUrl || supabaseUrl.includes('xxxxxxxxxxxx')) {
      console.log('Simulating project deletion for ID:', id);
      return NextResponse.json({ success: true, message: 'Proyecto eliminado (Offline fallback)' });
    }

    const supabase = await createServiceClient();

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting project from Supabase:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Proyecto eliminado exitosamente' });
  } catch (err: any) {
    console.error('Error en DELETE /api/admin/projects/[id]:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
