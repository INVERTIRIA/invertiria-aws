import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Question from "../../pages/analysis/components/Question";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Steps } from "../../pages/analysis/components/Steps";
import { useState } from "react";
import { delay, determineSkippedQuestions } from "../../constants/functions";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router";

const AnalysisForm = ({ step, setStep, setIsSubmitting }) => {
  const [skippedQuestions, setSkippedQuestions] = useState([]); //Array con los steps que se han saltado
  const [skippedStep, setSkippedStep] = useState(0); // Step que se ha saltado
  const [stepHistory, setStepHistory] = useState([]);
  const navigate = useNavigate();

  // Functions
  const handleChangeStep = (action) => {
    if (action) {
      setStepHistory((prev) => [...prev, step]);
      setSkippedStep(step);

      setStep(step + 1);

      return;
    }

    const newStep = stepHistory[stepHistory.length - 1];

    setStep(newStep);
    setStepHistory((prev) => prev.filter((q) => q !== newStep));
    setSkippedQuestions((prev) => prev.filter((q) => q !== newStep));

    return;
  };

  // Form
  const form = useForm({
    defaultValues: {
      titulo_modelacion: "",
      /* Datos del proyecto */
      nombre_del_proyecto: "",
      pais_id: "",
      ciudad_id: "",
      zona: "",
      subzona: "",
      fecha_inicio_ventas: "",
      fecha_prevista_entrega: "",
      vivienda_vis: "",
      licencia_construccion: "",
      edad_propiedad: "",
      etapa_proyecto: "",
      /* Datos del inmueble */
      precio_de_compra: "",
      precio_de_mercado: "",
      separacion: "",
      cuota_inicial: "",
      pagos_personalizados: "",
      fecha_pagos_personalizados: [],
      valor_pagos_personalizados: [],
      tasa_de_interes: "",
      area_inmueble: "",
      parqueaderos: "",
      porcentaje_comision_vendedor: "",
      valor_administracion: "",
      valor_predial: null,
      valor_mejoras: null,
      costos_licencias: "",
      canon_de_arrendamiento: "",
      valor_noche: "",
      tarifa_mensual: "",
      ocupacion_media: "",
      porcentaje_del_operador: "",
      porcentaje_inmobiliaria: "",
      precio_venta: "",
      fecha_compra: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values2) => {
    setIsSubmitting(true);

    const values = {
      usuario_id: "70bf12cf-83e3-4263-83aa-841000ccea7b",
      titulo_modelacion: "Nombre de la inversion",
      nombre_del_proyecto: "Palmanova",
      pais_id: 46,
      ciudad_id: 2,
      zona: "Centro",
      subzona: "Poblado",
      fecha_inicio_ventas: "2025-06-01",
      fecha_prevista_entrega: "2028-07-01",
      vivienda_vis: false,
      licencia_construccion: false,
      edad_propiedad: 0,
      etapa_proyecto: 1,
      precio_de_compra: 300000000,
      precio_de_mercado: 320000000,
      separacion: 2000000,
      cuota_inicial: 30,
      pagos_personalizados: null,
      fecha_pagos_personalizados: [],
      valor_pagos_personalizados: [],
      tasa_de_interes: 10,
      area_inmueble: 50,
      parqueaderos: 1,
      porcentaje_comision_vendedor: 3,
      valor_administracion: 240000,
      valor_predial: 1800000,
      valor_mejoras: null,
      costos_licencias: null,
      canon_de_arrendamiento: 1950000,
      valor_noche: null,
      tarifa_mensual: null,
      ocupacion_media: null,
      porcentaje_del_operador: null,
      porcentaje_inmobiliaria: null,
      precio_venta: null,
      fecha_compra: "2025-07-01",
      vigencia: true,
      tipo_inmueble: "Apto.",
      estado_inmueble: "Sobre planos",
      modelo_de_negocio: "Comprar para vender",
      forma_pago_cuota_inicial: 1,
      inicial_fecha_inicio_pago: "2025-08-01",
      inicial_fecha_fin_pago: "2028-06-01",
      credito_hipotecario: true,
      credito_fecha_inicio_pago: "2028-08-01",
      credito_fecha_fin_pago: "2048-08-01",
      cesion_de_derechos: true,
      fecha_prevista_venta: "2029-08-01",
      comision_vendedor: true,
      administracion: true,
      mejoras: false,
      renta: 1,
      inmobiliaria: false,
    };

    // Limpiar valores vacíos
    Object.entries(values).forEach(([key, value]) => {
      if (value === "") values[key] = null;
    });

    try {
      // Crear modelación
      const { data: modelacion, error: insertError } = await supabase
        .from("modelaciones")
        .insert(values)
        .select("id")
        .single();

      if (insertError || !modelacion) throw insertError;

      await delay(500); // Esperar medio segundo

      // Crear vectores temporales
      const { data: timeVectors, error: timeVectorsError } =
        await supabase.functions.invoke("createTimeVectors", {
          body: { modelacion_id: modelacion.id },
        });

      if (timeVectorsError || !timeVectors?.data.length) throw timeVectorsError;

      await delay(500); // Esperar otro medio segundo

      // Crear flujos resultado
      const { error: flowsResultError } = await supabase.functions.invoke(
        "createFlowsResult",
        {
          body: { modelacion_id: modelacion.id },
        }
      );

      if (flowsResultError) throw flowsResultError;

      await delay(500); // Esperar de nuevo

      // Crear análisis
      const { error: analysisError } = await supabase.functions.invoke(
        "createAnalysis",
        {
          body: { modelacion_id: modelacion.id },
        }
      );

      if (analysisError) throw analysisError;

      navigate(`/analysis/${modelacion.id}`);
    } catch (error) {
      handleError(error);
    }
  });

  const handleError = (error) => {
    console.error("Error:", error);
    navigate("/analysis/7cff7a9b-21d7-44e4-857c-9baa947649ed");
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 lg:px-4 lg:py-2 min-h-0 overflow-y-auto">
      <div className="w-full pb-10 sm:pb-0 flex flex-col gap-10 md:gap-14 items-center justify-center flex-1 rounded-tr-2xl">
        {/* Pregunta */}
        <Question stepIndex={step} />
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center gap-14"
          >
            <Steps
              form={form}
              stepIndex={step}
              setStep={setStep}
              skippedStep={skippedStep}
              setStepHistory={setStepHistory}
            />
            {/* {step === 0 && (
              <Button type="submit" variant="theme">
                Enviar
              </Button>
            )} */}
          </form>
        </Form>
      </div>
      {/* Navegacion */}
      <div className="w-full mt-auto flex items-center justify-between rounded-br-2xl">
        <Button
          variant="link"
          disabled={step === 0}
          onClick={() => handleChangeStep(false)}
        >
          <ArrowLeft /> Atrás
        </Button>
        <Button
          variant="link"
          disabled={!(step > 4 && step < 19)}
          onClick={() => {
            handleChangeStep(true);
            setSkippedQuestions([...skippedQuestions, step]);
          }}
        >
          Omitir
        </Button>
      </div>
    </div>
  );
};

export default AnalysisForm;
