import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Question from "../../pages/analysis/components/Question";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Steps } from "../../pages/analysis/components/Steps";
import { useState } from "react";
import { stepsQuestions } from "../../constants";

const AnalysisForm = ({ step, setStep }) => {
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [stepHistory, setStepHistory] = useState([]);

  // Functions
  const handleSkip = (step) => {
    const { questions } = stepsQuestions.find((q) => q.step == step);

    for (const key in questions) {
      const value = questions[key];
      form.setValue(key, value);
    }
  };

  const handleChangeStep = (action) => {
    if (action) {
      setStepHistory((prev) => [...prev, step]);
      setStep(step + 1);

      handleSkip(step);
      return;
    }

    const newStep = stepHistory[stepHistory.length - 1];

    setStep(newStep);
    setSkippedQuestions((prev) => prev.filter((q) => q !== newStep));
    setStepHistory((prev) => prev.filter((q) => q !== newStep));

    return;
  };

  // Form
  const form = useForm({
    defaultValues: {
      titulo_modelacion: "",
      nombre_del_proyecto: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log({ ...values, skippedQuestions, stepHistory });
  });

  /* useEffect(() => {
    console.log(stepHistory);
  }, [stepHistory]); */

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full px-4 py-2">
      <div className="w-full flex flex-col gap-14 items-center justify-center flex-1 rounded-tr-2xl">
        {/* <p>Paso {step}</p> */}

        {/* Pregunta */}
        <Question stepIndex={step} />
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center gap-14"
          >
            <Steps
              stepIndex={step}
              setStep={setStep}
              form={form}
              setStepHistory={setStepHistory}
            />
            {step === 10 && (
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
          disabled={!(step > 4 && step < 9)}
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
