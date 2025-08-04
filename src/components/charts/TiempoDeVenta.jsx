import {
  Legend,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
  ComposedChart,
  Brush,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useIsMobile } from "../../hooks/use-mobile";

// Grafica
function TiempoDeVenta({ timeVectors, flowsResult }) {

  const isMobile = useIsMobile();

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    let tir_mensual = 0;
    let tir_anualizada = 0;
    for (let i = 0; i < flowsResult?.tir_mensual.length; i++) {
      if (flowsResult.tir_mensual[i][0] == index) {
        tir_mensual = flowsResult.tir_mensual[i][2];
        tir_anualizada = flowsResult.tir_anualizada[i][2];
      }
    }
    return {
      mes: item[1],
      "Precio del inmueble": item[2],
      "TIR mensual": tir_mensual,
      "TIR anualizada": tir_anualizada
    };
  });

  return (
    <div className="flex flex-col gap-15 w-full max-sm:w-full">
      <div className="h-[30vh] w-full">
        <ResponsiveContainer
          className={"flex aspect-video justify-center text-xs"}
        >
          <ComposedChart
            syncId="syncId2"
            data={data}
            margin={{ top: 0, right: isMobile ? 30 : 60, left: isMobile ? -35 : 80, bottom: 0 }}
          >
            <CartesianGrid className="opacity-50" vertical={false} />
            <XAxis
              className="fill-gray-100"
              dataKey="mes"
              tickLine={false}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            />
            <YAxis
              yAxisId="left"
              domain={['dataMin', 'auto']}
              tickFormatter={(value) => parsePrice(value)}
              tickLine={false}
              tick={!isMobile}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            >
              {!isMobile && (
                <Label
                  value="Precio del inmueble"
                  offset={-60}
                  style={{ textAnchor: "middle" }}
                  position="insideLeft"
                  angle="-90"
                />
              )}
            </YAxis>
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => value + "%"}
              tickLine={false}
              tick={!isMobile}
              width={isMobile ? 0 : 60}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            >
              {!isMobile && (
                <Label
                  value="TIR (%)"
                  style={{ textAnchor: "middle" }}
                  position="insideRight"
                  angle="-90"
                />
              )}
            </YAxis>
            <Tooltip
              formatter={(value, name) => {
                if (name === "Precio del inmueble") {
                  return parsePrice(value);
                }
                if (name === "TIR mensual" || name === "TIR anualizada") {
                  return value + "%";
                }
              }}
            />
            <Line
              yAxisId="left"
              dataKey="Precio del inmueble"
              strokeWidth={1.5}
              stroke="#FB3D03"
              connectNulls
              dot={false}
              type="monotone"
            />
            <Line
              yAxisId="right"
              dataKey="TIR mensual"
              strokeWidth={1.5}
              stroke="#000000"
              connectNulls
              dot={false}
              type="monotone"
            />
            <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} />
            <Brush
              dataKey="mes"
              stroke="#FB3D03"
              startIndex={0}
              endIndex={120}
              height={30}
              tickFormatter={(value) => isMobile ? "" : value}
              className="custom-brush"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[30vh] w-full">
        <ResponsiveContainer
          className={"flex aspect-video justify-center text-xs"}
        >
          <ComposedChart
            syncId="syncId2"
            data={data}
            margin={{ top: 0, right: isMobile ? 30 : 60, left: isMobile ? -35 : 80, bottom: 0 }}
          >
            <CartesianGrid className="opacity-50" vertical={false} />
            <XAxis
              className="fill-gray-100"
              dataKey="mes"
              tickLine={false}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            />
            <YAxis
              yAxisId="left"
              domain={['dataMin', 'auto']}
              tickFormatter={(value) => parsePrice(value)}
              tickLine={false}
              tick={!isMobile}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            >
              {!isMobile && (
                <Label
                  value="Precio del inmueble"
                  offset={-60}
                  style={{ textAnchor: "middle" }}
                  position="insideLeft"
                  angle="-90"
                />
              )}
            </YAxis>
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => value + "%"}
              tickLine={false}
              tick={!isMobile}
              width={isMobile ? 0 : 60}
              axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
            >
              {!isMobile && (
                <Label
                  value="TIR (%)"
                  style={{ textAnchor: "middle" }}
                  position="insideRight"
                  angle="-90"
                />
              )}
            </YAxis>
            <Tooltip
              formatter={(value, name) => {
                if (name === "Precio del inmueble") {
                  return parsePrice(value);
                }
                if (name === "TIR mensual" || name === "TIR anualizada") {
                  return value + "%";
                }
              }}
            />
            <Line
              yAxisId="left"
              dataKey="Precio del inmueble"
              strokeWidth={1.5}
              stroke="#FB3D03"
              connectNulls
              dot={false}
              type="monotone"
            />
            < Line
              yAxisId="right"
              dataKey="TIR anualizada"
              strokeWidth={1.5}
              stroke="#16a300"
              connectNulls
              dot={false}
              type="monotone"
            />
            <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export { TiempoDeVenta };
