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
    "Flujo neto": 580719993,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "02/2023",
    "Flujo neto": 590401637,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "03/2023",
    "Flujo neto": 600000000,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "04/2023",
    "Flujo neto": 609454917,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "05/2023",
    "Flujo neto": 618766386,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "06/2023",
    "Flujo neto": 627934410,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "07/2023",
    "Flujo neto": 636958986,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "08/2023",
    "Flujo neto": 645840116,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "09/2023",
    "Flujo neto": 654577799,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "10/2023",
    "Flujo neto": 662878598,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "11/2023",
    "Flujo neto": 670764357,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "12/2023",
    "Flujo neto": 678255828,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "01/2024",
    "Flujo neto": 684998152,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "02/2024",
    "Flujo neto": 691066243,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "03/2024",
    "Flujo neto": 696527525,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "04/2024",
    "Flujo neto": 701442680,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "05/2024",
    "Flujo neto": 705866318,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "06/2024",
    "Flujo neto": 709885434,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "07/2024",
    "Flujo neto": 713792519,
    "Ingresos": 580719993,
    "Egresos": 580719993,
  },
  {
    mes: "08/2024",
    "Flujo neto": 717587573,
    "Ingresos": 580719993,
    "Egresos": 580719993,
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
          <Bar dataKey="Ingresos" yAxisId="left" stackId="a" fill="#FB3D03" />
          <Bar dataKey="Egresos" yAxisId="left" stackId="a" fill="#FC7300" />
          <Line
            yAxisId="left"
            dataKey="Flujo neto"
            strokeWidth={1.5}
            stroke="#000000"
            connectNulls
            dot={true}
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
