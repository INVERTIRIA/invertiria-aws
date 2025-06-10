import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Skeleton from "./components/design/Skeleton";

const HasPermissions = () => {
  const location = useLocation();
  const { hasPermissions } = useAuth();
  const [isPermitted, setIsPermitted] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      const pathSegments = location.pathname.split("/").filter(Boolean);
      const currentPath = pathSegments[pathSegments.length - 1];
      const allowed = await hasPermissions(currentPath);
      setIsPermitted(allowed);
    };

    setIsPermitted(null); // mostrar Skeleton mientras verifica
    checkPermission();
  }, [location.pathname]);

  if (isPermitted === null) return <Skeleton />;
  if (!isPermitted) return <Navigate to="/authorization" replace />;

  return <Outlet />;
};

export default HasPermissions;
