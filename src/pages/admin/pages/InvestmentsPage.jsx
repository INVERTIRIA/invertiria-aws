import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/design/PageTitle";
import { supabase } from "../../../supabase";
import InvestmentsTable from "../../../components/tables/InvestmentsTable";
import { useAuth } from "../../../contexts/AuthContext";
import { roles } from "../../../constants";

const InvestmentsPage = () => {
  const { user } = useAuth();

  // Hooks
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Functions
  const fetchRecords = async () => {
    const role = user.user_metadata.role;

    if (role !== roles.admin) {
      const res = await supabase.rpc("get_advisor_investments");

      if (res.error) return;

      setRecords(res.data);
      return;
    }

    const res = await supabase
      .from("modelaciones")
      .select(
        `
        id,
        titulo_modelacion,
        modelo_de_negocio,
        precio_de_compra,
        precio_de_mercado,
        tipo_inmueble,
        estado_inmueble,
        vigencia,        
        created_at,
        created_by(nombre, apellidos, email, img_perfil)
        `
      )
      .order("created_at", { ascending: false });

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
      header: "Creado por",
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
      label: "Creado por",
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
      <PageTitle title="Análisis de inversiones globales" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Análisis de inversiones globales
          </div>
          <p className="text-sm text-gray-700">Administrar inversiones</p>
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

export default InvestmentsPage;
