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
import { useIsMobile } from "../../hooks/use-mobile";

// Grafica
function TiempoDeCompra({ timeVectors, fechaCompra }) {

  const isMobile = useIsMobile();

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    const varianzaPorcentaje = timeVectors.valorizacion[index][5];
    const varianza = Math.round(item[2] * Number(varianzaPorcentaje));
    const fecha_de_compra = item[1] == fechaCompra ? item[2] : null;
    return {
      mes: item[1],
      VarianzaReal: [(item[2] - varianza), (item[2] + varianza)],
      Varianza: [(item[2] - varianza * 100), (item[2] + varianza * 100)],
      "Precio del inmueble": item[2],
      "Fecha de compra": fecha_de_compra
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
                value="Precio del inmueble"
                offset={-60}
                style={{ textAnchor: "middle" }}
                position="insideLeft"
                angle="-90"
              />
            )}
          </YAxis>
          <Area
            dataKey="Varianza"
            stroke="none"
            fill="#a4c7fc"
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
                const varianza = props.payload["VarianzaReal"];
                return `${parsePrice(varianza[0])} - ${parsePrice(varianza[1])}`;
                // return "" + value.map((item) => parsePrice(item));;
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

export { TiempoDeCompra };
