import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: IProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      setIsAuth(!!token);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    setIsAuth(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};