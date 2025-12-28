import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const userData = res.data.user;
        if (userData) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return res.data;
    };

    const register = async (username, email, password) => {
        const res = await api.post('/auth/register', { username, email, password });
        const userData = res.data.user;
        if (userData) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return res.data;
    };

    const loginWithToken = async (token) => {
        localStorage.setItem('token', token);
        const res = await api.get('/auth/profile');
        const userData = res.data.data;
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateProfile = async (data) => {
        const res = await api.put('/auth/update-profile', data);
        const userData = res.data.data;
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        return userData;
    };

    const refreshUser = async () => {
        try {
            const res = await api.get('/auth/profile');
            const userData = res.data.data;
            if (userData) {
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            }
        } catch (err) {
            console.error("Failed to refresh user stats", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithToken, logout, updateProfile, refreshUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
