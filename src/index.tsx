import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { IConfig } from "./config";
if (process.env.NODE_ENV !== 'development') {
  
  window.addEventListener("DOMContentLoaded", (event) => {
    window.parent.postMessage(JSON.stringify({ action: "init" }), "*");
    window.removeEventListener("DOMContentLoaded", () => null);
  });
  
  window.addEventListener("message", (event) => {
    event.preventDefault();
    if (!event.data || typeof event.data !== "string") return;
    const config: IConfig = JSON.parse(event.data);
    return render(
      // <Context.Provider value={JSON.stringify(config)}>
        <App config={config}/>,
      // </Context.Provider>,
      document.body
    );
  });
}else {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


