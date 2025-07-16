import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Question from "../../pages/analysis/components/Question";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Steps } from "../../pages/analysis/components/Steps";
import { useState } from "react";
import { determineSkippedQuestions } from "../../constants/functions";

const AnalysisForm = ({ step, setStep }) => {
  const [skippedQuestions, setSkippedQuestions] = useState([]); //Array con los steps que se han saltado
  const [skippedStep, setSkippedStep] = useState(0); // Step que se ha saltado
  const [stepHistory, setStepHistory] = useState([]);

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
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const res = determineSkippedQuestions(skippedQuestions);
    console.log({ ...values, campos_omitidos: res });
  });

  /* useEffect(() => {
    console.log(stepHistory);
  }, [stepHistory]); */

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full px-4 py-2">
      <div className="w-full flex flex-col gap-14 items-center justify-center flex-1 rounded-tr-2xl">
        <p>Paso {step}</p>

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
            {step === 19 && (
              <Button type="submit" variant="theme">
                Enviar
              </Button>
            )}
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
