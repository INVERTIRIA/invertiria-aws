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
  Area,
  Brush,
} from "recharts";
import { parsePrice } from "../../constants/functions";

// Grafica
function TiempoDeCompra({ timeVectors }) {

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    const varianzaPorcentaje = timeVectors.valorizacion[index][5];
    const varianza = Math.round(item[2] * Number(varianzaPorcentaje));
    return {
      mes: item[1],
      Varianza: [(item[2] - varianza), (item[2] + varianza)],
      "Precio del inmueble": item[2],
    };
  });

  // Punto personalizado
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
    if (payload.mes === "03/2023") {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          viewBox="0 0 120 120"
          fill="#FB3D03"
        >
          <circle cx="60" cy="60" r="50" />
        </svg>
      );
    }
  };

  return (
    <div className="w-[100%] h-[50vh] lg:w-[60%]">
      <ResponsiveContainer
        className={"flex aspect-video justify-center text-xs"}
      >
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 80, left: 80, bottom: 0 }}
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
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            <Label
              value="Precio del inmueble"
              offset={-60}
              style={{ textAnchor: "middle" }}
              position="insideLeft"
              angle="-90"
            />
          </YAxis>
          <Area
            dataKey="Varianza"
            stroke="none"
            fill="#80b2ff"
            connectNulls
            dot={false}
            activeDot={true}
          />
          <Tooltip />
          <Line
            dataKey="Precio del inmueble"
            strokeWidth={1.5}
            stroke="#FB3D03"
            connectNulls
            dot={<CustomizedDot />}
          />
          <Legend wrapperStyle={{ top: -40 }} />
          <Brush
            dataKey="mes"
            stroke="#FB3D03"
            startIndex={0}
            endIndex={120}
            height={30}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { TiempoDeCompra };
