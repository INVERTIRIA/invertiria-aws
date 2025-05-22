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

const fields = [
  {
    name: "first_name",
    label: "Nombre",
    placeholder: "Ingrese su nombre",
  },
  {
    name: "last_name",
    label: "Apellidos",
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
          {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          Registrarme
        </Button>
      </form>
    </Form>
  );
};
