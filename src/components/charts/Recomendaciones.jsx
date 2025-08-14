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
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

const Recomendaciones = ({ timeVectors, flowsResult, fechaVenta }) => {

  const isMobile = useIsMobile();

  // Obtener data roi
  let mayorRoi = 0;
  const dataROI = timeVectors?.valor_inmueble.map((item, index) => {
    let roi = 0;
    for (let i = 0; i < flowsResult?.roi.length; i++) {
      if (flowsResult.roi[i][0] == index) {
        roi = flowsResult.roi[i][2];
      }
      // Maximo roi
      if (flowsResult.roi[i][2] > mayorRoi) {
        mayorRoi = flowsResult.roi[i][2];
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
  let mayorTir = 0;
  let mesMayorTir = '';
  const dataTIR = timeVectors?.valor_inmueble.map((item, index) => {
    let tir_mensual = 0;
    for (let i = 0; i < flowsResult?.tir_mensual.length; i++) {
      if (flowsResult.tir_mensual[i][0] == index) {
        tir_mensual = flowsResult.tir_mensual[i][2];
      }
      // Maximo tir
      if (flowsResult.tir_mensual[i][2] > mayorTir) {
        mayorTir = flowsResult.tir_mensual[i][2];
        mesMayorTir = flowsResult.tir_mensual[i][1];
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
  let mayorUtilidad = 0;
  let mesMayorUtilidad = '';
  const dataUtilidad = timeVectors?.valor_inmueble.map((item, index) => {
    let utilidad = 0;
    for (let i = 0; i < flowsResult?.utilidad.length; i++) {
      if (flowsResult.utilidad[i][0] == index) {
        utilidad = flowsResult.utilidad[i][2];
      }
      // Maximo utilidad
      if (flowsResult.utilidad[i][2] > mayorUtilidad) {
        mayorUtilidad = flowsResult.utilidad[i][2];
        mesMayorUtilidad = flowsResult.utilidad[i][1];
      }
    }
    return {
      mes: item[1],
      Utilidad: utilidad,
    };
  });

  const [startIndexBrush, setStartIndexBrush] = useState(0);
  const [endIndexBrush, setEndIndexBrush] = useState(240);

  let timeout;
  const handleBrushOnchange = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setStartIndexBrush(e.startIndex);
      setEndIndexBrush(e.endIndex);
    }, 200);
  };

  // Obtener zonas de mayor tir y utilidad
  let zonaMayorTir = mejoresTresMesesSeguidos(flowsResult.tir_mensual);
  let zonaMayorUtilidad = mejoresTresMesesSeguidos(flowsResult.utilidad);

  // Funcion para obtener zonas de 3 meses
  function mejoresTresMesesSeguidos(datos) {
    datos = datos.map((item) => ({ index: item[0], mes: item[1], dato: item[2] }));
    if (datos.length < 3) return [];
    let maxSuma = -Infinity;
    let mejorSecuencia = [];
    for (let i = 0; i <= datos.length - 3; i++) {
      const grupo = datos.slice(i, i + 3);
      const suma = grupo.reduce((sum, item) => sum + item.dato, 0);
      if (suma > maxSuma) {
        maxSuma = suma;
        mejorSecuencia = grupo;
      }
    }
    return mejorSecuencia;
  }

  function CustomLengend() {
    return (
      <ul className="recharts-default-legend p-0 m-0 text-center">
        <li className="inline-block mr-2.5">
          <svg className="inline-block align-middle mr-1" width="14" height="14" viewBox="0 0 32 32" fill="none">
            <path
              strokeWidth="4"
              stroke="#000000"
              fill="none"
              d="M0,16h10.666666666666666
           A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
           H32M21.333333333333332,16
           A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
              className="recharts-legend-icon"
            />
          </svg>
          <span className="text-black">TIR mensual</span>
        </li>
        <li className="inline-block mr-2.5">
          <svg className="inline-block align-middle mr-1" width="14" height="14" viewBox="0 0 32 32" fill="none">
            <path
              strokeWidth="4"
              stroke="#FB3D03"
              fill="none"
              d="M0,16h10.666666666666666
           A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
           H32M21.333333333333332,16
           A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
              className="recharts-legend-icon"
            />
          </svg>
          <span className="text-[#FB3D03]">TIR Anualizada</span>
        </li>
        <li className="inline-block mr-2.5">
          <svg className="inline-block align-middle mr-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect width="14" height="14" fill="green" fillOpacity={0.3} className="recharts-legend-icon" />
          </svg>
          <span className="text-[rgba(0,128,0,0.8)]">Zona mayor TIR</span>
        </li>
        <li className="inline-block mr-2.5">
          <svg className="inline-block align-middle mr-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect width="14" height="14" fill="DodgerBlue" fillOpacity={0.3} className="recharts-legend-icon" />
          </svg>
          <span className="text-[rgba(30,144,255,0.8)]">Zona mayor Utilidad</span>
        </li>
      </ul>
    )
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12">
      <div className="flex flex-col gap-4 w-full xl:w-[70%] max-sm:w-full">
        <div className="flex flex-col gap-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Suma de ROI Anualizado y Suma de ROI por Mes
          </h2>
          <div className="h-[25vh] w-full">
            <ResponsiveContainer
              className={" flex aspect-video justify-center text-xs"}
            >
              <ComposedChart
                syncId="syncId2"
                data={dataROI}
                margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 45, bottom: 0 }}
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
                  tick={!isMobile}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  {!isMobile && (
                    <Label
                      value="Porcentaje (%)"
                      style={{ textAnchor: "middle" }}
                      position="insideLeft"
                      angle="-90"
                    />
                  )}
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
                  dot={false}
                />
                <Line
                  dataKey="ROI Anualizado"
                  strokeWidth={1.5}
                  stroke="#FB3D03"
                  connectNulls
                  dot={false}
                  type="monotone"
                />
                <ReferenceArea
                  x1={zonaMayorTir[0].mes}
                  x2={zonaMayorTir[2].mes}
                  strokeOpacity={0}
                  fill="green"
                  fillOpacity={0.3}
                />
                <ReferenceArea
                  x1={zonaMayorUtilidad[0].mes}
                  x2={zonaMayorUtilidad[2].mes}
                  strokeOpacity={0}
                  fill="DodgerBlue"
                  fillOpacity={0.3}
                />
                <ReferenceLine x={fechaVenta}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
                />
                <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} content={<CustomLengend />} />
                <Brush
                  dataKey="mes"
                  stroke="#FB3D03"
                  startIndex={startIndexBrush}
                  endIndex={endIndexBrush}
                  height={30}
                  tickFormatter={(value) => isMobile ? "" : value}
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
              <ComposedChart data={dataTIR.slice(startIndexBrush, endIndexBrush + 1)}
                syncId="syncId2"
                margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 45, bottom: 0 }}
              >
                <CartesianGrid
                  className="opacity-50"
                  vertical={false}
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
                  tick={!isMobile}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  {!isMobile && (
                    <Label
                      value="Porcentaje (%)"
                      style={{ textAnchor: "middle" }}
                      position="insideLeft"
                      angle="-90"
                    />
                  )}
                </YAxis>
                <Tooltip
                  formatter={(value, name) => value + "%"}
                />
                <Line
                  dataKey="TIR mensual"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  dot={false}
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
                <ReferenceArea
                  x1={zonaMayorTir[0].mes}
                  x2={zonaMayorTir[2].mes}
                  strokeOpacity={0}
                  fill="green"
                  fillOpacity={0.3}
                />
                <ReferenceArea
                  x1={zonaMayorUtilidad[0].mes}
                  x2={zonaMayorUtilidad[2].mes}
                  strokeOpacity={0}
                  fill="DodgerBlue"
                  fillOpacity={0.3}
                />
                <ReferenceLine x={fechaVenta}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
                />
                <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} content={<CustomLengend />} />
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
                margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 45, bottom: 0 }}
                syncId="syncId2"
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
                  tick={!isMobile}
                  axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
                >
                  {!isMobile && (
                    <Label
                      value="Promedio utilidad"
                      offset={-60}
                      style={{ textAnchor: "middle" }}
                      position="insideLeft"
                      angle="-90"
                    />
                  )}
                </YAxis>
                <Tooltip
                  formatter={(value, name) => parsePrice(value)}
                />
                <Line
                  dataKey="Utilidad"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  dot={false}
                  type="monotone"
                />
                <ReferenceArea
                  x1={zonaMayorTir[0].mes}
                  x2={zonaMayorTir[2].mes}
                  strokeOpacity={0}
                  fill="green"
                  fillOpacity={0.3}
                />
                <ReferenceArea
                  x1={zonaMayorUtilidad[0].mes}
                  x2={zonaMayorUtilidad[2].mes}
                  strokeOpacity={0}
                  fill="DodgerBlue"
                  fillOpacity={0.3}
                />
                <ReferenceLine x={fechaVenta}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
                />
                <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} content={<CustomLengend />} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
