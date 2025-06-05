import { CloudDownload } from "lucide-react";

// Contexts
import { useAuth } from "../../../contexts/AuthContext";

// Hooks
import { useEffect, useRef, useState } from "react";

// Componentes
import PageTitle from "@/components/design/PageTitle";
import { Button } from "@/components/ui/button";

const CompaniesPage = () => {
  // Hooks
  const [refresh, setRefresh] = useState(false);
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Instance
  const { createAdminInstance } = useAuth();
  const adminInstance = createAdminInstance({});

  const fetchRecords = async () => {
    const res = await adminInstance.getCompanies();
    console.log(res);

    setRecords(res);
  };

  // Hacer un fetch cuando se actualice el refresh
  useEffect(() => {
    if (refresh) {
      fetchRecords();
    }
  }, [refresh]);

  // Hacer que el useEffect solo se ejecute una vez
  useEffect(() => {
    if (!effectRan.current) {
      fetchRecords();
      effectRan.current = true;
    }
  }, []);

  return (
    <>
      <PageTitle title="Empresas" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">Empresas</div>
          <p className="text-sm text-gray-700">Administación de empresas</p>
        </div>
        <div className="flex flex-col 2xs:flex-row items-center gap-2">
          <Button className="w-full 2xs:w-auto font-light">
            <CloudDownload className="size-5" strokeWidth={1.5} /> Descargar CSV
          </Button>
          {/* <CreateAdvisors setRefresh={setRefresh} /> */}
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
