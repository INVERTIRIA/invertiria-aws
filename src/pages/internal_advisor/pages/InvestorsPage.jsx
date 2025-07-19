// Hooks
import { useEffect, useRef, useState } from "react";

// Componentes
import PageTitle from "../../../components/design/PageTitle";
import { supabase } from "../../../supabase";
import InvestorsTable from "../../../components/tables/InvestorsTable";

const InvestorsPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Functions
  const fetchRecords = async () => {
    const res = await supabase
      .from("asesorados")
      .select("id, created_at, usuario:usuario_id(*)");

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
      <PageTitle title="Mis inversionistas" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Inversionistas
          </div>
          <p className="text-sm text-gray-700">
            Administación de inversionistas
          </p>
        </div>
        {/* <div className="flex flex-col 2xs:flex-row items-center gap-2">
          <Button className="w-full 2xs:w-auto font-light">
            <CloudDownload className="size-5" strokeWidth={1.5} /> Descargar CSV
          </Button>
        </div> */}
      </div>
      <InvestorsTable records={records} />
    </>
  );
};

export default InvestorsPage;
