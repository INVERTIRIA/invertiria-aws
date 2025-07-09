import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Analysis from "../../../constants/functions/analysis";

// Components
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../components/ui/radio-group-2";

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
} from "../../../components/design/Icons";

import { Button } from "../../../components/ui/button";
import { FormControl, FormField, FormItem } from "../../../components/ui/form";
import StepInput from "../../../components/StepInput";
import useDebounce from "../../../hooks/use-debounces";

/* Steps */

const Zero = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("vigencia");

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="vigencia"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value={true}
                    id="yes"
                    className="flex items-center justify-center py-6 px-14"
                  >
                    <Like className="text-invertiria-2" />
                    <p className="text-sm font-medium">Si</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value={false}
                    id="not"
                    className="flex items-center justify-center py-6 px-14"
                  >
                    <Deslike className="text-invertiria-2" />
                    <p className="text-sm font-medium">No</p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={value === undefined}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const One = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("tipo_inmueble");

  const options = [
    {
      value: "Apto.",
      label: "Apartamento",
      icon: () => <Apto className="text-invertiria-2" />,
    },
    {
      value: "Casa",
      label: "Casa",
      icon: () => <Casa className="text-invertiria-2" />,
    },
    {
      value: "Lote",
      label: "Lote",
      icon: () => <Lote className="text-invertiria-2" />,
    },
    {
      value: "Bodega",
      label: "Bodega",
      icon: () => <Bodega className="text-invertiria-2" />,
    },
    {
      value: "Oficina",
      label: "Oficina",
      icon: Oficina,
    },
    {
      value: "Local",
      label: "Local",
      icon: () => <Local className="text-invertiria-2" />,
    },
    {
      value: "Consultorio",
      label: "Consultorio",
      icon: () => <Consultorio className="text-invertiria-2" />,
    },
    {
      value: "Hotel",
      label: "Hotel",
      icon: Hotel,
    },
    {
      value: "Coliving",
      label: "Coliving",
      icon: () => <Coliving className="text-invertiria-2" />,
    },
  ];

  return (
    <div className="flex flex-col items-center max-w-3xl gap-14">
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
                      className="p-4 w-30"
                    >
                      <option.icon className="text-invertiria-2" />
                      <p className="mt-2 text-sm font-medium">{option.label}</p>
                    </RadioGroupItem>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!value}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const Two = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("estado_inmueble");

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="estado_inmueble"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem value="Usado" id="usado">
                    <Usado className="text-invertiria-2" />
                    <p className="mt-2 text-sm font-medium">OP - Usado</p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem value="Sobre planos" id="sobre-planos">
                    <SobrePlanos className="text-invertiria-2" />
                    <p className="mt-2 text-sm font-medium">
                      OP - Sobre planos
                    </p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!value}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
        /* onClick={(e) => {
          e.preventDefault();
          const opciones = ["Apto.", "Casa", "Lote", "Bodega"];
          const additional = opciones.includes(tipo_inmueble) ? 1 : 0;

          setStep((prev) => prev + 1 + additional);
        }} */
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const Three = ({ form, setStep, stepIndex, setStepHistory }) => {
  const titularidad = form.watch("titularidad"); // Agregar a supabase
  const effectRan = useRef(false);

  const tipo_inmueble = form.watch("tipo_inmueble");
  const opciones = ["Apto.", "Casa", "Lote", "Bodega"];

  useEffect(() => {
    if (!effectRan.current && opciones.includes(tipo_inmueble)) {
      setStep(4);
      effectRan.current = true;
    }
  }, [tipo_inmueble, setStep]);

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="titularidad"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-x-20"
              >
                <FormItem>
                  <RadioGroupItem
                    value="Matricula Inmobiliaria"
                    id="matricula-inmobiliariado"
                  >
                    <MatriculaInmobiliaria className="text-invertiria-2" />
                    <p className="mt-2 text-sm font-medium">
                      Matricula Inmobiliaria
                    </p>
                  </RadioGroupItem>
                </FormItem>
                <FormItem>
                  <RadioGroupItem
                    value="Participacion Fiduciaria"
                    id="participacion-fiduciaria"
                  >
                    <ParticipacionFiduciaria className="text-invertiria-2" />
                    <p className="mt-2 text-sm font-medium">
                      Participación Fiduciaria
                    </p>
                  </RadioGroupItem>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!titularidad}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const Four = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("modelo_de_negocio");

  const tipoInmueble = form.watch("tipo_inmueble");
  const estadoInmueble = form.watch("estado_inmueble");
  const titularidad = form.watch("titularidad");

  const analysis = new Analysis(tipoInmueble, estadoInmueble, titularidad);
  const options = analysis.getBusinessModels();

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="modelo_de_negocio"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={`grid grid-cols-${options.length + 1} gap-x-10 `}
              >
                <FormItem>
                  <RadioGroupItem
                    value="Comprar para vender"
                    id="comprar-para-vender"
                  >
                    <ComprarVender className="text-invertiria-2" />
                    <p className="mt-2 text-sm font-medium">
                      Comprar para vender
                    </p>
                  </RadioGroupItem>
                </FormItem>
                {/* Demas opciones */}
                {options.map(({ id, value, icon: Icon }) => (
                  <FormItem key={id}>
                    <RadioGroupItem value={value} id={id}>
                      <Icon className="text-invertiria-2" />
                      <p className="mt-2 text-sm font-medium">{value}</p>
                    </RadioGroupItem>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!value}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const Five = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("titulo_modelacion");

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="titulo_modelacion"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-md">
            <FormControl>
              {/* <Input placeholder="Nombre de la inversion" {...field} /> */}
              <StepInput placeholder="Nombre de la inversion" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!value}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

const Six = ({ form, setStep, stepIndex, setStepHistory }) => {
  const value = form.watch("nombre_del_proyecto");
  const [records, setRecords] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(value, 500);

  const fetchRecords = async (text) => {
    console.log(text);
  };

  const handleFocus = () => {
    //setSelectedAction(null);
    setIsFocused(true);
  };

  useEffect(() => {
    if (!isFocused) {
      setRecords(null);
      return;
    }

    if (!debouncedQuery) {
      fetchRecords(" ");
      return;
    }

    fetchRecords(debouncedQuery);
  }, [debouncedQuery, isFocused]);

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="nombre_del_proyecto"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-md">
            <FormControl>
              <StepInput
                placeholder="Nombre del proyecto"
                onFocus={handleFocus}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="w-fit"
        disabled={!value}
        onClick={(e) => {
          e.preventDefault();
          setStepHistory((prev) => [...prev, stepIndex]);
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button>
    </div>
  );
};

/* Main */
const Steps = ({ stepIndex, setStep, setStepHistory, form }) => {
  let StepActive = null;

  switch (stepIndex) {
    case 0:
      StepActive = (
        <Zero
          form={form}
          setStep={setStep}
          stepIndex={stepIndex}
          setStepHistory={setStepHistory}
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
        />
      );
      break;
  }

  return StepActive;
};

export { Zero, Steps };
