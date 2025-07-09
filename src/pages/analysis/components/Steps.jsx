import {
  RadioGroup,
  RadioGroupItem,
} from "../../../components/ui/radio-group-2";

import { FormControl, FormField, FormItem } from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
} from "../../../components/design/Icons";
import Analysis from "../../../constants/functions/analysis";

/* Steps */
const Zero = ({ form, setStep, stepIndex, setStepHistory }) => {
  const [value, setValue] = useState(form.getValues("tipo_inmueble"));

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
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue(value);
                }}
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

const One = ({ form, setStep, stepIndex, setStepHistory }) => {
  const [value, setValue] = useState(form.getValues("estado_inmueble"));

  return (
    <div className="flex flex-col items-center gap-14">
      <FormField
        name="estado_inmueble"
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue(value);
                }}
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

const Two = ({ form, setStep, stepIndex, setStepHistory }) => {
  const [titularidad, setTitularidad] = useState(form.getValues("titularidad")); // Agregar a supabase
  const effectRan = useRef(false);

  const tipo_inmueble = form.getValues("tipo_inmueble");
  const opciones = ["Apto.", "Casa", "Lote", "Bodega"];

  useEffect(() => {
    if (!effectRan.current && opciones.includes(tipo_inmueble)) {
      setStep(3);
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
                onValueChange={(value) => {
                  field.onChange(value);
                  setTitularidad(value);
                }}
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

const Three = ({ form, setStep, stepIndex, setStepHistory }) => {
  const tipoInmueble = form.getValues("tipo_inmueble");
  const estadoInmueble = form.getValues("estado_inmueble");
  const titularidad = form.getValues("titularidad");

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
                onValueChange={(value) => {
                  field.onChange(value);
                  //setTitularidad(value);
                }}
                defaultValue={field.value}
                className={`grid grid-cols-${options.length + 1} gap-x-10 `}
                //className="flex items-center justify-center flex-wrap gap-x-5"
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
      {/* <Button
        type="button"
        className="w-fit"
        disabled={!titularidad}
        onClick={(e) => {
          e.preventDefault();
          setStep((prev) => prev + 1);
        }}
      >
        Siguente
        <ArrowRight />
      </Button> */}
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

  // useEffect(() => {
  //   if (stepIndex > 0) {
  //     /* setStepHistory((prevHistory) => [
  //       ...prevHistory,
  //       stepIndex - prevHistory,
  //     ]); */
  //     setStepHistory((prevHistory) => [...prevHistory, stepIndex]);
  //   }
  // }, [stepIndex]);

  return StepActive;
};

export { Zero, Steps };
