import React from 'react';

export default class BoardErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log('On purpose Do that, for better UX, just ignore it');
  }

  render() {
    return this.props.children ?? null;
  }
}