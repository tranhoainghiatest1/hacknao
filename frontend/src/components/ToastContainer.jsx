import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        let Icon = CheckCircle2;
        if (t.type === 'error') Icon = AlertCircle;
        if (t.type === 'info') Icon = Info;

        return (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <Icon size={18} />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
