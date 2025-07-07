import { useEffect, useRef } from "react";

const CreateModelation = () => {

  const loadedTimeVectors = useRef(false);
  const loadedFlowsResult = useRef(false);
  const loadedAnalysis = useRef(false);

  // Funcion crear vectores temporales
  const createTimeVectors = async () => {
    const { data: timeVectors, error } = await supabase.functions.invoke("createTimeVectors", { body: { "modelacion_id": "4ccdb1be-038d-464a-8059-0d532834cb09" } });
    if (error) console.log(error);
    console.log(timeVectors);
    return timeVectors;
  };

  // Funcion crear flujos resultado
  const createFlowsResult = async () => {
    const { data: flowsResult, error } = await supabase.functions.invoke("createFlowsResult", { body: { "modelacion_id": "4ccdb1be-038d-464a-8059-0d532834cb09" } });
    if (error) console.log(error);
    console.log(flowsResult);
    return flowsResult;
  };

  // Funcion crear analisis
  const createAnalysis = async () => {
    const { data: analysis, error } = await supabase.functions.invoke("createAnalysis", { body: { "modelacion_id": "4ccdb1be-038d-464a-8059-0d532834cb09" } });
    if (error) console.log(error);
    console.log(analysis);
    return analysis;
  };

  useEffect(() => {
    // if (!loadedTimeVectors.current) {
    //   createTimeVectors();
    //   loadedTimeVectors.current = true;
    // }
    // if (!loadedFlowsResult.current) {
    //   createFlowsResult();
    //   loadedFlowsResult.current = true;
    // }
    // if (!loadedAnalysis.current) {
    //   createAnalysis();
    //   loadedAnalysis.current = true;
    // }
  }, []);

  return (
    <div>
      <h1>Crear Modelacion</h1>
    </div>
  );
}

export default CreateModelation