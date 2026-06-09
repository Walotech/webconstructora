/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, Calculator, ArrowRight, ShieldCheck, TreePine, Clock } from 'lucide-react';

interface InvestmentPlannerProps {
  onExportEstimate: (summary: string) => void;
}

export default function InvestmentPlanner({ onExportEstimate }: InvestmentPlannerProps) {
  const [propertyType, setPropertyType] = useState<'villa' | 'complex' | 'office' | 'refuge'>('villa');
  const [area, setArea] = useState<number>(450);
  const [materialLevel, setMaterialLevel] = useState<'classic' | 'premium' | 'collector'>('premium');
  const [automation, setAutomation] = useState<'pasivo' | 'integral'>('integral');

  // Estimate state
  const [estimatedBudget, setEstimatedBudget] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [timelineMonths, setTimelineMonths] = useState<number>(12);
  const [carbonOffset, setCarbonOffset] = useState<number>(0);

  useEffect(() => {
    // Calcul de base m2 (módulos sutiles de lujo)
    let basePricePerSqM = 2200;
    if (propertyType === 'complex') basePricePerSqM = 2400;
    if (propertyType === 'office') basePricePerSqM = 2800;
    if (propertyType === 'refuge') basePricePerSqM = 2500;

    // Ajuste de materiales
    let materialMultiplier = 1.0;
    if (materialLevel === 'premium') materialMultiplier = 1.25;
    if (materialLevel === 'collector') materialMultiplier = 1.45;

    // Automatizaciones domóticas
    let automationAddFreq = 0;
    if (automation === 'integral') {
      automationAddFreq = 120000; // Euros fijos de automatización avanzada
    }

    const calculatedBase = area * basePricePerSqM * materialMultiplier;
    const minBudget = calculatedBase + automationAddFreq;
    const maxBudget = minBudget * 1.15; // 15% de contingencias de lujo

    // Tiempos estimados de construcción
    let baseMonths = 10;
    if (area > 300) baseMonths = 12;
    if (area > 600) baseMonths = 16;
    if (area > 1200) baseMonths = 22;
    if (propertyType === 'office') baseMonths += 4;

    // Compensación carbono ficticia razonable
    const calculatedCarbon = Math.round(area * 1.34);

    setEstimatedBudget({
      min: Math.round(minBudget / 1000) * 1000,
      max: Math.round(maxBudget / 1000) * 1000,
    });
    setTimelineMonths(baseMonths);
    setCarbonOffset(calculatedCarbon);

  }, [propertyType, area, materialLevel, automation]);

  const handleExport = () => {
    const formattedBuilder = `${
      propertyType === 'villa' ? 'Villa Privada' : propertyType === 'complex' ? 'Complejo Multifamiliar' : propertyType === 'office' ? 'Oficina Bioclimática' : 'Refugio Sostenible'
    } de ${area} m², Acabados ${
      materialLevel === 'classic' ? 'Clásicos de Autor' : materialLevel === 'premium' ? 'Premium de Alta Gama' : 'Coleccionista Museográfico'
    }, con Domótica ${automation === 'pasivo' ? 'Pasiva Ecológica' : 'Integral AURA Connect'}. Cotización Estimada: ${estimatedBudget.min.toLocaleString('es-ES')}€ - ${estimatedBudget.max.toLocaleString('es-ES')}€`;
    
    onExportEstimate(formattedBuilder);
  };

  const getPropertyLabel = (type: string) => {
    if (type === 'villa') return 'Villa de Autor';
    if (type === 'complex') return 'Complejo de Lujo';
    if (type === 'office') return 'Oficina Bioclimática';
    return 'Refugio Alpino';
  };

  return (
    <section id="planificador" className="py-24 bg-stone-950 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-16 text-center sm:text-left">
          <div className="flex items-center space-x-2 justify-center sm:justify-start mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
              Simulador Técnico Financiero
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white">
            Planificador de <span className="font-semibold text-emerald-300">Inversión Premium</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl mt-2 mx-auto sm:mx-0">
            Configure las dimensiones, tipología de obra y especificaciones matéricas para estimar requerimientos presupuestarios preliminares.
          </p>
        </div>

        {/* Dynamic Simulator Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Controls Left Column (7 columns wide) */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-850 p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Factor 1: Tipología de Obra */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-3">
                  1. Tipología de Obra Premium
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['villa', 'complex', 'office', 'refuge'] as const).map((type) => (
                    <button
                      key={type}
                      id={`planner-type-${type}`}
                      onClick={() => setPropertyType(type)}
                      className={`py-3 px-2 border text-center transition-all duration-200 outline-none rounded-none text-[10px] sm:text-xs font-mono uppercase tracking-wider ${
                        propertyType === type
                          ? 'border-emerald-450 bg-emerald-400/5 text-emerald-300'
                          : 'border-stone-800 bg-stone-950 text-stone-500 hover:text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      {getPropertyLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Factor 2: Área Slider */}
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="uppercase tracking-[0.2em] text-stone-400">
                    2. Superficie de Construcción
                  </span>
                  <span className="text-emerald-400 font-semibold text-sm">
                    {area} m²
                  </span>
                </div>
                <div className="relative pt-2">
                  <input
                    id="planner-area-range"
                    type="range"
                    min={120}
                    max={1800}
                    step={10}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-stone-950 h-1.5 focus:outline-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-600 mt-2">
                    <span>120 m²</span>
                    <span>1,800 m²</span>
                  </div>
                </div>
              </div>

              {/* Factor 3: Grado de Acabados de Materiales */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-3">
                  3. Nivel de Selección de Acabados
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'classic', title: 'Clásico de Autor', desc: 'Espacios puros con maderas nacionales y concreto liso.' },
                    { key: 'premium', title: 'Premium Alta Gama', desc: 'Suelos de teka, mármoles importados, vidrio low-E.' },
                    { key: 'collector', title: 'Colección Museo', desc: 'Bronce cepillado manual, piedra labrada in situ, acabados irrepetibles.' },
                  ].map((mat) => (
                    <button
                      key={mat.key}
                      id={`planner-material-${mat.key}`}
                      onClick={() => setMaterialLevel(mat.key as any)}
                      className={`p-4 border text-left transition-all duration-200 outline-none rounded-none flex flex-col justify-between h-28 ${
                        materialLevel === mat.key
                          ? 'border-emerald-450 bg-emerald-400/5'
                          : 'border-stone-800 bg-stone-950 hover:border-stone-700'
                      }`}
                    >
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        materialLevel === mat.key ? 'text-emerald-300' : 'text-stone-400'
                      }`}>
                        {mat.title}
                      </span>
                      <span className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                        {mat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Factor 4: Automatización */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-3">
                  4. Automatización y Domótica Integrada
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'pasivo', label: 'Ecológica Pasiva', desc: 'Termorregulación sin necesidad de consumo eléctrico.' },
                    { key: 'integral', label: 'Domótica Integral AURA', desc: 'Control de iluminación teatral, música de autor y seguridad.' }
                  ].map((auto) => (
                    <button
                      key={auto.key}
                      id={`planner-automation-${auto.key}`}
                      onClick={() => setAutomation(auto.key as any)}
                      className={`p-4 border text-left transition-all duration-200 outline-none rounded-none h-22 flex flex-col justify-between ${
                        automation === auto.key
                          ? 'border-emerald-450 bg-emerald-400/5'
                          : 'border-stone-800 bg-stone-950 hover:border-stone-700'
                      }`}
                    >
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${
                        automation === auto.key ? 'text-emerald-300' : 'text-stone-400'
                      }`}>
                        {auto.label}
                      </span>
                      <span className="text-[9px] text-stone-500 font-light leading-relaxed">
                        {auto.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-850">
              <p className="text-[10px] font-mono text-stone-500 leading-relaxed">
                *Los valores arrojados por este estimador son indicativos basados en las medias de cotización del año en curso. No constituyen un presupuesto vinculante y requieren validación del departamento técnico de AURA.
              </p>
            </div>

          </div>

          {/* Results Display Right Column (5 columns wide) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Estimate Box */}
            <div className="bg-stone-900 border border-stone-850 p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
              
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-stone-400">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] font-medium">Presupuesto Estimado</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Inversión de Obra Civil + Planos</div>
                  <div className="text-3xl sm:text-4xl lg:text-4xl font-sans font-light text-emerald-300 tracking-tight">
                    {estimatedBudget.min.toLocaleString('es-ES')}€<sup>*</sup>
                  </div>
                  <div className="text-xs text-stone-400 font-light">
                    Rango estimado: de {estimatedBudget.min.toLocaleString('es-ES')}€ a {estimatedBudget.max.toLocaleString('es-ES')}€
                  </div>
                </div>

                {/* Technical stats indicators in small bento list */}
                <div className="border-t border-stone-850 pt-5 space-y-3">
                  
                  <div className="flex items-center justify-between text-xs py-2">
                    <span className="flex items-center gap-2 text-stone-400">
                      <Clock className="w-4 h-4 text-emerald-400" /> Tiempo de Construcción
                    </span>
                    <span className="font-mono text-white font-semibold">{timelineMonths} Meses</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 border-t border-stone-850/50">
                    <span className="flex items-center gap-2 text-stone-400">
                      <TreePine className="w-4 h-4 text-emerald-400" /> Compensación de CO2
                    </span>
                    <span className="font-mono text-emerald-300 font-semibold">{carbonOffset} kg/año</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 border-t border-stone-850/50">
                    <span className="flex items-center gap-2 text-stone-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantía de Estructura
                    </span>
                    <span className="font-mono text-stone-300">15 Años de Autor</span>
                  </div>

                </div>
              </div>

              {/* Action Button: Export to Contact Form */}
              <div className="pt-6 border-t border-stone-850">
                <button
                  id="btn-export-planner-estimate"
                  onClick={handleExport}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Exportar a Formulario <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>
                <div className="text-center text-[9px] text-stone-600 font-mono mt-2 uppercase tracking-wide">
                  Rellena automáticamente los campos del formulario de abajo
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
