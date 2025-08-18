import {
  Legend,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Brush,
  Bar,
} from "recharts";
import { parsePrice } from "../../constants/functions";
import { useIsMobile } from "../../hooks/use-mobile";

function FlujoDeCaja({ flowsResult, fechaVenta }) {
  const isMobile = useIsMobile();

  // Obtener data
  let flujo_de_caja_completo = flowsResult?.flujo_de_caja_completo;  
  const data = flujo_de_caja_completo.map((item, index) => ({
    mes: item[1],
    positivo: item[2] >= 0 ? item[2] : null,
    negativo: item[2] < 0 ? item[2] : null,
    administracion: 240000,
    credito: 150000,
  }));

  // Obtener datos en mes de venta
  let flujo_de_caja = flowsResult?.flujo_de_caja;  
  for (let i = 0; i < flujo_de_caja.length; i++) {
    if(flujo_de_caja[i][1] == fechaVenta){
      console.log(flujo_de_caja[i]);
    }
  }

  return (
    <div className="w-full xl:w-[70%] max-sm:w-full h-[50vh]">
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
              // console.log(value, name, props);
              // if (props.payload.administracion > 0) {
              //   return value + "Adminsitracion:" + parsePrice(props.payload.administracion);
              // }
              if (name === "Fecha de venta") {
                return props.payload.mes;
              } else {
                return parsePrice(value);
              }
            }}
          />
          <Bar
            dataKey="positivo"
            name="Flujo de caja (+)"
            fill="green"
            barSize={5}
          />
          <Bar
            dataKey="negativo"
            name="Flujo de caja (-)"
            fill="red"
            barSize={5}
          />
          <Legend wrapperStyle={{ top: -40, left: isMobile ? 10 : 80 }} />
          <Brush
            dataKey="mes"
            stroke="#FB3D03"
            startIndex={0}
            endIndex={flujo_de_caja_completo.length - 1}
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
