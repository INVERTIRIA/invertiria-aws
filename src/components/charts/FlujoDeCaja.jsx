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

// Data para la grafica
const data = [
  {
    mes: "01/2023",
    "Flujo neto": 4000000,
    "Ingresos": 9000000,
    "Egresos": 5000000,
  },
  {
    mes: "02/2023",
    "Flujo neto": 6000000,
    "Ingresos": 9000000,
    "Egresos": 3000000,
  },
  {
    mes: "03/2023",
    "Flujo neto": 4000000,
    "Ingresos": 10000000,
    "Egresos": 6000000,
  },
  {
    mes: "04/2023",
    "Flujo neto": 1000000,
    "Ingresos": 9000000,
    "Egresos": 8000000,
  },
  {
    mes: "05/2023",
    "Flujo neto": 2000000,
    "Ingresos": 9000000,
    "Egresos": 7000000,
  },
  {
    mes: "06/2023",
    "Flujo neto": 3000000,
    "Ingresos": 7000000,
    "Egresos": 4000000,
  },
  {
    mes: "07/2023",
    "Flujo neto": 4000000,
    "Ingresos": 8000000,
    "Egresos": 4000000,
  },
  {
    mes: "08/2023",
    "Flujo neto": 4000000,
    "Ingresos": 7000000,
    "Egresos": 3000000,
  },
  {
    mes: "09/2023",
    "Flujo neto": 6000000,
    "Ingresos": 8000000,
    "Egresos": 2000000,
  },
  {
    mes: "10/2023",
    "Flujo neto": 2000000,
    "Ingresos": 9000000,
    "Egresos": 7000000,
  },
  {
    mes: "11/2023",
    "Flujo neto": 4000000,
    "Ingresos": 5000000,
    "Egresos": 1000000,
  },
  {
    mes: "12/2023",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "01/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "02/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "03/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "04/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "05/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "06/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "07/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
  {
    mes: "08/2024",
    "Flujo neto": 9000000,
    "Ingresos": 9000000,
    "Egresos": 9000000,
  },
];

// Grafica
function FlujoDeCaja({ results }) {

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
          <Tooltip />
          <Bar dataKey="Egresos" yAxisId="left" stackId="a" fill="#FB3D03" />
          <Bar dataKey="Ingresos" yAxisId="left" stackId="a" fill="#fc8f00" />
          <Line
            yAxisId="left"
            dataKey="Flujo neto"
            strokeWidth={1.5}
            stroke="#000000"
            connectNulls
            dot={{ stroke: 'black', fill: 'black', strokeWidth: 1 }}
          />
          <Legend wrapperStyle={{ top: -40 }} />
          <Brush
            dataKey="mes"
            stroke="#FB3D03"
            startIndex={0}
            endIndex={11}
            height={30}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { FlujoDeCaja };
