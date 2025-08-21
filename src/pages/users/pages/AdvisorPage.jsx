import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../supabase";
import PageTitle from "../../../components/design/PageTitle";
import UserHeader from "../../../components/design/UserHeader";
import Skeleton from "../../../components/design/Skeleton";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

const AdvisorPage = () => {
  // Hooks
  const effectRan = useRef(false);
  const [record, setRecord] = useState(null);

  // Functions
  const fetchRecord = async () => {
    const res = await supabase.rpc("get_advisor");

    if (res.error) return;

    setRecord(res.data[0]);
    effectRan.current = true;
  };

  // Datos
  const personalFields1 = [
    {
      name: "nombre",
      label: "Nombre",
      placeholder: "Ingrese su nombre",
    },
    {
      name: "apellidos",
      label: "Apellidos",
      placeholder: "Ingrese su apellido",
    },
    {
      name: "telefono",
      label: "Teléfono",
      placeholder: "Ingrese su telefono",
      type: "number",
    },
    {
      name: "direccion",
      label: "Dirección",
      placeholder: "Ingrese su dirección",
    },
  ];

  const personalFields2 = [
    {
      name: "ciudad",
      label: "Ciudad",
      placeholder: "Seleccione su ciudad",
    },
    {
      name: "genero",
      label: "Género",
      placeholder: "Seleccione su género",
      options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
      ],
    },
  ];

  // Hacer que el useEffect solo se ejecute una vez
  useEffect(() => {
    if (!effectRan.current) {
      fetchRecord();
    }
  }, []);

  if (!effectRan.current) return <Skeleton />;

  return (
    <>
      <PageTitle title="Mi asesor" />
      {record ? (
        <>
          <UserHeader userInfo={record} />
          <div className="mt-10 md:pb-10 lg:px-10 w-full flex flex-col gap-16">
            {/* Información de inversionista */}
            <div className="grid lg:grid-cols-3 gap-x-2 gap-y-6">
              <div className="flex flex-col">
                <p className="font-semibold text-lg">Información personal</p>
                <p className="text-xs text-gray-700">
                  Datos personales del asesor
                </p>
              </div>
              <div className="md:col-span-2  rounded-lg shadow-custom-md ring-1 ring-zinc-200 p-6 md:p-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  {personalFields1.map((item) => (
                    <div key={item.name} className="flex flex-col gap-2">
                      <Label htmlFor={item.name}>{item.label}</Label>
                      <Input
                        className="bg-white"
                        placeholder={item.placeholder}
                        type={item.type || "text"}
                        id={item.name}
                        value={record[item.name]}
                        readOnly
                      />
                    </div>
                  ))}
                  {/* Calendario */}
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-sm leading-none">
                      Fecha de nacimiento
                    </p>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal text-base md:text-sm",
                        !record.fecha_de_nacimiento && "text-muted-foreground"
                      )}
                    >
                      {record.fecha_de_nacimiento ? (
                        format(
                          parseISO(record.fecha_de_nacimiento),
                          "yyyy-MM-dd"
                        )
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </div>
                  {/* Selects */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pais">País</Label>
                    <Input
                      className="bg-white"
                      placeholder="Seleccione su país"
                      type="text"
                      id="pais"
                      value={"Colombia"}
                      readOnly
                    />
                  </div>
                  {personalFields2.map((item) => (
                    <div key={item.name} className="flex flex-col gap-2">
                      <Label htmlFor={item.name}>{item.label}</Label>
                      <Input
                        className="bg-white"
                        placeholder={item.placeholder}
                        type={item.type || "text"}
                        id={item.name}
                        value={record[item.name]}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-semibold">No tienes asesor</p>
          <p className="text-gray-700">
            Si requieres un asesor, contacta a tu representante
          </p>
          <Button className="w-fit" variant={"theme"}>
            Contactar
          </Button>
        </div>
      )}
    </>
  );
};

export default AdvisorPage;
