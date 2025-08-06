import { useEffect, useRef, useState } from "react";
import AddRecordModal from "../../../components/design/AddRecordModal";
import PageTitle from "../../../components/design/PageTitle";
import ImportDataForm from "../components/forms/ImportDataForm";
import { supabase } from "../../../supabase";
import ImportDataTable from "../../../components/tables/ImportDataTable";

const ImportDataPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  const fetchRecords = async () => {
    const res = await supabase.from("carga_datos").select("*");
    if (res.error) return;

    setRecords(res.data);
  };

  // Hacer que el useEffect solo se ejecute una vez
  useEffect(() => {
    if (!effectRan.current) {
      fetchRecords();
      effectRan.current = true;
    }
  }, []);

  return (
    <>
      <PageTitle title="Carga de datos" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Carga de datos
          </div>
          <p className="text-sm text-gray-700">
            Importación de datos (Matriz ML, Proyectos Inmobiliarios, Valores de
            referencia)
          </p>
        </div>
        <AddRecordModal
          title="Importar datos"
          description="Seleccione la ubicación del archivo"
          buttonName="Importar datos"
        >
          <ImportDataForm onSuccess={fetchRecords} />
        </AddRecordModal>
      </div>
      <ImportDataTable records={records} />
    </>
  );
};

export default ImportDataPage;
