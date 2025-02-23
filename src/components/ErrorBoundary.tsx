import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-red-100 border border-red-400">
          <h2 className="text-red-500 text-xl font-bold">Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
          <button onClick={this.handleReset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
