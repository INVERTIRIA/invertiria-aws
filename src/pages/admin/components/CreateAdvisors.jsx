// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { advisorSchema } from "../../../constants/schema/admin";
import { Calendar } from "../../../components/ui/calendar";

// Hooks
import { useAuth } from "../../../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

// Elements
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  Plus,
} from "lucide-react";
//import { countries } from "../../../constants";
import countriesData from "../../../constants/paises.json";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import { useIsMobile } from "../../../hooks/use-mobile";

const FormAdvisor = ({ setRefresh, onOpenChange }) => {
  const [cities, setCities] = useState([]);
  const [isSubmitting, startTransition] = useTransition();
  const [openPopovers, setOpenPopovers] = useState({});
  //const [openDialog, setOpenDialog] = useState(false);

  // Instancias
  const { createAdminInstance, createUserInstance } = useAuth();
  const adminInstance = createAdminInstance({});
  const userInstance = createUserInstance({});

  // Form
  const form = useForm({
    resolver: zodResolver(advisorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      fecha_de_nacimiento: "",
      direccion: "",
      pais_id: "",
      ciudad: "",
      genero: "",
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
      placeholder: "Ingrese su nombre",
    },
    {
      name: "last_name",
      label: "Apellidos",
      placeholder: "Ingrese su apellido",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Ingrese su email",
    },
    {
      name: "telefono",
      label: "Teléfono",
      placeholder: "Ingrese su teléfono",
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

  // Submit
  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status } = await adminInstance.createAdvisor(values);

      if (status) {
        setRefresh(true);
        toast.success("Asesor creado con exito");
      }

      form.reset(); // Limpiar el formulario

      return onOpenChange(false);
    });
  });

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
          Crear asesor
        </Button>
      </form>
    </Form>
  );
};

const CreateAdvisors = ({ setRefresh }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full 2xs:w-auto font-light" variant="theme">
            <Plus className="size-5" strokeWidth={1.5} /> Agregar asesor
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex max-h-[80vh] flex-col">
          <DrawerHeader className="shrink-0 text-left">
            <DrawerTitle>Crear asesor</DrawerTitle>
            <DrawerDescription>
              Ingresa todos los datos para la creación del perfil del asesor
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 grow">
            <FormAdvisor setRefresh={setRefresh} onOpenChange={setOpen} />
          </div>
          <DrawerFooter className="shrink-0 pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full 2xs:w-auto font-light" variant="theme">
          <Plus className="size-5" strokeWidth={1.5} /> Agregar asesor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Crear asesor</DialogTitle>
          <DialogDescription>
            Ingresa todos los datos para la creación del perfil del asesor
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <FormAdvisor setRefresh={setRefresh} onOpenChange={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdvisors;
