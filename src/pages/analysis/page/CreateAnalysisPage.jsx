import { useEffect, useState } from "react";
import { useLayoutVisibility } from "../../../contexts/LayoutVisibilityContext";
import PageTitle from "../../../components/design/PageTitle";
import { Container } from "../../../components/design/Container";
import Tips from "../components/Tips";
import AnalysisForm from "../../../components/forms/AnalysisForm";
import { ArrowRight, Loader2, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button";

const CreateAnalysisPage = () => {
  const { setHideLayout } = useLayoutVisibility();
  const [step, setStep] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setHideLayout(true);
  }, [setHideLayout]);

  return (
    <>
      <PageTitle title="Create Analysis" />
      {!isSubmitting ? (
        <div className="h-screen -mt-32 flex items-center justify-center relative overflow-hidden">
          <Link to="/" className="absolute top-4 left-4 group z-10">
            <X
              className="size-6 text-gray-400 group-hover:text-gray-600"
              strokeWidth={1.5}
            />
          </Link>
          <img
            src="/assets/svg/logo-3.svg"
            alt=""
            className="hidden lg:block w-full h-full absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src="/assets/svg/logo-3.svg"
            alt=""
            className="block lg:hidden w-full h-full object-cover absolute "
          />
          <Container
            classNameParent={
              "z-1 w-full h-full flex items-center justify-center"
            }
            className={
              "w-full h-[80%] lg:h-[70%] xl:h-[650px] bg-gray-50 rounded-2xl shadow-lg ring-1 ring-gray-100 flex flex-items-center overflow-hidden"
            }
          >
            {step === null ? (
              <div className="w-full h-full flex items-center justify-center flex-col gap-8 text-center p-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-4xl">
                    ¡Comencemos tu análisis de inversión!
                  </h2>
                  <p className="text-gray-700">
                    A partir de ahora te haremos una serie de preguntas clave.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="theme"
                  className="w-fit hover:scale-95"
                  onClick={() => setStep(0)}
                >
                  Empezar
                  <ArrowRight />
                </Button>
                <span className="text-sm text-gray-500 max-w-md">
                  Cuanta más información nos proporciones, más preciso y útil
                  será el análisis que obtendrás al final. Tómate tu tiempo para
                  responder con detalle. ¡Vamos paso a paso!
                </span>
              </div>
            ) : (
              <>
                <Tips step={step} />
                <AnalysisForm
                  step={step}
                  setStep={setStep}
                  setIsSubmitting={setIsSubmitting}
                />
              </>
            )}
          </Container>
        </div>
      ) : (
        <div className="h-screen -mt-32 flex flex-col items-center gap-10 justify-center relative overflow-hidden">
          <img
            src="/assets/images/liquid-loader.gif"
            alt=""
            className="size-24"
          />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl font-bold text-center">
              Preparando su análisis
            </h3>
            <p className="text-center text-gray-500 max-w-xs">
              Por favor, espere mientras se prepara su análisis.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAnalysisPage;
