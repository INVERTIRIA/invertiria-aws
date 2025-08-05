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
function RecomendacionesCompra({ timeVectors }) {

  const isMobile = useIsMobile();

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    return {
      mes: item[1],
      "Precio del inmueble": item[2],
      "Promedio ciudad": Math.round(item[2] - (item[2] * 0.7 / 100)), // Data quemada
      "Promedio Juan Londoño": Math.round(item[2] - (item[2] * 1.5 / 100)) // Data quemada
    };
  });

  return (
    <div className="w-full max-sm:w-full h-[50vh]">
      <ResponsiveContainer
        className={"flex aspect-video justify-center text-xs"}
      >
        <ComposedChart
          data={data}
          margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 80, bottom: 0 }}
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
                value="Valor proyectado"
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
            dataKey="Precio del inmueble"
            strokeWidth={1.5}
            stroke="#FB3D03"
            connectNulls
            dot={false}
            type="monotone"
          />
          <Line
            dataKey="Promedio ciudad"
            strokeWidth={1.5}
            stroke="#327ffa"
            connectNulls
            dot={false}
            type="monotone"
          />
          <Line
            dataKey="Promedio Juan Londoño"
            strokeWidth={1.5}
            stroke="#16a300"
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
  );
}

export { RecomendacionesCompra };
