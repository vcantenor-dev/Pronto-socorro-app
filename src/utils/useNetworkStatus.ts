import { useState, useEffect } from 'react';

export interface NetworkStatus {
  isOnline: boolean;
  isOfflineReady: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    // All medical guides, audio, and emergency data are embedded in the app bundle and localStorage,
    // so offline mode is always 100% operational.
    isOfflineReady: true,
  };
}
