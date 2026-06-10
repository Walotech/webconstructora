'use client';

import { useState, useEffect } from 'react';
import { LeadMessage } from '@/types';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock, Search, ExternalLink, ChevronRight, Inbox } from 'lucide-react';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<LeadMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed' | 'contacted'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<LeadMessage | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'reviewed' | 'contacted') => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al actualizar estado.');
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar permanentemente este lead?')) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al eliminar.');
    }
  };

  // Filter & Search Logic
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.phone && e.phone.includes(searchTerm));

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalLeads = enquiries.length;
  const pendingLeads = enquiries.filter((e) => e.status === 'pending' || !e.status).length;
  const contactedLeads = enquiries.filter((e) => e.status === 'contacted').length;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/D';
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
              Centro de Clientes & Leads
            </span>
          </div>
          <h1 className="text-3xl font-sans font-light tracking-tight text-white">
            Consultas <span className="font-semibold text-emerald-300">Recibidas</span>
          </h1>
        </div>
        
        {/* Quick metrics header dashboard */}
        <div className="grid grid-cols-3 gap-2 bg-stone-900 border border-stone-850 p-2 text-center">
          <div className="px-4 py-2">
            <div className="text-[9px] font-mono text-stone-500 uppercase">Total</div>
            <div className="text-lg font-mono font-semibold text-white">{totalLeads}</div>
          </div>
          <div className="px-4 py-2 border-x border-stone-850">
            <div className="text-[9px] font-mono text-stone-500 uppercase">Pendientes</div>
            <div className="text-lg font-mono font-semibold text-emerald-300">{pendingLeads}</div>
          </div>
          <div className="px-4 py-2">
            <div className="text-[9px] font-mono text-stone-500 uppercase">Contactados</div>
            <div className="text-lg font-mono font-semibold text-stone-400">{contactedLeads}</div>
          </div>
        </div>
      </div>

      {/* Toolbar filters and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o mensaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-850 text-white text-xs font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 rounded-none"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'reviewed', 'contacted'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-wider transition-all rounded-none ${
                statusFilter === filter
                  ? 'border-emerald-450 bg-emerald-400/5 text-emerald-300'
                  : 'border-stone-850 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              {filter === 'all'
                ? 'Todos'
                : filter === 'pending'
                ? 'Pendiente'
                : filter === 'reviewed'
                ? 'Revisado'
                : 'Contactado'}
            </button>
          ))}
        </div>
      </div>

      {/* Main CRM Workspace (Split screen layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Leads List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="border border-stone-850 bg-stone-900/40 p-12 text-center font-mono text-xs text-stone-500">
              <span className="inline-block w-4 h-4 border-2 border-stone-500 border-t-transparent rounded-full animate-spin mr-3 align-middle" />
              Sincronizando base de datos...
            </div>
          ) : error ? (
            <div className="border border-red-500/10 bg-red-950/5 p-6 text-center text-red-400 text-xs font-mono">
              Ocurrió un error: {error}
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="border border-stone-850 bg-stone-900/20 p-16 text-center space-y-4">
              <Inbox className="w-8 h-8 text-stone-600 mx-auto" />
              <div className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                Sin consultas que coincidan
              </div>
            </div>
          ) : (
            <div className="border border-stone-850 bg-stone-900 divide-y divide-stone-850 overflow-hidden">
              {filteredEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  onClick={() => setSelectedEnquiry(enquiry)}
                  className={`p-5 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedEnquiry?.id === enquiry.id
                      ? 'bg-stone-950/60 border-l-2 border-emerald-450'
                      : 'hover:bg-stone-950/30'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans text-sm font-semibold text-white truncate">
                        {enquiry.name}
                      </span>
                      {/* Enquiry Status Badge */}
                      <span
                        className={`text-[8px] font-mono uppercase px-2 py-0.5 border ${
                          enquiry.status === 'contacted'
                            ? 'border-stone-700 bg-stone-800 text-stone-400'
                            : enquiry.status === 'reviewed'
                            ? 'border-sky-500/20 bg-sky-950/20 text-sky-400'
                            : 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400'
                        }`}
                      >
                        {enquiry.status === 'contacted'
                          ? 'Contactado'
                          : enquiry.status === 'reviewed'
                          ? 'Revisado'
                          : 'Pendiente'}
                      </span>
                      {enquiry.custom_estimate_summary && (
                        <span className="text-[8px] font-mono uppercase px-2 py-0.5 border border-emerald-450/30 bg-emerald-450/5 text-emerald-300">
                          Presupuesto IA
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 text-[10px] font-mono text-stone-500">
                      <span className="truncate">{enquiry.email}</span>
                      <span className="shrink-0 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(enquiry.created_at)}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 font-light truncate max-w-md">
                      {enquiry.message}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-stone-600 transition-transform ${
                    selectedEnquiry?.id === enquiry.id ? 'translate-x-1 text-emerald-400' : ''
                  }`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Lead Detail Panel (5 cols) */}
        <div className="lg:col-span-5">
          {selectedEnquiry ? (
            <div className="bg-stone-900 border border-stone-850 p-6 sm:p-8 space-y-6 sticky top-6">
              
              <div className="border-b border-stone-850 pb-5 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-sans font-medium text-white">
                    Detalles del Lead
                  </h3>
                  <button
                    onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                    className="p-2 border border-stone-800 hover:border-red-900/30 text-stone-500 hover:text-red-400 hover:bg-red-950/10 transition-all cursor-pointer"
                    title="Eliminar consulta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">
                  ID: {selectedEnquiry.id}
                </p>
              </div>

              {/* Client Info grid */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                    Contacto
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-stone-300 font-mono">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a href={`mailto:${selectedEnquiry.email}`} className="hover:text-emerald-300 hover:underline">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                    {selectedEnquiry.phone && (
                      <div className="flex items-center gap-3 text-xs text-stone-300 font-mono">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <a href={`tel:${selectedEnquiry.phone}`} className="hover:text-emerald-300 hover:underline">
                          {selectedEnquiry.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{formatDate(selectedEnquiry.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Estimate Summary if from planner */}
                {selectedEnquiry.custom_estimate_summary && (
                  <div className="space-y-2 pt-4 border-t border-stone-850/50">
                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                      Cotización Planificador de Inversión
                    </div>
                    <div className="p-3 bg-stone-950 border border-stone-850 text-xs text-stone-300 leading-relaxed font-mono">
                      {selectedEnquiry.custom_estimate_summary}
                    </div>
                  </div>
                )}

                {/* Message detail */}
                <div className="space-y-2 pt-4 border-t border-stone-850/50">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                    Mensaje / Comentario
                  </div>
                  <div className="text-xs text-stone-300 leading-relaxed font-light whitespace-pre-wrap max-h-40 overflow-y-auto pr-2">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Actions & Status update pipeline */}
                <div className="space-y-3 pt-6 border-t border-stone-850">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                    Estado en el Pipeline
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['pending', 'reviewed', 'contacted'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedEnquiry.id, status)}
                        className={`py-2 text-center text-[9px] font-mono uppercase tracking-wider transition-all rounded-none ${
                          selectedEnquiry.status === status
                            ? 'bg-emerald-500 text-stone-950 font-semibold'
                            : 'bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-300'
                        }`}
                      >
                        {status === 'pending'
                          ? 'Pendiente'
                          : status === 'reviewed'
                          ? 'Revisado'
                          : 'Contactado'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="h-full border border-stone-850 border-dashed p-12 text-center flex flex-col justify-center items-center gap-3 text-stone-500 font-mono text-xs uppercase tracking-widest min-h-[400px]">
              <Clock className="w-8 h-8 text-stone-700" />
              <span>Selecciona un lead para ver detalles</span>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
