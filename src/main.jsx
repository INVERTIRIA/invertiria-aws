import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { AppRoutes } from './routes.jsx' // Rutas
import { GlobalProvider } from './contexts/GlobalContext'; // Contexto
import './main.css' // Estilos
import './translations.js';  // Traducciones

// Componentes
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

// Renderizado de la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>
)
