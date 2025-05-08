import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth_context'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>


)

{ document.documentElement.style.setProperty('--primary', 'oklch(0.205 0 0)') }
{ document.documentElement.style.setProperty(' --secondary', 'oklch(0.97 0 0)') }