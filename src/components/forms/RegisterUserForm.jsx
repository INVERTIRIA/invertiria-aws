import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { registerUserSchema } from "../../constants/schema/user";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

const fields = [
  {
    name: "first_name",
    label: "Nombre",
    placeholder: "Ingrese su nombre",
  },
  {
    name: "last_name",
    label: "Apellido",
    placeholder: "Ingrese su apellido",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Ingrese su email",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "Ingrese su contraseña",
    type: "password",
  },
];

export const RegisterUserForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [captchaToken, setCaptchaToken] = useState(null);
  const captcha = useRef();
  const navigate = useNavigate();
  const { register } = useAuth();

  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => register(values, captchaToken));
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
              <h1 className="text-center text-3xl font-bold">Registrate</h1>
              {/* <p className="text-center max-w-sm">
                Confirmaremos que tengas una cuenta, crearemos una nueva si no
                la tienes.
              </p> */}
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
              {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Registrarme
            </Button>
            <div className="w-full flex gap-2 items-center justify-center">
              <p className="text-sm font-medium">¿Ya tienes una cuenta?</p>
              <Button
                type="button"
                variant="link"
                className="w-fit text-invertiria-1 px-0"
                onClick={() => navigate("/login")}
              >
                Inicia sesión
              </Button>
            </div>
          </form>
          <img
            className="hidden sm:block w-72 h-[680px] rounded-tr-2xl rounded-br-2xl"
            src="assets/images/login.jpg"
          />
        </div>
      </Form>
    </div>
  );
};
