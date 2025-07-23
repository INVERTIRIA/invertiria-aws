// Hooks
import { supabase } from "../../../supabase";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";

// Componentes
import Skeleton from "../../../components/design/Skeleton";
import PageTitle from "../../../components/design/PageTitle";
import UserHeader from "../../../components/design/UserHeader";
import InvestorForm from "../../../components/forms/InvestorForm";
import { Button, buttonVariants } from "../../../components/ui/button";

// Iconos
import { ArrowLeft, ChartColumnIncreasing } from "lucide-react";

const InvestorDetailsPage = () => {
  /* HOOKS
  ___________________________________________ */
  const { id } = useParams();
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const { user, setErrorToast } = useAuth();

  const [record, setRecord] = useState(null);

  /* FUNCIONES
  ___________________________________________ */
  const fetchRecord = async () => {
    const { error, data } = await supabase
      .from("asesorados")
      .select("id, usuario:usuario_id(*)")
      .eq("usuario_id", id)
      .single();

    if (error) {
      setErrorToast(error.message);
      navigate(`/internal_advisor/investors`);
      return;
    }

    setRecord(data);
  };

  /* USEEFFECT
  ___________________________________________ */
  useEffect(() => {
    if (!effectRan.current) {
      fetchRecord();
      effectRan.current = true;
    }
  }, []);

  if (!record) return <Skeleton />;

  return (
    <>
      <PageTitle
        title={record.usuario.nombre + " " + record.usuario.apellidos}
      />
      <div className="flex flex-col gap-4">
        <UserHeader
          userInfo={record.usuario}
          changeEmail={false}
          className="h-32 sm:h-40"
        >
          <div className="absolute top-0 left-0 w-full h-full p-4 lg:p-10">
            <Link
              to={`/${user.user_metadata.role}/investors`}
              className={buttonVariants({
                variant: "link",
                className: "text-white !p-0",
              })}
            >
              <ArrowLeft className="size-4" /> Regresar
            </Link>
          </div>
        </UserHeader>
        <Link
          to={`/${user.user_metadata.role}/investors/${record.id}/analysis`}
          className={buttonVariants({
            variant: "theme",
            className: "mx-auto sm:ml-4 lg:ml-14 w-fit",
          })}
        >
          <ChartColumnIncreasing className="size-4" /> Ver análisis
        </Link>
      </div>
      <div className="mt-10 md:pb-10 lg:px-10 w-full flex flex-col gap-16">
        {/* Información de inversionista */}
        <div className="grid lg:grid-cols-3 gap-x-2 gap-y-6">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">
              Información de inversionista
            </p>
            <p className="text-xs text-gray-700">
              Datos personales del inversionista
            </p>
          </div>
          <div className="md:col-span-2  rounded-lg shadow-custom-md ring-1 ring-zinc-200 p-6 md:p-10">
            <InvestorForm
              investorData={record.usuario}
              onSuccess={fetchRecord}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorDetailsPage;
