'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, BookOpen, Download, CheckCircle, Flame } from 'lucide-react';

interface CatalogDossierModalProps {
  onClose: () => void;
}

export default function CatalogDossierModal({ onClose }: CatalogDossierModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadComplete, setDownloadComplete] = useState<boolean>(false);

  const totalPages = 4;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);
    }, 2000);
  };

  const pages = [
    {
      title: "Filosofía AURA: Espacios de Contemplación",
      subtitle: "Materialidad, Luz y Silencio",
      content: "Nuestra arquitectura rehúsa el adorno superfluo. Abrazamos la verdad constructiva tallando volúmenes puros en diálogo con los solsticios. Cada viga de roble local, cada vertido de hormigón volcánico responde a una lógica estructural honesta que favorece la quietud física y acústica del habitante.",
      quote: "La sobriedad no es la ausencia de elementos, es la presencia de la perfección.",
      author: "Valeria Montes, Socia Fundadora"
    },
    {
      title: "Materiales Honestos, Formas Eternas",
      subtitle: "Rigor constructivo certificado",
      content: "Seleccionamos materias que envejecen con dignidad. El bronce cepillado adquiere una pátina protectora orgánica; la caliza ibicenca se funde con los vientos costeros; la madera de roble ahumado consolida su fuerza estructural. Auditamos cada material bajo certificaciones de sostenibilidad estricta y bajo impacto de carbono.",
      quote: "Un edificio bien construido es aquel que pertenece al suelo sobre el que descansa.",
      author: "Mateo Silva, Director Sostenible"
    },
    {
      title: "Ingeniería de Tolerancia Milimétrica",
      subtitle: "BIM Nivel 3 y Modelados Bioclimáticos",
      content: "Un diseño excepcional colapsa sin una ejecución rigurosa. En AURA empleamos gemelos digitales y simulaciones de dinámica de fluidos para asegurar que la ventilación pasiva y la inercia térmica funcionen con precisión científica, reduciendo en un 80% las necesidades de climatización activa artificial.",
      quote: "El modelado BIM no es dibujo; es el ensayo digital exacto del ensamblaje matérico.",
      author: "Estudio AURA Ingeniería"
    },
    {
      title: "Plan Decenal de Innovación Sustentable",
      subtitle: "Desafío Net-Zero para el 2030",
      content: "Nuestras próximas obras contemplan la integración invisible de paneles solares fotovoltaicos cristalinos, depuración de aguas grises mediante humedales biológicos zonales y micro-cúpulas bioclimáticas autoportantes de hormigón celular de bajo impacto ambiental.",
      quote: "No construimos para el presente; erigimos el patrimonio del mañana.",
      author: "AURA Futuro"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Background overlay click closer */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-stone-900 border border-stone-850 max-w-3xl w-full flex flex-col justify-between shadow-2xl z-10"
      >
        {/* Header decoration bar */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-emerald-500/5 to-transparent h-1.5 w-full" />

        {/* Modal Controls Bar */}
        <div className="p-6 border-b border-stone-850 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Catálogo Editorial Decenal &mdash; AURA
          </span>
          
          <button
            id="close-catalog-modal"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white border border-stone-800 hover:border-emerald-500/35 transition-colors rounded-none outline-none"
            aria-label="Cerrar catálogo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Catalog Interactive Magazine Pages */}
        <div className="p-6 sm:p-10 flex-grow min-h-[340px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  {pages[currentPage - 1].subtitle}
                </span>
                <h3 className="text-xl sm:text-3xl font-sans font-light text-white leading-tight">
                  {pages[currentPage - 1].title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {pages[currentPage - 1].content}
              </p>

              <div className="border-l-2 border-emerald-450/40 pl-4 py-1 italic bg-stone-950/20">
                <p className="text-xs text-stone-400 leading-relaxed font-mono">
                  &ldquo;{pages[currentPage - 1].quote}&rdquo;
                </p>
                <span className="block text-[9px] uppercase tracking-wider text-stone-550 font-mono mt-1">
                  &mdash; {pages[currentPage - 1].author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls & Download slider */}
        <div className="p-6 border-t border-stone-850 bg-stone-950/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Pagination Controls */}
          <div className="flex items-center space-x-4">
            <button
              id="catalog-prev-page"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-stone-800 hover:border-emerald-500/40 text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Página anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <span className="text-xs font-mono text-stone-400">
              Págs. <span className="text-white font-semibold">{currentPage}</span> / {totalPages}
            </span>

            <button
              id="catalog-next-page"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-stone-800 hover:border-emerald-500/40 text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Página siguiente"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Download premium Brochure action */}
          <div className="w-full sm:w-auto">
            {downloadComplete ? (
              <div className="flex items-center text-xs font-mono text-emerald-450 text-emerald-450 bg-emerald-500/5 border border-emerald-500/20 px-4 py-2 hover:bg-emerald-500/10 transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" /> Dosier Descargado (PDF Simulado)
              </div>
            ) : (
              <button
                id="btn-download-catalog-pdf"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
              >
                {downloading ? (
                  <span className="animate-pulse">Generando PDF...</span>
                ) : (
                  <>Descargar PDF Completo <Download className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
