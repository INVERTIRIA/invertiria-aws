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
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
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
          <p className="text-sm font-medium">¿Todavía no tienes una cuenta?</p>
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
    </Form>
  );
};

export default LoginForm;
