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
import { useIsMobile } from "../../hooks/use-mobile";

// Grafica
function RecomendacionesCompra({ modelation, timeVectors, promedios }) {

  const isMobile = useIsMobile();

  const promediosCiudad = promedios.find((item) => item.nombre === modelation?.ciudad?.nombre);
  const promediosJuanLondoño = promedios.find((item) => item.nombre === "Juan Londoño");

  let inmueble = 0;
  let promedioCiudad = 0;
  let promedioJuanLondoño = 0;
  const data = timeVectors?.valorizacion.map((item, index) => {
    inmueble = inmueble + item[4] * 100;
    promedioCiudad = promedioCiudad + promediosCiudad.matriz[index][1] * 100;
    promedioJuanLondoño = promedioJuanLondoño + promediosJuanLondoño.matriz[index][1] * 100;
    return {
      mes: item[1],
      "Inmueble": inmueble,
      "Promedio ciudad": promedioCiudad,
      "Promedio Juan Londoño": promedioJuanLondoño
    };
  });

  return (
    <div className="w-full max-sm:w-full h-[50vh]">
      <ResponsiveContainer
        className={"flex aspect-video justify-center text-xs"}
      >
        <ComposedChart
          data={data}
          margin={{ top: 0, right: isMobile ? 40 : 60, left: isMobile ? -35 : 20, bottom: 0 }}
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
            tickFormatter={(value) => value + "%"}
            tickLine={false}
            tick={!isMobile}
            axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }}
          >
            {!isMobile && (
              <Label
                value="Porcentaje de valorización"
                offset={0}
                style={{ textAnchor: "middle" }}
                position="insideLeft"
                angle="-90"
              />
            )}
          </YAxis>
          <Tooltip
            formatter={(value, name) => value.toString().slice(0, 5) + "%"}
          />
          <Line
            dataKey="Inmueble"
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
          <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} />
          <Brush
            dataKey="mes"
            stroke="#FB3D03"
            startIndex={0}
            endIndex={240}
            height={30}
            tickFormatter={(value) => isMobile ? "" : value}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { RecomendacionesCompra };
