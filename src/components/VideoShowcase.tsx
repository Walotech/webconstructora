'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Award, Leaf, Layers } from 'lucide-react';

const stats = [
  { label: 'Proyectos Completados', value: '48+', icon: Award },
  { label: 'Certificaciones LEED', value: '12', icon: Leaf },
  { label: 'Materiales Premium', value: '80+', icon: Layers },
];

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="showcase" className="relative py-24 bg-stone-950 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-8 bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
            Proceso Constructivo
          </span>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* LEFT — Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-100 leading-tight">
                Más que construir,{' '}
                <span className="text-emerald-400 font-normal">creamos legados</span>
              </h2>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Cada proyecto nace de una obsesión meticulosa por la proporción, la luz 
                y el material. Nuestro proceso integra ingeniería de vanguardia con 
                sensibilidad artesanal desde el primer boceto hasta la entrega final.
              </p>
            </div>

            {/* Stats grid */}
            <div className="space-y-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-stone-800/60 bg-stone-900/30 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 border border-emerald-400/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xl font-light text-white">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('planificador');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-6 bg-emerald-400 text-stone-950 font-mono text-xs uppercase tracking-[0.2em] hover:bg-emerald-300 transition-colors"
            >
              Planificar mi Proyecto →
            </motion.button>
          </motion.div>

          {/* CENTER — Vertical Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto"
            style={{ width: '100%', maxWidth: '320px' }}
          >
            {/* Video container — 9:16 aspect ratio */}
            <div
              className="relative bg-stone-900 border border-stone-800 overflow-hidden"
              style={{ aspectRatio: '9 / 16' }}
            >
              {/* Placeholder / video element */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
              >
                {/* Replace src with your actual video URL */}
                {/* <source src="/videos/aura-reel.mp4" type="video/mp4" /> */}
              </video>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

              {/* Play/Pause button */}
              <button
                id="video-play-btn"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:border-emerald-400/60 group-hover:bg-black/60 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </motion.div>
              </button>

              {/* Mute toggle */}
              <button
                id="video-mute-btn"
                onClick={toggleMute}
                className="absolute bottom-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-emerald-400/40 transition-colors"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-stone-300" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>

              {/* Label badge */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400 bg-stone-950/80 backdrop-blur-sm px-2 py-1 border border-emerald-400/20">
                  Tour de Obra
                </span>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400/40" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400/40" />
          </motion.div>

          {/* RIGHT — Decorative image + quality badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Main image */}
            <div className="relative overflow-hidden border border-stone-800/50 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
                alt="Corporativo Aurelia — Detalle arquitectónico"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300">
                  Corporativo Aurelia
                </p>
                <p className="text-xs text-stone-400 font-light">Paseo de la Reforma, México</p>
              </div>
            </div>

            {/* Quality badge */}
            <div className="p-4 bg-stone-900/40 border border-emerald-500/10">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400 mb-2">
                Garantía Estructural
              </p>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Todos nuestros proyectos cuentan con garantía estructural extendida de 
                <span className="text-white font-normal"> 15 años</span>, supervisión técnica 
                permanente y auditoría de materiales certificada.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
