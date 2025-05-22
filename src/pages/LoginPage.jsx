import { useEffect } from "react";
import { Container } from "../components/design/Container";
import { useAuth } from "../contexts/AuthContext";
import PageTitle from "../components/design/PageTitle";
import LoginForm from "../components/forms/LoginForm";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
  }, [isAuthenticated, user]);

  /* Si el usuario ha iniciado sesión, redirigimos a la ruta adecuada */
  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       const params = new URLSearchParams(window.location.search);
  //       const encodedRedirect = params.get("redirect");

  //       // Si existe, tratamos de decodificarlo con Base64
  //       if (encodedRedirect) {
  //         try {
  //           const redirectUrl = atob(encodedRedirect);
  //           // Si la URL decodificada es válida, redirigimos a ella
  //           window.location.href = redirectUrl;
  //         } catch (error) {
  //           console.error("Error al decodificar redirect:", error);
  //           // En caso de error, redirigimos al dashboard por defecto según el rol
  //           window.location.href = `/${user.user_metadata.role}/dashboard`;
  //         }
  //       } else {
  //         // Si no viene redirect, redireccionamos al dashboard según rol
  //         window.location.href = `/${user.user_metadata.role}/dashboard`;
  //       }
  //     }
  //   }, [isAuthenticated, user]);

  return (
    <>
      <PageTitle title="Login" />
      <Container classNameParent={"mt-20"}>
        <LoginForm />
      </Container>
    </>
  );
};
