import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

export function Toast({ toast }) {
  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'info':
        return <Info size={20} color="#0ea5e9" />;
      default:
        return <CheckCircle size={20} color="#10b981" />;
    }
  };

  return (
    <div className="toast-container" aria-live="assertive">
      <div className={`toast ${toast.type === 'error' ? 'toast-error' : ''}`}>
        {renderIcon()}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
