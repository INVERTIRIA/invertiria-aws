import {
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  House,
  UserPen,
  UsersRound,
} from "lucide-react";

export const roles = {
  admin: "admin",
  assistant: "assistant",
  user: "user",
  company: "company",
  advisor: "advisor",
  internal_advisor: "internal_advisor",
  external_advisor: "external_advisor",
};

export const countries = [{ value: "46", label: "Colombia" }];

export const investorOptions = {
  profile: [
    { value: "Conservador", label: "Conservador" },
    { value: "Arriesgado", label: "Arriesgado" },
    { value: "Moderado", label: "Moderado" },
  ],
  objective: [
    { value: "Ganancias de capital", label: "Ganancias de capital" },
    { value: "Ganancias por rentar", label: "Ganancias por rentar" },
    { value: "Ambas", label: "Ambas" },
  ],
  term: [
    { value: "Corto", label: "Corto" },
    { value: "Mediano", label: "Mediano" },
    { value: "Largo", label: "Largo" },
  ],
  experience: [
    { value: "Ninguna", label: "Ninguna" },
    { value: "Bajo", label: "Bajo" },
    { value: "Medio", label: "Medio" },
    { value: "Alto", label: "Alto" },
  ],
};

export const routes = {
  user: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Mi perfil",
      url: "/user/dashboard",
      icon: UserPen,
    },
    {
      title: "Mis inversiones",
      url: "/user/investments",
      icon: ChartColumnIncreasing,
    },
  ],
  admin: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Mi perfil",
      url: "/admin/dashboard",
      icon: UserPen,
    },
    {
      title: "Usuarios",
      url: "/admin/users",
      icon: UsersRound,
    },
    {
      title: "Empresas",
      url: "/admin/companies",
      icon: Building2,
    },
    {
      title: "Asesores",
      url: "/admin/advisors",
      icon: BriefcaseBusiness,
    },
    {
      title: "Global inversiones",
      url: "/admin/investments",
      icon: ChartColumnIncreasing,
    },
  ],
  assistant: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Mi perfil",
      url: "/assistant/dashboard",
      icon: UserPen,
    },
    {
      title: "Usuarios",
      url: "/assistant/users",
      icon: UsersRound,
    },
    {
      title: "Asesores",
      url: "/assistant/advisors",
      icon: BriefcaseBusiness,
      validateModule: "advisors",
    },
    {
      title: "Empresas",
      url: "/assistant/companies",
      icon: Building2,
      validateModule: "companies",
    },
  ],
  company: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Mi perfil",
      url: "/company/dashboard",
      icon: UserPen,
    },
    {
      title: "Asesores",
      url: "/company/advisors",
      icon: BriefcaseBusiness,
    },
  ],
  internal_advisor: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Mi perfil",
      url: "/internal_advisor/dashboard",
      icon: UserPen,
    },
    {
      title: "Mis inversionistas",
      url: "/internal_advisor/investors",
      icon: UsersRound,
    },
  ],
};

export const titularidad = {
  matriculaInmobiliaria: "Matricula Inmobiliaria",
  participacionFiduciaria: "Participacion Fiduciaria",
};

export const tipoInmueble = {
  apartamento: "Apto.",
  casa: "Casa",
  lote: "Lote",
  bodega: "Bodega",
  oficina: "Oficina",
  local: "Local",
  consultorio: "Consultorio",
  hotel: "Hotel",
  coliving: "Coliving",
};

export const modeloNegocio = {
  comprarVender: "Comprar para vender",
  rentaTradicional: "Renta Tradicional",
  rentaCorta: "Renta Corta",
  negociosOportunidad: "Negocios de oportunidad",
  flipping: "Flipping",
  engorde: "Engorde",
};

/* export const stepsQuestions = [
  {
    step: 5,
    questions: {
      titulo_modelacion: `Inversion ${new Date().getTime()}`,
    },
  },
  {
    step: 6,
    questions: {
      nombre_del_proyecto: "nombre_del_proyecto",
    },
  },
]; */

export const stepsQuestions = [
  {
    step: 5,
    questions: ["titulo_modelacion"],
  },
  {
    step: 6,
    questions: [
      "nombre_del_proyecto",
      "pais_id",
      "ciudad_id",
      "zona",
      "subzona",
      "fecha_inicio_ventas",
      "fecha_prevista_entrega",
      "vivienda_vis",
      "licencia_construccion",
      "edad_propiedad",
      "etapa_proyecto",
    ],
  },
  {
    step: 7,
    questions: ["pais_id", "ciudad_id", "zona", "subzona"],
  },
  {
    step: 8,
    questions: ["precio_de_compra"],
  },
  {
    step: 9,
    questions: ["precio_de_mercado"],
  },
  {
    step: 10,
    questions: ["separacion"],
  },
  {
    step: 11,
    questions: ["forma_pago_cuota_inicial"],
  },
];
