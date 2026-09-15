-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'METER_READER')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT,
    assigned_area TEXT,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Consumers table
CREATE TABLE consumers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_number TEXT UNIQUE NOT NULL,
    account_holder_name TEXT NOT NULL,
    email TEXT,
    mobile TEXT,
    address TEXT,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Meter Reader Invitations
CREATE TABLE meter_reader_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    assigned_area TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Billing Rules
CREATE TABLE billing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    billing_period TEXT DEFAULT 'Automatic',
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Billing Rule Slabs
CREATE TABLE billing_rule_slabs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_id UUID REFERENCES billing_rules(id) ON DELETE CASCADE,
    from_unit INTEGER NOT NULL,
    to_unit INTEGER,
    type TEXT NOT NULL CHECK (type IN ('FIXED', 'PER_UNIT')),
    rate NUMERIC NOT NULL,
    order_index INTEGER NOT NULL
);

-- Meter Readings
CREATE TABLE meter_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consumer_id UUID REFERENCES consumers(id) ON DELETE CASCADE,
    reader_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reading_date DATE NOT NULL,
    previous_reading INTEGER NOT NULL,
    current_reading INTEGER NOT NULL,
    units_consumed INTEGER NOT NULL,
    status TEXT DEFAULT 'VALID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bills
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_number TEXT UNIQUE NOT NULL,
    consumer_id UUID REFERENCES consumers(id) ON DELETE CASCADE,
    reading_id UUID REFERENCES meter_readings(id) ON DELETE SET NULL,
    rule_id UUID REFERENCES billing_rules(id) ON DELETE SET NULL,
    rule_version INTEGER DEFAULT 1,
    rule_snapshot JSONB,
    billing_period_start DATE,
    billing_period_end DATE,
    amount NUMERIC NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('UNPAID', 'PARTIALLY_PAID', 'PAID', 'VOID')) DEFAULT 'UNPAID',
    pdf_url TEXT,
    access_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bill Calculation Items
CREATE TABLE bill_calculation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    description TEXT,
    units INTEGER,
    amount NUMERIC,
    order_index INTEGER
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    transaction_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    method TEXT,
    status TEXT DEFAULT 'SUCCESS',
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consumer_id UUID REFERENCES consumers(id) ON DELETE CASCADE,
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('EMAIL', 'SMS')),
    type TEXT NOT NULL CHECK (type IN ('BILL', 'RECEIPT', 'INVITATION')),
    recipient TEXT,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED', 'DEMO_SENT')),
    provider_message_id TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sent_at TIMESTAMP WITH TIME ZONE
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Settings
CREATE TABLE settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL,
    company_address TEXT NOT NULL,
    company_phone TEXT,
    company_email TEXT,
    currency TEXT DEFAULT 'LKR',
    timezone TEXT DEFAULT 'Asia/Colombo',
    bill_prefix TEXT DEFAULT 'INV',
    default_due_days INTEGER DEFAULT 14
);

-- Insert default settings
INSERT INTO settings (id, company_name, company_address, company_phone, company_email, currency, timezone, bill_prefix, default_due_days)
VALUES ('default', 'Water Board', '123 Main St, Colombo', '0112345678', 'info@waterboard.lk', 'LKR', 'Asia/Colombo', 'INV', 14);

-- ROW LEVEL SECURITY (RLS)

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on profiles" ON profiles FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Consumers
ALTER TABLE consumers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on consumers" ON consumers FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view consumers" ON consumers FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));

-- Meter Reader Invitations
ALTER TABLE meter_reader_invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on invitations" ON meter_reader_invitations FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- Billing Rules
ALTER TABLE billing_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on billing rules" ON billing_rules FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view active billing rules" ON billing_rules FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER') AND status = 'ACTIVE');

-- Billing Rule Slabs
ALTER TABLE billing_rule_slabs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on billing rule slabs" ON billing_rule_slabs FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view active billing rule slabs" ON billing_rule_slabs FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));

-- Meter Readings
ALTER TABLE meter_readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on meter readings" ON meter_readings FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can insert their own readings" ON meter_readings FOR INSERT WITH CHECK (auth.uid() = reader_id);
CREATE POLICY "Meter Readers can view readings" ON meter_readings FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));

-- Bills
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on bills" ON bills FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view bills" ON bills FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));
-- Note: Public access to bills is via the access_token in the app code, bypassing RLS using a service role client or a dedicated unauthenticated edge function / RPC. Or we can create an RLS policy for anonymous users.
-- Actually, the best way for public access is fetching server-side in Next.js using the admin key, validating the token.

-- Bill Calculation Items
ALTER TABLE bill_calculation_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on calculation items" ON bill_calculation_items FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view calculation items" ON bill_calculation_items FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));

-- Payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on payments" ON payments FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
-- We will handle new payments via Next.js API with service role

-- Notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on notifications" ON notifications FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- Audit Logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on audit logs" ON audit_logs FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));

-- Settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on settings" ON settings FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN'));
CREATE POLICY "Meter Readers can view settings" ON settings FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'METER_READER'));
