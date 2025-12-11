import * as Network from "expo-network";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Тип для контекста
interface NetworkContextType {
  online: boolean | null;
  refresh: () => void;
}

// Создаем контекст
const NetworkContext = createContext<NetworkContextType>({
  online: null,
  refresh: () => {},
});

// Провайдер
export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [online, setOnline] = useState<boolean | null>(null);

  const checkPing = async () => {
    try {
      const res = await fetch("https://www.google.com", { method: "HEAD" });
      setOnline(res.ok);
    } catch {
      setOnline(false);
    }
  };

  useEffect(() => {
    checkPing();

    const sub = Network.addNetworkStateListener(() => {
      checkPing();
    });

    return () => sub.remove();
  }, []);

  return (
    <NetworkContext.Provider value={{ online, refresh: checkPing }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Хук для использования
export const useNetwork = () => useContext(NetworkContext);