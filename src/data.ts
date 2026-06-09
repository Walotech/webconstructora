/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, MaterialSample, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'res-alura',
    name: 'Residencias Alura',
    category: 'Residencial',
    location: 'Costa Brava, España',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    area: '520 m²',
    year: '2025',
    description: 'Simbiosis perfecta entre geometría lineal depurada y el mar mediterráneo mediterráneo.',
    longDescription: 'Diseñada bajo un concepto de total apertura visual, Residencias Alura desafía los acantilados de la Costa Brava mediante costillas de hormigón blanco volcánico pretensado. Las terrazas se suspenden sobre el vacío, pavimentadas en teka natural y rodeadas por vidrio de seguridad extraclaro sin perfilería expuesta, eliminando todo obstáculo hacia el horizonte.',
    architect: 'Arq. Valeria Montes',
    materials: ['Hormigón Blanco Volcánico', 'Madera de Teka', 'Vidrio Estructural Low-E'],
    status: 'Completado',
    highlights: ['Piscina infinity de 25 metros', 'Instalación de domótica oculta', 'Sistema pasivo de climatización marina']
  },
  {
    id: 'torre-aurelia',
    name: 'Corporativo Aurelia',
    category: 'Corporativo',
    location: 'Paseo de la Reforma, México',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    area: '14,500 m²',
    year: '2026',
    description: 'Un rascacielos icónico con exoesqueleto autoportante y jardines colgantes verticales.',
    longDescription: 'Torre Aurelia reconfigura la silueta de la urbe con un exoesqueleto de acero estructural y láminas de bronce cepillado que cambian de tonalidad según la incidencia del sol. Con una certificación LEED Platinum, el edificio incorpora atrios ajardinados de triple altura cada cuatro niveles que mejoran de forma pasiva la calidad del aire del entorno de oficinas.',
    architect: 'Estudio AURA + Partners',
    materials: ['Bronce Cepillado', 'Vidrio Optiwhite', 'Concreto Martilinado'],
    status: 'En Construcción',
    highlights: ['Atrios ajardinados biofílicos', 'Fachada cinética inteligente', 'Cimentación antisísmica activa']
  },
  {
    id: 'complejo-roble',
    name: 'Refugio Roble',
    category: 'Sostenible',
    location: 'Valle de Ansó, Pirineos',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    area: '340 m²',
    year: '2024',
    description: 'Arquitectura alpina contemporánea con huella de carbono neutra y maderas certificadas.',
    longDescription: 'Refugio Roble representa el manifiesto sostenible del estudio. Situado en un claro de bosque prepirenaico, el proyecto aprovecha la pendiente natural para enterrar parcialmente su planta inferior, mejorando la inercia térmica. La superestructura se levanta en entramado de roble local certificado y se aísla con paneles de fibra de cáñamo natural de alta densidad.',
    architect: 'Arq. Mateo Silva',
    materials: ['Madera de Roble Ahumada', 'Pizarra Natural', 'Hormigón Celular Autoclavado'],
    status: 'Completado',
    highlights: ['Aislamiento térmico de paja y cáñamo', 'Panelado solar invisible integrado', 'Cosecha de agua pluvial purificada']
  },
  {
    id: 'santuario-nido',
    name: 'Santuario Nido Wellness',
    category: 'Residencial',
    location: 'Santa Eulalia, Ibiza',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
    area: '680 m²',
    year: '2027',
    description: 'Un santuario enfocado en el bienestar físico y acústico integrado en la roca nativa.',
    longDescription: 'Nido se concibe como una extensión de la roca calcárea del terreno. Excavado parcialmente en la ladera ibicenca, ofrece patios de luces interiores que canalizan la luz solar de forma indirecta, induciendo a un estado de contemplación absoluto. El aire se filtra mediante pozos canadienses de geotermia, manteniendo una temperatura constante de 21°C todo el año de forma natural.',
    architect: 'Arq. Valeria Montes',
    materials: ['Piedra Caliza Nativa', 'Microcemento Cenizo', 'Patinas de Cobre'],
    status: 'Fase de Diseño',
    highlights: ['Gimnasio subterráneo esculpido en roca', 'Patios interiores zen con agua continua', 'Techos ajardinados con flora autóctona']
  }
];

