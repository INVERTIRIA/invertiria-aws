import { z } from "zod";
import { investorOptions } from "..";

const MAX_FILE_SIZE = {
  img_perfil: 5000000,
};
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Functions
const customEnum = (values, message) =>
  z.string().refine((val) => values.includes(val), {
    message,
  });

// Schemas
export const registerUserSchema = z.object({
  first_name: z.string().min(1, { message: "El nombre es requerido" }),
  last_name: z.string().min(1, { message: "El apellido es requerido" }),
  email: z
    .string({ required_error: "Email es requerido" })
    .email("Email no válido"),
  password: z.string({ required_error: "Contraseña es requerida" }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email es requerido" })
    .email("Email no válido"),
});

export const userSchema = z.object({
  first_name: z.string().min(1, { message: "El nombre es requerido" }),
  last_name: z.string().min(1, { message: "El apellido es requerido" }),
  telefono: z
    .string({ required_error: "El telefono es requerido" })
    .regex(/^\d{10}$/, { message: "Debe tener 10 dígitos" })
    .transform((val) => Number(val)),
  fecha_de_nacimiento: z
    .string()
    .min(1, { message: "Fecha de nacimiento es requerido" }),
  direccion: z.string().min(1, { message: "La dirección es requerido" }),
  pais_id: z.number().min(1, { message: "El país es requerido" }),
  ciudad: z.string().min(1, { message: "La ciudad es requerido" }),
  genero: z.enum(["Masculino", "Femenino"], {
    required_error: "El género es requerido",
  }),
  img_perfil: z
    .any()
    .optional()
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE.img_perfil,
      `El tamaño máximo de la imagen es 5MB.`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Sólo se admiten los formatos .jpg, .jpeg, .png y .webp."
    ),
  perfil: customEnum(
    investorOptions.profile.map((item) => item.value),
    "Seleccione un perfil válido del listado"
  ),
  objetivo: customEnum(
    investorOptions.objective.map((item) => item.value),
    "Seleccione un objetivo válido del listado"
  ),
  plazo_de_inversion: customEnum(
    investorOptions.term.map((item) => item.value),
    "Seleccione un plazo válido del listado"
  ),
  experiencia: customEnum(
    investorOptions.experience.map((item) => item.value),
    "Seleccione una experiencia válida del listado"
  ),
  ahorros_disponibles: z.number().min(1, {
    message: "Los ahorros disponibles deben ser un número mayor a 0",
  }),
  flujo_de_recursos: z.number().min(1, {
    message: "El flujo de recursos debe ser un número mayor a 0",
  }),
  ingresos_mensuales: z.number().min(1, {
    message: "Los ingresos mensuales deben ser un número mayor a 0",
  }),
  gastos_mensuales: z.number().min(1, {
    message: "Los gastos mensuales deben ser un número mayor a 0",
  }),
});
