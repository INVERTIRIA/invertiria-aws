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
import { countries, investorOptions } from "../../constants";
import { userSchema } from "@/constants/schema/user";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

// Main
const UserForm = ({ userInfo }) => {
  const [isSubmitting, startTransition] = useTransition();
  const [cities, setCities] = useState([]);
  const [openPopovers, setOpenPopovers] = useState({});
  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonRef = useRef(null);

  const { createUserInstance, setUser } = useAuth();
  const userIntance = createUserInstance(userInfo);

  // Form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: userInfo?.nombre || "",
      last_name: userInfo?.apellidos || "",
      fecha_de_nacimiento: userInfo?.fecha_de_nacimiento || "",
      direccion: userInfo?.direccion || "",
      pais_id: userInfo?.pais_id?.toString() || "",
      ciudad: userInfo?.ciudad || "",
      genero: userInfo?.genero || "",
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
      options: countries,
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
  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const res = await userIntance.update(values);

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
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
        <div className="grid lg:grid-cols-2 gap-4 text-black">
          {/* Información personal */}
          <div className="rounded-lg shadow-sm ring-1 ring-zinc-200 p-4">
            <h2 className="font-semibold mb-5">Información personal</h2>
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
            </div>
          </div>
          {/* Información de inversión */}
          <div className="rounded-lg shadow-sm ring-1 ring-zinc-200 p-4">
            <h2 className="font-semibold mb-5">Información de inversión</h2>
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
        <div className="col-span-2">
          <Button disabled={isSubmitting} type="submit" className="w-fit">
            {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
