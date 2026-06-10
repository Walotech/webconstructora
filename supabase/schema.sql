-- ================================================
-- AURA Habitats — Supabase PostgreSQL Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ================================================

-- 1. TABLA: profiles (administradores del panel)
-- Extiende la tabla auth.users de Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  full_name  TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'editor'))
);

-- Trigger: crea automáticamente un perfil cuando se registra un usuario en Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. TABLA: api_keys (claves API con hash SHA-256 para partners externos)
CREATE TABLE IF NOT EXISTS public.api_keys (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  key_hash    TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at  TIMESTAMP WITH TIME ZONE,
  is_active   BOOLEAN DEFAULT true
);


-- 3. TABLA: projects (portafolio arquitectónico)
CREATE TABLE IF NOT EXISTS public.projects (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  category         TEXT NOT NULL CHECK (category IN ('Residencial', 'Corporativo', 'Sostenible')),
  location         TEXT NOT NULL,
  image_url        TEXT NOT NULL DEFAULT '',
  area             TEXT NOT NULL,
  year             TEXT NOT NULL,
  description      TEXT NOT NULL,
  long_description TEXT NOT NULL,
  architect        TEXT NOT NULL,
  status           TEXT NOT NULL CHECK (status IN ('Completado', 'En Construcción', 'Fase de Diseño')),
  highlights       TEXT[] DEFAULT '{}',
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by       UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);


-- 4. TABLA: materials (showroom de materiales)
CREATE TABLE IF NOT EXISTS public.materials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  description   TEXT NOT NULL,
  texture_class TEXT NOT NULL,
  color_name    TEXT NOT NULL,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 5. TABLA: project_materials (relación N:M proyectos ↔ materiales)
CREATE TABLE IF NOT EXISTS public.project_materials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  UNIQUE(project_id, material_id)
);


-- 6. TABLA: services (servicios del estudio)
CREATE TABLE IF NOT EXISTS public.services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  details       TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0
);


-- 7. TABLA: enquiries (leads y consultas de clientes)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    TEXT NOT NULL,
  email                   TEXT NOT NULL,
  phone                   TEXT,
  project_interest_id     UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  custom_estimate_summary TEXT,
  message                 TEXT NOT NULL,
  created_at              TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status                  TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted'))
);


-- ================================================
-- ROW LEVEL SECURITY (RLS) — Políticas de Acceso
-- ================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries      ENABLE ROW LEVEL SECURITY;

-- PROYECTOS: Lectura pública (cualquier visitante puede ver el portafolio)
CREATE POLICY "projects_public_read" ON public.projects
  FOR SELECT USING (true);

-- PROYECTOS: Solo admins autenticados pueden crear/editar/eliminar
CREATE POLICY "projects_admin_write" ON public.projects
  FOR ALL USING (auth.uid() IS NOT NULL);

-- MATERIALES: Lectura pública
CREATE POLICY "materials_public_read" ON public.materials
  FOR SELECT USING (true);

-- MATERIALES: Solo admins
CREATE POLICY "materials_admin_write" ON public.materials
  FOR ALL USING (auth.uid() IS NOT NULL);

-- SERVICIOS: Lectura pública
CREATE POLICY "services_public_read" ON public.services
  FOR SELECT USING (true);

-- SERVICIOS: Solo admins
CREATE POLICY "services_admin_write" ON public.services
  FOR ALL USING (auth.uid() IS NOT NULL);

-- PROJECT_MATERIALS: Lectura pública
CREATE POLICY "project_materials_public_read" ON public.project_materials
  FOR SELECT USING (true);

-- PROJECT_MATERIALS: Solo admins
CREATE POLICY "project_materials_admin_write" ON public.project_materials
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ENQUIRIES: Inserción pública (cualquiera puede enviar un formulario)
CREATE POLICY "enquiries_public_insert" ON public.enquiries
  FOR INSERT WITH CHECK (true);

-- ENQUIRIES: Solo admins pueden leer y actualizar
CREATE POLICY "enquiries_admin_read_update" ON public.enquiries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "enquiries_admin_update" ON public.enquiries
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- PERFILES: Cada admin solo puede leer/editar su propio perfil
CREATE POLICY "profiles_own_access" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- API KEYS: Solo el dueño puede ver y gestionar sus claves
CREATE POLICY "api_keys_own_access" ON public.api_keys
  FOR ALL USING (auth.uid() = profile_id);

-- Nota: Las operaciones de la API externa usan Service Role Key (bypassea RLS)
-- El middleware de Next.js valida el api_key antes de usar la Service Role Key
