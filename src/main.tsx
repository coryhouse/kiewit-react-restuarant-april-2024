import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Menu.tsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Oops! Something went wrong.</p>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
