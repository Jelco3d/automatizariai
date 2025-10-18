-- Assign admin role to user erdeleanjelco1@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('6b86bc03-917e-4fc2-9524-dda2432fb66c', 'admin')
ON CONFLICT DO NOTHING;