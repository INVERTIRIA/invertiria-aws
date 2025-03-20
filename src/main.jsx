import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { AppRoutes } from './routes.jsx' // Rutas
import './main.css' // Estilos
import './translations.js';  // Traducciones

// Componentes
import { Header } from "./components/Header"

// Renderizado de la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)
