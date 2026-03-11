import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Simplified no-op provider — account system removed for B2B model
    const value = {
        user: null,
        loading: false,
        isAuthenticated: false,
        login: async () => {},
        register: async () => {},
        logout: async () => {},
        resetPassword: async () => {},
        updatePassword: async () => {},
        updateUser: () => {},
        getSession: async () => null,
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
