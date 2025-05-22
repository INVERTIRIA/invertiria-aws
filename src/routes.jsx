import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import useScrollBehavior from "./constants/functions/useScrollBehavior";
import { useLayoutVisibility } from "./contexts/LayoutVisibilityContext";

// Componentes
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Paginas
import { App } from "./pages/App";
import { Investment } from "./pages/Investment";
import { Test } from "./pages/Test";
import { LoginPage } from "./pages/LoginPage";
import ImportMatrizModel from "./pages/ImportMatrizModel";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AccessLinkPage from "./pages/AccessLinkPage";
import UserPages from "./pages/users/index";
import ProtectedRoute from "./ProtectedRoute";
import { roles } from "./constants";

// Rutas de la aplicacion
function AppRoutes() {
  useScrollBehavior();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { hideLayout, setHideLayout } = useLayoutVisibility();

  // Obtener idioma
  useEffect(() => {
    changeLanguage(localStorage.getItem("language") || "es");
  }, []);

  useEffect(() => {
    const isUserRoute = location.pathname.startsWith("/user");
    setHideLayout(isUserRoute);
  }, [location.pathname, setHideLayout]);

  // Retornar rutas
  return (
    <div className="app-container">
      {!hideLayout && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/test" element={<Test />} />
          <Route path="/import" element={<ImportMatrizModel />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-link" element={<AccessLinkPage />} />
          <Route element={<ProtectedRoute roles={[roles.user]} />}>
            <Route path="/user" element={<UserPages.Layout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route
                path="investments"
                element={<UserPages.InvestmentsPage />}
              />
              <Route path="settings">
                <Route
                  path="change-email"
                  element={<UserPages.ChangeEmailPage />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );

  // Funcion cambiar idioma
  function changeLanguage(language) {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }
}

export { AppRoutes };
