import {
  Brush,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { IndicadorDeRentabiliad } from "./IndicadorDeRentabiliad";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// data para la grafica
const dataTIR = [
  {
    mes: "01/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 1,
  },
  {
    mes: "02/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 1,
  },
  {
    mes: "03/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 1,
  },
  {
    mes: "04/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 42,
  },
  {
    mes: "05/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 19,
  },
  {
    mes: "06/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 34,
  },
  {
    mes: "07/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 33,
  },
  {
    mes: "08/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 30,
  },
  {
    mes: "09/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 11,
  },
  {
    mes: "10/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 14,
  },
  {
    mes: "11/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 14,
  },
  {
    mes: "12/2023",
    "TIR Anualizada": 1,
    "TIR mensual": 14,
  },
  {
    mes: "01/2024",
    "TIR Anualizada": 1,
    "TIR mensual": 13,
  },
  {
    mes: "02/2024",
    "TIR Anualizada": 1,
    "TIR mensual": 12,
  },
  {
    mes: "03/2024",
    "TIR Anualizada": 256,
    "TIR mensual": 11,
  },
  {
    mes: "04/2024",
    "TIR Anualizada": 224,
    "TIR mensual": 10,
  },
  {
    mes: "05/2024",
    "TIR Anualizada": 195,
    "TIR mensual": 9,
  },
  {
    mes: "06/2024",
    "TIR Anualizada": 172,
    "TIR mensual": 9,
  },
  {
    mes: "07/2024",
    "TIR Anualizada": 152,
    "TIR mensual": 8,
  },
  {
    mes: "08/2024",
    "TIR Anualizada": 138,
    "TIR mensual": 7,
  },
  {
    mes: "09/2024",
    "TIR Anualizada": 124,
    "TIR mensual": 7,
  },
  {
    mes: "10/2024",
    "TIR Anualizada": 113,
    "TIR mensual": 7,
  },
  {
    mes: "11/2024",
    "TIR Anualizada": 103,
    "TIR mensual": 6,
  },
];

const dataROI = [
  {
    mes: "01/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 1,
  },
  {
    mes: "02/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 1,
  },
  {
    mes: "03/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 100,
  },
  {
    mes: "04/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 32,
  },
  {
    mes: "05/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 32,
  },
  {
    mes: "06/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 62,
  },
  {
    mes: "07/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 74,
  },
  {
    mes: "08/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 88,
  },
  {
    mes: "09/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 16,
  },
  {
    mes: "10/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 30,
  },
  {
    mes: "11/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 40,
  },
  {
    mes: "12/2023",
    "ROI Anualizada": 1,
    "ROI mensual": 48,
  },
  {
    mes: "01/2024",
    "ROI Anualizada": 1,
    "ROI mensual": 53,
  },
  {
    mes: "02/2024",
    "ROI Anualizada": 1,
    "ROI mensual": 58,
  },
  {
    mes: "03/2024",
    "ROI Anualizada": 52,
    "ROI mensual": 60,
  },
  {
    mes: "04/2024",
    "ROI Anualizada": 50,
    "ROI mensual": 63,
  },
  {
    mes: "05/2024",
    "ROI Anualizada": 47,
    "ROI mensual": 63,
  },
  {
    mes: "06/2024",
    "ROI Anualizada": 45,
    "ROI mensual": 64,
  },
  {
    mes: "07/2024",
    "ROI Anualizada": 43,
    "ROI mensual": 64,
  },
  {
    mes: "08/2024",
    "ROI Anualizada": 41,
    "ROI mensual": 65,
  },
  {
    mes: "09/2024",
    "ROI Anualizada": 39,
    "ROI mensual": 65,
  },
  {
    mes: "10/2024",
    "ROI Anualizada": 37,
    "ROI mensual": 65,
  },
  {
    mes: "11/2024",
    "ROI Anualizada": 35,
    "ROI mensual": 65,
  },
];

const dataUtilidad = [
  { mes: "01/2023", Utilidad: 0 },
  { mes: "02/2023", Utilidad: 0 },
  { mes: "03/2023", Utilidad: 5000000 },
  { mes: "04/2023", Utilidad: 2076500 },
  { mes: "05/2023", Utilidad: 2076500 },
  { mes: "06/2023", Utilidad: 7076500 },
  { mes: "07/2023", Utilidad: 12076500 },
  { mes: "08/2023", Utilidad: 18576500 },
  { mes: "09/2023", Utilidad: 7439166 },
  { mes: "10/2023", Utilidad: 15190142 },
  { mes: "11/2023", Utilidad: 22453569 },
  { mes: "12/2023", Utilidad: 29228825 },
  { mes: "01/2024", Utilidad: 35526555 },
  { mes: "02/2024", Utilidad: 41344513 },
  { mes: "03/2024", Utilidad: 46180674 },
  { mes: "04/2024", Utilidad: 51033220 },
  { mes: "05/2024", Utilidad: 54900510 },
  { mes: "06/2024", Utilidad: 58779937 },
  { mes: "07/2024", Utilidad: 62162724 },
  { mes: "08/2024", Utilidad: 66048873 },
  { mes: "09/2024", Utilidad: 69438382 },
  { mes: "10/2024", Utilidad: 72831252 },
  { mes: "11/2024", Utilidad: 75727484 },
];

const IndicadoresDeRentabilidad = () => {
  const [startIndexBrush, setStartIndexBrush] = useState(0);
  const [endIndexBrush, setEndIndexBrush] = useState(11);
  const [maxStep, setMaxStep] = useState(11);
  const [activeMonth, setActiveMonth] = useState(0);

  const [kpi, setKPI] = useState({
    roiMensual: 0,
    tirMensual: 0,
    utilidad: 0,
  });

  const handleBrushOnchange = (e) => {
    setStartIndexBrush(e.startIndex);
    setEndIndexBrush(e.endIndex);
    setMaxStep(e.endIndex - e.startIndex);
  };

  const handleKPI = (value) => {
    const index = value[0];

    const tir = dataTIR[index]["TIR mensual"];
    const roi = dataROI[index]["ROI mensual"];
    const utilidad = dataUtilidad[index].Utilidad;

    setKPI({
      tirMensual: tir,
      roiMensual: roi,
      utilidad: utilidad,
    });

    setActiveMonth(dataUtilidad[index].mes);
  };

  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
    if (payload.mes === activeMonth) {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          viewBox="0 0 100 100"
          fill="#FB3D03"
        >
          <circle cx="50" cy="50" r="30" />
        </svg>
      );
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-4 w-[70%]">
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold text-gray-500">
            Mes de venta seleccionado
          </h2>
          <div className="w-full pl-14">
            <Slider step={1} max={maxStep} onValueChange={handleKPI} />
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Suma de ROI Anualizado y Suma de ROI por Mes
          </h2>
          <div className="h-[25vh] w-full">
            <ResponsiveContainer
              className={" flex aspect-video justify-center text-xs"}
            >
              <ComposedChart
                syncId="syncId"
                data={dataROI}
                margin={{ top: 10, right: 10 }}
              >
                <CartesianGrid className="opacity-50" vertical={false} />
                <XAxis
                  className="fill-gray-100"
                  dataKey="mes"
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                />
                <YAxis
                  tickFormatter={(value) => value + "%"}
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  <Label
                    value="Porcentaje (%)"
                    style={{ textAnchor: "middle" }}
                    position="insideLeft"
                    angle="-90"
                  />
                </YAxis>
                <Tooltip />
                <Line
                  dataKey="ROI mensual"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  type="monotone"
                  dot={<CustomizedDot />}
                />
                <Line
                  dataKey="ROI Anualizada"
                  strokeWidth={1.5}
                  stroke="#FB3D03"
                  connectNulls
                  dot={false}
                  type="monotone"
                />
                <Legend wrapperStyle={{ top: -40 }} />
                <Brush
                  dataKey="mes"
                  stroke="#FB3D03"
                  startIndex={startIndexBrush}
                  endIndex={endIndexBrush}
                  height={30}
                  className="custom-brush"
                  onChange={handleBrushOnchange}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Suma de TIR Anualizado y Suma de TIR por Mes
          </h2>
          <div className="h-[25vh] w-full">
            <ResponsiveContainer
              className={" flex aspect-video justify-center text-xs"}
            >
              <ComposedChart data={dataTIR} syncId="syncId">
                <CartesianGrid
                  className="opacity-50"
                  vertical={false}
                  margin={{ top: 10, right: 10 }}
                />
                <XAxis
                  className="fill-gray-100"
                  dataKey="mes"
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                />
                <YAxis
                  tickFormatter={(value) => value + "%"}
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  <Label
                    value="Porcentaje (%)"
                    style={{ textAnchor: "middle" }}
                    position="insideLeft"
                    angle="-90"
                  />
                </YAxis>
                <Tooltip />
                <Line
                  dataKey="TIR mensual"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  dot={<CustomizedDot />}
                  type="monotone"
                />
                <Line
                  dataKey="TIR Anualizada"
                  strokeWidth={1.5}
                  stroke="#FB3D03"
                  connectNulls
                  dot={false}
                  type="monotone"
                />
                <Legend wrapperStyle={{ top: -40 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Promedio de Utilidad por Mes
          </h2>
          <div className="h-[25vh] w-full">
            <ResponsiveContainer
              className={"w-full flex aspect-video justify-center text-xs"}
            >
              <ComposedChart
                data={dataUtilidad}
                margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
                syncId="syncId"
              >
                <CartesianGrid className="opacity-50" vertical={false} />
                <XAxis
                  className="fill-gray-100"
                  dataKey="mes"
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                />
                <YAxis
                  domain={["dataMin", "auto"]}
                  tickFormatter={(value) => parsePrice(value)}
                  tickLine={false}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  <Label
                    value="Promedio utilidad"
                    offset={-60}
                    style={{ textAnchor: "middle" }}
                    position="insideLeft"
                    angle="-90"
                  />
                </YAxis>
                <Tooltip />
                <Line
                  dataKey="Utilidad"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  dot={<CustomizedDot />}
                  type="monotone"
                />
                <Legend wrapperStyle={{ top: -40 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-10 h-fit">
        <div className="flex flex-col gap-4 flex-1 rounded-md ring-1 shadow-lg shadow-invertiria-2/30 ring-gray-900/5 p-4 ">
          <h2 className="text-2xl font-bold text-white px-4 py-2 bg-invertiria-2 w-fit rounded-md">
            KPI
          </h2>
          <div className="flex flex-col gap-10 divide-y-1">
            {/* TIR */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{kpi.tirMensual}%</h3>
              <IndicadorDeRentabiliad value={kpi.tirMensual} />
              <h3 className="text-2xl font-bold">TIR</h3>
            </div>
            {/* Utilidad */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{parsePrice(kpi.utilidad)}</h3>
              <IndicadorDeRentabiliad value={30} />
              <h3 className="text-2xl font-bold">Utilidad</h3>
            </div>
            {/* ROI */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{kpi.roiMensual}%</h3>
              <IndicadorDeRentabiliad value={kpi.roiMensual} />
              <h3 className="text-2xl font-bold">ROI</h3>
            </div>
            {/* Cap Rate */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">0%</h3>
              <IndicadorDeRentabiliad value={60} />
              <h3 className="text-2xl font-bold">Cap Rate</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicadoresDeRentabilidad;
