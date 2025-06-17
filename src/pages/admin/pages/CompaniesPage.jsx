import { CloudDownload } from "lucide-react";

// Contexts
import { useAuth } from "../../../contexts/AuthContext";

// Hooks
import { useEffect, useRef, useState } from "react";

// Componentes
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/design/PageTitle";
import AddRecordModal from "@/components/design/AddRecordModal";
import CompanyForm from "../components/forms/CompanyForm";
import CompaniesTable from "../../../components/tables/CompaniesTable";

const CompaniesPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Instance
  const { createAdminInstance } = useAuth();
  const adminInstance = createAdminInstance({});

  const fetchRecords = async () => {
    const res = await adminInstance.getCompanies();
    setRecords(res);
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
          <AddRecordModal
            title="Crear empresa"
            description="Ingresa todos los datos para la creación del perfil de la empresa"
          >
            <CompanyForm onSuccess={fetchRecords} />
          </AddRecordModal>
        </div>
      </div>
      <CompaniesTable records={records} />
    </>
  );
};

export default CompaniesPage;
