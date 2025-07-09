import { useEffect, useState } from "react";
import { useLayoutVisibility } from "../../../contexts/LayoutVisibilityContext";
import PageTitle from "../../../components/design/PageTitle";
import { Container } from "../../../components/design/Container";
import Tips from "../components/Tips";
import AnalysisForm from "../../../components/forms/AnalysisForm";

const CreateAnalysisPage = () => {
  const { setHideLayout } = useLayoutVisibility();
  const [step, setStep] = useState(0);

  useEffect(() => {
    setHideLayout(true);
  }, [setHideLayout]);

  return (
    <>
      <PageTitle title="Create Analysis" />
      <div className="h-screen -mt-32 flex items-center justify-center relative overflow-hidden">
        <img
          src="/assets/svg/logo-3.svg"
          alt=""
          className="w-full h-full absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2"
        />
        <Container
          classNameParent={"z-1 w-full h-full flex items-center justify-center"}
          className={
            "w-full h-[70%] bg-gray-50 rounded-2xl shadow-lg ring-1 ring-gray-100 flex flex-items-center"
          }
        >
          <Tips step={step} />
          <AnalysisForm step={step} setStep={setStep} />
        </Container>
      </div>
    </>
  );
};

export default CreateAnalysisPage;
