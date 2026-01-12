import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-destructive/30 animate-fade-in">
      <div className="flex items-center gap-3 text-destructive">
        <AlertCircle className="w-6 h-6" />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};
