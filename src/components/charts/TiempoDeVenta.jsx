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

// Grafica
function TiempoDeVenta({ timeVectors, flowsResult }) {

  // Obtener data
  const data = timeVectors?.valor_inmueble.map((item, index) => {
    let tir_mensual = 0;    
    for (let i = 0; i < flowsResult?.tir_mensual.length; i++) {
      if(flowsResult.tir_mensual[i][0] == index){
        tir_mensual = flowsResult.tir_mensual[i][2];
      }      
    }
    return {
      mes: item[1],
      "Precio del inmueble": item[2],
      "TIR mensual": tir_mensual,
    };
  });

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
            endIndex={120}
            height={30}
            className="custom-brush"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { TiempoDeVenta };
