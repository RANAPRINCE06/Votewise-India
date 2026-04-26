import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-card p-10 bg-white shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-2 border border-red-100">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Something went wrong</h1>
            <p className="text-slate-600 leading-relaxed">
              The application encountered an unexpected error. This has been logged for our engineers.
            </p>
            <div className="flex flex-col gap-3">
                <button
                onClick={() => window.location.reload()}
                className="w-full interactive-btn bg-slate-900 text-white flex items-center justify-center gap-2"
                >
                <RefreshCw className="w-4 h-4" /> Reload Application
                </button>
                <a
                href="/"
                className="w-full interactive-btn bg-slate-100 text-slate-700 flex items-center justify-center gap-2 border border-slate-200"
                >
                <Home className="w-4 h-4" /> Go to Homepage
                </a>
            </div>
          </div>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
