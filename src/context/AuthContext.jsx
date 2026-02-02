import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount and listen for auth changes
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    username: session.user.user_metadata?.username || session.user.email?.split('@')[0]
                });
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    username: session.user.user_metadata?.username || session.user.email?.split('@')[0]
                });
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (usernameOrEmail, password) => {
        try {
            // Supabase only supports email login, so we'll use email
            const { data, error } = await supabase.auth.signInWithPassword({
                email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@temp.com`,
                password
            });

            if (error) throw error;

            return {
                success: true,
                data: {
                    user: {
                        id: data.user.id,
                        email: data.user.email,
                        username: data.user.user_metadata?.username || data.user.email?.split('@')[0]
                    }
                }
            };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Invalid email or password');
        }
    };

    const register = async (username, email, password, terms) => {
        try {
            if (!terms) {
                throw new Error('You must accept the terms and conditions');
            }

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (error) throw error;

            // Check if email confirmation is required
            if (data.user && !data.session) {
                throw new Error('Please check your email to confirm your account');
            }

            return {
                success: true,
                data: {
                    user: {
                        id: data.user.id,
                        email: data.user.email,
                        username
                    }
                }
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    };

    const updatePassword = async (newPassword) => {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Update password error:', error);
            throw error;
        }
    };

    const updateUser = (userData) => {
        setUser(prevUser => ({ ...prevUser, ...userData }));
    };

    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
        updatePassword,
        updateUser,
        getSession,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
