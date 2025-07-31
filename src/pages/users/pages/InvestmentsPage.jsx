import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/design/PageTitle";
import { supabase } from "../../../supabase";
import { useOutletContext } from "react-router";
import InvestmentsTable from "../../../components/tables/InvestmentsTable";

const InvestmentsPage = () => {
  // Hooks
  const { userInfo } = useOutletContext();
  const [records, setRecords] = useState([]);
  const effectRan = useRef(false);

  // Functions
  const fetchRecords = async () => {
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
        `
      )
      .eq("usuario_id", userInfo.id)
      .order("created_at", { ascending: false });

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
      <PageTitle title="Mis inversiones" />
      <div className="flex flex-col gap-y-6 md:flex-row md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-gray-900 font-medium text-2xl">
            Mis inversiones
          </div>
          <p className="text-sm text-gray-700">Administrar mis inversiones</p>
        </div>
      </div>
      <InvestmentsTable records={records} />
    </>
  );
};

export default InvestmentsPage;
