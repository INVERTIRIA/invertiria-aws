import { z } from "zod";
import { investorOptions } from "..";

// Functions
const customEnum = (values, message) =>
  z.string().refine((val) => values.includes(val), {
    message,
  });

export const investorSchema = z.object({
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
