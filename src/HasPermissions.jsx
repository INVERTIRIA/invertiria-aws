import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { Suspense, use } from "react";
import Skeleton from "./components/design/Skeleton";

const Permission = ({ promise }) => {
  const isPermitted = use(promise);

  if (!isPermitted) return <Navigate to="/authorization" replace />;

  return <Outlet />;
};

const HasPermissions = () => {
  const location = useLocation();
  const { hasPermissions } = useAuth();
  const pathname = location.pathname.split("/").filter(Boolean);

  return (
    <Suspense fallback={<Skeleton />}>
      <Permission promise={hasPermissions(pathname[pathname.length - 1])} />
    </Suspense>
  );
};

export default HasPermissions;
