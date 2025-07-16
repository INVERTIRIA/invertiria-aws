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
import { IndicadorDeRentabilidad } from "./IndicadorDeRentabilidad";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const IndicadoresDeRentabilidad = ({ timeVectors, flowsResult, fechaVenta }) => {

  // Obtener data roi
  let maxRoi = 0;
  let minRoi = 0;
  const dataROI = timeVectors?.valor_inmueble.map((item, index) => {
    let roi = 0;
    for (let i = 0; i < flowsResult?.roi.length; i++) {
      if (flowsResult.roi[i][0] == index) {
        roi = flowsResult.roi[i][2];
      }
      // Maximo roi
      if (flowsResult.roi[i][2] > maxRoi) {
        maxRoi = flowsResult.roi[i][2];
      }
      // Minimo roi
      if (flowsResult.roi[i][2] < minRoi) {
        minRoi = flowsResult.roi[i][2];
      }
    }
    let roi_anualizado = 0;
    for (let i = 0; i < flowsResult?.roi_anualizado.length; i++) {
      if (flowsResult.roi_anualizado[i][0] == index) {
        roi_anualizado = flowsResult.roi_anualizado[i][2];
      }
    }
    return {
      mes: item[1],
      "ROI Anualizado": roi_anualizado,
      "ROI mensual": roi,
    };
  });

  // Obtener data tir
  let maxTir = 0;
  let minTir = 0;
  const dataTIR = timeVectors?.valor_inmueble.map((item, index) => {
    let tir_mensual = 0;
    for (let i = 0; i < flowsResult?.tir_mensual.length; i++) {
      if (flowsResult.tir_mensual[i][0] == index) {
        tir_mensual = flowsResult.tir_mensual[i][2];
      }
      // Maximo tir
      if (flowsResult.tir_mensual[i][2] > maxTir) {
        maxTir = flowsResult.tir_mensual[i][2];
      }
      // Minimo tir
      if (flowsResult.tir_mensual[i][2] < minTir) {
        minTir = flowsResult.tir_mensual[i][2];
      }
    }
    let tir_anualizada = 0;
    for (let i = 0; i < flowsResult?.tir_anualizada.length; i++) {
      if (flowsResult.tir_anualizada[i][0] == index) {
        tir_anualizada = flowsResult.tir_anualizada[i][2];
      }
    }
    return {
      mes: item[1],
      "TIR Anualizada": tir_anualizada,
      "TIR mensual": tir_mensual,
    };
  });

  // Obtener data utilidad
  let maxUtilidad = 0;
  let minUtilidad = 0;
  const dataUtilidad = timeVectors?.valor_inmueble.map((item, index) => {
    let utilidad = 0;
    for (let i = 0; i < flowsResult?.utilidad.length; i++) {
      if (flowsResult.utilidad[i][0] == index) {
        utilidad = flowsResult.utilidad[i][2];
      }
      // Maxima utilidad
      if (flowsResult.utilidad[i][2] > maxUtilidad) {
        maxUtilidad = flowsResult.utilidad[i][2];
      }
      // Minima utilidad
      if (flowsResult.utilidad[i][2] < minUtilidad) {
        minUtilidad = flowsResult.utilidad[i][2];
      }
    }
    return {
      mes: item[1],
      Utilidad: utilidad,
    };
  });

  // Obtener data cap rate
  let maxCapRate = 0;
  let minCapRate = 0;
  const dataCapRate = timeVectors?.valor_inmueble.map((item, index) => {
    let cap_rate = 0;
    for (let i = 0; i < flowsResult?.cap_rate.length; i++) {
      if (flowsResult.cap_rate[i][0] == index) {
        cap_rate = flowsResult.cap_rate[i][2];
      }
      // Maximo cap rate
      if (flowsResult.cap_rate[i][2] > maxCapRate) {
        maxCapRate = flowsResult.cap_rate[i][2];
      }
      // Minimo cap rate
      if (flowsResult.cap_rate[i][2] < minCapRate) {
        minCapRate = flowsResult.cap_rate[i][2];
      }
    }
    return {
      mes: item[1],
      "Cap Rate": cap_rate,
    };
  });

  // Obtener mes de venta
  let mesVenta = 0;
  for (let i = 0; i < timeVectors?.valor_inmueble.length; i++) {
    if (timeVectors?.valor_inmueble[i][1] == fechaVenta) {
      mesVenta = timeVectors?.valor_inmueble[i][0];
    }
  }

  const [startIndexBrush, setStartIndexBrush] = useState(0);
  const [endIndexBrush, setEndIndexBrush] = useState(240);
  const [maxStep, setMaxStep] = useState(240);
  const [activeMonth, setActiveMonth] = useState(0);

  const [kpi, setKPI] = useState({
    roiMensual: 0,
    tirMensual: 0,
    utilidad: 0,
    capRate: 0,
  });

  let timeout;
  const handleBrushOnchange = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setMaxStep([e.endIndex - e.startIndex]);
      setStartIndexBrush(e.startIndex);
      setEndIndexBrush(e.endIndex);
    }, 200);
  };

  const handleKPI = (value) => {
    const index = value[0];

    const tir = dataTIR[index]["TIR mensual"];
    const roi = dataROI[index]["ROI mensual"];
    const utilidad = dataUtilidad[index].Utilidad;
    const capRate = dataCapRate[index]["Cap Rate"];

    setKPI({
      tirMensual: tir,
      roiMensual: roi,
      utilidad: utilidad,
      capRate: capRate,
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

  // Asignar mes de venta inicial
  useEffect(() => {
    handleKPI([mesVenta]);
  }, [])

  return (
    <div className="w-full flex flex-col md:flex-row gap-20">
      <div className="flex flex-col gap-4 w-[70%]">
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold text-gray-500">
            Mes de venta seleccionado
          </h2>
          <div className="w-full pl-14">
            <Slider step={1} max={maxStep} defaultValue={[mesVenta]} onValueChange={handleKPI} />
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
                <Tooltip
                  formatter={(value, name) => value + "%"}
                />
                <Line
                  dataKey="ROI mensual"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  type="monotone"
                  dot={<CustomizedDot />}
                />
                <Line
                  dataKey="ROI Anualizado"
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
                  height={30}
                  startIndex={startIndexBrush}
                  endIndex={endIndexBrush}
                  className="custom-brush"
                  onChange={handleBrushOnchange}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Suma de TIR Anualizada y Suma de TIR por Mes
          </h2>
          <div className="h-[25vh] w-full">
            <ResponsiveContainer
              className={" flex aspect-video justify-center text-xs"}
            >
              <ComposedChart data={dataTIR.slice(startIndexBrush, endIndexBrush + 1)} syncId="syncId">
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
                <Tooltip
                  formatter={(value, name) => value + "%"}
                />
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
                data={dataUtilidad.slice(startIndexBrush, endIndexBrush + 1)}
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
                <Tooltip
                  formatter={(value, name) => parsePrice(value)}
                />
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
      {<div className="flex-1 flex flex-col gap-10 h-fit">
        <div className="flex flex-col w-[90%] flex-1 rounded-3xl ring-1 shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60 ring-gray-900/5 p-4">
          <h2 className="text-lg font-bold text-white px-4 py-2 bg-invertiria-2 w-fit rounded-xl">
            KPIs
          </h2>
          <div className="flex flex-col gap-8 mb-2">
            {/* TIR */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{kpi.tirMensual}%</h3>
              <IndicadorDeRentabilidad value={kpi.tirMensual} max={maxTir} min={minTir} />
              <h3 className="text-xl font-bold">TIR</h3>
            </div>
            {/* Utilidad */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{parsePrice(kpi.utilidad)}</h3>
              <IndicadorDeRentabilidad value={kpi.utilidad} max={maxUtilidad} min={minUtilidad} />
              <h3 className="text-xl font-bold">Utilidad</h3>
            </div>
            {/* ROI */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{kpi.roiMensual}%</h3>
              <IndicadorDeRentabilidad value={kpi.roiMensual} max={maxRoi} min={minRoi} />
              <h3 className="text-xl font-bold">ROI</h3>
            </div>
            {/* Cap Rate */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{kpi.capRate}%</h3>
              <IndicadorDeRentabilidad value={kpi.capRate} max={maxCapRate} min={minCapRate} />
              <h3 className="text-xl font-bold">Cap Rate</h3>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default IndicadoresDeRentabilidad;
