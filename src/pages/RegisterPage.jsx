import { useNavigate } from "react-router";
import { Container } from "../components/design/Container";
import PageTitle from "../components/design/PageTitle";
import { RegisterUserForm } from "../components/forms/RegisterUserForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const RegisterPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${user.user_metadata.role}/dashboard`);
    //if (isAuthenticated) navigate(`/`);
  }, [isAuthenticated, user]);

  return (
    <>
      <PageTitle title="Register" />
      <Container className={"w-full flex gap-14 items-center my-20 sm:my-40"}>
        <RegisterUserForm />
      </Container>
    </>
  );
};

export default RegisterPage;
