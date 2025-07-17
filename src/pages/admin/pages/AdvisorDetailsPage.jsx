// Hooks
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { supabase } from "../../../supabase";

// Constants
import { roles } from "../../../constants";

// Components
import AdvisorForm from "../components/forms/AdvisorForm";
import Skeleton from "../../../components/design/Skeleton";
import UserHeader from "../../../components/design/UserHeader";
import { buttonVariants } from "../../../components/ui/button";
import { ArrowLeft, Building2 } from "lucide-react";
import UserAdvisorAssigner from "../components/UserAdvisorAssigner";

const AdvisorDetailsPage = () => {
  /* HOOKS
  ___________________________________________ */
  const { id } = useParams();
  const navigate = useNavigate();
  const effectRan = useRef(false);

  const [record, setRecord] = useState(null);
  const { user, setErrorToast } = useAuth();

  /* FUNCIONES
  ___________________________________________ */
  const fetchRecord = async () => {
    const additionalQuery =
      user.user_metadata.role === roles.company
        ? ""
        : ", empresa:empresas(name)";

    const { error, data } = await supabase
      .from("asesores")
      .select(
        `*, usuario:usuarios(id, usuario_id, nombre, apellidos, telefono, email, direccion, telefono, fecha_de_nacimiento, img_perfil, pais_id, ciudad, genero) ${additionalQuery}`
      )
      .eq("id", id)
      .single();

    if (error) {
      setErrorToast(error.message);
      navigate(`/${user.user_metadata.role}/advisors`);
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
    <div className="flex flex-col gap-4">
      <UserHeader
        userInfo={record.usuario}
        changeEmail={false}
        className="h-32 sm:h-40"
      >
        <div className="absolute top-0 left-0 w-full h-full p-4 lg:p-10">
          <Link
            to={`/${user.user_metadata.role}/advisors`}
            className={buttonVariants({
              variant: "link",
              className: "text-white !p-0",
            })}
          >
            <ArrowLeft className="size-4" /> Regresar
          </Link>
        </div>
      </UserHeader>

      <div className="mt-10 md:pb-10 lg:px-10 w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="col-span-1 lg:col-span-2 rounded-lg ring-1 ring-zinc-200 p-4 md:p-8 flex flex-col gap-10"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="flex flex-col gap-y-4 sm:flex-row justify-between items-center">
              <div className="flex flex-col">
                <p className="font-semibold text-lg">Información personal</p>
                <p className="text-xs text-gray-700">
                  Datos personales del asesor
                </p>
              </div>
              {user.user_metadata.role !== roles.company && (
                <div className="bg-invertiria-2 p-2 rounded-md flex items-center gap-2">
                  <Building2 className="size-5 text-white" strokeWidth={1.5} />
                  <p className="text-sm text-white capitalize">
                    {record.empresa.name}
                  </p>
                </div>
              )}
            </div>
            <AdvisorForm
              advisorData={record.usuario}
              action="update"
              onSuccess={fetchRecord}
            />
          </div>
          {/* Usuario asignado */}
          {user.user_metadata.role !== roles.company && (
            <div
              className="col-span-1 flex flex-col gap-10 w-full rounded-lg ring-1 ring-zinc-200 p-4 md:p-8 "
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex flex-col">
                <p className="font-semibold text-lg">Usuarios asignados</p>
                <p className="text-xs text-gray-700">
                  Lista de usuarios que se le asigna el asesor
                </p>
              </div>
              <UserAdvisorAssigner advisorId={record.usuario.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorDetailsPage;
