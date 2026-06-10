'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, Eye, MapPin, Search } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'Todos' | 'Residencial' | 'Corporativo' | 'Sostenible';

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesFilter = activeFilter === 'Todos' || proj.category === activeFilter;
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.architect.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories: CategoryFilter[] = ['Todos', 'Residencial', 'Corporativo', 'Sostenible'];

  return (
    <section id="proyectos" className="py-24 bg-stone-950 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                Obras Seleccionadas
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white">
              Arquitectura que <span className="font-semibold text-stone-100">Trasciende</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light max-w-lg mt-2">
              Explora nuestra cartera de residencias privadas de lujo y estructuras bioclimáticas diseñadas con rigor matérico.
            </p>
          </div>

          {/* Search bar inside projects section for real usability */}
          <div className="relative w-full md:w-80">
            <input
              id="project-search-input"
              type="text"
              placeholder="Buscar por obra, ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 placeholder-stone-600 px-4 py-2.5 text-xs font-mono rounded-none outline-none transition-all pl-10"
            />
            <Search className="w-4 h-4 text-stone-600 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-stone-900">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-tab-${cat.toLowerCase()}`}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 relative ${
                activeFilter === cat
                  ? 'text-emerald-400 border border-emerald-400/30 bg-emerald-400/5'
                  : 'text-stone-500 hover:text-stone-300 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
          
          <div className="ml-auto font-mono text-[9px] text-stone-600 hidden sm:block">
            Mostrando {filteredProjects.length} de {PROJECTS.length} resultados
          </div>
        </div>

        {/* Projects Grid Container with motion layouts */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer overflow-hidden bg-stone-900 border border-stone-800"
                onClick={() => onSelectProject(project)}
              >
                {/* Upper thumbnail aspect visual */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-center saturate-[0.35] brightness-75 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating badge for category */}
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-stone-950/80 border border-stone-800 text-[9px] font-mono tracking-widest uppercase text-stone-300">
                    {project.category}
                  </span>

                  {/* Eye look hover state overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-stone-950/40">
                    <div className="p-3 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-none text-emerald-400 flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                      <Eye className="w-4 h-4" /> Ver Detalles
                    </div>
                  </div>
                </div>

                {/* Text and meta values card footer */}
                <div className="p-6 bg-stone-900/90 relative z-20 border-t border-stone-900/50">
                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {project.location}
                    </span>
                    <span>{project.area}</span>
                  </div>

                  <h3 className="text-xl font-sans font-light text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
                    {project.name}
                  </h3>

                  <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-stone-950 flex flex-wrap gap-1">
                    {project.materials.slice(0, 2).map((item, id) => (
                      <span key={id} className="text-[10px] font-mono text-stone-500 border border-stone-800/80 px-2 py-0.5">
                        {item}
                      </span>
                    ))}
                    {project.materials.length > 2 && (
                      <span className="text-[9px] font-mono text-emerald-400 border border-emerald-400/10 bg-emerald-400/5 px-2 py-0.5">
                        +{project.materials.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty status check */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-stone-800/80">
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">No se encontraron proyectos</span>
          </div>
        )}
      </div>
    </section>
  );
}
