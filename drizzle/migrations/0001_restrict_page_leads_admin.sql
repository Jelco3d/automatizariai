DROP POLICY "Authenticated users can read leads" ON public.page_leads;
CREATE POLICY "Admins can read leads" ON public.page_leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));