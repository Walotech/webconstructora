/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  category: 'Residencial' | 'Corporativo' | 'Sostenible';
  location: string;
  image: string;
  area: string; // e.g. "450 m²"
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
  textureClass: string; // Tailwind class representing the visual feel
  colorName: string;
}

export interface LeadMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectInterest: string;
  message: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
}
