import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";

// Initialize Sentry for error monitoring, performance tracking, and session replay
Sentry.init({
  dsn: "https://6f9d52e8aada367a86f0023bebf928bb@o4509021648977920.ingest.us.sentry.io/4509021661233152",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  
  // Capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,
  
  // Enable distributed tracing for localhost and API requests
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Sample 10% of sessions for replay (adjust in production)
  replaysSessionSampleRate: 0.1,

  // Capture 100% of sessions where an error occurs
  replaysOnErrorSampleRate: 1.0,
});

// Render the React App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
