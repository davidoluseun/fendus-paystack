import * as React from "react";
import ErrorBoundaryMessage from "./ErrorBoundaryMessage";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return (
      <>
        {this.state.hasError ? <ErrorBoundaryMessage /> : this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
