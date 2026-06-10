'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hexagon, Layers, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { MaterialSample } from '../types';
import { MATERIALS } from '../data';

interface MaterialLibraryProps {
  onInquireMaterial: (materialName: string) => void;
}

export default function MaterialLibrary({ onInquireMaterial }: MaterialLibraryProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSample>(MATERIALS[0]);
  const [requestedSamples, setRequestedSamples] = useState<string[]>([]);
  const [requesting, setRequesting] = useState<string | null>(null);

  const handleRequestSample = (matId: string, matName: string) => {
    setRequesting(matId);
    setTimeout(() => {
      setRequesting(null);
      setRequestedSamples([...requestedSamples, matId]);
      onInquireMaterial(matName);
    }, 1500);
  };

  return (
    <section id="materiales" className="py-24 bg-stone-900 border-t border-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
              Losa, Veta y Textura
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white">
            Nuestra <span className="font-semibold text-emerald-300">Materia Prima</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-450 font-light max-w-xl mt-2">
            La honestidad matérica define nuestro trazo. Trabajamos exclusivamente con elementos auténticos expuestos en su condición orgánica.
          </p>
        </div>

        {/* Showroom Interactive Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Materials selector column (5 columns wide) */}
          <div className="lg:col-span-5 flex flex-col space-y-4 justify-between">
            <div className="space-y-3">
              {MATERIALS.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    id={`btn-select-material-${mat.id}`}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full p-5 text-left border transition-all duration-300 flex items-center justify-between group rounded-none outline-none ${
                      isSelected
                        ? 'bg-stone-950 border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.05)]'
                        : 'bg-stone-950/40 border-stone-950 hover:border-stone-800'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1">
                        {mat.category}
                      </div>
                      <div className={`font-sans text-base font-light transition-colors ${
                        isSelected ? 'text-emerald-300' : 'text-white'
                      }`}>
                        {mat.name}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono text-stone-600 group-hover:text-stone-300 transition-colors uppercase">
                        {mat.colorName}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isSelected ? 'text-emerald-400 translate-x-1' : 'text-stone-700'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick architectural quote block */}
            <div className="p-6 bg-stone-950/40 border-l border-emerald-450/35 border border-transparent">
              <p className="text-xs text-stone-400 font-mono leading-relaxed italic">
                "El espacio no toma valor por sus ornamentos, sino por la honestidad táctil de la materia con la que la mampostería dialoga frente a la marea solar."
              </p>
              <div className="text-[9px] uppercase tracking-widest text-stone-600 font-mono mt-3">
                &mdash; Manifiesto de Obra Aura
              </div>
            </div>
          </div>

          {/* Right Material Visualizer display column (7 columns wide) */}
          <div className="lg:col-span-7">
            <div className="bg-stone-950 border border-stone-850 h-full p-8 flex flex-col justify-between relative overflow-hidden">
              
              {/* Material Texture Preview Shader Box */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" /> Simulación de Textura
                  </span>
                  
                  <span className="text-[10px] font-mono text-stone-600">
                    ID: {selectedMaterial.id.toUpperCase()}
                  </span>
                </div>

                {/* Tactile render simulator container */}
                <div className="relative aspect-[16/7] w-full border border-stone-800 overflow-hidden group">
                  <div className={`absolute inset-0 transition-transform duration-[10s] scale-100 group-hover:scale-105 ${selectedMaterial.textureClass}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
                  
                  {/* Grid layout line decorations */}
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] text-stone-400 bg-stone-950/60 px-2 py-1 backdrop-blur-sm border border-stone-800">
                    Patrón Físico Escala Cubo 1:10
                  </div>
                </div>

                {/* Material technical writeup */}
                <div>
                  <h3 className="text-lg font-sans font-light text-white mb-2">
                    {selectedMaterial.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                    {selectedMaterial.description}
                  </p>
                </div>
              </div>

              {/* Order physical sample option for immersive integration */}
              <div className="mt-8 pt-8 border-t border-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                    Muestra Decenal
                  </span>
                  <div className="text-xs text-stone-300 font-semibold mt-0.5">
                    Mapeo de muestras gratis para despachos
                  </div>
                </div>

                {requestedSamples.includes(selectedMaterial.id) ? (
                  <div className="flex items-center text-xs font-mono text-emerald-400 gap-1.5 bg-emerald-500/5 border border-emerald-500/20 px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4" /> Muestra Solicitada
                  </div>
                ) : (
                  <button
                    id={`btn-request-sample-${selectedMaterial.id}`}
                    onClick={() => handleRequestSample(selectedMaterial.id, selectedMaterial.name)}
                    disabled={!!requesting}
                    className="px-6 py-2.5 bg-stone-900 border border-stone-850 hover:border-emerald-500 text-[10px] text-white uppercase tracking-widest font-mono transition-all duration-300"
                  >
                    {requesting === selectedMaterial.id ? (
                      <span className="animate-pulse">Despachando...</span>
                    ) : (
                      'Solicitar Muestra Física'
                    )}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
