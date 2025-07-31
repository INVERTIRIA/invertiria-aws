import { supabase } from "../../../supabase";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, parseISO } from "date-fns";

// Hooks
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../../hooks/use-debounces";
import { useFieldArray } from "react-hook-form";

// Contansts
import { formatCurrencyInput, parsePrice } from "../../../constants/functions";
import {
  titularidad as titularidadConst,
  tipoInmueble as tipoInmuebleConst,
  modeloNegocio as modeloNegocioConst,
} from "../../../constants/index";
import Analysis from "../../../constants/functions/analysis";

// Icons
import { ArrowRight, CalendarIcon, Check, Plus, X } from "lucide-react";

import {
  Apto,
  Casa,
  Usado,
  SobrePlanos,
  Lote,
  Bodega,
  Oficina,
  Local,
  Consultorio,
  Hotel,
  Coliving,
  MatriculaInmobiliaria,
  ParticipacionFiduciaria,
  ComprarVender,
  Like,
  Deslike,
  PagosConstantes,
  PagosPersonalizados,
  PagosPersonalizados2,
} from "../../../components/design/Icons";

// Components
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../components/ui/radio-group-2";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import { Map } from "../../../components/Map";
import StepInput from "../../../components/StepInput";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";

/* Button */
const ButtonNext = ({ setStep, stepIndex, setStepHistory, disabled }) => {
  return (
    <Button
      type="button"
      className="w-fit"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        setStepHistory((prev) => [...prev, stepIndex]);
        setStep((prev) => prev + 1);
      }}
    >
      Siguiente
      <ArrowRight />
    </Button>
  );
};

/* Steps */
const Zero = ({ form, ...props }) => {
  const value = form.watch("vigencia");

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="vigencia"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={value === undefined} />
    </div>
  );
};

