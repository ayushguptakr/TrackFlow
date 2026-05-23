import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import * as authService from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [loading, setLoading] = useState(true);

  const setAuth = useCallback((authUser, authToken) => {
    setUser(authUser);
    setToken(authToken);
    localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    toast.success('Signed out successfully');
  }, [clearAuth]);

  const fetchCurrentUser = useCallback(async () => {
    const { data } = await authService.getMe();
    const currentUser = data.data.user;
    setUser(currentUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    return currentUser;
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = readStoredUser();

      if (!storedToken || !storedUser) {
        if (storedToken || storedUser) clearAuth();
        setLoading(false);
        return;
      }

      try {
        await fetchCurrentUser();
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [clearAuth, fetchCurrentUser]);

  const register = useCallback(
    async (payload) => {
      const { data } = await authService.register(payload);
      const { user: newUser, token: newToken } = data.data;
      setAuth(newUser, newToken);
      return newUser;
    },
    [setAuth]
  );

  const login = useCallback(
    async (payload) => {
      const { data } = await authService.login(payload);
      const { user: loggedInUser, token: newToken } = data.data;
      setAuth(loggedInUser, newToken);
      return loggedInUser;
    },
    [setAuth]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      setAuth,
      clearAuth,
      fetchCurrentUser,
    }),
    [user, token, loading, login, register, logout, setAuth, clearAuth, fetchCurrentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
