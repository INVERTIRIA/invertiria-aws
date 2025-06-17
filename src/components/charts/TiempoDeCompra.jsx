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
import { Card, CardContent } from "../ui/card";

// Data para la grafica
const data = [
  {
    mes: "01/2023",
    Varianza: [580719993, 580719993],
    "Precio del inmueble": 580719993,
  },
  {
    mes: "02/2023",
    Varianza: [588350711, 592445488],
    "Precio del inmueble": 590401637,
  },
  {
    mes: "03/2023",
    Varianza: [597913393, 602079400],
    "Precio del inmueble": 600000000,
  },
  {
    mes: "04/2023",
    Varianza: [606348642, 612545519],
    "Precio del inmueble": 609454917,
  },
  {
    mes: "05/2023",
    Varianza: [617734599, 619796458],
    "Precio del inmueble": 618766386,
  },
  {
    mes: "06/2023",
    Varianza: [626913616, 628953550],
    "Precio del inmueble": 627934410,
  },
  {
    mes: "07/2023",
    Varianza: [636958986, 636958986],
    "Precio del inmueble": 636958986,
  },
  {
    mes: "08/2023",
    Varianza: [644813035, 646865569],
    "Precio del inmueble": 645840116,
  },
  {
    mes: "09/2023",
    Varianza: [653563718, 655590314],
    "Precio del inmueble": 654577799,
  },
  {
    mes: "10/2023",
    Varianza: [662878598, 662878598],
    "Precio del inmueble": 662878598,
  },
  {
    mes: "11/2023",
    Varianza: [669826659, 671700748],
    "Precio del inmueble": 670764357,
  },
  {
    mes: "12/2023",
    Varianza: [677355128, 679155335],
    "Precio del inmueble": 678255828,
  },
  {
    mes: "01/2024",
    Varianza: [684163343, 685831946],
    "Precio del inmueble": 684998152,
  },
  {
    mes: "02/2024",
    Varianza: [688084036, 694035690],
    "Precio del inmueble": 691066243,
  },
  {
    mes: "03/2024",
    Varianza: [695840108, 697214265],
    "Precio del inmueble": 696527525,
  },
  {
    mes: "04/2024",
    Varianza: [698968474, 703908219],
    "Precio del inmueble": 701442680,
  },
  {
    mes: "05/2024",
    Varianza: [704737082, 706993754],
    "Precio del inmueble": 705866318,
  },
  {
    mes: "06/2024",
    Varianza: [708336817, 711430687],
    "Precio del inmueble": 709885434,
  },
  {
    mes: "07/2024",
    Varianza: [711772906, 715806450],
    "Precio del inmueble": 713792519,
  },
  {
    mes: "08/2024",
    Varianza: [717100370, 718074446],
    "Precio del inmueble": 717587573,
  },
];

// Grafica
function TiempoDeCompra({ results }) {
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
          className=""
        >
          <CartesianGrid className="opacity-50" vertical={false} />
          <XAxis
            className="fill-gray-100"
            dataKey="mes"
            tickLine={false}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          />
          <YAxis
            domain={[580719993, 710719993]}
            ticks={[
              600719993, 620719993, 640719993, 660719993, 680719993, 700719993,
            ]}
            tickFormatter={(value) => parsePrice(value)}
            tickLine={false}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            <Label
              value="Precio del inmueble (millones de pesos)"
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
            endIndex={11}
            height={30}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { TiempoDeCompra };
