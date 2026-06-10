-- ================================================
-- AURA Habitats — Datos Iniciales (Seed)
-- Ejecutar DESPUÉS de schema.sql
-- ================================================

-- Limpiar datos previos (seguro para re-ejecutar)
TRUNCATE public.project_materials CASCADE;
TRUNCATE public.enquiries CASCADE;
TRUNCATE public.services CASCADE;
TRUNCATE public.materials CASCADE;
TRUNCATE public.projects CASCADE;

-- ================================================
-- PROYECTOS
-- ================================================
INSERT INTO public.projects (id, name, category, location, image_url, area, year, description, long_description, architect, status, highlights) VALUES
(
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Residencias Alura',
  'Residencial',
  'Costa Brava, España',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  '520 m²',
  '2025',
  'Simbiosis perfecta entre geometría lineal depurada y el mar mediterráneo.',
  'Diseñada bajo un concepto de total apertura visual, Residencias Alura desafía los acantilados de la Costa Brava mediante costillas de hormigón blanco volcánico pretensado. Las terrazas se suspenden sobre el vacío, pavimentadas en teka natural y rodeadas por vidrio de seguridad extraclaro sin perfilería expuesta, eliminando todo obstáculo hacia el horizonte.',
  'Arq. Valeria Montes',
  'Completado',
  ARRAY['Piscina infinity de 25 metros', 'Instalación de domótica oculta', 'Sistema pasivo de climatización marina']
),
(
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Corporativo Aurelia',
  'Corporativo',
  'Paseo de la Reforma, México',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  '14,500 m²',
  '2026',
  'Un rascacielos icónico con exoesqueleto autoportante y jardines colgantes verticales.',
  'Torre Aurelia reconfigura la silueta de la urbe con un exoesqueleto de acero estructural y láminas de bronce cepillado que cambian de tonalidad según la incidencia del sol. Con una certificación LEED Platinum, el edificio incorpora atrios ajardinados de triple altura cada cuatro niveles que mejoran de forma pasiva la calidad del aire del entorno de oficinas.',
  'Estudio AURA + Partners',
  'En Construcción',
  ARRAY['Atrios ajardinados biofílicos', 'Fachada cinética inteligente', 'Cimentación antisísmica activa']
),
(
  'a1b2c3d4-0003-0003-0003-000000000003',
  'Refugio Roble',
  'Sostenible',
  'Valle de Ansó, Pirineos',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
  '340 m²',
  '2024',
  'Arquitectura alpina contemporánea con huella de carbono neutra y maderas certificadas.',
  'Refugio Roble representa el manifiesto sostenible del estudio. Situado en un claro de bosque prepirenaico, el proyecto aprovecha la pendiente natural para enterrar parcialmente su planta inferior, mejorando la inercia térmica. La superestructura se levanta en entramado de roble local certificado y se aísla con paneles de fibra de cáñamo natural de alta densidad.',
  'Arq. Mateo Silva',
  'Completado',
  ARRAY['Aislamiento térmico de paja y cáñamo', 'Panelado solar invisible integrado', 'Cosecha de agua pluvial purificada']
),
(
  'a1b2c3d4-0004-0004-0004-000000000004',
  'Santuario Nido Wellness',
  'Residencial',
  'Santa Eulalia, Ibiza',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
  '680 m²',
  '2027',
  'Un santuario enfocado en el bienestar físico y acústico integrado en la roca nativa.',
  'Nido se concibe como una extensión de la roca calcárea del terreno. Excavado parcialmente en la ladera ibicenca, ofrece patios de luces interiores que canalizan la luz solar de forma indirecta, induciendo a un estado de contemplación absoluto. El aire se filtra mediante pozos canadienses de geotermia, manteniendo una temperatura constante de 21°C todo el año de forma natural.',
  'Arq. Valeria Montes',
  'Fase de Diseño',
  ARRAY['Gimnasio subterráneo esculpido en roca', 'Patios interiores zen con agua continua', 'Techos ajardinados con flora autóctona']
);


