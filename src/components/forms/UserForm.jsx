import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";

// Hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// Componentes
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Datos
import { investorOptions } from "../../constants";
import countriesData from "../../constants/paises.json";

import { userSchema } from "@/constants/schema/user";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import UploadFiles from "../UploadFiles";

// Main
const UserForm = ({ userInfo, setUserInfo }) => {
  // Hooks
  const [isSubmitting, startTransition] = useTransition();
  const [openPopovers, setOpenPopovers] = useState({});
  const [cities, setCities] = useState([]);
  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonRef = useRef(null);
  const uploadFilesRef = useRef(null);

  const { createUserInstance, setUser, uploadFiles } = useAuth();
  const userIntance = createUserInstance(userInfo);

  // Form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: userInfo?.nombre || "",
      last_name: userInfo?.apellidos || "",
      telefono: userInfo?.telefono?.toString() || "",
      fecha_de_nacimiento: userInfo?.fecha_de_nacimiento || "",
      direccion: userInfo?.direccion || "",
      pais_id: userInfo?.pais_id || "",
      ciudad: userInfo?.ciudad || "",
      genero: userInfo?.genero || "",
      img_perfil: userInfo?.img_perfil || "",
      perfil: userInfo?.perfil || "",
      objetivo: userInfo?.objetivo || "",
      plazo_de_inversion: userInfo?.plazo_de_inversion || "",
      experiencia: userInfo?.experiencia || "",
      ahorros_disponibles: userInfo?.ahorros_disponibles?.toString() || "",
      flujo_de_recursos: userInfo?.flujo_de_recursos?.toString() || "",
      ingresos_mensuales: userInfo?.ingresos_mensuales?.toString() || "",
      gastos_mensuales: userInfo?.gastos_mensuales?.toString() || "",
    },
  });

  // Funciones
  const getCities = async (countryId) => {
    const res = await userIntance.getCities(countryId);
    setCities(res.map((item) => ({ value: item.nombre, label: item.nombre })));
  };

  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const closePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  // Datos
  const personalFields1 = [
    {
      name: "first_name",
      label: "Nombre",
      placeholder: "Ingrese su nombre",
    },
    {
      name: "last_name",
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
      name: "pais_id",
      label: "País",
      placeholder: "Seleccione su país",
      options: countriesData,
      onChange: getCities,
    },
    {
      name: "ciudad",
      label: "Ciudad",
      placeholder: "Seleccione su ciudad",
      options: cities,
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

  const invesmentsFields1 = [
    {
      name: "perfil",
      label: "Perfil",
      placeholder: "Seleccione su pefil",
      options: investorOptions.profile,
    },
    {
      name: "objetivo",
      label: "Objetivo",
      placeholder: "Seleccione su objetivo",
      options: investorOptions.objective,
    },
    {
      name: "plazo_de_inversion",
      label: "Plazo de inversión",
      placeholder: "Seleccione su plazo",
      options: investorOptions.term,
    },
    {
      name: "experiencia",
      label: "Experiencia",
      placeholder: "Seleccione su experiencia",
      options: investorOptions.experience,
    },
  ];

  const invesmentsFields2 = [
    {
      name: "ahorros_disponibles",
      label: "Ahorros disponibles",
      placeholder: "Ingrese el valor",
      type: "number",
    },
    {
      name: "flujo_de_recursos",
      label: "Flujo de recursos",
      placeholder: "Ingrese el valor",
      type: "number",
    },
    {
      name: "ingresos_mensuales",
      label: "Ingresos mensuales",
      placeholder: "Ingrese el valor",
      type: "number",
    },
    {
      name: "gastos_mensuales",
      label: "Gastos mensuales",
      placeholder: "Ingrese el valor",
      type: "number",
    },
  ];

  // Submit

  const handleFileUpload = async (file, ref, fileName) => {
    // Iniciar la simulación de carga
    ref.current?.startSimulateUpload();

    const resImage = await uploadFiles(
      `${userInfo.usuario_id}/${fileName}`,
      file,
      "users"
    );

    // Completar la barra al 100%
    ref.current?.completeSimulateUpload();

    return resImage;
  };

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { img_perfil, ...toUpdate } = values;

      // Subir los archivos
      let imageUrl = userInfo?.img_perfil;

      if (img_perfil instanceof File) {
        imageUrl = await handleFileUpload(
          img_perfil,
          uploadFilesRef,
          "profile_picture"
        );
        if (!imageUrl) return;
      }

      const res = await userIntance.update({
        ...toUpdate,
        img_perfil: imageUrl,
      });

      if (!res) return;

      // Renderizar la información de User
      setUser((prevUser) => ({
        ...prevUser,
        user_metadata: {
          ...prevUser.user_metadata,
          first_name: values.first_name,
          last_name: values.last_name,
        },
      }));

      toast.success("Información actualizada con exito");

      setUserInfo(res);
    });
  });

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);

      // Obtener las ciudades al cargar el componente
      if (userInfo?.pais_id) getCities(userInfo.pais_id);
    }
  }, []);

  //console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mt-10 md:pb-10 lg:mt-20 lg:px-10 w-full flex flex-col gap-6"
      >
        {/* Información personal */}
        <div className="grid lg:grid-cols-3 gap-x-2 gap-y-6">
          <div className="flex flex-col">
            <p className="font-semibold">Información personal</p>
            <p className="text-sm text-gray-900">
              Actualiza tu foto y tus datos personales
            </p>
          </div>
          <div className="md:col-span-2 bg-sidebar rounded-lg shadow-sm ring-1 ring-zinc-200 p-4 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {personalFields1.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {item.label} <span className="text-black">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder={item.placeholder}
                          type={item.type || "text"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* Calendario */}
              <FormField
                control={form.control}
                name="fecha_de_nacimiento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fecha de nacimiento <span className="text-black">*</span>
                    </FormLabel>
                    <Popover
                      open={!!openPopovers["fecha_de_nacimiento"]}
                      onOpenChange={() => togglePopover("fecha_de_nacimiento")}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            ref={buttonRef}
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal text-base md:text-sm",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(parseISO(field.value), "yyyy-MM-dd")
                            ) : (
                              <span>Elige una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        style={{ width: buttonWidth }}
                        className="p-0"
                        align="start"
                      >
                        <Calendar
                          style={{ width: buttonWidth }}
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          //onSelect={field.onChange}
                          onSelect={(date) => {
                            const formattedDate = date
                              ? format(date, "yyyy-MM-dd")
                              : "";
                            field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                            togglePopover("fecha_de_nacimiento");
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Selects */}
              {personalFields2.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {item.label} <span className="text-black">*</span>
                      </FormLabel>
                      <Popover
                        open={!!openPopovers[item.name]}
                        onOpenChange={() => togglePopover(item.name)}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              role="combobox"
                              className={cn(
                                "w-full justify-between font-normal text-base md:text-sm",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? item.options.find(
                                    (option) => option.value === field.value
                                  )?.label
                                : item.placeholder}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          style={{ width: buttonWidth }}
                          className="p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Buscar..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                No se encontraron registros.
                              </CommandEmpty>
                              <CommandGroup>
                                {item.options.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                      form.setValue(item.name, option.value);
                                      if (item.onChange)
                                        item.onChange(option.value);

                                      // Cerrar el Popover al seleccionar
                                      closePopover(item.name);
                                    }}
                                  >
                                    {option.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        option.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* Upload files */}
              <FormField
                name="img_perfil"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <span className="text-sm font-medium leading-none select-none">
                      Foto de perfil *
                    </span>
                    <FormControl>
                      <UploadFiles
                        id="img_perfil"
                        fieldTitle="Haga clic o arrastre para cargar."
                        onChange={field.onChange}
                        ref={uploadFilesRef}
                        description="WEBP, PNG, JPG o JPEG (Recomendado: 460×460px)"
                        acceptedFileTypes={[".jpeg", ".jpg", ".png", ".webp"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {/* Información de inversión */}
        <div className="mt-10 grid lg:grid-cols-3 gap-x-2 gap-y-6">
          <div className="flex flex-col">
            <p className="font-semibold">Información de inversionista</p>
            <p className="text-sm text-gray-900">
              Actualiza tus datos como inversionista.
            </p>
          </div>
          <div className="md:col-span-2 bg-sidebar/50 rounded-lg shadow-sm ring-1 ring-zinc-200 p-4 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Selects */}
              {invesmentsFields1.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {item.label} <span className="text-black">*</span>
                      </FormLabel>
                      <Popover
                        open={!!openPopovers[item.name]}
                        onOpenChange={() => togglePopover(item.name)}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              role="combobox"
                              className={cn(
                                "w-full justify-between font-normal text-base md:text-sm",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? item.options.find(
                                    (option) => option.value === field.value
                                  )?.label
                                : item.placeholder}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          style={{ width: buttonWidth }}
                          className="p-0"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Buscar..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                No se encontraron registros.
                              </CommandEmpty>
                              <CommandGroup>
                                {item.options.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                      form.setValue(item.name, option.value);
                                      if (item.onChange)
                                        item.onChange(option.value);

                                      // Cerrar el Popover al seleccionar
                                      closePopover(item.name);
                                    }}
                                  >
                                    {option.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        option.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* Inputs */}
              {invesmentsFields2.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {item.label} <span className="text-black">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder={item.placeholder}
                          type={item.type || "text"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        {userInfo && (
          <Button
            variant={"theme"}
            disabled={isSubmitting}
            type="submit"
            className="w-fit ml-auto"
          >
            {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            Guardar cambios
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserForm;
