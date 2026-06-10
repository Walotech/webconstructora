'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, Quote, Plus, Ruler, Sparkles, Building, ChevronLeft } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../data';

export default function AboutAndServices() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div id="nosotros" className="bg-stone-950 border-t border-stone-900 relative">
      
      {/* 1. SECTION: NOSOTROS (PHILOSOPHY & TIMELINE) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Philosophical detail (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                  Nuestra Filosofía
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white leading-tight">
                El Silencio de los Materiales,<br />
                <span className="font-semibold text-stone-100">La Verdad de la Estructura.</span>
              </h2>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              <p>
                AURA Habitats no nace para decorar superficies. Nace para revelar la quietud tectónica y espacial que yace en la roca nativa, el hormigón expuesto honesto y las vetas milenarias de la madera de roble local. Buscamos un minimalismo sin artificios, sustentado en la proporción aérea, el asoleamiento de precisión y la eficiencia bioclimática silenciosa.
              </p>
              <p>
                Cada uno de nuestros encargos es tratado como una pieza monolítica única e irrepetible. Diseñamos bajo modelado BIM avanzado de nivel 3 coordinando ingenierías de fluidos y geotermia para garantizar misiones pasivas de bajo impacto planetario.
              </p>
            </div>

            {/* Core Values Bento Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: Ruler, title: "Proporción Áurea", text: "Dimensionamientos estrictos que inducen al bienestar físico." },
                { icon: Sparkles, title: "Materia Noble", text: "Uso de hormigón crudo, bronces y maderas sustentables certificadas." },
                { icon: Building, title: "BIM Ejecutivo", text: "Tolerancias de milímetros antes del primer vertp en sitio." },
              ].map((val, idx) => (
                <div key={idx} className="p-5 bg-stone-900/60 border border-stone-900 hover:border-stone-850 transition-colors">
                  <val.icon className="w-5 h-5 text-emerald-450 mb-3" />
                  <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-1">{val.title}</h4>
                  <p className="text-[10px] text-stone-500 font-light leading-relaxed">{val.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Testimonial Drawer (5 columns) */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-850 p-8 flex flex-col justify-between aspect-square lg:aspect-auto min-h-[400px] relative overflow-hidden group">
            
            {/* Subtle textured accent background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-50" />
            
            <div className="relative z-10 space-y-6">
              <Quote className="w-10 h-10 text-emerald-450/40" />
              
              <div className="relative overflow-hidden min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed italic">
                      &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                    </p>
                    
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-semibold">
                        {TESTIMONIALS[activeTestimonial].author}
                      </h4>
                      <p className="text-[10px] text-stone-550 text-stone-500 uppercase mt-0.5 font-mono">
                        {TESTIMONIALS[activeTestimonial].role} &mdash; {TESTIMONIALS[activeTestimonial].location}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination Manual Controls */}
            <div className="relative z-10 flex items-center justify-between border-t border-stone-850/60 pt-6">
              <span className="text-[10px] font-mono text-stone-500">
                CLIENTES AURA ({activeTestimonial + 1} / {TESTIMONIALS.length})
              </span>

              <div className="flex items-center space-x-2">
                <button
                  id="testimonial-prev"
                  onClick={prevTestimonial}
                  className="p-1.5 border border-stone-800 hover:border-emerald-550 text-stone-400 hover:text-white transition-colors"
                  aria-label="Testimonio anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="testimonial-next"
                  onClick={nextTestimonial}
                  className="p-1.5 border border-stone-800 hover:border-emerald-550 text-stone-400 hover:text-white transition-colors"
                  aria-label="Testimonio siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SECTION: SERVICIOS (PORTFOLIO OF SERVICES) */}
      <section id="servicios" className="py-24 border-t border-stone-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services title */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
              Despliegue De Disciplinas
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white">
            Nuestros <span className="font-semibold text-emerald-300">Servicios Globales</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-450 text-stone-400 font-light max-w-xl mt-2">
            Cubrimos desde la fase conceptual de autor hasta la entrega física de la llave. Gestión técnica integrada para el inversor exigente.
          </p>
        </div>

        {/* Services block displays cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 bg-stone-900 border border-stone-850 hover:border-emerald-500/20 hover:shadow-[0_4px_30px_rgba(16,185,129,0.02)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 border border-stone-800 flex items-center justify-center font-mono text-emerald-300 text-xs font-semibold mb-6">
                  {srv.id.replace('srv-', '').toUpperCase()}
                </div>
                
                <h3 className="text-xl font-sans font-normal text-white mb-3">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Technical features list */}
              <ul className="space-y-2.5 border-t border-stone-850/60 pt-6">
                {srv.details.map((det, id) => (
                  <li key={id} className="flex items-start text-[11px] text-stone-400 font-light leading-relaxed">
                    <span className="text-emerald-400 text-xs mr-2 relative top-[1px] font-bold">&middot;</span>
                    {det}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
