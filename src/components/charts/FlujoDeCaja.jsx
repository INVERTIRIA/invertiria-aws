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
  Bar,
  Scatter,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useIsMobile } from "../../hooks/use-mobile";

// Grafica
function FlujoDeCaja({ flowsResult, fechaVenta }) {

  const isMobile = useIsMobile();

  // Obtener data
  const data = flowsResult?.flujo_de_caja.map((item, index) => {
    const fecha_de_venta = item[1] == fechaVenta ? item[4] : null;
    return {
      mes: item[1],
      "Ingresos": item[2],
      "Egresos": -item[3],
      "Flujo neto": item[4],
      "Fecha de venta": fecha_de_venta
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
              if (name === "Fecha de venta") {
                return props.payload.mes;
              } else {
                return parsePrice(value);
              }
            }}
          />
          <Bar dataKey="Egresos" stackId="b" fill="red" barSize='1%' />
          <Bar dataKey="Ingresos" stackId="a" fill="LimeGreen" barSize='1%' />
          <Line
            dataKey="Flujo neto"
            strokeWidth={1.7}
            stroke="#000000"
            connectNulls
            dot={false}
          />
          <Scatter dataKey="Fecha de venta" fill="black" shape={(props) => {
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
            endIndex={60}
            height={30}
            tickFormatter={(value) => isMobile ? "" : value}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { FlujoDeCaja };
