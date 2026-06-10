'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { MATERIALS } from '@/data';
import { Plus, Edit2, Trash2, Save, ArrowLeft, Upload, Loader2, Eye, MapPin, Calendar, Compass, Shield } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View state: 'list' or 'form'
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Residencial' | 'Corporativo' | 'Sostenible'>('Residencial');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [area, setArea] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [architect, setArchitect] = useState('');
  const [status, setStatus] = useState<'Completado' | 'En Construcción' | 'Fase de Diseño'>('Completado');
  const [highlightsInput, setHighlightsInput] = useState(''); // Newline separated
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Submitting / Uploading states
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('No se pudo conectar con el servidor para obtener los proyectos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setName('');
    setCategory('Residencial');
    setLocation('');
    setImageUrl('');
    setArea('');
    setYear('');
    setDescription('');
    setLongDescription('');
    setArchitect('');
    setStatus('Completado');
    setHighlightsInput('');
    setSelectedMaterials([]);
    setView('form');
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setName(project.name);
    setCategory(project.category);
    setLocation(project.location);
    setImageUrl(project.image_url || (project as any).image || '');
    setArea(project.area);
    setYear(project.year);
    setDescription(project.description);
    setLongDescription(project.long_description || (project as any).longDescription || '');
    setArchitect(project.architect);
    setStatus(project.status);
    setHighlightsInput(project.highlights ? project.highlights.join('\n') : '');
    setSelectedMaterials(project.materials || []);
    setView('form');
  };

  // Handles image uploading to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', 'projects');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
      } else {
        alert('Error al subir imagen: ' + (data.error || 'Intente de nuevo.'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error de conexión al subir imagen.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMaterialToggle = (materialId: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(materialId)
        ? prev.filter((id) => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const highlights = highlightsInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const projectPayload = {
      name,
      category,
      location,
      image_url: imageUrl,
      area,
      year,
      description,
      long_description: longDescription,
      architect,
      status,
      highlights,
      materials: selectedMaterials,
    };

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';

      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectPayload),
      });

      const data = await res.json();

      if (data.success) {
        await fetchProjects();
        setView('list');
      } else {
        alert('Error al guardar proyecto: ' + data.error);
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Error de conexión al guardar el proyecto.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar permanentemente este proyecto del portafolio?')) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        await fetchProjects();
      } else {
        alert('Error al eliminar: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al eliminar.');
    }
  };

  return (
    <>
      {/* ─── List View Panel ────────────────────────────────────────────────── */}
      {view === 'list' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
                  Portafolio y Showroom
                </span>
              </div>
              <h1 className="text-3xl font-sans font-light tracking-tight text-white">
                Proyectos <span className="font-semibold text-emerald-300">Publicados</span>
              </h1>
            </div>
            
            <button
              onClick={handleOpenCreate}
              className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Proyecto</span>
            </button>
          </div>

          {loading ? (
            <div className="border border-stone-850 bg-stone-900/40 p-16 text-center font-mono text-xs text-stone-500">
              <Loader2 className="w-5 h-5 animate-spin mx-auto mb-3 text-emerald-400" />
              Sincronizando catálogo...
            </div>
          ) : error ? (
            <div className="border border-red-500/10 bg-red-950/5 p-6 text-center text-red-400 text-xs font-mono">
              {error}
            </div>
          ) : projects.length === 0 ? (
            <div className="border border-stone-850 bg-stone-900/20 p-20 text-center font-mono text-xs text-stone-500 uppercase tracking-widest">
              No hay proyectos creados aún. Comience agregando uno.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => {
                const img = project.image_url || (project as any).image || '';
                return (
                  <div
                    key={project.id}
                    className="bg-stone-900 border border-stone-850 hover:border-stone-800 transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Image Preview Block */}
                      <div className="relative h-48 bg-stone-950 overflow-hidden border-b border-stone-850">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img}
                            alt={project.name}
                            className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-700 font-mono text-[10px] uppercase">
                            Sin Imagen de Portada
                          </div>
                        )}
                        <span className="absolute top-3 right-3 text-[8px] font-mono uppercase bg-stone-950/90 border border-stone-800 px-2 py-0.5 text-stone-400">
                          {project.category}
                        </span>
                      </div>

                      {/* Detail text */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-sans font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-4 text-[10px] font-mono text-stone-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-450" /> {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-emerald-450" /> {project.year}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-450 font-light leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex gap-2 items-center flex-wrap">
                          <span className={`text-[8px] font-mono uppercase px-2.5 py-0.5 border ${
                            project.status === 'Completado'
                              ? 'border-emerald-500/20 bg-emerald-950/10 text-emerald-400'
                              : project.status === 'En Construcción'
                              ? 'border-amber-500/20 bg-amber-950/10 text-amber-400'
                              : 'border-stone-700 bg-stone-800 text-stone-400'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-[8px] font-mono uppercase px-2 py-0.5 border border-stone-800 bg-stone-950 text-stone-450">
                            {project.area}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="p-6 pt-0 flex gap-2 border-t border-stone-850/40 mt-4">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="flex-1 py-2.5 border border-stone-850 hover:border-stone-700 bg-stone-950 hover:bg-stone-900 text-stone-300 font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-emerald-400" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-4 py-2.5 border border-stone-850 hover:border-red-900/30 bg-stone-950 hover:bg-red-950/15 text-stone-500 hover:text-red-400 transition-all flex items-center justify-center cursor-pointer"
                        title="Eliminar proyecto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── Form View Panel (New / Edit) ───────────────────────────────────── */}
      {view === 'form' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('list')}
              className="p-2 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white bg-stone-900 transition-all rounded-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
                  {editingProject ? 'Editor de Proyecto' : 'Ficha de Creación'}
                </span>
              </div>
              <h1 className="text-2xl font-sans font-light tracking-tight text-white">
                {editingProject ? 'Modificar' : 'Crear'} <span className="font-semibold text-emerald-300">Proyecto de Autor</span>
              </h1>
            </div>
          </div>

          <form onSubmit={handleSaveProject} className="bg-stone-900 border border-stone-850 p-6 sm:p-8 space-y-8">
            
            {/* Grid Layout Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                  placeholder="ej: Residencias Alura"
                />
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500/50 rounded-none"
                >
                  <option value="Residencial">Residencial</option>
                  <option value="Corporativo">Corporativo</option>
                  <option value="Sostenible">Sostenible</option>
                </select>
              </div>

              {/* Location input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Ubicación Geográfica
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                  placeholder="ej: Costa Brava, España"
                />
              </div>

              {/* Year input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Año de Lanzamiento/Obra
                </label>
                <input
                  type="text"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                  placeholder="ej: 2025"
                />
              </div>

              {/* Area input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Superficie Construida
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                  placeholder="ej: 520 m²"
                />
              </div>

              {/* Architect input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Arquitecto Diseñador
                </label>
                <input
                  type="text"
                  required
                  value={architect}
                  onChange={(e) => setArchitect(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                  placeholder="ej: Arq. Valeria Montes"
                />
              </div>

              {/* Status input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Estado actual de Obra
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500/50 rounded-none"
                >
                  <option value="Completado">Completado</option>
                  <option value="En Construcción">En Construcción</option>
                  <option value="Fase de Diseño">Fase de Diseño</option>
                </select>
              </div>

              {/* Image Upload Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Imagen de Portada (Supabase Storage)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
                    placeholder="https://..."
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="upload-file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      disabled={uploadingImage}
                    />
                    <button
                      type="button"
                      disabled={uploadingImage}
                      className="h-full px-4 bg-stone-950 border border-stone-800 text-stone-400 hover:text-emerald-300 transition-all flex items-center gap-2 rounded-none"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span className="font-mono text-[10px] uppercase hidden sm:inline">Subir</span>
                    </button>
                  </div>
                </div>
                {imageUrl && (
                  <div className="mt-2 relative h-20 w-40 bg-stone-950 border border-stone-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Previsualización" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

            </div>

            {/* Textarea fields */}
            <div className="space-y-6">
              
              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Descripción Corta (Tarjeta)
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-sans font-light placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none leading-relaxed"
                  placeholder="Resumen del concepto y estética en un párrafo corto..."
                />
              </div>

              {/* Long Description */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Descripción Larga (Detalle Modal)
                </label>
                <textarea
                  required
                  rows={4}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-sans font-light placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none leading-relaxed"
                  placeholder="Detalle conceptual extendido, retos estructurales, distribución..."
                />
              </div>

              {/* Highlights tags */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Destacados / Especificaciones (Un detalle por línea)
                </label>
                <textarea
                  rows={3}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none leading-relaxed"
                  placeholder="ej:&#10;Piscina infinity de 25 metros&#10;Fachada cinética inteligente&#10;Sistema pasivo de climatización marina"
                />
              </div>

              {/* Materials checklist */}
              <div className="space-y-3">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                  Materiales Predominantes Asociados
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {MATERIALS.map((mat) => {
                    const isChecked = selectedMaterials.includes(mat.id);
                    return (
                      <button
                        type="button"
                        key={mat.id}
                        onClick={() => handleMaterialToggle(mat.id)}
                        className={`p-4 border text-left transition-all duration-200 outline-none rounded-none flex flex-col justify-between h-24 ${
                          isChecked
                            ? 'border-emerald-450 bg-emerald-400/5'
                            : 'border-stone-800 bg-stone-950 hover:border-stone-700'
                        }`}
                      >
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          isChecked ? 'text-emerald-300' : 'text-stone-500'
                        }`}>
                          {mat.name}
                        </span>
                        <span className="text-[9px] text-stone-500 mt-1 font-light leading-snug truncate w-full">
                          {mat.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Save Buttons panel */}
            <div className="pt-6 border-t border-stone-850 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-5 py-3.5 border border-stone-800 hover:border-stone-750 bg-transparent text-stone-400 hover:text-stone-200 font-mono text-xs uppercase tracking-widest transition-all rounded-none cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      )}
    </>
  );
}
