/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Flame, CornerRightDown, Plus } from 'lucide-react';

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-stone-950 overflow-hidden pt-20"
    >
      {/* Visual background wrapper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920"
          alt="AURA Premium Architecture Backdrop"
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter saturate-50 brightness-75 transition-all duration-[8s]"
          style={{ transformOrigin: 'top center' }}
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle decorative vector blueprint lines */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          <div className="absolute top-[60%] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
          <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent" />
          <div className="absolute top-0 bottom-0 right-[25%] w-[1px] bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center sm:text-left w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Main Title Left Column */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Tagline */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 self-center sm:self-start mb-6">
              <span className="w-6 h-[1.5px] bg-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-medium">
                Estudio Residencial Premium
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extralight tracking-tight text-white leading-[1.1] mb-6"
            >
              Estructuras Literales.<br />
              <span className="font-semibold text-emerald-300">Espacios Eternos.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-stone-400 font-light max-w-2xl leading-relaxed mb-10"
            >
              En AURA materializamos la pureza de la madera de roble, el hormigón visto y la luz natural. Diseñamos e implementamos hábitats atemporales que trascienden generaciones con perfección técnica absoluta.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4"
            >
              <button
                id="hero-cta-projects"
                onClick={onScrollToProjects}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(16,185,129,0.4)] relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className="relative z-10">Explorar Proyectos</span>
              </button>
              
              <button
                id="hero-cta-contact"
                onClick={onScrollToContact}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-stone-900 border border-stone-800 hover:border-emerald-500/30 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300"
              >
                Solicitar Cita de Autor
              </button>
            </motion.div>
          </div>

          {/* Quick Metrics Right Column */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-6 lg:border-l lg:border-stone-900 lg:pl-10">
            {[
              { num: '14+', label: 'Premios de Arquitectura', desc: 'Reconocimiento internacional a la pureza estructural integrada.' },
              { num: '520k', label: 'Metros Cuadrados Planificados', desc: 'Obras de alta gama que combinan solidez constructiva y ecología.' },
              { num: 'LEED', label: 'Ecoeficiencia Máxima', desc: 'Todos nuestros proyectos aspiran a certificaciones Platinum o Gold.' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-stone-900/50 border border-stone-900 backdrop-blur-sm relative group hover:border-emerald-400/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-stone-800 group-hover:text-emerald-400/20 transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="font-sans text-3xl font-extralight text-white flex items-baseline gap-1">
                  <span className="text-emerald-400 font-medium">{stat.num.match(/^\d+/) ? stat.num.match(/^\d+/)?.[0] : stat.num}</span>
                  <span className="text-stone-400 text-sm font-light">{stat.num.replace(/^\d+/, '')}</span>
                </div>
                <div className="text-xs uppercase tracking-widest font-medium text-stone-300 mt-1 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-stone-500 font-light leading-relaxed">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll down trigger */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="cursor-pointer flex flex-col items-center"
            onClick={onScrollToProjects}
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-stone-500 uppercase mb-2">Deslizar</span>
            <div className="w-5 h-8 rounded-full border border-stone-800 flex items-start justify-center p-1">
              <span className="w-1 h-2 rounded-full bg-emerald-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
