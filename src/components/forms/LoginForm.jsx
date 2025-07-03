import React, { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "../../constants/schema/user";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AuthWithGoogle from "../AuthWithGoogle";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Ingrese su email",
  },
];

const LoginForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [captchaToken, setCaptchaToken] = useState(null);
  const captcha = useRef();

  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const res = await login(values, false, captchaToken);
      if (!res) return;

      return navigate(`/access-link?email=${values.email}`);
    });
  });

  return (
    <div className="w-full flex items-center justify-center">
      <Form {...form}>
        <div className="max-w-4xl flex items-center border border-invertiria-1 rounded-2xl overflow-hidden">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-6 py-10 px-5 md:px-20"
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-center text-3xl font-bold">
                Escribe tu email:
              </h1>
              <p className="text-center max-w-sm">
                Confirmaremos que tengas una cuenta, crearemos una nueva si no
                la tienes.
              </p>
            </div>
            {fields.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {item.label} <span className="text-black">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={item.placeholder}
                        type={item.type || "text"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <HCaptcha
              ref={captcha}
              sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
              onVerify={setCaptchaToken}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && (
                <Loader2 className="mr-2 animate-spin stroke-white" />
              )}
              Iniciar sesión
            </Button>
            <AuthWithGoogle title="Continuar con Google" />
            <div className="w-full flex gap-2 items-center justify-center">
              <p className="text-sm font-medium">
                ¿Todavía no tienes una cuenta?
              </p>
              <Button
                type="button"
                variant="link"
                className="w-fit text-invertiria-1 px-0"
                onClick={() => navigate("/register")}
              >
                Regístrate
              </Button>
            </div>
          </form>
          <img
            className="hidden sm:block w-72 h-[580px] rounded-tr-2xl rounded-br-2xl"
            src="/assets/images/login.jpg"
          />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
