import { useNavigate, useSearchParams } from "react-router";
import { Container } from "../components/design/Container";
import PageTitle from "../components/design/PageTitle";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const AccessLinkPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();
  const [isSubmitting, startTransition] = useTransition();

  const [captchaToken, setCaptchaToken] = useState(null);
  const captcha = useRef();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${user.user_metadata.role}/dashboard`);
    }
  }, [isAuthenticated, user]);

  const handleLogin = () => {
    captcha.current.resetCaptcha();

    startTransition(async () => {
      const res = await login({ email }, false, captchaToken);
      if (!res) return;

      toast.success("Enlace enviado con exito");
    });
  };

  return (
    <>
      <PageTitle title="Confirmar correo" />
      <Container
        classNameParent={"w-full flex gap-14 items-center bg-white h-[700px]"}
      >
        <div className="flex flex-col gap-10 text-black items-center">
          <h1 className="h1 text-center">Revisa tu email</h1>
          <p className="font-poppins max-w-xl text-gray-900 font-light text-center">
            Hemos envidado un correo electrónico con un enlace de acceso
            temporal a <span className="font-poppins font-medium">{email}</span>
          </p>
          <p className="font-poppins max-w-xl text-gray-900 font-light text-center">
            Este enlace solo se puede usar una vez y expira en una hora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
            <p className="font-poppins max-w-xl text-gray-900 font-light text-center">
              No te llego el enlace ?{" "}
            </p>
            <button
              onClick={handleLogin}
              className="font-poppins font-medium text-invertiria-1"
            >
              Click para enviar un nuevo enlace
            </button>
            {isSubmitting && (
              <Loader2 className="animate-spin stroke-invertiria-1" />
            )}
          </div>
          <div className="flex items-center justify-center">
            <HCaptcha
              ref={captcha}
              sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
              onVerify={setCaptchaToken}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AccessLinkPage;
