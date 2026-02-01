import React, { createContext, useContext, useState, useEffect } from 'react';
import { accountApi } from '../api/account';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = accountApi.getToken();
            if (token) {
                try {
                    // Try to get user profile with the token
                    const userData = await accountApi.getProfile();
                    setUser(userData);
                } catch (error) {
                    // Token is invalid, clear it
                    accountApi.setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (usernameOrEmail, password) => {
        const response = await accountApi.login({ usernameOrEmail, password });
        setUser(response.data.user);
        return response;
    };

    const register = async (username, email, password, terms) => {
        const response = await accountApi.register({ username, email, password, terms });
        setUser(response.data.user);
        return response;
    };

    const logout = async () => {
        await accountApi.logout();
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
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
