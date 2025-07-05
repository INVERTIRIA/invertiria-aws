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
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useState } from "react";

const Recomendaciones = ({ timeVectors, flowsResult, mesVenta }) => {

  const mesVentaSeleccionado = mesVenta.slice(0, 7);

  // Obtener data roi
  let mayorRoi = 0;
  let mesMayorRoi = '';
  const dataROI = timeVectors?.valor_inmueble.map((item, index) => {
    let roi = 0;
    for (let i = 0; i < flowsResult?.roi.length; i++) {
      if (flowsResult.roi[i][0] == index) {
        roi = flowsResult.roi[i][2];
      }
      // Maximo roi
      if (flowsResult.roi[i][2] > mayorRoi) {
        mayorRoi = flowsResult.roi[i][2];
        mesMayorRoi = flowsResult.roi[i][1];
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

  return (
    <div className="w-full flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-4 w-[70%]">
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
                <ReferenceLine x={mesMayorRoi}
                  label={{ value: 'Mayor ROI', style: { fill: 'black' }, angle: -90, position: 'center' }}
                  stroke="purple"
                  strokeWidth={30}
                  isFront={true}
                  style={{ opacity: 0.5 }}
                />
                <ReferenceLine x={mesVentaSeleccionado}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
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
              <ComposedChart data={dataTIR.slice(startIndexBrush, endIndexBrush + 1)} syncId="syncId2">
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
                <ReferenceLine x={mesMayorTir}
                  label={{ value: 'Mayor TIR', style: { fill: 'black' }, angle: -90, position: 'center' }}
                  stroke="orange"
                  strokeWidth={30}
                  isFront={true}
                  style={{ opacity: 0.5  }}
                />
                <ReferenceLine x={mesVentaSeleccionado}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
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
                <ReferenceLine x={mesMayorUtilidad}
                  label={{ value: 'Mayor utilidad', style: { fill: 'black' }, angle: -90, position: 'center' }}
                  stroke="green"
                  strokeWidth={30}
                  isFront={true}
                  style={{ opacity: 0.5 }}
                />
                <ReferenceLine x={mesVentaSeleccionado}
                  label={{ value: 'Venta', style: { fill: 'black' }, angle: -90, position: 'insideLeft', offset: -10 }}
                  stroke="red"
                  strokeWidth={2}
                  isFront={true}
                />
                <Line
                  dataKey="Utilidad"
                  strokeWidth={1.5}
                  stroke="#000000"
                  connectNulls
                  dot={false}
                  type="monotone"
                />
                <Legend wrapperStyle={{ top: -40 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
