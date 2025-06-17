import { z } from "zod";

export const advisorSchema = z.object({
  first_name: z.string().min(1, { message: "El nombre es requerido" }),
  last_name: z.string().min(1, { message: "El apellido es requerido" }),
  telefono: z
    .string({ required_error: "El telefono es requerido" })
    .regex(/^\d{10}$/, { message: "Debe tener 10 dígitos" })
    .transform((val) => Number(val)),
  email: z
    .string({ required_error: "Email es requerido" })
    .email("Email no válido"),
  fecha_de_nacimiento: z
    .string()
    .min(1, { message: "Fecha de nacimiento es requerido" }),
  direccion: z.string().min(1, { message: "La dirección es requerido" }),
  pais_id: z.number().min(1, { message: "El país es requerido" }),
  ciudad: z.string().min(1, { message: "La ciudad es requerido" }),
  genero: z.enum(["Masculino", "Femenino"], {
    required_error: "El género es requerido",
  }),
});

export const companySchema = z.object({
  first_name: z.string().min(1, { message: "El nombre es requerido" }),
  last_name: z.string().min(1, { message: "El apellido es requerido" }),
  company_name: z
    .string()
    .min(1, { message: "El nombre de la empresa es requerido" }),
  telefono: z
    .string({ required_error: "El telefono es requerido" })
    .regex(/^\d{10}$/, { message: "Debe tener 10 dígitos" })
    .transform((val) => Number(val)),
  email: z
    .string({ required_error: "Email es requerido" })
    .email("Email no válido"),
  fecha_de_nacimiento: z
    .string()
    .min(1, { message: "Fecha de nacimiento es requerido" }),
  direccion: z.string().min(1, { message: "La dirección es requerido" }),
  pais_id: z.number().min(1, { message: "El país es requerido" }),
  ciudad: z.string().min(1, { message: "La ciudad es requerido" }),
  genero: z.enum(["Masculino", "Femenino"], {
    required_error: "El género es requerido",
  }),
});