const One = ({ form, ...props }) => {
  const value = form.watch("tipo_inmueble");

  const options = [
    {
      value: "Apto.",
      label: "Apartamento",
      icon: () => <Apto className="text-invertiria-2 size-11 " />,
    },
    {
      value: "Casa",
      label: "Casa",
      icon: () => <Casa className="text-invertiria-2 size-11 " />,
    },
    {
      value: "Lote",
      label: "Lote",
      icon: () => <Lote className="text-invertiria-2 size-11 " />,
    },
    {
      value: "Bodega",
      label: "Bodega",
      icon: () => <Bodega className="text-invertiria-2 size-11 " />,
    },
    {
      value: "Oficina",
      label: "Oficina",
      icon: Oficina,
    },
    {
      value: "Local",
      label: "Local",
      icon: () => <Local className="text-invertiria-2 size-11" />,
    },
    {
      value: "Consultorio",
      label: "Consultorio",
      icon: () => <Consultorio className="text-invertiria-2 size-11" />,
    },
    {
      value: "Hotel",
      label: "Hotel",
      icon: Hotel,
    },
    {
      value: "Coliving",
      label: "Coliving",
      icon: () => <Coliving className="text-invertiria-2 size-11" />,
    },
  ];

  return (
    <div className="flex flex-col items-center max-w-3xl gap-10 md:gap-14">
      <FormField
        name="tipo_inmueble"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex items-center justify-center flex-wrap gap-x-5"
              >
                {options.map((option) => (
                  <FormItem key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="!p-4 w-24 sm:w-30"
                    >
                      <option.icon className="text-invertiria-2 size-11" />
                      <p className="text-xs xs:text-sm font-medium">
                        {option.label}
                      </p>
                    </RadioGroupItem>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Two = ({ form, ...props }) => {
  const value = form.watch("estado_inmueble");

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="estado_inmueble"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid xs:grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value="Usado"
                    id="usado"
                    className="flex items-center justify-center !py-5 !px-6"
                  >
                    <Usado className="text-invertiria-2 size-11" />
                    <p className="mt-2 text-sm font-medium">Usado</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value="Sobre planos"
                    id="sobre-planos"
                    className="flex items-center justify-center !py-5 !px-6"
                  >
                    <SobrePlanos className="text-invertiria-2 size-11" />
                    <p className="mt-2 text-sm font-medium">Sobre planos</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Three = ({ form, ...props }) => {
  const titularidad = form.watch("titularidad"); // Agregar a supabase
  const effectRan = useRef(false);

  const tipo_inmueble = form.watch("tipo_inmueble");
  const opciones = ["Apto.", "Casa", "Lote"];

  useEffect(() => {
    if (!effectRan.current && opciones.includes(tipo_inmueble)) {
      props.setStep(4);
      effectRan.current = true;
    }
  }, [tipo_inmueble]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="titularidad"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid xs:grid-cols-2 sm:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value="Matricula Inmobiliaria"
                    id="matricula-inmobiliariado"
                  >
                    <MatriculaInmobiliaria className="text-invertiria-2 size-11" />
                    <p className="mt-2 text-sm font-medium max-w-36">
                      Matricula Inmobiliaria
                    </p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value="Participacion Fiduciaria"
                    id="participacion-fiduciaria"
                  >
                    <ParticipacionFiduciaria className="text-invertiria-2 size-11" />
                    <p className="mt-2 text-sm font-medium max-w-36">
                      Participación Fiduciaria
                    </p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!titularidad} />
    </div>
  );
};

const Four = ({ form, analysisInstance, ...props }) => {
  const value = form.watch("modelo_de_negocio");

  const tipoInmueble = form.watch("tipo_inmueble");
  const estadoInmueble = form.watch("estado_inmueble");
  const titularidad = form.watch("titularidad");

  const options = analysisInstance
    .setTipoInmueble(tipoInmueble)
    .setEstadoInmueble(estadoInmueble)
    .setTitularidad(titularidad)
    .getBusinessModels();

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="modelo_de_negocio"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={`grid xs:grid-cols-2 lg:grid-cols-${
                  options.length + 1
                } xs:gap-10`}
              >
                <FormItem>
                  <RadioGroupItem
                    value="Comprar para vender"
                    id="comprar-para-vender"
                    className=""
                  >
                    <ComprarVender className="text-invertiria-2 size-11" />
                    <p className="mt-2 text-sm font-medium">
                      Comprar para vender
                    </p>
                  </RadioGroupItem>
                </FormItem>
                {/* Demas opciones */}
                {options.map(({ id, value, icon: Icon }) => (
                  <FormItem key={id}>
                    <RadioGroupItem value={value} id={id}>
                      <Icon className="text-invertiria-2 size-11" />
                      <p className="mt-2 text-sm font-medium">{value}</p>
                    </RadioGroupItem>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Five = ({ form, ...props }) => {
  const value = form.watch("titulo_modelacion");

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="titulo_modelacion"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full sm:w-md">
            <FormControl>
              <StepInput placeholder="Nombre de la inversion" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Six = ({ form, analysisInstance, ...props }) => {
  const value = form.watch("nombre_del_proyecto");
  const [records, setRecords] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(value, 500);

  const fetchRecords = async (text) => {
    const res = await supabase
      .from("proyectos_inmobiliarios")
      .select("*, ciudad:ciudad_id(nombre)")
      .ilike("nombre", `%${text}%`)
      .limit(5);

    setRecords(res.data);
  };

  const autocompleteFields = (data) => {
    analysisInstance.setProjectInformation(data);

    const options = [
      "id",
      "nombre",
      "barrio",
      "ciudad",
      "created_at",
      "direccion",
      "latitud",
      "longitud",
    ];

    for (const key in data) {
      if (!options.includes(key)) {
        form.setValue(key, data[key]);
      }
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      fetchRecords("");
      return;
    }

    fetchRecords(debouncedQuery);
    return;
  }, [debouncedQuery, isFocused]);

  return (
    <div className="w-[95%] sm:w-auto flex flex-col items-center gap-10 md:gap-14 relative">
      <FormField
        name="nombre_del_proyecto"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full sm:w-md">
            <FormControl>
              <StepInput
                {...field}
                autoComplete="off"
                placeholder="Nombre del proyecto"
                onFocus={() =>
                  setTimeout(() => {
                    setIsFocused(true);
                  }, 100)
                }
                onBlur={() => {
                  setTimeout(() => {
                    setIsFocused(false);
                  }, 150);
                }}
              />
            </FormControl>

            {isFocused && records && (
              <ScrollArea
                data-state={isFocused ? "open" : "closed"}
                className={cn(
                  "!absolute w-full z-10 top-8 flex flex-col gap-2 min-h-20 max-h-40 bg-white shadow rounded-xl ring-1 ring-gray-200",
                  isFocused && "animate-in fade-in",
                  !isFocused && "animate-out fade-out"
                )}
              >
                <ul className="p-4">
                  {records.map((item) => (
                    <li
                      key={item.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg flex items-center gap-2"
                      onClick={() => {
                        if (value === item.nombre) {
                          form.setValue("nombre_del_proyecto", "");
                          autocompleteFields(null);
                          setIsFocused(false);

                          return;
                        }

                        form.setValue("nombre_del_proyecto", item.nombre);
                        autocompleteFields(item);
                        setIsFocused(false);

                        return;
                      }}
                    >
                      <Check
                        className={cn(
                          "size-4 hidden",
                          value === item.nombre && "block"
                        )}
                      />
                      <p className="text-sm font-light">
                        {item.nombre} -{" "}
                        <span className="text-gray-500">
                          {item.ciudad?.nombre}, {item.zona}, {item.subzona}
                        </span>
                      </p>
                    </li>
                  ))}

                  {records.length === 0 && (
                    <li className="flex items-center justify-center py-4">
                      <p className="text-sm font-medium">No hay resultados</p>
                    </li>
                  )}

                  {/* {Array.from({ length: 10 }).map((_, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    >
                      <p className="text-sm font-light">test - ciudad - zona</p>
                    </li>
                  ))} */}
                </ul>
              </ScrollArea>
            )}
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Seven = ({ form, analysisInstance, ...props }) => {
  //const value = form.watch("barrio");
  const [value, setValue] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (value && !analysisInstance.projectInformation) {
      form.setValue("pais_id", 46);
      form.setValue("ciudad_id", value.city);
      form.setValue("zona", value.zone);
      form.setValue("subzona", value.subzone);

      analysisInstance.setProjectInformation({
        pais_id: 46,
        ciudad: {
          nombre: value.city,
        },
        zona: value.zone,
        subzona: value.subzone,
        latitud: value.latitud,
        longitud: value.longitud,
      });
    }
  }, [value]);

  useEffect(() => {
    if (analysisInstance.projectInformation) {
      setPosition({
        lat: analysisInstance.projectInformation.latitud,
        lng: analysisInstance.projectInformation.longitud,
      });

      setValue(
        `${analysisInstance.projectInformation.ciudad?.nombre}, ${analysisInstance.projectInformation.zona}, ${analysisInstance.projectInformation.subzona}`
      );
    }
  }, []);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <Map
        className={"w-full xl:w-3xl"}
        setValue={setValue}
        projectPosition={position}
        initialSearch={value}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Eight = ({ form, ...props }) => {
  const value = form.watch("precio_de_compra");

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="precio_de_compra"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el precio de compra"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Nine = ({ form, ...props }) => {
  const value = form.watch("precio_de_mercado");
  const vigencia = form.watch("vigencia");

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current && !vigencia) {
      props.setStep(10);
      effectRan.current = true;
    }
  }, [vigencia]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="precio_de_mercado"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el precio de mercado"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Ten = ({ form, ...props }) => {
  const value = form.watch("separacion");
  const estadoInmueble = form.watch("estado_inmueble");

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current && estadoInmueble === "Usado") {
      props.setStep(13);
      effectRan.current = true;
    }
  }, [estadoInmueble]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="separacion"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el valor de la separacion"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Eleven = ({ form, ...props }) => {
  const value = form.watch("forma_pago_cuota_inicial");

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="forma_pago_cuota_inicial"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid sm:grid-cols-3 gap-x-5 lg:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={1}
                    id="cuota1"
                    className="flex items-center justify-center py-6 !px-6"
                  >
                    <PagosConstantes className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium max-w-32">
                      Pagos constantes mensuales
                    </p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={2}
                    id="cuota2"
                    className="flex items-center justify-center py-6 !px-6"
                  >
                    <PagosPersonalizados2 className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium max-w-44">
                      Pagos constantes y personalizados
                    </p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={3}
                    id="cuota3"
                    className="flex items-center justify-center py-6 !px-6"
                  >
                    <PagosPersonalizados className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium max-w-32">
                      Pagos personalizados
                    </p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const Twelve = ({ form, ...props }) => {
  const cuotaInicial = form.watch("cuota_inicial");
  const fechaInicio = form.watch("inicial_fecha_inicio_pago");
  const fechaFin = form.watch("inicial_fecha_fin_pago");
  const formaPago = form.watch("forma_pago_cuota_inicial");

  const [openPopovers, setOpenPopovers] = useState({});
  const buttonRefs = useRef({});
  const effectRan = useRef(false);

  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (!effectRan.current && formaPago === 3) {
      props.setStep(13);
      effectRan.current = true;
    }
  }, [formaPago]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="cuota_inicial"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el % de la cuota inicial: 30%"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value)) field.onChange("");

                  // Validar que esté entre 0 y 100
                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="inicial_fecha_inicio_pago"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha inicio cuota inicial</FormLabel>
            <Popover
              open={!!openPopovers["inicial_fecha_inicio_pago"]}
              onOpenChange={() => togglePopover("inicial_fecha_inicio_pago")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el)
                        buttonRefs.current["inicial_fecha_inicio_pago"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["inicial_fecha_inicio_pago"]
                      ?.offsetWidth || "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("inicial_fecha_inicio_pago");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="inicial_fecha_fin_pago"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha fin cuota inicial</FormLabel>
            <Popover
              open={!!openPopovers["inicial_fecha_fin_pago"]}
              onOpenChange={() => togglePopover("inicial_fecha_fin_pago")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el) buttonRefs.current["inicial_fecha_fin_pago"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["inicial_fecha_fin_pago"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("inicial_fecha_fin_pago");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <ButtonNext
        {...props}
        disabled={!fechaInicio || !fechaFin || !cuotaInicial}
      />
    </div>
  );
};

const ThirTeen = ({ form, ...props }) => {
  const pagosPersonalizados = form.watch("pagos_personalizados");
  const estadoInmueble = form.watch("estado_inmueble");
  const formaPago = form.watch("forma_pago_cuota_inicial");
  const valoresPagos = form.watch("valor_pagos_personalizados") || [];
  const fechasPagos = form.watch("fecha_pagos_personalizados") || [];

  const [openPopovers, setOpenPopovers] = useState({});
  const [buttonWidth, setButtonWidth] = useState(0);
  const [allowedAmount, setAllowedAmount] = useState(0);
  const [fecha, setFecha] = useState(null);
  const [pagos, setPagos] = useState(null);

  const buttonRef = useRef(null);
  const effectRan = useRef(false);

  // Functions
  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const unformatCurrency = (formatted) => {
    return formatted.replace(/[^0-9]/g, ""); // elimina $, puntos, espacios, etc.
  };

  const handlerAddToList = () => {
    if (allowedAmount >= pagosPersonalizados) return;

    if (!fecha || !pagos) return;

    appendFecha(fecha);
    appendValor(pagos);

    setFecha(null);
    setPagos(null);
    setAllowedAmount(allowedAmount + 1);
  };

  const handlerRemoveFromList = (index) => {
    removeValor(index);
    removeFecha(index);

    setAllowedAmount(allowedAmount - 1);
  };

  const { append: appendValor, remove: removeValor } = useFieldArray({
    control: form.control,
    name: "valor_pagos_personalizados",
  });

  const { append: appendFecha, remove: removeFecha } = useFieldArray({
    control: form.control,
    name: "fecha_pagos_personalizados",
  });

  // Effects
  useEffect(() => {
    if (
      !effectRan.current &&
      estadoInmueble === "Sobre planos" &&
      formaPago === 1
    ) {
      props.setStep(14);
      effectRan.current = true;
    }
  }, [formaPago]);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
      setAllowedAmount(valoresPagos.length || 0);
    }
  }, []);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="pagos_personalizados"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el número de pagos personalizados"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value)) field.onChange("");

                  if (value < 0) value = 0;
                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="w-full lg:w-[85%] xl:w-2/3 flex flex-col items-center gap-6">
        {/* Fecha - Pagos */}
        <div className="w-full flex flex-col sm:flex-row items-end gap-6">
          {/* Fecha del pago personalizado */}
          <div className="flex flex-col gap-1 !w-full">
            <p className="text-sm font-medium">Fecha del pago personalizados</p>
            <Popover
              open={!!openPopovers["fecha_pago"]}
              onOpenChange={() => togglePopover("fecha_pago")}
            >
              <PopoverTrigger asChild>
                <Button
                  ref={buttonRef}
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal text-base md:text-sm",
                    !fecha && "text-muted-foreground"
                  )}
                >
                  {fecha ? (
                    format(parseISO(fecha), "yyyy-MM-dd")
                  ) : (
                    <span>Elige una fecha</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                style={{ width: buttonWidth }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={fecha ? parseISO(fecha) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    setFecha(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("fecha_pago");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Valor del pago */}
          <div className="flex flex-col gap-1 !w-full">
            <p className="text-sm font-medium">Valor del pago</p>
            <Input
              placeholder="Ingresa el valor del pago"
              className="bg-white"
              value={pagos ? parsePrice(pagos) : ""}
              onChange={(e) => {
                const raw = unformatCurrency(e.target.value);
                if (/^\d*$/.test(raw)) {
                  setPagos(Number(raw)); // guarda limpio en react-hook-form
                }
              }}
            />
          </div>
          <Button
            className="w-full sm:w-auto"
            type="button"
            onClick={handlerAddToList}
            disabled={
              !pagosPersonalizados || allowedAmount >= pagosPersonalizados
            }
          >
            Agregar
          </Button>
        </div>
        {/* Listado */}
        <ScrollArea className="flex flex-col gap-2 bg-white shadow p-3 w-full rounded-md min-h-20 max-h-56">
          <ul className="flex flex-col gap-2">
            {valoresPagos.map((item, index) => (
              <li
                className="py-3 px-3 rounded-md bg-gray-100 text-sm flex items-center gap-3 justify-between"
                key={index}
              >
                <div className="flex items-center gap-3">
                  <div className="hidden 2xs:flex items-center justify-center p-2 bg-black rounded-sm">
                    <span className="text-xs font-semibold leading-none text-white">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-xs font-semibold">
                    Fecha: <br />
                    <span className="text-gray-500 font-normal">
                      {fechasPagos[index]}
                    </span>
                  </span>
                  <Separator
                    orientation="vertical"
                    className="!bg-gray-300 !h-8"
                  />
                  <span className="text-xs font-semibold">
                    Valor: <br />
                    <span className="text-gray-500 font-normal">
                      {parsePrice(item)}
                    </span>
                  </span>
                </div>
                <Button
                  type="button"
                  variant={"theme"}
                  size={"icon"}
                  className="size-7"
                  onClick={() => handlerRemoveFromList(index)}
                >
                  <X className="size-3" />
                </Button>
              </li>
            ))}
            {valoresPagos.length === 0 && (
              <span className="text-sm text-gray-500 text-center h-20 rounded-md flex items-center justify-center">
                No se han agregado pagos personalizados
              </span>
            )}
          </ul>
        </ScrollArea>
      </div>
      <ButtonNext
        {...props}
        disabled={
          !pagosPersonalizados || valoresPagos.length < pagosPersonalizados
        }
      />
    </div>
  );
};

const FourTeen = ({ form, ...props }) => {
  const value = form.watch("credito_hipotecario");
  const tipoInmueble = form.watch("tipo_inmueble");
  const titularidad = form.watch("titularidad");

  const effectRan = useRef(false);

  useEffect(() => {
    if (
      !effectRan.current &&
      ["Oficina", "Local", "Consultoria", "Hotel", "Coliving"].includes(
        tipoInmueble
      ) &&
      titularidad === titularidadConst.participacionFiduciaria
    ) {
      props.setStep(16);
      effectRan.current = true;
    }
  }, [tipoInmueble]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="credito_hipotecario"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={value === undefined} />
    </div>
  );
};

const FifTeen = ({ form, ...props }) => {
  const tasaInteres = form.watch("tasa_de_interes");
  const fechaInicio = form.watch("credito_fecha_inicio_pago");
  const fechaFin = form.watch("credito_fecha_fin_pago");
  const creditoHipotecario = form.watch("credito_hipotecario");

  const [openPopovers, setOpenPopovers] = useState({});
  const buttonRefs = useRef({});
  const effectRan = useRef(false);
  //const [buttonWidth, setButtonWidth] = useState(0);

  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (!effectRan.current && !creditoHipotecario) {
      props.setStep(16);
      effectRan.current = true;
    }
  }, [creditoHipotecario]);

  /* useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []); */

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="tasa_de_interes"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el % de la tasa de interes efectiva anual"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value)) field.onChange("");

                  // Validar que esté entre 0 y 100
                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="credito_fecha_inicio_pago"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha inicio de pago</FormLabel>
            <Popover
              open={!!openPopovers["credito_fecha_inicio_pago"]}
              onOpenChange={() => togglePopover("credito_fecha_inicio_pago")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el)
                        buttonRefs.current["credito_fecha_inicio_pago"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["credito_fecha_inicio_pago"]
                      ?.offsetWidth || "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("credito_fecha_inicio_pago");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="credito_fecha_fin_pago"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha fin de pago</FormLabel>
            <Popover
              open={!!openPopovers["credito_fecha_fin_pago"]}
              onOpenChange={() => togglePopover("credito_fecha_fin_pago")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el) buttonRefs.current["credito_fecha_fin_pago"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["credito_fecha_fin_pago"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("credito_fecha_fin_pago");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <ButtonNext
        {...props}
        disabled={!fechaInicio || !fechaFin || !tasaInteres}
      />
    </div>
  );
};

const SixTeen = ({ form, ...props }) => {
  const value = form.watch("edad_propiedad");
  const estadoInmueble = form.watch("estado_inmueble");
  const tipoInmueble = form.watch("tipo_inmueble");

  const effectRan = useRef(false);

  useEffect(() => {
    if (
      !effectRan.current &&
      (estadoInmueble !== "Usado" || tipoInmueble == tipoInmuebleConst.lote)
    ) {
      props.setStep(17);
      effectRan.current = true;
    }
  }, [estadoInmueble]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="edad_propiedad"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-md">
            <FormControl>
              <StepInput
                {...field}
                placeholder="Ingrese la edad de la propiedad."
                type={"number"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const SevenTeen = ({ form, ...props }) => {
  const value = form.watch("area_inmueble");

  const tipoInmueble = form.watch("tipo_inmueble");
  const titularidad = form.watch("titularidad");
  const estadoInmueble = form.watch("estado_inmueble");
  const modeloNegocio = form.watch("modelo_de_negocio");

  const tiposInmuebles = [
    tipoInmuebleConst.apartamento,
    tipoInmuebleConst.casa,
    tipoInmuebleConst.lote,
  ];

  const effectRan = useRef(false);

  useEffect(() => {
    if (
      !effectRan.current &&
      !tiposInmuebles.includes(tipoInmueble) &&
      titularidad === titularidadConst.participacionFiduciaria
    ) {
      props.setStep(18);
      effectRan.current = true;
    } else if (
      tipoInmueble === tipoInmuebleConst.hotel &&
      estadoInmueble === "Sobre planos" &&
      titularidad === titularidadConst.matriculaInmobiliaria &&
      modeloNegocio === modeloNegocioConst.comprarVender
    ) {
      props.setStep(18);
      effectRan.current = true;
    }
  }, [tipoInmueble]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="area_inmueble"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                placeholder="Ingrese el área del inmueble."
                type={"number"}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const EighTeen = ({ form, ...props }) => {
  const value = form.watch("parqueaderos");
  const tipoInmueble = form.watch("tipo_inmueble");
  const titularidad = form.watch("titularidad");
  const modeloNegocio = form.watch("modelo_de_negocio");

  const tiposInmuebles = [
    tipoInmuebleConst.oficina,
    tipoInmuebleConst.local,
    tipoInmuebleConst.consultorio,
    tipoInmuebleConst.coliving,
    tipoInmuebleConst.hotel,
  ];

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    if (!tiposInmuebles.includes(tipoInmueble)) return;

    if (
      (titularidad === titularidadConst.matriculaInmobiliaria &&
        ![
          modeloNegocioConst.comprarVender,
          modeloNegocioConst.rentaCorta,
        ].includes(modeloNegocio)) ||
      titularidad === titularidadConst.participacionFiduciaria
    )
      return;

    props.setStep(20);
    effectRan.current = true;
  }, [tipoInmueble]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="parqueaderos"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                placeholder="Ingrese el número de parqueaderos."
                type={"number"}
                onChange={(e) => {
                  if (e.target.value === "") {
                    field.onChange("");
                    return;
                  }

                  let value = parseInt(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={isNaN(value) || value === ""} />
    </div>
  );
};

const NineTeen = ({ form, ...props }) => {
  const value = form.watch("vivienda_vis");

  const tipoInmueble = form.watch("tipo_inmueble");
  const estadoInmueble = form.watch("estado_inmueble");
  const modeloNegocio = form.watch("modelo_de_negocio");

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    if (
      estadoInmueble === "Sobre planos" &&
      [tipoInmuebleConst.apartamento, tipoInmuebleConst.casa].includes(
        tipoInmueble
      ) &&
      [
        modeloNegocioConst.rentaTradicional,
        modeloNegocioConst.rentaCorta,
        modeloNegocioConst.comprarVender,
      ].includes(modeloNegocio)
    )
      return;

    props.setStep(20);
    effectRan.current = true;
  }, [tipoInmueble]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="vivienda_vis"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={value === undefined || value === null} />
    </div>
  );
};

const Twenty = ({ form, ...props }) => {
  const value = form.watch("cesion_de_derechos");
  const tipoInmueble = form.watch("tipo_inmueble");
  const estadoInmueble = form.watch("estado_inmueble");
  const modeloNegocio = form.watch("modelo_de_negocio");

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    if (
      tipoInmueble === tipoInmuebleConst.lote &&
      estadoInmueble === "Sobre planos" &&
      modeloNegocio === modeloNegocioConst.comprarVender
    ) {
      return;
    }

    if (estadoInmueble === "Sobre planos") return;

    props.setStep(21);
    effectRan.current = true;
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="cesion_de_derechos"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={value === undefined || value === null} />
    </div>
  );
};

const TwentyOne = ({ form, ...props }) => {
  const fechaVentas = form.watch("fecha_inicio_ventas");
  const fechaEntrega = form.watch("fecha_prevista_entrega");
  const estadoInmueble = form.watch("estado_inmueble");

  const buttonRefs = useRef({});
  const [openPopovers, setOpenPopovers] = useState({});

  const effectRan = useRef(false);

  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (!effectRan.current && estadoInmueble === "Usado") {
      props.setStep(22);
      effectRan.current = true;
    }
  }, [estadoInmueble]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        control={form.control}
        name="fecha_inicio_ventas"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha inicio ventas del proyecto</FormLabel>
            <Popover
              open={!!openPopovers["fecha_inicio_ventas"]}
              onOpenChange={() => togglePopover("fecha_inicio_ventas")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el) buttonRefs.current["fecha_inicio_ventas"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["fecha_inicio_ventas"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("fecha_inicio_ventas");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
              {/* <PopoverContent
                style={{
                  width:
                    buttonRefs.current["fecha_inicio_ventas"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0"
                align="start"
              >
                <Calendar
                  className="!w-full"
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("fecha_inicio_ventas");
                  }}
                  locale={es}
                  initialFocus
                />
              </PopoverContent> */}
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fecha_prevista_entrega"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha entrega del inmueble</FormLabel>
            <Popover
              open={!!openPopovers["fecha_prevista_entrega"]}
              onOpenChange={() => togglePopover("fecha_prevista_entrega")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el) buttonRefs.current["fecha_prevista_entrega"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["fecha_prevista_entrega"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("fecha_prevista_entrega");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
              {/* <PopoverContent
                style={{
                  width:
                    buttonRefs.current["fecha_prevista_entrega"]?.offsetWidth ||
                    "auto",
                }}
                className="p-0"
                align="start"
              >
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

                    togglePopover("fecha_prevista_entrega");
                  }}
                  locale={es}
                  initialFocus
                />
              </PopoverContent> */}
            </Popover>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!fechaVentas || !fechaEntrega} />
    </div>
  );
};

const TwentyTwo = ({ form, ...props }) => {
  const fechaVenta = form.watch("fecha_prevista_venta");
  const fechaCompra = form.watch("fecha_compra");

  const vigencia = form.watch("vigencia");

  const [openPopovers, setOpenPopovers] = useState({});
  const buttonRefs = useRef({});

  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        control={form.control}
        name="fecha_compra"
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormLabel>Fecha de compra</FormLabel>
            <Popover
              open={!!openPopovers["fecha_compra"]}
              onOpenChange={() => togglePopover("fecha_compra")}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={(el) => {
                      if (el) buttonRefs.current["fecha_compra"] = el;
                    }}
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal text-base md:text-sm",
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
                style={{
                  width:
                    buttonRefs.current["fecha_compra"]?.offsetWidth || "auto",
                }}
                className="p-0 flex justify-center bg-transparent border-none shadow-none"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="single"
                  selected={field.value ? parseISO(field.value) : undefined}
                  onSelect={(date) => {
                    const formattedDate = date
                      ? format(date, "yyyy-MM-dd")
                      : "";
                    field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                    togglePopover("fecha_compra");
                  }}
                  className="rounded-md border shadow-sm !bg-white"
                  captionLayout="dropdown"
                  fromYear={2000} // año mínimo que deseas mostrar
                  toYear={2080}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      {vigencia && (
        <FormField
          control={form.control}
          name="fecha_prevista_venta"
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormLabel>Fecha prevista venta</FormLabel>
              <Popover
                open={!!openPopovers["fecha_prevista_venta"]}
                onOpenChange={() => togglePopover("fecha_prevista_venta")}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={(el) => {
                        if (el) buttonRefs.current["fecha_prevista_venta"] = el;
                      }}
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal text-base md:text-sm",
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
                  style={{
                    width:
                      buttonRefs.current["fecha_prevista_venta"]?.offsetWidth ||
                      "auto",
                  }}
                  className="p-0 flex justify-center bg-transparent border-none shadow-none"
                  align="start"
                >
                  <Calendar
                    locale={es}
                    mode="single"
                    selected={field.value ? parseISO(field.value) : undefined}
                    onSelect={(date) => {
                      const formattedDate = date
                        ? format(date, "yyyy-MM-dd")
                        : "";
                      field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                      togglePopover("fecha_prevista_venta");
                    }}
                    className="rounded-md border shadow-sm !bg-white"
                    captionLayout="dropdown"
                    fromYear={2000} // año mínimo que deseas mostrar
                    toYear={2080}
                  />
                </PopoverContent>
                {/* <PopoverContent
                  style={{
                    width:
                      buttonRefs.current["fecha_prevista_venta"]?.offsetWidth,
                  }}
                  className="p-0"
                  align="start"
                >
                  <Calendar
                    className="!w-full"
                    mode="single"
                    selected={field.value ? parseISO(field.value) : undefined}
                    onSelect={(date) => {
                      const formattedDate = date
                        ? format(date, "yyyy-MM-dd")
                        : "";
                      field.onChange(formattedDate); // Se almacena el string "yyyy-MM-dd"

                      togglePopover("fecha_prevista_venta");
                    }}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent> */}
              </Popover>
            </FormItem>
          )}
        />
      )}

      <ButtonNext
        {...props}
        disabled={vigencia ? !fechaCompra || !fechaVenta : !fechaCompra}
      />
    </div>
  );
};

const TwentyThree = ({ form, ...props }) => {
  const value = form.watch("etapa_proyecto");
  const estadoInmueble = form.watch("estado_inmueble");

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current && estadoInmueble === "Usado") {
      props.setStep(24);
      effectRan.current = true;
    }
  }, [estadoInmueble]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="etapa_proyecto"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                placeholder="Ingrese el número de etapa del proyecto."
                type={"number"}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const TwentyFour = ({ form, ...props }) => {
  const comisionVendedor = form.watch("comision_vendedor");
  const porcentajeComisionVendedor = form.watch("porcentaje_comision_vendedor");

  useEffect(() => {
    if (!comisionVendedor) {
      form.resetField("porcentaje_comision_vendedor");
    }
  }, [comisionVendedor]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="comision_vendedor"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {comisionVendedor && (
        <FormField
          name="porcentaje_comision_vendedor"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormControl>
                <StepInput
                  {...field}
                  type={"number"}
                  inputMode="numeric"
                  placeholder="Ingresa el % de la comisión por venta: 30%"
                  min={0}
                  max={100}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value);

                    if (isNaN(value)) field.onChange("");

                    // Validar que esté entre 0 y 100
                    if (value > 100) value = 100;
                    if (value < 0) value = 0;

                    field.onChange(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <ButtonNext
        {...props}
        disabled={
          comisionVendedor === undefined ||
          comisionVendedor === null ||
          (comisionVendedor && !porcentajeComisionVendedor)
        }
      />
    </div>
  );
};

const TwentyFive = ({ form, ...props }) => {
  const administracion = form.watch("administracion");
  const valorAdministracion = form.watch("valor_administracion");
  const tipoInmueble = form.watch("tipo_inmueble");
  const titularidad = form.watch("titularidad");

  const tiposInmuebles = [
    tipoInmuebleConst.oficina,
    tipoInmuebleConst.local,
    tipoInmuebleConst.consultorio,
    tipoInmuebleConst.coliving,
    tipoInmuebleConst.bodega,
  ];

  useEffect(() => {
    if (
      tipoInmueble === tipoInmuebleConst.hotel ||
      (tiposInmuebles.includes(tipoInmueble) &&
        titularidad === titularidadConst.participacionFiduciaria)
    ) {
      return props.setStep(26);
    }
  }, []);

  useEffect(() => {
    if (!administracion) {
      form.resetField("valor_administracion");
    }
  }, [administracion]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="administracion"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {administracion && (
        <FormField
          name="valor_administracion"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormControl>
                <StepInput
                  {...field}
                  type={"text"}
                  inputMode="numeric"
                  placeholder="Ingresa el valor de la administración"
                  value={field.value ? parsePrice(field.value) : ""}
                  onChange={formatCurrencyInput(field)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <ButtonNext
        {...props}
        disabled={
          administracion === undefined ||
          administracion === null ||
          (administracion && !valorAdministracion)
        }
      />
    </div>
  );
};

const TwentySix = ({ form, ...props }) => {
  const value = form.watch("valor_predial");
  const titularidad = form.watch("titularidad");

  useEffect(() => {
    if (titularidad === titularidadConst.participacionFiduciaria) {
      return props.setStep(28);
    }
  }, []);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="valor_predial"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el valor predial"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const TwentySeven = ({ form, ...props }) => {
  const mejora = form.watch("mejoras");
  const valorMejoras = form.watch("valor_mejoras");

  const titularidad = form.watch("titularidad");
  const tipoInmueble = form.watch("tipo_inmueble");
  const estadoInmueble = form.watch("estado_inmueble");

  useEffect(() => {
    if (
      ([tipoInmuebleConst.hotel, tipoInmuebleConst.coliving].includes(
        tipoInmueble
      ) &&
        estadoInmueble === "Usado" &&
        titularidad === titularidadConst.matriculaInmobiliaria) ||
      titularidad === titularidadConst.participacionFiduciaria
    ) {
      return props.setStep(28);
    }
  }, []);

  useEffect(() => {
    if (!mejora) {
      form.resetField("valor_mejoras");
    }
  }, [mejora]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="mejoras"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {mejora && (
        <FormField
          name="valor_mejoras"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormControl>
                <StepInput
                  {...field}
                  type={"text"}
                  inputMode="numeric"
                  placeholder="Ingresa el valor de las mejoras"
                  value={field.value ? parsePrice(field.value) : ""}
                  onChange={formatCurrencyInput(field)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <ButtonNext
        {...props}
        disabled={
          mejora === undefined || mejora === null || (mejora && !valorMejoras)
        }
      />
    </div>
  );
};

const TwentyEight = ({ form, ...props }) => {
  const licencia = form.watch("licencia_construccion");
  const costosLicencias = form.watch("costos_licencias");

  const tipoInmueble = form.watch("tipo_inmueble");
  const modeloNegocio = form.watch("modelo_de_negocio");

  const tiposInmuebles = [
    tipoInmuebleConst.apartamento,
    tipoInmuebleConst.casa,
    tipoInmuebleConst.bodega,
    tipoInmuebleConst.oficina,
    tipoInmuebleConst.local,
    tipoInmuebleConst.consultorio,
    tipoInmuebleConst.lote,
  ];

  useEffect(() => {
    if (
      tiposInmuebles.includes(tipoInmueble) &&
      modeloNegocio === modeloNegocioConst.flipping
    )
      return;

    if (
      [modeloNegocioConst.comprarVender, modeloNegocioConst.engorde].includes(
        modeloNegocio
      ) &&
      tipoInmueble === tipoInmuebleConst.lote
    )
      return;

    props.setStep(29);
  }, []);

  useEffect(() => {
    if (!licencia) {
      form.resetField("costos_licencias");
    }
  }, [licencia]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="licencia_construccion"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {licencia && (
        <FormField
          name="costos_licencias"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormControl>
                <StepInput
                  {...field}
                  type={"text"}
                  inputMode="numeric"
                  placeholder="Ingresa el valor de la administración"
                  value={field.value ? parsePrice(field.value) : ""}
                  onChange={formatCurrencyInput(field)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <ButtonNext
        {...props}
        disabled={
          licencia === undefined ||
          licencia === null ||
          (licencia && !costosLicencias)
        }
      />
    </div>
  );
};

const TwentyNine = ({ form, analysisInstance, ...props }) => {
  const value = form.watch("renta");
  const [options, setOptions] = useState([]);

  const titularidad = form.watch("titularidad");
  const modeloNegocio = form.watch("modelo_de_negocio");
  const tipoInmueble = form.watch("tipo_inmueble");

  const textOptions = ["Sin renta", "Renta tradicional", "Renta corta"];

  const tiposInmuebles = [
    tipoInmuebleConst.oficina,
    tipoInmuebleConst.local,
    tipoInmuebleConst.bodega,
    tipoInmuebleConst.consultorio,
    tipoInmuebleConst.lote,
    tipoInmuebleConst.coliving,
    tipoInmuebleConst.apartamento,
    tipoInmuebleConst.casa,
  ];

  useEffect(() => {
    if (
      [
        modeloNegocioConst.rentaCorta,
        modeloNegocioConst.rentaTradicional,
      ].includes(modeloNegocio)
    ) {
      const renta =
        modeloNegocioConst.rentaTradicional === modeloNegocio ? 1 : 2;
      form.setValue("renta", renta);
      props.setStep(30);
      return;
    }

    if (
      tiposInmuebles.includes(tipoInmueble) &&
      titularidad !== titularidadConst.participacionFiduciaria
    ) {
      setOptions(analysisInstance.getRentalTypes([0, 1]));
      return;
    }

    if (tipoInmueble === tipoInmuebleConst.hotel) {
      const options =
        titularidad === titularidadConst.matriculaInmobiliaria ? [0, 2] : [2];
      setOptions(analysisInstance.getRentalTypes(options));
      return;
    }

    props.setStep(30);
    return;
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="renta"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={`grid grid-cols-${options.length} gap-x-5 xs:gap-x-10 `}
              >
                {options.map(({ id, value, icon: Icon }) => (
                  <FormItem key={id}>
                    <RadioGroupItem value={value} id={id}>
                      <Icon className="text-invertiria-2 size-11" />
                      <p className="mt-2 text-sm font-medium">
                        {textOptions[value]}
                      </p>
                    </RadioGroupItem>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext
        {...props}
        disabled={value < 0 || value === "" || value === undefined}
      />
    </div>
  );
};

const Thirty = ({ form, ...props }) => {
  const value = form.watch("canon_de_arrendamiento");
  const modeloNegocio = form.watch("modelo_de_negocio");
  const renta = form.watch("renta");

  const precioCompra = form.watch("precio_de_compra");
  const valorMejoras = form.watch("valor_mejoras");

  const effectRan = useRef(false);

  useEffect(() => {
    if (modeloNegocio !== modeloNegocioConst.rentaTradicional && renta !== 1) {
      return props.setStep(31);
    }

    effectRan.current = true;
    return;
  }, []);

  useEffect(() => {
    if (effectRan.current) {
      const canonArrendamiento = (precioCompra + valorMejoras) * 0.005;

      form.setValue("canon_de_arrendamiento", canonArrendamiento);
    }
  }, []);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="canon_de_arrendamiento"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el canon de arrendamiento"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const ThirtyOne = ({ form, ...props }) => {
  const valorNoche = form.watch("valor_noche");
  const tarifaMensual = form.watch("tarifa_mensual");
  const ocupacionMedia = form.watch("ocupacion_media");

  const modeloNegocio = form.watch("modelo_de_negocio");
  const renta = form.watch("renta");

  useEffect(() => {
    if (modeloNegocio !== modeloNegocioConst.rentaCorta && renta !== 2) {
      return props.setStep(33);
    }
  }, []);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="valor_noche"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el valor por noche"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="tarifa_mensual"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el valor por noche"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="ocupacion_media"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el % de la ocupación media"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value)) field.onChange("");

                  // Validar que esté entre 0 y 100
                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext
        {...props}
        disabled={!valorNoche || !tarifaMensual || !ocupacionMedia}
      />
    </div>
  );
};

const ThirtyTwo = ({ form, ...props }) => {
  const operador = form.watch("operador");
  const porcentajeDelOperador = form.watch("porcentaje_del_operador");
  const tipoInmueble = form.watch("tipo_inmueble");

  const tiposInmuebles = [
    tipoInmuebleConst.casa,
    tipoInmuebleConst.apartamento,
    tipoInmuebleConst.hotel,
  ];

  useEffect(() => {
    if (tiposInmuebles.includes(tipoInmueble)) {
      form.setValue("porcentaje_del_operador", operador ? 40 : 25);
    }
  }, [operador]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="operador"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="porcentaje_del_operador"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el % de costos sobre los ingresos"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value)) field.onChange("");

                  // Validar que esté entre 0 y 100
                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext
        {...props}
        disabled={
          operador === undefined ||
          operador === null ||
          (operador && !porcentajeDelOperador)
        }
      />
    </div>
  );
};

const ThirtyThree = ({ form, ...props }) => {
  const inmobiliaria = form.watch("inmobiliaria");
  const porcentajeInmobiliaria = form.watch("porcentaje_inmobiliaria");

  const modeloNegocio = form.watch("modelo_de_negocio");
  const renta = form.watch("renta");

  useEffect(() => {
    if (modeloNegocio !== modeloNegocioConst.rentaTradicional && renta !== 1) {
      return props.setStep(34);
    }
  }, []);

  useEffect(() => {
    if (!inmobiliaria) {
      form.resetField("porcentaje_inmobiliaria");
    }
  }, [inmobiliaria]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="inmobiliaria"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-5 xs:gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Like className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center !py-5 !px-10"
                  >
                    <Deslike className="text-invertiria-2 size-11" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {inmobiliaria && (
        <FormField
          name="porcentaje_inmobiliaria"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full md:w-md">
              <FormControl>
                <StepInput
                  {...field}
                  type={"number"}
                  inputMode="numeric"
                  placeholder="Ingresa el % de la inmobiliaria"
                  min={0}
                  max={100}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value);

                    if (isNaN(value)) field.onChange("");

                    // Validar que esté entre 0 y 100
                    if (value > 100) value = 100;
                    if (value < 0) value = 0;

                    field.onChange(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <ButtonNext
        {...props}
        disabled={
          inmobiliaria === undefined ||
          inmobiliaria === null ||
          (inmobiliaria && !porcentajeInmobiliaria)
        }
      />
    </div>
  );
};

const ThirtyFour = ({ form, ...props }) => {
  const value = form.watch("precio_venta");
  const vigencia = form.watch("vigencia");
  const modeloNegocio = form.watch("modelo_de_negocio");

  useEffect(() => {
    if (!vigencia || modeloNegocio === modeloNegocioConst.flipping) return;

    return props.setStep(35);
  }, [vigencia]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="precio_venta"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"text"}
                inputMode="numeric"
                placeholder="Ingresa el precio de venta"
                value={field.value ? parsePrice(field.value) : ""}
                onChange={formatCurrencyInput(field)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const ThirtyFive = ({ form, ...props }) => {
  const value = form.watch("estrato");
  const viviendaVis = form.watch("vivienda_vis");

  useEffect(() => {
    if (!viviendaVis) {
      return props.setStep(36);
    }
  }, [viviendaVis]);

  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <FormField
        name="estrato"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full md:w-md">
            <FormControl>
              <StepInput
                {...field}
                type={"number"}
                inputMode="numeric"
                placeholder="Ingresa el estrato"
                min={0}
                max={100}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value)) field.onChange("");

                  // Validar que esté entre 0 y 100
                  if (value > 100) value = 100;
                  if (value < 0) value = 0;

                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <ButtonNext {...props} disabled={!value} />
    </div>
  );
};

const ThirtySix = () => {
  return (
    <div className="w-[95%] flex flex-col items-center gap-10 md:gap-14">
      <Button type="submit" variant="theme">
        Enviar
      </Button>
    </div>
  );
};

/* Main */
const Steps = ({ stepIndex, setStep, setStepHistory, skippedStep, form }) => {
  let StepActive = null;
  const businessModel = form.watch("modelo_de_negocio");
  const analysisInstance = useRef(new Analysis(form)).current;

  switch (stepIndex) {
    case 0:
      StepActive = (
        <Zero
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 1:
      StepActive = (
        <One
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 2:
      StepActive = (
        <Two
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );

      break;

    case 3:
      StepActive = (
        <Three
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 4:
      StepActive = (
        <Four
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 5:
      StepActive = (
        <Five
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 6:
      StepActive = (
        <Six
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 7:
      StepActive = (
        <Seven
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 8:
      StepActive = (
        <Eight
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
        />
      );
      break;

    case 9:
      StepActive = (
        <Nine
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
        />
      );
      break;

    case 10:
      StepActive = (
        <Ten
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
        />
      );
      break;

    case 11:
      StepActive = (
        <Eleven
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 12:
      StepActive = (
        <Twelve
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
        />
      );
      break;

    case 13:
      StepActive = (
        <ThirTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
        />
      );
      break;

    case 14:
      StepActive = (
        <FourTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 15:
      StepActive = (
        <FifTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 16:
      StepActive = (
        <SixTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 17:
      StepActive = (
        <SevenTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 18:
      StepActive = (
        <EighTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 19:
      StepActive = (
        <NineTeen
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 20:
      StepActive = (
        <Twenty
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 21:
      StepActive = (
        <TwentyOne
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 22:
      StepActive = (
        <TwentyTwo
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 23:
      StepActive = (
        <TwentyThree
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 24:
      StepActive = (
        <TwentyFour
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 25:
      StepActive = (
        <TwentyFive
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 26:
      StepActive = (
        <TwentySix
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 27:
      StepActive = (
        <TwentySeven
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 28:
      StepActive = (
        <TwentyEight
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 29:
      StepActive = (
        <TwentyNine
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 30:
      StepActive = (
        <Thirty
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 31:
      StepActive = (
        <ThirtyOne
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 32:
      StepActive = (
        <ThirtyTwo
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 33:
      StepActive = (
        <ThirtyThree
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 34:
      StepActive = (
        <ThirtyFour
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 35:
      StepActive = (
        <ThirtyFive
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    case 36:
      StepActive = (
        <ThirtySix
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;

    default:
      StepActive = (
        <Zero
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
          analysisInstance={analysisInstance}
        />
      );
      break;
  }

  // Detectar cuando se haga un skip
  useEffect(() => {
    if (skippedStep > 4) {
      analysisInstance.skipStep(skippedStep);
    }
  }, [skippedStep]);

  // Obtener la modelacion una vez se defina el modelo de negocio
  useEffect(() => {
    const handlerFetch = async () => {
      const res = await analysisInstance.getDataModeling(businessModel);
      analysisInstance.setModeling(res);

      const res2 = await analysisInstance.getProjectInformation(
        res.nombre_del_proyecto
      );

      analysisInstance.setProjectInformationModel(res2);
    };

    if (businessModel) handlerFetch();
  }, [businessModel]);

  return StepActive;
};

export { Zero, Steps };
