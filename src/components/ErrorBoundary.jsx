import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
	super(props);
	this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
	return { error };
  }

  componentDidCatch(error, info) {
	console.error("ErrorBoundary caught:", error, info);
  }

  render() {
	if (this.state.error) {
  	return (
    	<main className="container">
      	<h1>Something went wrong</h1>
      	<p>Try refreshing. If it keeps happening, check the console.</p>
      	<pre style={{ whiteSpace: "pre-wrap" }}>
        	{String(this.state.error)}
      	</pre>
    	</main>
  	);
	}
	return this.props.children;
  }
}


