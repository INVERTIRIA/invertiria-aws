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
    "Promedio ciudad": 560719993,
    "Promedio Juan Londoño": 540719993,
  },
  {
    mes: "02/2023",
    "Precio del inmueble": 590401637,
    "Promedio ciudad": 570719993,
    "Promedio Juan Londoño": 550719993,
  },
  {
    mes: "03/2023",
    "Precio del inmueble": 600000000,
    "Promedio ciudad": 580719993,
    "Promedio Juan Londoño": 560719993,
  },
  {
    mes: "04/2023",
    "Precio del inmueble": 609454917,
    "Promedio ciudad": 602454917,
    "Promedio Juan Londoño": 584454917,
  },
  {
    mes: "05/2023",
    "Precio del inmueble": 618766386,
    "Promedio ciudad": 610766386,
    "Promedio Juan Londoño": 600766386,
  },
  {
    mes: "06/2023",
    "Precio del inmueble": 627934410,
    "Promedio ciudad": 620934410,
    "Promedio Juan Londoño": 612934410,
  },
  {
    mes: "07/2023",
    "Precio del inmueble": 636958986,
    "Promedio ciudad": 630958986,
    "Promedio Juan Londoño": 620958986,
  },
  {
    mes: "08/2023",
    "Precio del inmueble": 645840116,
    "Promedio ciudad": 635840116,
    "Promedio Juan Londoño": 625840116,
  },
  {
    mes: "09/2023",
    "Precio del inmueble": 654577799,
    "Promedio ciudad": 644577799,
    "Promedio Juan Londoño": 634577799,
  },
  {
    mes: "10/2023",
    "Precio del inmueble": 662878598,
    "Promedio ciudad": 652878598,
    "Promedio Juan Londoño": 642878598,
  },
  {
    mes: "11/2023",
    "Precio del inmueble": 670764357,
    "Promedio ciudad": 660764357,
    "Promedio Juan Londoño": 650764357,
  },
  {
    mes: "12/2023",
    "Precio del inmueble": 678255828,
    "Promedio ciudad": 668255828,
    "Promedio Juan Londoño": 658255828,
  },
  {
    mes: "01/2024",
    "Precio del inmueble": 684998152,
    "Promedio ciudad": 674998152,
    "Promedio Juan Londoño": 664998152,
  },
  {
    mes: "02/2024",
    "Precio del inmueble": 691066243,
    "Promedio ciudad": 681066243,
    "Promedio Juan Londoño": 671066243,
  },
  {
    mes: "03/2024",
    "Precio del inmueble": 696527525,
    "Promedio ciudad": 686527525,
    "Promedio Juan Londoño": 676527525,
  },
  {
    mes: "04/2024",
    "Precio del inmueble": 701442680,
    "Promedio ciudad": 691442680,
    "Promedio Juan Londoño": 681442680,
  },
  {
    mes: "05/2024",
    "Precio del inmueble": 705866318,
    "Promedio ciudad": 700866318,
    "Promedio Juan Londoño": 695866318,
  },
  {
    mes: "06/2024",
    "Precio del inmueble": 709885434,
    "Promedio ciudad": 700885434,
    "Promedio Juan Londoño": 689885434,
  },
  {
    mes: "07/2024",
    "Precio del inmueble": 713792519,
    "Promedio ciudad": 703792519,
    "Promedio Juan Londoño": 693792519,
  },
  {
    mes: "08/2024",
    "Precio del inmueble": 717587573,
    "Promedio ciudad": 707587573,
    "Promedio Juan Londoño": 697587573,
  },
];

// Grafica
function RecomendacionesCompra({ results }) {

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
            domain={[data[0].Varianza, 'auto']}
            tickFormatter={(value) => parsePrice(value)}
            tickLine={false}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            <Label
              value="Valor proyectado"
              offset={-60}
              style={{ textAnchor: "middle" }}
              position="insideLeft"
              angle="-90"
            />
          </YAxis>
          <Tooltip />
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

export { RecomendacionesCompra };
