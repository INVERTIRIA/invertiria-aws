import { supabase } from "../../supabase";

const parseDecimal = (value) =>
  typeof value === "string"
    ? parseFloat(value.replace(",", "."))
    : Number(value);

/* Importar CSV
_______________________________________ */
export const formatRecordsML = async (data) => {
  const records = new Map();

  data.forEach((item) => {
    const key = `${item.ciudad}|${item.zona}|${item.sub_zona}|${item.tipo}`;

    if (!records.has(key)) {
      records.set(key, {
        id: key,
        ciudad: item.ciudad,
        zona: item.zona,
        sub_zona: item.sub_zona,
        tipo: item.tipo,
        matriz: [],
      });
    }

    records
      .get(key)
      .matriz.push([
        Number(item.mes_proyecto),
        item.año_mes,
        Number(item.precio_promedio_m2),
        Number(item.varianza_precio_promedio_m2),
        parseDecimal(item.valorizacion_promedio),
        parseDecimal(item.varianza_valorizacion_promedio),
      ]);
  });

  // Si necesitas convertirlo a un array
  const result = Array.from(records.values());

  const { data: res, error } = await supabase
    .from("matriz_modelo")
    .upsert(result)
    .select();

  if (error || !res) return false;

  return true;
};

export const formatRecordsPI = async (data) => {
  const ciudadIds = [
    {
      name: "Medellín",
      id: 2,
    },
    {
      name: "Bogotá",
      id: 1,
    },
  ];

  const records = [];

  data.forEach((item) => {
    item.edad_propiedad = Number(item.edad_propiedad);
    item.etapa_proyecto = Number(item.etapa_proyecto);
    item.vivienda_vis = item.vivienda_vis === "SI";
    item.licencia_construccion = item.licencia_construccion === "SI";
  });

  for (const item of data) {
    const { ciudad, ...rest } = item;
    const ciudadId = ciudadIds.find((c) => c.name === ciudad).id;

    if (ciudad) {
      records.push({
        ...rest,
        edad_propiedad: Number(item.edad_propiedad),
        etapa_proyecto: Number(item.etapa_proyecto),
        latitud: parseDecimal(item.latitud),
        longitud: parseDecimal(item.longitud),
        ciudad_id: ciudadId,
      });
    }
  }

  const { data: res, error } = await supabase
    .from("proyectos_inmobiliarios")
    .upsert(records, {
      onConflict: "latitud, longitud",
      ignoreDuplicates: false,
    })
    .select();

  if (error || !res) return false;

  return true;
};

export const formatRecordsVR = async (data) => {
  const ciudadIds = [
    { name: "Medellín", id: 2 },
    { name: "Bogotá", id: 1 },
  ];

  const records = [];

  for (const item of data) {
    const { ciudad, ...rest } = item;
    const ciudadId = ciudadIds.find((c) => c.name === ciudad)?.id;

    if (ciudad && ciudadId) {
      const numericRest = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, Number(value)])
      );

      records.push({
        ...numericRest,
        ciudad_id: ciudadId,
      });
    }
  }

  const { data: res, error } = await supabase
    .from("datos_referencia")
    .upsert(records, {
      onConflict: "ciudad_id",
      ignoreDuplicates: false,
    })
    .select();

  if (error || !res) return false;

  return true;
};

export const formatRecordsPR = async (data) => {
  const records = new Map();

  data.forEach((item) => {
    const key = item.nombre;

    if (!records.has(key)) {
      records.set(key, {
        nombre: item.nombre,
        matriz: [],
      });
    }

    records
      .get(key)
      .matriz.push([
        Number(item.mes_proyecto),
        Number(item.precio_promedio_m2),
        Number(item.varianza_precio_promedio_m2),
        parseDecimal(item.valorizacion_promedio),
        parseDecimal(item.varianza_valorizacion_promedio),
      ]);
  });

  // Si necesitas convertirlo a un array
  const result = Array.from(records.values());

  const { data: res, error } = await supabase
    .from("promedios")
    .upsert(result, {
      onConflict: "nombre",
      ignoreDuplicates: false,
    })
    .select();

  if (error || !res) throw new Error("Error al importar promedios");

  return true;
};

export const getExpectedHeadersByType = (type) => {
  switch (type) {
    case "promedios":
      return [
        "nombre",
        "mes_proyecto",
        "precio_promedio_m2",
        "varianza_precio_promedio_m2",
        "valorizacion_promedio",
        "varianza_valorizacion_promedio",
      ];
    case "matriz_modelo":
      return [
        "ciudad",
        "zona",
        "sub_zona",
        "tipo",
        "mes_proyecto",
        "año_mes",
        "precio_promedio_m2",
        "varianza_precio_promedio_m2",
        "valorizacion_promedio",
        "varianza_valorizacion_promedio",
      ];
    case "proyectos_inmobiliarios":
      return [
        "nombre",
        "ciudad",
        "zona",
        "subzona",
        "fecha_inicio_ventas",
        "fecha_prevista_entrega",
        "vivienda_vis",
        "licencia_construccion",
        "edad_propiedad",
        "etapa_proyecto",
        "latitud",
        "longitud",
      ];
    case "datos_referencia":
      return [
        "ciudad",
        "salario_minimo",
        "cesion_costo",
        "escritura_a_nombre_propio",
        "escritura_terceros",
        "reventa_factor_neg",
        "comision_venta_defecto",
        "tiempo_minimo_arrendar",
        "redondear_venta",
        "renta_bruta",
        "renta_neta",
        "renta_neta_sin_coprop",
        "redondear_renta",
        "subsidio_no_vis",
        "valor_administracion",
        "impuesto_predial",
        "porcentaje_canon_arrendamiento",
        "valor_dia_airbnb",
        "valor_mes_airbnb",
        "porcentaje_tipico_operador",
        "ocupacion_media_tipica",
        "renta_corta_mantenimiento",
        "porcentaje_inmobiliaria_mantenimiento",
        "inflacion_anual",
        "vacancia",
        "costo_inmobiliaria",
        "meses_sin_comision",
        "multiplicador_mejoras",
      ];
    default:
      return [];
  }
};
