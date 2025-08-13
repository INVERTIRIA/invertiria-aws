import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/design/PageTitle";
import { supabase } from "../../../supabase";
import InvestmentsTable from "../../../components/tables/InvestmentsTable";

const InvestmentsPage = () => {
  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Functions
  const fetchRecords = async () => {
    const res = await supabase.rpc("get_my_investments");

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

  return (
    <>
      <PageTitle title="Mis inversiones" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Mis inversiones
          </div>
          <p className="text-sm text-gray-700">Administrar mis inversiones</p>
        </div>
      </div>
      <InvestmentsTable records={records} additionalColumns={columns} />
    </>
  );
};

export default InvestmentsPage;
