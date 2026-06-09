/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Award } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenDossier: () => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, onOpenDossier, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Librería de Materiales', id: 'materiales' },
    { label: 'Planificador', id: 'planificador' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-900 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleItemClick('hero')}
            >
              <div className="w-9 h-9 rounded-none border border-emerald-400 group-hover:border-emerald-300 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">
                <span className="font-extralight text-sm tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">A</span>
                <div className="absolute inset-0 bg-emerald-400/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-light text-xl tracking-[0.25em] text-white">
                  AURA
                </span>
                <span className="font-mono text-[8px] tracking-[0.4em] text-stone-400 -mt-1 uppercase">
                  Habitats
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-emerald-400 relative py-1 ${
                    activeSection === item.id 
                      ? 'text-emerald-400' 
                      : 'text-stone-300'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Action Group */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                id="cta-navbar-catalog"
                onClick={onOpenDossier}
                className="group relative overflow-hidden px-4 py-2 border border-stone-700 bg-stone-900 hover:bg-stone-800 transition-all duration-300"
              >
                <span className="relative z-10 text-[10px] font-mono tracking-[0.2em] uppercase text-white group-hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1.5">
                  Ver Dosier <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                id="btn-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-300 hover:text-white p-1 rounded-none border border-transparent hover:border-stone-800 transition-colors focus:outline-none"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-stone-950/95 border-b border-stone-900 py-6 px-4 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left text-sm uppercase tracking-[0.2em] font-light py-2 px-3 border-l-2 transition-all ${
                    activeSection === item.id
                      ? 'border-emerald-400 text-emerald-400 bg-stone-900/40'
                      : 'border-transparent text-stone-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-stone-900 px-3">
                <button
                  id="cta-mobile-catalog"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDossier();
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 font-mono text-[10px] tracking-[0.22em] uppercase text-stone-950 font-semibold text-center transition-colors flex items-center justify-center gap-2"
                >
                  Ver Catálogo Decenal <ArrowUpRight className="w-4 h-4 text-stone-950" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
