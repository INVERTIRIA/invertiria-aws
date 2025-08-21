import {
  Legend,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Brush,
  Bar,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useIsMobile } from "../../hooks/use-mobile";
import { useEffect, useState } from "react";

import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function FlujoDeCaja({ flowsResult, fechaVenta }) {
  const isMobile = useIsMobile();
  const [flujoFecha, setFlujoFecha] = useState([]);
  const [endIndexBrush, setEndIndexBrush] = useState(flowsResult?.flujo_de_caja.length - 1);

  const [open, setOpen] = useState(false)
  const [year, month] = fechaVenta.split("-").map(Number);
  const [date, setDate] = useState(new Date(year, month - 1, 1));

  // Obtener flujo de caja final al cambiar fecha de venta
  useEffect(() => {
    flowsResult?.flujo_de_caja.map((item, index) => {
      if (item[1] == date.toISOString().slice(0, 7)) {
        setFlujoFecha([item[2], item[3], item[4]]);
        setEndIndexBrush(index)
      }
    })
  }, [date]);

  // Obtener data
  let flujo_de_caja_completo = flowsResult?.flujo_de_caja_completo;
  const data = flujo_de_caja_completo.map((item, index) => ({
    mes: item[1],
    positivo: item[2] >= 0 ? item[2] : null,
    negativo: item[2] < 0 ? item[2] : null,
    pagos_adicionales: item[3],
    cuota_inicial: item[4],
    credito: item[5],
    gatos_operativos: item[6],
    alquiler: item[7],
    escrituras_y_licencias: item[8],
    mejoras: item[9],
  }));  

  return (
    <div className="w-full flex flex-col lg:flex-row gap-20 lg:gap-0 xl:gap-20 items-center">
      <div className="w-full lg:w-[70%] xl:w-[70%] max-sm:w-full h-[50vh]">
        <ResponsiveContainer
          className={"flex aspect-video justify-center text-xs"}
        >
          <ComposedChart
            data={data}
            margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 80, bottom: 0 }}
            stackOffset="sign"
          >
            <CartesianGrid className="opacity-50" vertical={false} />
            <XAxis
              className="fill-gray-100"
              dataKey="mes"
              tickLine={false}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            />
            <YAxis
              domain={['dataMin', 'auto']}
              tickFormatter={(value) => parsePrice(value)}
              tickLine={false}
              tick={!isMobile}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            >
              {!isMobile && (
                <Label
                  value="Monto"
                  offset={-60}
                  style={{ textAnchor: "middle" }}
                  position="insideLeft"
                  angle="-90"
                />
              )}
            </YAxis>
            <Tooltip
              formatter={(value, name, props) => {
                const { pagos_adicionales, cuota_inicial, credito, gatos_operativos, alquiler, escrituras_y_licencias, mejoras } = props.payload;

                const flujos = [
                  parsePrice(value),
                  " ",
                  pagos_adicionales ? `Pagos adicionales: ${parsePrice(pagos_adicionales)}` : "",
                  cuota_inicial ? `Cuota inicial: ${parsePrice(cuota_inicial)}` : "",
                  credito ? `Crédito: ${parsePrice(credito)}` : "",
                  gatos_operativos ? `Gastos operativos: ${parsePrice(gatos_operativos)}` : "",
                  alquiler ? `Ingreso alquiler: ${parsePrice(alquiler)}` : "",
                  escrituras_y_licencias ? `Escrituras y licencias: ${parsePrice(escrituras_y_licencias)}` : "",
                  mejoras ? `Mejoras: ${parsePrice(mejoras)}` : "",
                ];

                return flujos.filter(Boolean).join("\n");
              }}
              contentStyle={{ whiteSpace: "pre-line" }}
            />
            <Bar
              dataKey="positivo"
              name="Flujo de caja (+)"
              fill="green"
              barSize={5}
            />
            <Bar
              dataKey="negativo"
              name="Flujo de caja (-)"
              fill="red"
              barSize={5}
            />
            <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} />
            <Brush
              dataKey="mes"
              stroke="#FB3D03"
              startIndex={0}
              endIndex={endIndexBrush}
              height={30}
              tickFormatter={(value) => isMobile ? "" : value}
              className="custom-brush"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 flex flex-col items-center gap-0 h-fit w-[90%] md:w-[50%]">
        <div className="flex flex-col w-[70%] rounded-3xl ml-7 max-sm:-mt-10 ring-1 shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60 ring-gray-900/5 p-8">
          <h3 className="text-lg font-bold my-2">
            Mes de venta
          </h3>

          {/* Calendario */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-medium text-gray-700"
              >
                {date ? date.toLocaleDateString() : "Seleccionar fecha"}
                <ChevronsUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date)
                  setOpen(false)
                }}
                fromYear={flowsResult?.flujo_de_caja[0][1].slice(0, 4)}
                toYear={flowsResult?.flujo_de_caja[flowsResult?.flujo_de_caja.length - 1][1].slice(0, 4)}
                disabled={(date) => {
                  const min = new Date(flowsResult?.flujo_de_caja[0][1])
                  const max = new Date(flowsResult?.flujo_de_caja[flowsResult?.flujo_de_caja.length - 1][1])
                  return date < min || date > max
                }}
              />
            </PopoverContent>
          </Popover>

          <div className="flex flex-col gap-8 mb-2 mt-10">
            {/* Ingresos */}
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-bold">Ingresos Totales</h3>
              <h3 className="text-md font-bold text-gray-600">{parsePrice(flujoFecha[0])}</h3>
            </div>
            {/* Egresos */}
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-bold">Egresos Totales</h3>
              <h3 className="text-md font-bold text-gray-600">{parsePrice(flujoFecha[1])}</h3>
            </div>
            {/* Flujo neto */}
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-bold">Flujo Neto</h3>
              <h3 className="text-md font-bold text-gray-600">{parsePrice(flujoFecha[2])}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FlujoDeCaja };
