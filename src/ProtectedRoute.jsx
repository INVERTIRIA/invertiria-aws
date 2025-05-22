import { Navigate, Outlet } from "react-router";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <p>Cargando...</p>;

  if (!isAuthenticated && !isLoading) {
    const encodedRedirect = btoa(window.location.href);
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(encodedRedirect)}`}
        replace
      />
    );
  }

  if (roles && !roles.includes(user.user_metadata.role))
    return <Navigate to="/authorization" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
