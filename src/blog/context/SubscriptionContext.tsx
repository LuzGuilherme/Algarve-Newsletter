import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  justSubscribed: boolean;
  markAsSubscribed: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  justSubscribed: false,
  markAsSubscribed: () => {}
});

const STORAGE_KEY = 'algarve_subscribed';
const SESSION_KEY = 'algarve_just_subscribed';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [justSubscribed, setJustSubscribed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const markAsSubscribed = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    sessionStorage.setItem(SESSION_KEY, 'true');
    setIsSubscribed(true);
    setJustSubscribed(true);
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, justSubscribed, markAsSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
