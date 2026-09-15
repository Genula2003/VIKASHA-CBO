-- Seed Data for Meter Reader E-Billing System

-- Insert into auth.users (for local development only, using a dummy UUID and encrypted password 'password123')
-- IMPORTANT: In production or Supabase Cloud, create the user via the Supabase Dashboard Auth UI and insert the profile with the generated UUID.

INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'authenticated',
    'authenticated',
    'admin@example.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    NULL,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO NOTHING;

-- Seed Admin Profile
INSERT INTO profiles (id, role, name, email, status)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ADMIN', 'System Admin', 'admin@example.com', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Seed initial billing rule (Standard September Tariff)
INSERT INTO billing_rules (id, name, effective_from, effective_to, billing_period, status)
VALUES ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Standard September Tariff', '2026-09-01', '2026-09-30', 'Automatic', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Seed slabs for the rule
-- 0 - 100 units LKR 1,000 (FIXED)
-- 101 - 200 units LKR 12 per unit (PER_UNIT)
-- 201 - 300 units LKR 18 per unit (PER_UNIT)
-- 301+ units LKR 25 per unit (PER_UNIT)
INSERT INTO billing_rule_slabs (rule_id, from_unit, to_unit, type, rate, order_index)
VALUES
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 0, 100, 'FIXED', 1000, 1),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 101, 200, 'PER_UNIT', 12, 2),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 201, 300, 'PER_UNIT', 18, 3),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 301, NULL, 'PER_UNIT', 25, 4);

-- Seed initial consumers
INSERT INTO consumers (id, account_number, account_holder_name, email, mobile, address, status)
VALUES
    ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'ACC-00125', 'Kasun Perera', 'kasun@example.com', '0771234567', 'Colombo 7', 'ACTIVE'),
    ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c34', 'ACC-00126', 'Nimal Silva', 'nimal@example.com', '0719876543', 'Kandy', 'ACTIVE'),
    ('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380c35', 'ACC-00127', 'Amal Fernando', NULL, '0751122334', 'Galle', 'ACTIVE');

-- Seed initial meter readings for baseline
INSERT INTO meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
VALUES
    ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', NULL, '2026-08-31', 12320, 12450, 130, 'VALID'),
    ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c34', NULL, '2026-08-31', 5000, 5200, 200, 'VALID'),
    ('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380c35', NULL, '2026-08-31', 8000, 8080, 80, 'VALID');

