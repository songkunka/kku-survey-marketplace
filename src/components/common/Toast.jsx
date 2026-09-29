import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: '#0F172A',
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500',
        animation: 'slideUp 0.3s ease'
      }}
    >
      {isSuccess && <CheckCircle2 size={18} color="#22C55E" />}
      {isError && <AlertCircle size={18} color="#EF4444" />}
      {!isSuccess && !isError && <Info size={18} color="#3B82F6" />}
      <span>{toast.message}</span>
    </div>
  );
};
