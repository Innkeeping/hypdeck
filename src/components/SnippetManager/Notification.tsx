import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export const Notification: React.FC<NotificationProps> = ({ message, type }) => (
  <div className={`
    fixed top-4 right-4 z-[70]
    px-4 py-2 rounded-lg shadow-lg
    flex items-center gap-2
    animate-in slide-in-from-top-2 fade-in
    duration-200
    ${type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}
  `}>
    {type === 'success' ? (
      <CheckCircle size={16} />
    ) : (
      <AlertCircle size={16} />
    )}
    <span>{message}</span>
  </div>
);