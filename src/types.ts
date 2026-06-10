/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// =============================================
// Core Domain Types (compatible con Supabase)
// =============================================

export interface Project {
  id: string;
  name: string;
  category: 'Residencial' | 'Corporativo' | 'Sostenible';
  location: string;
  image_url: string;   // Supabase Storage URL (antes: image)
  area: string;
  year: string;
  description: string;
  long_description: string;  // snake_case para Supabase (antes: longDescription)
  architect: string;
  materials: string[];        // Array de IDs o nombres (relación N:M en DB)
  status: 'Completado' | 'En Construcción' | 'Fase de Diseño';
  highlights: string[];
  created_at?: string;
  created_by?: string;
}

// Tipo legacy para compatibilidad con data.ts estático (Vite era camelCase)
export interface ProjectLegacy {
  id: string;
  name: string;
  category: 'Residencial' | 'Corporativo' | 'Sostenible';
  location: string;
  image: string;
  area: string;
  year: string;
  description: string;
  longDescription: string;
  architect: string;
  materials: string[];
  status: 'Completado' | 'En Construcción' | 'Fase de Diseño';
  highlights: string[];
}

export interface MaterialSample {
  id: string;
  name: string;
  category: string;
  description: string;
  texture_class: string;  // snake_case para Supabase (antes: textureClass)
  color_name: string;     // snake_case para Supabase (antes: colorName)
  created_at?: string;
  // Mantenemos alias para compatibilidad con componentes existentes
  textureClass?: string;
  colorName?: string;
}

export interface LeadMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_interest_id?: string;  // FK a projects (Supabase)
  projectInterest?: string;       // Nombre del proyecto (legado)
  custom_estimate_summary?: string;
  message: string;
  created_at?: string;
  status?: 'pending' | 'reviewed' | 'contacted';
  // Legado para compatibilidad con ContactForm
  date?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  display_order?: number;
}

export interface ApiKey {
  id: string;
  profile_id: string;
  name: string;
  key_hash: string;
  created_at: string;
  expires_at?: string;
  is_active: boolean;
}

export interface Profile {
  id: string;
  updated_at?: string;
  full_name: string;
  role: 'super_admin' | 'editor';
}

// =============================================
// API Response Types
// =============================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface EnquiriesResponse {
  enquiries: LeadMessage[];
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface UploadResponse {
  success: boolean;
  url: string;
}

export interface AiReviewRequest {
  prompt: string;
  context?: string;
}

export interface AiReviewResponse {
  recommendation: string;
  provider: 'gemini' | 'openai';
}
