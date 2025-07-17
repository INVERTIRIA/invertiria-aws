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
  Scatter,
} from "recharts";
import { parsePrice } from "../../constants/functions";

// Grafica
function TiempoDeCompra({ timeVectors, fechaCompra }) {

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    const varianzaPorcentaje = timeVectors.valorizacion[index][5];
    const varianza = Math.round(item[2] * Number(varianzaPorcentaje));
    const fecha_de_compra = item[1] == fechaCompra ? item[2] : null;
    return {
      mes: item[1],
      Varianza: [(item[2] - varianza), (item[2] + varianza)],
      "Precio del inmueble": item[2],
      "Fecha de compra": fecha_de_compra
    };
  });

  return (
    <div className="w-[100%] h-[50vh] lg:w-[60%]">
      <ResponsiveContainer
        className={"flex aspect-video justify-center text-xs"}
      >
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 60, left: 80, bottom: 0 }}
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
          <Tooltip
            formatter={(value, name, props) => {
              if (name === "Precio del inmueble") {
                return parsePrice(value);
              }
              if (name === "Varianza") {
                return "" + value.map((item) => parsePrice(item));;
              }
              if (name === "Fecha de compra") {
                return props.payload.mes;
              }
            }}
          />
          <Line
            dataKey="Precio del inmueble"
            strokeWidth={1.5}
            stroke="#FB3D03"
            connectNulls
            dot={false}
          />
          <Scatter dataKey="Fecha de compra" fill="red" shape={(props) => {
            if (props.cy == null) { return null; }
            return (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={5}
                fill={props.fill}
              />
            );
          }} />
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
