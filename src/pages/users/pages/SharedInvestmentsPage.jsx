import { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/design/PageTitle";
import InvestmentsTable from "../../../components/tables/InvestmentsTable";
import { supabase } from "../../../supabase";

const SharedInvestmentsPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Functions
  const fetchRecords = async () => {
    const res = await supabase.rpc("get_shared_investments");

    if (res.error) return;

    setRecords(res.data);
  };

  // Additonals
  const columns = [
    {
      accessorFn: (row) => {
        const { nombre, apellidos, email } = row.created_by;
        return `${nombre} ${apellidos} ${email}`;
      },
      id: "created_by",
      header: "Invitado por",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={
              row.original.created_by?.img_perfil || "/assets/svg/logo-2.svg"
            }
            alt=""
            className="w-8 h-8 rounded-full bg-gray-100"
          />
          <div className="lowercase font-light flex flex-col">
            <div className="font-medium">
              {row.original.created_by.nombre}{" "}
              {row.original.created_by.apellidos}
            </div>
            <p className="text-xs text-gray-500">
              {row.original.created_by.email}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const filters = [
    {
      field: "created_by",
      label: "Invitado por",
    },
  ];

  // Hacer que el useEffect solo se ejecute una vez
  useEffect(() => {
    if (!effectRan.current) {
      fetchRecords();
      effectRan.current = true;
    }
  }, []);

  return (
    <>
      <PageTitle title="Inversiones compartidas" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Inversiones compartidas
          </div>
          <p className="text-sm text-gray-700">
            Listado de inversiones compartidas
          </p>
        </div>
      </div>
      <InvestmentsTable
        records={records}
        additionalColumns={columns}
        additionalFilters={filters}
      />
    </>
  );
};

export default SharedInvestmentsPage;
