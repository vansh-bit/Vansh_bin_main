import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

let backendUrl = import.meta.env.VITE_BACKENDURL || '';
if (backendUrl.endsWith('/')) {
  backendUrl = backendUrl.slice(0, -1);
}
axios.defaults.baseURL = backendUrl;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)