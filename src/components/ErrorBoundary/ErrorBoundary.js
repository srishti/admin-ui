import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch = (error, info) => {
    console.log("[Error Boundary] Error -", error);
    console.log("[Error Boundary] Info - ", info);
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
