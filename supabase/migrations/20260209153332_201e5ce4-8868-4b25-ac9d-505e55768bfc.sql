
-- Create bridge design projects table
CREATE TABLE public.bridge_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Project',
  structure_type TEXT NOT NULL DEFAULT 'Highway',
  location_mode TEXT NOT NULL DEFAULT 'city',
  city_name TEXT,
  wind_speed NUMERIC,
  seismic_zone TEXT,
  seismic_factor NUMERIC,
  max_temp NUMERIC,
  min_temp NUMERIC,
  span NUMERIC,
  carriageway_width NUMERIC,
  footpath_type TEXT,
  skew_angle NUMERIC,
  girder_spacing NUMERIC,
  num_girders INTEGER,
  deck_overhang NUMERIC,
  girder_steel_grade TEXT DEFAULT 'E250',
  cross_bracing_steel_grade TEXT DEFAULT 'E250',
  deck_concrete_grade TEXT DEFAULT 'M30',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bridge_projects ENABLE ROW LEVEL SECURITY;

-- Helper function
CREATE OR REPLACE FUNCTION public.is_owner_of_bridge_project(project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bridge_projects WHERE id = project_id AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- RLS policies
CREATE POLICY "Users can insert their own projects"
  ON public.bridge_projects FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own projects"
  ON public.bridge_projects FOR SELECT
  USING (public.is_owner_of_bridge_project(id));

CREATE POLICY "Users can update their own projects"
  ON public.bridge_projects FOR UPDATE
  USING (public.is_owner_of_bridge_project(id));

CREATE POLICY "Users can delete their own projects"
  ON public.bridge_projects FOR DELETE
  USING (public.is_owner_of_bridge_project(id));

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_bridge_projects_updated_at
  BEFORE UPDATE ON public.bridge_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
