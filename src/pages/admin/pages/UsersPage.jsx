// Contexts
import { useAuth } from "../../../contexts/AuthContext";

// Hooks
import { useEffect, useRef, useState } from "react";
// Componentes
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/design/PageTitle";
import UsersTable from "@/components/tables/UsersTable";
import { CloudDownload } from "lucide-react";

const UsersPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Instance
  const { createAdminInstance } = useAuth();
  const adminInstance = createAdminInstance({});

  const fetchRecords = async () => {
    const res = await adminInstance.getUsers();
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
      <PageTitle title="Usuarios" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">Usuarios</div>
          <p className="text-sm text-gray-700">Administación de usuarios</p>
        </div>
        <div className="flex flex-col 2xs:flex-row items-center gap-2">
          <Button className="w-full 2xs:w-auto font-light">
            <CloudDownload className="size-5" strokeWidth={1.5} /> Descargar CSV
          </Button>
        </div>
      </div>
      <UsersTable records={records} onSuccess={fetchRecords} />
    </>
  );
};

export default UsersPage;
