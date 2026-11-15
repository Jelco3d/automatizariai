# Restrict page_leads to admins

## Problem
Currently any signed-in user can read all leads (names, emails, phone numbers) from the page leads table.

## Change
- Remove the rule "Authenticated users can read leads".
- Add a rule: only users with the admin role can read leads.
- Keep the public submit rule unchanged, so webinar and other forms still save leads.

## Result
- Visitors can still sign up through forms.
- Only the admin sees leads in /business-dashboard/leads; other logged-in users see nothing.

## Technical details
Migration:
```sql
DROP POLICY "Authenticated users can read leads" ON public.page_leads;
CREATE POLICY "Admins can read leads" ON public.page_leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
```
Then re-run the security scan and mark the finding fixed.
