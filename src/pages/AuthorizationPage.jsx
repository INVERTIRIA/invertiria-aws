import { useEffect } from "react";
import { useLayoutVisibility } from "../contexts/LayoutVisibilityContext";

import PageTitle from "../components/design/PageTitle";
import ErrorPage from "../components/design/ErrorPage";

const AuthorizationPage = () => {
  const { setHideLayout } = useLayoutVisibility();

  useEffect(() => {
    setHideLayout(true);
  }, [setHideLayout]);

  return (
    <>
      <PageTitle title="Authorization" />
      <ErrorPage
        errorCode={403}
        title={"Esta página está prohibida."}
        description={"No tienes permiso para acceder a esta página."}
      />
    </>
  );
};

export default AuthorizationPage;
