// Hooks
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// Constants
import countriesData from "../../../../constants/paises.json";
import { advisorSchema } from "../../../../constants/schema/admin";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, parseISO } from "date-fns";

// Contexts
import { useAuth } from "../../../../contexts/AuthContext";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";

const AdvisorForm = ({
  onOpenChange,
  onSuccess,
  advisorData = null,
  action = "create",
}) => {
  const [cities, setCities] = useState([]);
  const [isSubmitting, startTransition] = useTransition();
  const [openPopovers, setOpenPopovers] = useState({});

  // Instancias
  const { createAdminInstance, createUserInstance } = useAuth();
  const adminInstance = createAdminInstance({});
  const userInstance = createUserInstance({});

  // Form
  const form = useForm({
    resolver: zodResolver(advisorSchema),
    defaultValues: {
      first_name: advisorData?.nombre || "",
      last_name: advisorData?.apellidos || "",
      telefono: advisorData?.telefono?.toString() || "",
      email: advisorData?.email || "",
      fecha_de_nacimiento: advisorData?.fecha_de_nacimiento || "",
      direccion: advisorData?.direccion || "",
      pais_id: advisorData?.pais_id || "",
      ciudad: advisorData?.ciudad || "",
      genero: advisorData?.genero || "",
    },
  });

  // Funciones
  const getCities = async (countryId) => {
    const res = await userInstance.getCities(countryId);
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
      placeholder: "Ingrese el nombre",
    },
    {
      name: "last_name",
      label: "Apellidos",
      placeholder: "Ingrese los apellidos",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Ingrese el email",
    },
    {
      name: "telefono",
      label: "Teléfono",
      placeholder: "Ingrese el teléfono",
      type: "number",
    },
    {
      name: "direccion",
      label: "Dirección",
      placeholder: "Ingrese la dirección",
    },
  ];

  const personalFields2 = [
    {
      name: "pais_id",
      label: "País",
      placeholder: "Seleccione el país",
      options: countriesData,
      onChange: getCities,
    },
    {
      name: "ciudad",
      label: "Ciudad",
      placeholder: "Seleccione la ciudad",
      options: cities,
    },
    {
      name: "genero",
      label: "Género",
      placeholder: "Seleccione el género",
      options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
      ],
    },
  ];

  // Submit
  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (action === "create") {
        const { status } = await adminInstance.createAdvisor(values);

        if (status) {
          toast.success("Asesor creado con exito");
          await onSuccess(); // Actualizar la tabla
        }

        form.reset(); // Limpiar el formulario
        return onOpenChange(false);
      }

      if (action === "update") {
        const { status } = await adminInstance.updateAdvisor({
          usuarioId: advisorData.id,
          userId: advisorData.usuario_id,
          toUpdate: values,
        });

        if (status) {
          await onSuccess(); // Actualizar la tabla
          return toast.success("Asesor actualizado con exito");
        }
      }

      return null;
    });
  });

  useEffect(() => {
    // Obtener las ciudades al cargar el componente
    if (advisorData?.pais_id) getCities(advisorData.pais_id);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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
                      {...field}
                      placeholder={item.placeholder}
                      type={item.type || "text"}
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

                <Dialog
                  open={!!openPopovers["fecha_de_nacimiento"]}
                  onOpenChange={() => togglePopover("fecha_de_nacimiento")}
                >
                  <DialogTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
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
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Fecha de nacimiento</DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <Calendar
                      className="!w-full"
                      mode="single"
                      selected={field.value ? parseISO(field.value) : undefined}
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
                  </DialogContent>
                </Dialog>
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
                  <Dialog
                    open={!!openPopovers[item.name]}
                    onOpenChange={() => togglePopover(item.name)}
                  >
                    <DialogTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
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
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{item.label}</DialogTitle>
                        <DialogDescription />
                      </DialogHeader>
                      <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron registros.
                          </CommandEmpty>
                          <CommandGroup>
                            {item.options.map((option) => (
                              <CommandItem
                                key={option.value}
                                onSelect={() => {
                                  form.setValue(item.name, option.value);
                                  item.onChange?.(option.value);
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
                    </DialogContent>
                  </Dialog>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full mt-6">
          {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {action === "create" ? "Crear asesor" : "Actualizar asesor"}
        </Button>
      </form>
    </Form>
  );
};

export default AdvisorForm;
