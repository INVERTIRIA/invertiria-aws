import { Container } from "../components/design/Container";
import { Mail, Send } from "lucide-react";
import { Link } from "react-router";

import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Enviar el formulario
function onSubmit(values) {
  console.log(values);
}

const Contact = () => {

  // Validaciones del formulario
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Campo obligatorio.",
    }),
    lastname: z.string().min(2, {
      message: "Campo obligatorio.",
    }),
    email: z.string().email({
      message: "Email inválido.",
    }),
    phonenumber: z.string()
      .min(1, { message: "Campo obligatorio." })
      .regex(/^\+\d{1,3}\d{6,14}$/, { message: "Teléfono inválido." }),
    city: z.string().min(2, {
      message: "Campo obligatorio.",
    }),
    consultation: z.enum(["Consulta general sobre la plataforma", "Soporte técnico", "Consulta sobre inversiones específicas", "Solicitud de demo personalizado", "Alianzas comerciales", "Prensa y medios"], {
      message: "Campo obligatorio.",
    }),
    message: z.string().min(2, {
      message: "Campo obligatorio.",
    }),
    source: z.enum(["Búsqueda en Google", "Redes sociales", "Recomendación de un amigo", "Evento o conferencia", "Publicidad online", "Otro"], {
      message: "Campo obligatorio.",
    }),
    communications: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar recibir comunicaciones." }),
    }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones." }),
    }),
  })

  // Formulario
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phonenumber: "",
      city: "",
      consultation: "",
      message: "",
      source: "",
      communications: false,
      terms: false,
    },
  })

  return (
    <Container
      className={"w-full items-center z-0"}
      classNameParent={"relative z-0"}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 pb-20">
        <div className="relative px-6 pt-25 sm:pt-15 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-4xl font-bold sm:text-6xl">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </h2>
            <p className="sm:text-lg max-w-2xl text-gray-700 mt-10">
              Nuestro equipo de expertos está listo para resolver tus dudas sobre inversiones inmobiliarias y el uso de la plataforma <strong className="text-invertiria-2">InverTIRía.</strong>
            </p>
            <div className="mt-8 space-y-4 text-base/7 text-gray-600">
              <Link
                to="mailto:soporte@invertiria.com.co"
                className="w-full group flex gap-2.5"
              >
                <Mail
                  strokeWidth={1}
                  className=" group-hover:stroke-invertiria-2"
                />
                <span className="group-hover:text-invertiria-2 text-sm">
                  soporte@invertiria.com.co
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl >
                          <PhoneInput
                            defaultCountry="co"
                            value={field.value}
                            onChange={field.onChange}
                            style={{
                              "--react-international-phone-border-radius": "8px",
                              "--react-international-phone-border-color": form.formState.errors.phonenumber ? "#e7000b" : "#e5e5e5",
                              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                            }}
                            inputStyle={{
                              width: "100%",
                            }}
                            countrySelectorStyleProps={{
                              buttonStyle: { paddingLeft: "5px", paddingRight: "5px" },
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consultation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Consulta</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="w-full" >
                            <SelectTrigger className="w-full max-w-full truncate">
                              <SelectValue placeholder="" className="truncate" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Consulta general sobre la plataforma">Consulta general sobre la plataforma</SelectItem>
                            <SelectItem value="Soporte técnico">Soporte técnico</SelectItem>
                            <SelectItem value="Consulta sobre inversiones específicas">Consulta sobre inversiones específicas</SelectItem>
                            <SelectItem value="Solicitud de demo personalizado">Solicitud de demo personalizado</SelectItem>
                            <SelectItem value="Alianzas comerciales">Alianzas comerciales</SelectItem>
                            <SelectItem value="Prensa y medios">Prensa y medios</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormLabel>¿Cómo nos conociste?</FormLabel>
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full max-w-full truncate">
                            <SelectValue placeholder="" className="truncate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Búsqueda en Google">Búsqueda en Google</SelectItem>
                          <SelectItem value="Redes sociales">Redes sociales</SelectItem>
                          <SelectItem value="Recomendación de un amigo">Recomendación de un amigo</SelectItem>
                          <SelectItem value="Evento o conferencia">Evento o conferencia</SelectItem>
                          <SelectItem value="Publicidad online">Publicidad online</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="communications"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox id="communications" checked={field.value}
                            onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Acepto recibir comunicaciones de InverTIRía</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox id="terms" checked={field.value}
                            onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>He leído y acepto los Términos y Condiciones*</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Boton enviar consulta */}
                <Button type="submit" variant={"theme"} className="flex flex-row gap-2 mt-8">
                  <Send className="h-4 w-4" />
                  Enviar Consulta
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Contact
