import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      className="rounded-2xl p-5 animate-fade-in"
      style={{
        background: 'rgba(255,107,53,0.06)',
        border: '1px solid rgba(255,107,53,0.25)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-xl"
          style={{ background: 'rgba(255,107,53,0.12)' }}
        >
          <AlertTriangle size={20} style={{ color: '#FF6B35' }} />
        </div>
        <p className="font-medium" style={{ color: '#ffd6c9' }}>
          {message}
        </p>
      </div>
    </div>
  );
};
