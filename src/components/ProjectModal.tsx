'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Layers, Layout, Grid, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string[]>([]);

  const handleDownload = (type: string) => {
    setDownloading(type);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded([...downloaded, type]);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Container wrapper click close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-stone-900 border border-stone-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
      >
        {/* Banner with close button */}
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-center saturate-75 brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/45" />
          
          <button
            id="close-project-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-950/80 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all rounded-none"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-light tracking-tight text-white mt-3">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Content / Descriptions */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-2">
                  Memoria Arquitectónica
                </h3>
                <p className="text-stone-300 font-light leading-relaxed text-sm sm:text-base">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-3">
                  Características Clave
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-xs text-stone-400 font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2.5 mt-1.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Meta Sidebar */}
            <div className="md:col-span-4 space-y-6 md:border-l md:border-stone-800 md:pl-8">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
                  Detalles Técnicos
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-xs text-stone-400">
                    <MapPin className="w-4 h-4 mr-3 text-emerald-400" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-stone-400">
                    <Layout className="w-4 h-4 mr-3 text-emerald-400" />
                    <span>{project.area} de superficie</span>
                  </div>

                  <div className="flex items-center text-xs text-stone-400">
                    <Calendar className="w-4 h-4 mr-3 text-emerald-400" />
                    <span>Entrega: {project.year}</span>
                  </div>

                  <div className="flex items-center text-xs text-stone-400">
                    <Layers className="w-4 h-4 mr-3 text-emerald-400" />
                    <span>Autor: {project.architect}</span>
                  </div>

                  <div className="flex items-center text-xs text-stone-400">
                    <Grid className="w-4 h-4 mr-3 text-emerald-400" />
                    <span className="px-2 py-0.5 border border-amber-500/20 bg-amber-500/10 text-amber-400 rounded-none text-[9px] uppercase tracking-wider font-mono">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
                  Materiales Predominantes
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-stone-950 border border-stone-800 text-[10px] text-stone-300 font-mono"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Document Download and Quick Inquire */}
          <div className="border-t border-stone-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-stone-950/80 border border-stone-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-sans font-medium text-white mb-1">Dosier Técnico Digital</h4>
                <p className="text-xs text-stone-500 font-light mb-4">Descarga planos constructivos simplificados y memoria técnica de acabados.</p>
              </div>
              
              {downloaded.includes('dossier') ? (
                <div className="flex items-center text-xs text-emerald-400 gap-1.5 font-mono py-2">
                  <CheckCircle className="w-4 h-4" /> Dosier Descargado Correctamente
                </div>
              ) : (
                <button
                  id="btn-download-technical"
                  onClick={() => handleDownload('dossier')}
                  disabled={!!downloading}
                  className="w-full py-2.5 bg-stone-900 border border-stone-700 hover:border-emerald-500 hover:bg-stone-800 font-mono text-[10px] uppercase tracking-wider text-white transition-all flex items-center justify-center gap-1.5"
                >
                  {downloading === 'dossier' ? (
                    <span className="animate-pulse">Estructurando PDF...</span>
                  ) : (
                    <>Descargar Dosier Técnico <Download className="w-3.5 h-3.5" /></>
                  )}
                </button>
              )}
            </div>

            <div className="p-5 bg-stone-950/80 border border-stone-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-sans font-medium text-white mb-1">Agendar Reunión de Autor</h4>
                <p className="text-xs text-stone-500 font-light mb-4">Coordina un enlace remoto o presencial para evaluar el desarrollo de este proyecto.</p>
              </div>

              <button
                id="btn-inquire-modal"
                onClick={() => {
                  onClose();
                  onInquire(project.name);
                }}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                Solicitar Cita <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
