'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle, Database, Trash, ArrowRight, UserCheck } from 'lucide-react';
import { LeadMessage } from '../types';

interface ContactFormProps {
  exportedEstimate: string;
  onClearEstimate: () => void;
  interestProjectName: string;
}

export default function ContactForm({ exportedEstimate, onClearEstimate, interestProjectName }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [storedLeads, setStoredLeads] = useState<LeadMessage[]>([]);
  const [showAdminConsole, setShowAdminConsole] = useState(false);

  // Sync estimate exported or project interest
  useEffect(() => {
    if (exportedEstimate) {
      setFormData((prev) => ({
        ...prev,
        interest: 'Inversión Simulada',
        message: exportedEstimate
      }));
    }
  }, [exportedEstimate]);

  useEffect(() => {
    if (interestProjectName) {
      setFormData((prev) => ({
        ...prev,
        interest: interestProjectName,
        message: `Hola Aura, estoy interesado en recibir el dosier premium ampliado para la propiedad de lujo "${interestProjectName}". Me gustaría agendar una reunión.`
      }));
    }
  }, [interestProjectName]);

  // Read stored leads on mount
  useEffect(() => {
    const leads = localStorage.getItem('aura_landing_leads');
    if (leads) {
      try {
        setStoredLeads(JSON.parse(leads));
      } catch (err) {
        setStoredLeads([]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      return;
    }

    const newLead: LeadMessage = {
      id: `lead-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectInterest: formData.interest,
      message: formData.message,
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedLeads = [newLead, ...storedLeads];
    setStoredLeads(updatedLeads);
    localStorage.setItem('aura_landing_leads', JSON.stringify(updatedLeads));

    setSubmitted(true);
    
    // Auto reset submitted view after some time, keeping the state
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'General',
        message: ''
      });
      onClearEstimate();
    }, 4000);
  };

  const handleClearLeads = () => {
    localStorage.removeItem('aura_landing_leads');
    setStoredLeads([]);
  };

  return (
    <section id="contacto" className="py-24 bg-stone-900 border-t border-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
              Inicia Tu Obra De Arte
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-white animate-fade-in">
            Hablemos de su <span className="font-semibold text-stone-100">Próximo Espacio</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-405 text-stone-400 font-light max-w-lg mt-2">
            Nuestro equipo de arquitectos y asesores de inversión le responderá en menos de 24 horas garantizando total confidencialidad. Estilo, lujo y excelencia constructiva.
          </p>
        </div>

        {/* Dynamic Dual Layout (Contact Info + Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Technical Contacts (5 columns wide) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-stone-950 border border-stone-850 p-8 space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 border-b border-stone-900 pb-4">
                Oficina Central AURA
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">Sede Principal</div>
                    <div className="text-sm text-stone-300 font-light mt-1">Av. Diagonal 450, Planta 12, Barcelona 08006</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-stone-900/50 pt-4">
                  <Phone className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">Línea Directa Premium</div>
                    <div className="text-sm text-stone-300 font-light mt-1">+34 93 456 78 90</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-stone-900/50 pt-4">
                  <Mail className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">Despacho de Proyectos</div>
                    <div className="text-sm text-stone-300 font-light mt-1">proyectos@aurahabitats.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Certification Badge for Luxury feel */}
            <div className="bg-stone-950/20 border border-dashed border-stone-800 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-none border border-emerald-450/30 flex items-center justify-center text-emerald-450 bg-emerald-500/5">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-100 font-semibold font-mono">Garantía Decenal Asegurada</h4>
                <p className="text-[10px] text-stone-550 text-stone-550 text-stone-500 font-light leading-relaxed">Nuestros proyectos están amparados por pólizas de garantía de obra civil internacional.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Panel (7 columns wide) */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-850 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full border border-emerald-500 bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-sans font-light text-white">Solicitud Recibida</h3>
                  <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                    Hemos registrado su propuesta técnica en nuestra base de datos local. Un arquitecto tutor se pondrá en contacto para concretar el enlace de autor.
                  </p>
                  <div className="text-[10px] font-mono text-stone-605 text-stone-550 uppercase tracking-wide bg-stone-900 border border-stone-850 px-4 py-1.5 inline-block">
                    PROYECTO INTERÉS: {formData.interest}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  layout
                  initial={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {exportedEstimate && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 text-[11px] text-emerald-450 font-mono leading-relaxed flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" /> Presupuesto Simulado cargado del estimador.
                      </span>
                      <button
                        type="button"
                        onClick={onClearEstimate}
                        className="text-[10px] uppercase underline text-stone-400 hover:text-white"
                      >
                        Limpiar
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ej. Octavio Paz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 placeholder-stone-600 px-4 py-3 text-xs font-mono rounded-none outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 mb-2">
                        Correo Electrónico de Contacto *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="Ej. ejecutivo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 placeholder-stone-600 px-4 py-3 text-xs font-mono rounded-none outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 mb-2">
                        Teléfono Móvil
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Ej. +34 600 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 placeholder-stone-600 px-4 py-3 text-xs font-mono rounded-none outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 mb-2">
                        Interés de Obra
                      </label>
                      <select
                        id="contact-interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 px-4 py-3 text-xs font-mono rounded-none outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="General">Contacto General</option>
                        <option value="Residencias Alura">Residencias Alura</option>
                        <option value="Corporativo Aurelia">Corporativo Aurelia</option>
                        <option value="Refugio Roble">Refugio Roble</option>
                        <option value="Santuario Nido Wellness">Santuario Nido Wellness</option>
                        <option value="Inversión Simulada">Inversión Simulada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 mb-2">
                      Detalle del Proyecto o Mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Describa brevemente el alcance de su interés (Ubicación de terreno, m² estimados, materiales de preferencia...)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 focus:border-emerald-500/50 text-stone-300 placeholder-stone-600 px-4 py-3 text-xs font-mono rounded-none outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    id="submit-contact-form"
                    type="submit"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.2)]"
                  >
                    Enviar Solicitud <ArrowRight className="w-4 h-4 text-stone-950" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Simulive Administrative Area section for Lead reviews */}
        <div className="mt-16 pt-8 border-t border-stone-950">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-605 text-stone-500 uppercase tracking-widest">
              Entrada de Consultoría de Datos
            </span>
            
            <button
              id="toggle-admin-leads-console"
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className="text-[10px] font-mono text-stone-400 hover:text-emerald-400 transition-all underline outline-none focus:outline-none"
            >
              {showAdminConsole ? 'Ocultar Consola de Leads' : `Ver Leads Recibidos (${storedLeads.length})`}
            </button>
          </div>

          <AnimatePresence>
            {showAdminConsole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-stone-950 border border-stone-850 p-6 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-stone-900 pb-4 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-400" /> Consultorio de Clientes Registrados In-App
                  </span>
                  {storedLeads.length > 0 && (
                    <button
                      id="btn-clear-leads"
                      onClick={handleClearLeads}
                      className="text-[10px] font-mono text-read bg-stone-900 hover:bg-red-950/40 border border-stone-800 hover:border-red-900 px-3 py-1 text-red-400 transition-colors flex items-center gap-1 uppercase"
                    >
                      <Trash className="w-3.5 h-3.5" /> Vaciar Historial
                    </button>
                  )}
                </div>

                {storedLeads.length === 0 ? (
                  <div className="text-center py-8 text-stone-600 text-xs font-mono uppercase">
                    No hay solicitudes registradas aún. Envía el formulario para ver la persistencia.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                    {storedLeads.map((lead) => (
                      <div key={lead.id} className="p-4 bg-stone-900 border border-stone-850/80 space-y-2 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-950 pb-2">
                          <div>
                            <span className="font-semibold text-white text-sm">{lead.name}</span>
                            <span className="text-stone-500 font-mono mx-2">|</span>
                            <span className="font-mono text-stone-400 text-[10px]">{lead.email}</span>
                            {lead.phone && (
                              <>
                                <span className="text-stone-500 font-mono mx-2">|</span>
                                <span className="font-mono text-stone-400 text-[10px]">{lead.phone}</span>
                              </>
                            )}
                          </div>
                          <span className="text-[9px] font-mono bg-emerald-400/5 border border-emerald-400/20 text-emerald-300 px-2 py-0.5">
                            {lead.projectInterest}
                          </span>
                        </div>
                        <div className="text-stone-400 font-light whitespace-pre-wrap leading-relaxed py-1">
                          {lead.message}
                        </div>
                        <div className="text-right text-[9px] font-mono text-stone-600">
                          Enviado: {lead.date}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
