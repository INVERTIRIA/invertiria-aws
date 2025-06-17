import { useEffect } from "react";
import ErrorPage from "../components/design/ErrorPage";
import PageTitle from "../components/design/PageTitle";
import { useLayoutVisibility } from "../contexts/LayoutVisibilityContext";

const InactiveUserPage = () => {
  const { setHideLayout } = useLayoutVisibility();

  useEffect(() => {
    setHideLayout(true);
  }, [setHideLayout]);

  return (
    <>
      <PageTitle title="User Inactive" />
      <ErrorPage
        errorCode={403}
        title={"Tu cuenta esta inactiva."}
        description={"Por favor contacta con soporte para activar tu cuenta."}
      />
    </>
  );
};

export default InactiveUserPage;
