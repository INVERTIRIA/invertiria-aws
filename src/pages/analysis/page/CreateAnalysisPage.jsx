import { useEffect, useState } from "react";
import { useLayoutVisibility } from "../../../contexts/LayoutVisibilityContext";
import PageTitle from "../../../components/design/PageTitle";
import { Container } from "../../../components/design/Container";
import Tips from "../components/Tips";
import AnalysisForm from "../../../components/forms/AnalysisForm";
import { Loader2 } from "lucide-react";

const CreateAnalysisPage = () => {
  const { setHideLayout } = useLayoutVisibility();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setHideLayout(true);
  }, [setHideLayout]);

  return (
    <>
      <PageTitle title="Create Analysis" />
      {!isSubmitting ? (
        <div className="h-screen -mt-32 flex items-center justify-center relative overflow-hidden">
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
              "w-full h-[80%] lg:h-[70%] bg-gray-50 rounded-2xl shadow-lg ring-1 ring-gray-100 flex flex-items-center overflow-hidden"
            }
          >
            <Tips step={step} />
            <AnalysisForm
              step={step}
              setStep={setStep}
              setIsSubmitting={setIsSubmitting}
            />
          </Container>
        </div>
      ) : (
        <div className="h-screen -mt-32 flex flex-col items-center gap-10 justify-center relative overflow-hidden">
          {/* <Loader2 className="size-40 animate-spin " strokeWidth={1.2} /> */}
          <img
            src="/assets/images/liquid-loader.gif"
            alt=""
            className="size-24"
          />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl font-bold">Preparando su análisis</h3>
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
