import { useRef, useState, useTransition } from "react";
import { investorOptions } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorSchema } from "../../constants/schema/advisor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { formatCurrencyInput, parsePrice } from "../../constants/functions";

const InvestorForm = ({ investorData = null, onSuccess }) => {
  /* HOOKS
  ___________________________________________ */
  const [isSubmitting, startTransition] = useTransition();
  const [openPopovers, setOpenPopovers] = useState({});
  const buttonRefs = useRef({});

  const { createAdminInstance } = useAuth();
  const adminInstance = createAdminInstance({});

  /* FORM
  ___________________________________________ */
  const form = useForm({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      perfil: investorData?.perfil || "",
      objetivo: investorData?.objetivo || "",
      plazo_de_inversion: investorData?.plazo_de_inversion || "",
      experiencia: investorData?.experiencia || "",
      ahorros_disponibles: investorData?.ahorros_disponibles || "",
      flujo_de_recursos: investorData?.flujo_de_recursos || "",
      ingresos_mensuales: investorData?.ingresos_mensuales || "",
      gastos_mensuales: investorData?.gastos_mensuales || "",
    },
  });

  /* FUNCTIONS
  ___________________________________________ */
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

  /* FIELDS
  ___________________________________________ */
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

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status } = await adminInstance.updateInvestor({
        usuario_id: investorData?.id,
        ...values,
      });

      if (status) {
        toast.success("Investor actualizado con exito");
        return await onSuccess();
      }

      return;
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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
                          ref={(el) => {
                            if (el) buttonRefs.current[item.name] = el;
                          }}
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
                      style={{
                        width:
                          buttonRefs.current[item.name]?.offsetWidth || "auto",
                      }}
                      className="p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Buscar..." className="h-9" />
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
                      {...field}
                      value={field.value ? parsePrice(field.value) : ""}
                      className="bg-white"
                      placeholder={item.placeholder}
                      onChange={formatCurrencyInput(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full mt-6">
          {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          Guardar cambios
        </Button>
      </form>
    </Form>
  );
};

export default InvestorForm;
