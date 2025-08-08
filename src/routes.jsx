import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import useScrollBehavior from "./constants/functions/useScrollBehavior";
import { useLayoutVisibility } from "./contexts/LayoutVisibilityContext";
import ProtectedRoute from "./ProtectedRoute";
import { roles } from "./constants";

// Componentes
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import DashboardLayout from "./components/design/DashboardLayout";

// Paginas
import { Investment } from "./pages/Investment";
import { Test } from "./pages/Test";
import { LoginPage } from "./pages/LoginPage";
import ImportMatrizModel from "./pages/ImportMatrizModel";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AccessLinkPage from "./pages/AccessLinkPage";
import UserPages from "./pages/users/index";
import InternalAdvisorPages from "./pages/internal_advisor/index";
import AdminPages from "./pages/admin/index";
import HasPermissions from "./HasPermissions";
import AuthorizationPage from "./pages/AuthorizationPage";
import InactiveUserPage from "./pages/InactiveUserPage";
import ChatBotButton from "./components/design/ChatBotButton";
import AnalysisPage from "./pages/analysis/index";
import Analisis from "./pages/Analisis";
import CreateModelation from "./pages/CreateModelation";

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
    const isUserRoute =
      location.pathname.startsWith("/authorization") ||
      location.pathname.startsWith("/user") ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/assistant") ||
      location.pathname.startsWith("/company") ||
      location.pathname.startsWith("/analysis") ||
      location.pathname.startsWith("/internal_advisor");

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
          <Route path="/analysis/:id" element={<Analisis />} />
          <Route path="/crear-modelacion" element={<CreateModelation />} />
          <Route path="/charts" element={<Analisis />} />
          <Route path="/inactive" element={<InactiveUserPage />} />
          <Route path="/import" element={<ImportMatrizModel />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-link" element={<AccessLinkPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          {/* Analysis */}
          <Route
            path="/analysis/create"
            element={<AnalysisPage.CreateAnalysisPage />}
          />
          {/* User */}
          <Route element={<ProtectedRoute roles={[roles.user]} />}>
            <Route path="/user" element={<DashboardLayout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route path="advisor" element={<UserPages.AdvisorPage />} />
              <Route
                path="investments"
                element={<UserPages.InvestmentsPage />}
              />
              <Route
                path="shared_investments"
                element={<UserPages.SharedInvestmentsPage />}
              />
              <Route path="settings">
                <Route
                  path="change-email"
                  element={<UserPages.ChangeEmailPage />}
                />
              </Route>
            </Route>
          </Route>
          {/* Admin */}
          <Route element={<ProtectedRoute roles={[roles.admin]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route path="companies" element={<AdminPages.CompaniesPage />} />
              <Route path="advisors" element={<AdminPages.AdvisorsPage />} />
              <Route
                path="import_data"
                element={<AdminPages.ImportDataPage />}
              />
              <Route
                path="investments"
                element={<AdminPages.InvestmentsPage />}
              />
              <Route
                path="advisors/:id"
                element={<AdminPages.AdvisorDetailsPage />}
              />
              <Route path="users" element={<AdminPages.UsersPage />} />
            </Route>
          </Route>
          {/* Assistant */}
          <Route
            element={<ProtectedRoute roles={[roles.admin, roles.assistant]} />}
          >
            <Route path="/assistant" element={<DashboardLayout />}>
              <Route path="users" element={<AdminPages.UsersPage />} />
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route
                path="advisors/:id"
                element={<AdminPages.AdvisorDetailsPage />}
              />
              <Route element={<HasPermissions roles={[roles.assistant]} />}>
                <Route path="advisors" element={<AdminPages.AdvisorsPage />} />
                <Route
                  path="companies"
                  element={<AdminPages.CompaniesPage />}
                />
              </Route>
            </Route>
          </Route>
          {/* Company */}
          <Route element={<ProtectedRoute roles={[roles.company]} />}>
            <Route path="/company" element={<DashboardLayout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route path="advisors" element={<AdminPages.AdvisorsPage />} />
              <Route
                path="advisors/:id"
                element={<AdminPages.AdvisorDetailsPage />}
              />
            </Route>
          </Route>
          {/* Internal Advisor */}
          <Route element={<ProtectedRoute roles={[roles.internal_advisor]} />}>
            <Route path="/internal_advisor" element={<DashboardLayout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route
                path="investors"
                element={<InternalAdvisorPages.InvestorsPage />}
              />
              <Route
                path="investors/:id"
                element={<InternalAdvisorPages.InvestorDetailsPage />}
              />
              <Route
                path="investors/:id/analysis"
                element={<InternalAdvisorPages.InvestorAnalysisPage />}
              />
            </Route>
          </Route>
        </Routes>
      </main>
      {/* Chatbot Button */}
      {/* {!hideLayout && <ChatBotButton />} */}
      <ChatBotButton />

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
