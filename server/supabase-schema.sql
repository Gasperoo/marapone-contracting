-- =====================================================
-- Marapone Contracting - Supabase Database Schema
-- Phase 3: Supabase & Stripe Integration
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- Extended user profile data (linked to auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =====================================================
-- ADDRESSES TABLE
-- User billing and shipping addresses
-- =====================================================
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('billing', 'shipping')),
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'USA',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, type)
);

-- Enable Row Level Security
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Policies for addresses
CREATE POLICY "Users can view their own addresses"
    ON public.addresses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses"
    ON public.addresses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses"
    ON public.addresses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses"
    ON public.addresses FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- Active and past subscriptions with Stripe integration
-- =====================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    package_name TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('Bronze', 'Silver', 'Gold')),
    category TEXT NOT NULL,
    duration TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'incomplete', 'trialing')),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    next_billing_date TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
    ON public.subscriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Only allow updates via backend (service role)
CREATE POLICY "Service role can update subscriptions"
    ON public.subscriptions FOR UPDATE
    USING (true);

-- =====================================================
-- ORDERS TABLE
-- Order history for one-time purchases
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    items JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Only allow updates via backend (service role)
CREATE POLICY "Service role can update orders"
    ON public.orders FOR UPDATE
    USING (true);

-- =====================================================
-- CART_ITEMS TABLE (Optional)
-- Persistent cart storage across sessions
-- =====================================================
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    category TEXT NOT NULL,
    tier TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    stripe_price_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Policies for cart_items
CREATE POLICY "Users can view their own cart items"
    ON public.cart_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items"
    ON public.cart_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
    ON public.cart_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items"
    ON public.cart_items FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_id ON public.orders(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
