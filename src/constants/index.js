import {
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  House,
  Repeat,
  UserPen,
  UsersRound,
} from "lucide-react";

export const roles = {
  admin: "admin",
  assistant: "assistant",
  user: "user",
  company: "company",
  advisor: "advisor",
  intarnal_advisor: "intarnal_advisor",
  external_advisor: "external_advisor",
};

export const countries = [{ value: "46", label: "Colombia" }];

export const investorOptions = {
  profile: [
    { value: "Conservador", label: "Conservador" },
    { value: "Arriesgado", label: "Arriesgado" },
  ],
  objective: [
    { value: "Ganancias de capital", label: "Ganancias de capital" },
    { value: "Indice de rentabilidad", label: "Indice de rentabilidad" },
  ],
  term: [
    { value: "Corto", label: "Corto" },
    { value: "Medio", label: "Medio" },
    { value: "Largo", label: "Largo" },
  ],
  experience: [
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
      title: "Cambiar de perfil",
      url: "/user/change-profile",
      icon: Repeat,
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

export const stepsQuestions = [
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
];