export const MATERIALS: MaterialSample[] = [
  {
    id: 'mat-concrete',
    name: 'Hormigón Volcánico Visto',
    category: 'Estructural / Petróleo',
    description: 'Hormigón vertido in situ utilizando agregados de basalto negro, pulido a mano para revelar una textura mate porosa de extrema durabilidad y tacto aterciopelado.',
    textureClass: 'bg-stone-800 border-stone-700 bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:16px_16px]',
    colorName: 'Antracita Ceniza'
  },
  {
    id: 'mat-oak',
    name: 'Roble Ahumado Macizo',
    category: 'Revestimiento / Calidez',
    description: 'Tablones de roble de bosques sustentables tratados térmicamente para potenciar sus taninos naturales, exhibiendo un color café profundo con vetas ricas y textura rústica suave.',
    textureClass: 'bg-amber-950/70 border-amber-900 bg-[linear-gradient(90deg,#451a03_1px,transparent_1px)] [background-size:24px_100%]',
    colorName: 'Marrón Imperial'
  },
  {
    id: 'mat-slate',
    name: 'Pizarra Natural Fósil',
    category: 'Cubierta / Acabado',
    description: 'Piedra sedimentaria extraída de canteras gallegas, exfoliada artesanalmente en placas irregulares que absorben y reflejan la luz solar de forma rica e imperfecta.',
    textureClass: 'bg-neutral-800 border-neutral-700 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:8px_8px]',
    colorName: 'Negro Grafito'
  },
  {
    id: 'mat-bronze',
    name: 'Bronce Cepillado Térmico',
    category: 'Metales / Acento',
    description: 'Aleación de cobre y estaño con terminación cepillada manual direccional y sellado protector céreo que favorece una oxidación lenta, orgánica y noble.',
    textureClass: 'bg-amber-900/40 border-amber-800 bg-gradient-to-tr from-amber-950/20 to-amber-600/30',
    colorName: 'Bronce Aureo'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-architect',
    title: 'Arquitectura de Vanguardia',
    description: 'Planificación integral fundamentada en la pureza volumétrica, el análisis biofísico del terreno y la optimización de vistas.',
    details: [
      'Modelado de Información de Construcción (BIM Nivel 3)',
      'Estudios bioclimáticos y de incidencia de vientos pasivos',
      'Planimetría ejecutiva de alta tolerancia milimétrica',
      'Visualizaciones fotorrealistas hiperdetalladas (3D)'
    ]
  },
  {
    id: 'srv-build',
    title: 'Construcción y Dirección de Obra',
    description: 'Ejecución integral en modalidad llave en mano, garantizando los más altos estándares de ingeniería y seguridad estructural.',
    details: [
      'Supervisión y control técnico de calidades en sitio',
      'Coordinación de ingenierías complejas e instalaciones especiales',
      'Selección de materiales con huella de carbono auditada',
      'Garantía estructural extendida de 15 años'
    ]
  },
  {
    id: 'srv-interior',
    title: 'Mobiliario y Atmósferas de Autor',
    description: 'Curaduría y diseño interior a la medida, buscando una coherencia táctil y cromática con la arquitectura de soporte.',
    details: [
      'Mobiliario fijo diseñado a medida (carpintería fina)',
      'Diseño acústico ambiental y aislamiento de salas críticas',
      'Iluminación arquitectónica teatral regulable por domótica',
      'Tratamiento de superficies táctiles (revestimientos minerales)'
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "AURA transformó nuestra visión en un refugio de roca y luz. Su paciencia técnica y rigor con los acabados en hormigón marcaron una diferencia absoluta.",
    author: "Federico e Inés de la Vega",
    role: "Propietarios de Residencias Alura",
    location: "Girona, España"
  },
  {
    quote: "Su capacidad de integrar tecnologías activas de eficiencia energética en el bronce de la Torre Aurelia redefine lo que debe ser un espacio corporativo premium.",
    author: "Ing. Alejandro Gándara",
    role: "Director de Operaciones, Aurelia Group",
    location: "CDMX, México"
  }
];