-- ================================================
-- MATERIALES
-- ================================================
INSERT INTO public.materials (id, name, category, description, texture_class, color_name) VALUES
(
  'b1b2c3d4-0001-0001-0001-000000000001',
  'Hormigón Volcánico Visto',
  'Estructural / Petróleo',
  'Hormigón vertido in situ utilizando agregados de basalto negro, pulido a mano para revelar una textura mate porosa de extrema durabilidad y tacto aterciopelado.',
  'bg-stone-800 border-stone-700 bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:16px_16px]',
  'Antracita Ceniza'
),
(
  'b1b2c3d4-0002-0002-0002-000000000002',
  'Roble Ahumado Macizo',
  'Revestimiento / Calidez',
  'Tablones de roble de bosques sustentables tratados térmicamente para potenciar sus taninos naturales, exhibiendo un color café profundo con vetas ricas y textura rústica suave.',
  'bg-amber-950/70 border-amber-900 bg-[linear-gradient(90deg,#451a03_1px,transparent_1px)] [background-size:24px_100%]',
  'Marrón Imperial'
),
(
  'b1b2c3d4-0003-0003-0003-000000000003',
  'Pizarra Natural Fósil',
  'Cubierta / Acabado',
  'Piedra sedimentaria extraída de canteras gallegas, exfoliada artesanalmente en placas irregulares que absorben y reflejan la luz solar de forma rica e imperfecta.',
  'bg-neutral-800 border-neutral-700 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:8px_8px]',
  'Negro Grafito'
),
(
  'b1b2c3d4-0004-0004-0004-000000000004',
  'Bronce Cepillado Térmico',
  'Metales / Acento',
  'Aleación de cobre y estaño con terminación cepillada manual direccional y sellado protector céreo que favorece una oxidación lenta, orgánica y noble.',
  'bg-amber-900/40 border-amber-800 bg-gradient-to-tr from-amber-950/20 to-amber-600/30',
  'Bronce Aureo'
);


-- ================================================
-- RELACIONES PROYECTO ↔ MATERIALES
-- ================================================
INSERT INTO public.project_materials (project_id, material_id) VALUES
('a1b2c3d4-0001-0001-0001-000000000001', 'b1b2c3d4-0001-0001-0001-000000000001'), -- Alura ↔ Hormigón
('a1b2c3d4-0001-0001-0001-000000000001', 'b1b2c3d4-0004-0004-0004-000000000004'), -- Alura ↔ Bronce
('a1b2c3d4-0002-0002-0002-000000000002', 'b1b2c3d4-0004-0004-0004-000000000004'), -- Aurelia ↔ Bronce
('a1b2c3d4-0002-0002-0002-000000000002', 'b1b2c3d4-0001-0001-0001-000000000001'), -- Aurelia ↔ Hormigón
('a1b2c3d4-0003-0003-0003-000000000003', 'b1b2c3d4-0002-0002-0002-000000000002'), -- Roble ↔ Roble Ahumado
('a1b2c3d4-0003-0003-0003-000000000003', 'b1b2c3d4-0003-0003-0003-000000000003'), -- Roble ↔ Pizarra
('a1b2c3d4-0004-0004-0004-000000000004', 'b1b2c3d4-0001-0001-0001-000000000001'), -- Nido ↔ Hormigón
('a1b2c3d4-0004-0004-0004-000000000004', 'b1b2c3d4-0003-0003-0003-000000000003'); -- Nido ↔ Pizarra


-- ================================================
-- SERVICIOS
-- ================================================
INSERT INTO public.services (title, description, details, display_order) VALUES
(
  'Arquitectura de Vanguardia',
  'Planificación integral fundamentada en la pureza volumétrica, el análisis biofísico del terreno y la optimización de vistas.',
  ARRAY[
    'Modelado de Información de Construcción (BIM Nivel 3)',
    'Estudios bioclimáticos y de incidencia de vientos pasivos',
    'Planimetría ejecutiva de alta tolerancia milimétrica',
    'Visualizaciones fotorrealistas hiperdetalladas (3D)'
  ],
  1
),
(
  'Construcción y Dirección de Obra',
  'Ejecución integral en modalidad llave en mano, garantizando los más altos estándares de ingeniería y seguridad estructural.',
  ARRAY[
    'Supervisión y control técnico de calidades en sitio',
    'Coordinación de ingenierías complejas e instalaciones especiales',
    'Selección de materiales con huella de carbono auditada',
    'Garantía estructural extendida de 15 años'
  ],
  2
),
(
  'Mobiliario y Atmósferas de Autor',
  'Curaduría y diseño interior a la medida, buscando una coherencia táctil y cromática con la arquitectura de soporte.',
  ARRAY[
    'Mobiliario fijo diseñado a medida (carpintería fina)',
    'Diseño acústico ambiental y aislamiento de salas críticas',
    'Iluminación arquitectónica teatral regulable por domótica',
    'Tratamiento de superficies táctiles (revestimientos minerales)'
  ],
  3
);
