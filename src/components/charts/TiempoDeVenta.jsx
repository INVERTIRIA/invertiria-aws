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

// Data para la grafica
const data = [
  {
    mes: "01/2023",
    "Precio del inmueble": 580719993,
    "TIR mensual": 0.01,
  },
  {
    mes: "02/2023",
    "Precio del inmueble": 590401637,
    "TIR mensual": 0.01,
  },
  {
    mes: "03/2023",
    "Precio del inmueble": 600000000,
    "TIR mensual": 0.01,
  },
  {
    mes: "04/2023",
    "Precio del inmueble": 609454917,
    "TIR mensual": 0.42,
  },
  {
    mes: "05/2023",
    "Precio del inmueble": 618766386,
    "TIR mensual": 0.19,
  },
  {
    mes: "06/2023",
    "Precio del inmueble": 627934410,
    "TIR mensual": 0.34,
  },
  {
    mes: "07/2023",
    "Precio del inmueble": 636958986,
    "TIR mensual": 0.33,
  },
  {
    mes: "08/2023",
    "Precio del inmueble": 645840116,
    "TIR mensual": 0.3,
  },
  {
    mes: "09/2023",
    "Precio del inmueble": 654577799,
    "TIR mensual": 0.11,
  },
  {
    mes: "10/2023",
    "Precio del inmueble": 662878598,
    "TIR mensual": 0.14,
  },
  {
    mes: "11/2023",
    "Precio del inmueble": 670764357,
    "TIR mensual": 0.14,
  },
  {
    mes: "12/2023",
    "Precio del inmueble": 678255828,
    "TIR mensual": 0.13,
  },
  {
    mes: "01/2024",
    "Precio del inmueble": 684998152,
    "TIR mensual": 0.12,
  },
  {
    mes: "02/2024",
    "Precio del inmueble": 691066243,
    "TIR mensual": 0.11,
  },
  {
    mes: "03/2024",
    "Precio del inmueble": 696527525,
    "TIR mensual": 0.1,
  },
  {
    mes: "04/2024",
    "Precio del inmueble": 701442680,
    "TIR mensual": 0.09,
  },
  {
    mes: "05/2024",
    "Precio del inmueble": 705866318,
    "TIR mensual": 0.09,
  },
  {
    mes: "06/2024",
    "Precio del inmueble": 709885434,
    "TIR mensual": 0.08,
  },
  {
    mes: "07/2024",
    "Precio del inmueble": 713792519,
    "TIR mensual": 0.07,
  },
  {
    mes: "08/2024",
    "Precio del inmueble": 717587573,
    "TIR mensual": 0.07,
  },
];

// Grafica
function TiempoDeVenta({ results }) {

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
              value="Precio del inmueble"
              offset={-60}
              style={{ textAnchor: "middle" }}
              position="insideLeft"
              angle="-90"
            />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => value + "%"}
            tickLine={false}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            <Label
              value="TIR (%)"
              style={{ textAnchor: "middle" }}
              position="insideRight"
              angle="-90"
            />
          </YAxis>
          <Tooltip />
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

export { TiempoDeVenta };
