import { useEffect } from "react";
import { supabase } from "../supabase";

const values = {
  usuario_id: "70bf12cf-83e3-4263-83aa-841000ccea7b",
  titulo_modelacion: "MOD0000007",
  nombre_del_proyecto: "Palmanova",
  pais_id: 46,
  ciudad_id: 2,
  zona: "Centro",
  subzona: "Poblado",
  fecha_inicio_ventas: "2025-07-01",
  fecha_prevista_entrega: "2025-09-01",
  vivienda_vis: false,
  licencia_construccion: false,
  edad_propiedad: 0,
  etapa_proyecto: 1,
  precio_de_compra: 300000000,
  precio_de_mercado: 310000000,
  separacion: 0,
  cuota_inicial: null,
  pagos_personalizados: 2,
  fecha_pagos_personalizados: ["2025-07-01", "2025-08-01"],
  valor_pagos_personalizados: ["75000000", "75000000"],
  tasa_de_interes: 10,
  area_inmueble: 100,
  parqueaderos: 1,
  porcentaje_comision_vendedor: 3,
  valor_administracion: 60000,
  valor_predial: 1800000,
  valor_mejoras: 20000000,
  costos_licencias: null,
  canon_de_arrendamiento: null,
  valor_noche: null,
  tarifa_mensual: null,
  ocupacion_media: null,
  porcentaje_del_operador: null,
  porcentaje_inmobiliaria: null,
  precio_venta: null,
  fecha_compra: "2025-07-01",
  vigencia: true,
  tipo_inmueble: "Apto.",
  estado_inmueble: "Usado",
  modelo_de_negocio: "Comprar para vender",
  forma_pago_cuota_inicial: 2,
  inicial_fecha_inicio_pago: null,
  inicial_fecha_fin_pago: null,
  credito_hipotecario: true,
  credito_fecha_inicio_pago: "2025-10-01",
  credito_fecha_fin_pago: "2045-10-01",
  cesion_de_derechos: false,
  fecha_prevista_venta: "2027-01-01",
  comision_vendedor: true,
  administracion: true,
  mejoras: true,
  renta: 0,
  inmobiliaria: false,
};

const CreateModelation = () => {

  useEffect(() => {
    const runModelation = async () => {
      try {
        // Crear modelación
        const { data: modelacion, error: modelError } = await supabase
          .from("modelaciones")
          .insert(values)
          .select("id")
          .single();
        if (modelError) throw modelError;
        console.log(modelacion);

        // Crear vectores temporales
        const { data: vectores, error: vectoresError } = await supabase.functions.invoke("createTimeVectors", {
          body: { modelacion_id: modelacion.id },
        });
        if (vectoresError) throw vectoresError;
        console.log(vectores);

        // Crear flujos resultado
        const { data: flujos, error: flujosError } = await supabase.functions.invoke("createFlowsResult", {
          body: { modelacion_id: modelacion.id },
        });
        if (flujosError) throw flujosError;
        console.log(flujos);

        // Crear análisis
        // const { data: analisis, error: analisisError } = await supabase.functions.invoke("createAnalysis", {
        //   body: { modelacion_id: modelacion.id },
        // });
        // if (analisisError) throw analisisError;
        // console.log(analisis);
      } catch (err) {
        console.error("Error", err);
      }
    };

    runModelation();
  }, []);

  return (
    <div>
      <h1>Crear Modelación</h1>
    </div>
  );
};

export default CreateModelation;
