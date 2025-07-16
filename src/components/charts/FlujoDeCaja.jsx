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
} from "recharts";
import { parsePrice } from "../../constants/functions";

// Grafica
function FlujoDeCaja({ flowsResult, fechaVenta }) {

  // Obtener data
  const data = flowsResult?.flujo_de_caja.map((item, index) => {
    return {
      mes: item[1],
      "Ingresos": item[2],
      "Egresos": item[3],
      "Flujo neto": item[4],
    };
  });

  // Punto personalizado
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
    if (payload.mes === fechaVenta) {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          viewBox="0 0 120 120"
          fill="black"
        >
          <circle cx="60" cy="60" r="35" />
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
            yAxisId="left"
            domain={[data[0].Varianza, 'auto']}
            tickFormatter={(value) => parsePrice(value)}
            tickLine={false}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            <Label
              value="Monto"
              offset={-60}
              style={{ textAnchor: "middle" }}
              position="insideLeft"
              angle="-90"
            />
          </YAxis>
          <Tooltip
            formatter={(value, name) => parsePrice(value)}
          />
          <Bar dataKey="Egresos" yAxisId="left" stackId="a" fill="#FB3D03" />
          <Bar dataKey="Ingresos" yAxisId="left" stackId="a" fill="#fc8f00" />
          <Line
            yAxisId="left"
            dataKey="Flujo neto"
            strokeWidth={1.5}
            stroke="#000000"
            connectNulls
            dot={<CustomizedDot />}
          />
          <Legend wrapperStyle={{ top: -40 }} />
          <Brush
            dataKey="mes"
            stroke="#FB3D03"
            startIndex={0}
            endIndex={60}
            height={30}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { FlujoDeCaja };
