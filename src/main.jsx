import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes.jsx"; // Rutas
import { GlobalProvider } from "./contexts/GlobalContext"; // Contexto
import "./main.css"; // Estilos
import "./translations.js"; // Traducciones

// Componentes

import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LayoutVisibilityProvider } from "./contexts/LayoutVisibilityContext.jsx";

// Renderizado de la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <LayoutVisibilityProvider>
            <AppRoutes />
            <Toaster richColors closeButton />
          </LayoutVisibilityProvider>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  </StrictMode>
);
