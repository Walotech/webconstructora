'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutAndServices from '@/components/AboutAndServices';
import VideoShowcase from '@/components/VideoShowcase';
import ProjectsSection from '@/components/ProjectsSection';
import ProjectModal from '@/components/ProjectModal';
import MaterialLibrary from '@/components/MaterialLibrary';
import InvestmentPlanner from '@/components/InvestmentPlanner';
import ContactForm from '@/components/ContactForm';
import CatalogDossierModal from '@/components/CatalogDossierModal';
import { Project } from '@/types';
import { TreePine } from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [exportedEstimate, setExportedEstimate] = useState<string>('');
  const [inquireProjectName, setInquireProjectName] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show back to top and update current section indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['hero', 'nosotros', 'showcase', 'proyectos', 'materiales', 'planificador', 'servicios', 'contacto'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportEstimate = (summary: string) => {
    setExportedEstimate(summary);
    setTimeout(() => {
      handleNavigate('contacto');
    }, 100);
  };

  const handleQuickInquire = (projectName: string) => {
    setInquireProjectName(projectName);
    setTimeout(() => {
      handleNavigate('contacto');
    }, 100);
  };

  const handleClearEstimate = () => {
    setExportedEstimate('');
    setInquireProjectName('');
  };

  return (
    <div
      id="aura-app-root"
      className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased overflow-x-hidden"
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {/* Background elegant gradient accents */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] bg-emerald-400/5 blur-[120px] pointer-events-none z-0" />

      {/* Primary Layout Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenDossier={() => setIsCatalogOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections Shell */}
      <main className="relative z-10">

        {/* 1. Hero Section */}
        <Hero
          onScrollToProjects={() => handleNavigate('proyectos')}
          onScrollToContact={() => handleNavigate('contacto')}
        />

        {/* 2. Nosotros & Servicios combined */}
        <AboutAndServices />

        {/* 3. NEW: Video Showcase — 3 column layout with vertical video */}
        <VideoShowcase />

        {/* 4. Featured Luxury Projects Section */}
        <ProjectsSection onSelectProject={setSelectedProject} />

        {/* 5. Tactile Showroom Materials Library Section */}
        <MaterialLibrary onInquireMaterial={handleQuickInquire} />

        {/* 6. Investment Budget Planner Segment */}
        <InvestmentPlanner onExportEstimate={handleExportEstimate} />

        {/* 7. Contact Information Entry Forms */}
        <ContactForm
          exportedEstimate={exportedEstimate}
          onClearEstimate={handleClearEstimate}
          interestProjectName={inquireProjectName}
        />

      </main>

      {/* Luxury Minimalist Site Footer */}
      <footer id="main-footer" className="bg-stone-950 border-t border-stone-900 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-900 pb-12 mb-12">

            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border border-emerald-400 flex items-center justify-center">
                  <span className="font-sans font-light text-slate-100 text-xs">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-light text-base tracking-[0.2em] text-white">
                    AURA
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-stone-500 uppercase -mt-1">
                    Habitats
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Estudio técnico-arquitectónico de alta gama y construcción integrada internacional bajo principios de honestidad constructiva.
              </p>
            </div>

            {/* Quick access navigations */}
            <div>
              <h4 className="text-[10px] font-mono text-white uppercase tracking-[0.2em] mb-4">
                Estudio Premium
              </h4>
              <ul className="space-y-2 text-xs font-light text-stone-400">
                {['nosotros', 'proyectos', 'materiales', 'planificador'].map((item) => (
                  <li key={item}>
                    <button
                      id={`footer-nav-${item}`}
                      onClick={() => handleNavigate(item)}
                      className="hover:text-emerald-400 transition-colors uppercase tracking-widest text-[9px] font-mono"
                    >
                      {item === 'nosotros' ? 'Nosotros' : item === 'proyectos' ? 'Proyectos' : item === 'materiales' ? 'Materiales' : 'Planificador'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact quick hours */}
            <div>
              <h4 className="text-[10px] font-mono text-white uppercase tracking-[0.2em] mb-4">
                Horarios de Enlace
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Lunes a Viernes de Autor:<br />
                09:00h a 18:00h (CET)<br />
                Sábados con cita de inversión coordinada.
              </p>
            </div>

            {/* Ecological / Sustainability disclaimer */}
            <div className="p-4 bg-stone-900/40 border border-stone-900/50 flex flex-col justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-300 flex items-center gap-1.5 font-semibold">
                <TreePine className="w-3.5 h-3.5 text-emerald-400" /> Huella de Carbono Auditada
              </span>
              <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-2">
                Compensamos el 100% de emisiones operativas del despacho y financiamos siembra forestal en áreas pirenaicas de cantera.
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-stone-600 gap-4">
            <div>
              &copy; {new Date().getFullYear()} AURA HABITATS S.L. Todos los derechos de obra reservados.
            </div>

            <div className="flex items-center space-x-6 uppercase">
              <span className="hover:text-stone-400 cursor-pointer">Aviso de Privacidad</span>
              <span>&middot;</span>
              <span className="hover:text-stone-400 cursor-pointer font-bold text-emerald-400">Certificación LEED Partner</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Dialog for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onInquire={handleQuickInquire}
          />
        )}
      </AnimatePresence>

      {/* Modal Dialog for Dossier / Catalog */}
      <AnimatePresence>
        {isCatalogOpen && (
          <CatalogDossierModal onClose={() => setIsCatalogOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => handleNavigate('hero')}
            className="fixed bottom-6 right-6 z-40 p-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/50 text-stone-300 hover:text-emerald-400 transition-all outline-none group"
            aria-label="Subir al inicio"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
