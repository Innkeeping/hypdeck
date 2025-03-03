import { useState, useEffect } from 'react';

type NotificationType = {
  message: string;
  type: 'success' | 'error';
};

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
    notification,
    setNotification,
  };
};