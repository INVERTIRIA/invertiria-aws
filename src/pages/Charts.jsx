import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  LabelList,
} from "recharts";

import { Lightbulb, Sparkles } from "lucide-react";
import { Container } from "../components/design/Container";
import { parsePrice } from "../constants/functions";
import { TiempoDeCompra } from "../components/charts/TiempoDeCompra";
import TiempoDeCompra2 from "../components/charts/TiempoDeCompra2";

const ThermometerChart = ({ price, minPrice, maxPrice, location }) => {
  const indicatorPosition = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="mb-10 font-semibold text-xl">{location}</p>
      <span className="text-sm font-semibold">{parsePrice(maxPrice)}</span>
      <div
        style={{
          width: "80px",
          height: "300px",
          position: "relative",
          background: "linear-gradient(to top, #00d40b, #fff200, #f00000)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //rotate: "90deg",
        }}
      >
        {/* Indicador de precio actual */}
        <div
          style={{
            position: "absolute",
            width: "100px",
            height: "12px",
            background: "black",
            borderRadius: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: `${indicatorPosition}%`,
          }}
        ></div>

        {/* Texto del precio */}
        {/* <div className="flex flex-col gap-1">
          <span
            className="leading-none"
            style={{
              position: "absolute",
              left: "95px",
              bottom: `${indicatorPosition}%`,
              fontSize: "14px",
              fontWeight: "bold",
              color: "black",
              //rotate: "-90deg",
            }}
          >
            {parsePrice(price)}
            <br />
            <span className="text-[11px] font-normal">Valor Compra m²</span>
          </span>          
        </div> */}
        <div
          className="w-24 flex flex-col"
          style={{
            position: "absolute",
            left: "95px",
            bottom: `${indicatorPosition}%`,
            fontSize: "14px",
            fontWeight: "bold",
            color: "black",
            //rotate: "-90deg",
          }}
        >
          <span className="text-[11px] font-normal">Valor Compra m²</span>
          <span className="leading-none">{parsePrice(price)}</span>{" "}
        </div>
      </div>
      <span className="text-sm font-semibold">{parsePrice(minPrice)}</span>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="flex w-full justify-between text-gray-600 text-sm">
        <span>Enero 2024</span>
        <span>Mayo 2024</span>
        <span>Junio 2026</span>
        <span>Abril 2027</span>
      </div>
      <div className="relative flex items-center w-full mt-2">
        {/* Línea de tiempo */}
        <div className="absolute w-full h-1 bg-gray-300" />

        {/* Puntos */}
        <div className="relative flex w-full justify-between">
          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-600" />
            <span className="mt-2 text-gray-500">Inicio Ventas</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-600" />
            <span className="mt-2 text-gray-500">Compra</span>
            <span className="text-xs text-gray-500">400 millones</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-blue-700" />
            <span className="mt-2 text-blue-600">Venta</span>
            <span className="text-xs text-gray-500">500 millones</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-500 opacity-50" />
            <span className="mt-2 text-gray-500">Entrega</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Charts = () => {
  return (
    <Container classNameParent={"my-20"} className="flex flex-col gap-20">
      <h1 className="text-4xl font-bold">Valor de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio de m²</h2>
      <div className="flex items-center gap-20">
        {/* Recomendación */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            Analizando la primera gráfica, donde se representa el valor del
            metro cuadrado en la zona específica, vemos que el indicador negro
            refleja un valor de $860,000. En este caso, el valor máximo es de
            $920,000 y el mínimo de $760,000, lo que sugiere que estás en un
            punto medio dentro de esta zona. Sin embargo, al comprar a $860,000,
            estás por encima del promedio del valor mínimo, lo que puede indicar
            que el inmueble tiene características que justifican este precio,
            como ubicación privilegiada o potencial de valorización.
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <p className="text-sm font-medium">Generado por IA</p>
            <img
              src="/assets/images/stars-2.webp"
              alt=""
              className="size-10 rounded-full"
            />
          </div>
        </div>
        {/* Gráficas */}
        <div className="w-full flex flex-col gap-20 justify-center">
          <div className="w-full flex items-center gap-40">
            <ThermometerChart
              price={860000}
              minPrice={760000}
              maxPrice={920000}
              location={"El Poblado"}
            />
            <ThermometerChart
              price={860000}
              minPrice={800000}
              maxPrice={1200000}
              location={"Medellin"}
            />
          </div>
        </div>
        {/* Recomendación */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            En la segunda gráfica, que muestra el valor del metro cuadrado en
            Medellín en general, el indicador negro también es de $860,000.
            Aquí, el rango es más amplio, con un máximo de $1,200,000 y un
            mínimo de $800,000. Esto implica que, comparado con la ciudad
            completa, tu compra está en el extremo inferior del rango, lo que
            puede significar que, dependiendo de la zona, estás comprando un
            activo que todavía tiene mucho potencial para crecer en valor,
            especialmente si consideramos que el mercado inmobiliario en esa
            área tiene una buena tendencia de valorización.
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <p className="text-sm font-medium">Generado por IA</p>
            <img
              src="/assets/images/stars-2.webp"
              alt=""
              className="size-10 rounded-full"
            />
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-radial-[at_5%_90%] from-orange-700 to-orange-400">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt=""
            className="size-12 object-cover rounded-full"
          />
          <p className="font-medium text-white">Juan Londoño</p>
        </div>
        <p className="z-10 text-white text-sm">
          Conclusión: Comparando ambas gráficas, puedes notar que, mientras que
          tu compra en la zona específica es competitiva en relación a su
          contexto local, en comparación con la ciudad, estás aprovechando un
          precio que tiene mucho margen para valorización. Esto sugiere una
          buena oportunidad de inversión.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Antes de cerrar la compra, asegúrate de analizar las características
            específicas del inmueble y su potencial en el mercado. Asegúrate de
            que este proyecto cumpla con tus objetivos financieros y que forme
            parte de tu &quot;sistema repetitivo de inversiones&quot;. Recuerda
            que las inversiones deben ser estratégicas, así que evalúa si este
            es el momento óptimo para entrar al mercado y potenciar tu libertad
            financiera.
          </p>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <p className="text-sm  font-medium text-white">Generado por IA</p>
          <img
            src="/assets/images/stars.webp"
            alt=""
            className="size-10 rounded-full"
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold">Tiempo de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Precio del inmueble
      </h2>
      <TiempoDeCompra />
      <br />
      <TiempoDeCompra2 />
    </Container>
  );
};

export default Charts;

/* 

<div className="w-[60%] flex flex-col gap-8 p-6 relative rounded-3xl bg-radial-[at_5%_90%] from-orange-700 to-orange-400">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt=""
            className="size-12 object-cover rounded-full"
          />
          <p className="font-medium text-white">Juan Londoño</p>
        </div>
        <p className="z-10 text-white text-sm">
          Analizando la primera gráfica, donde se representa el valor del metro
          cuadrado en la zona específica, vemos que el indicador negro refleja
          un valor de $860,000. En este caso, el valor máximo es de $920,000 y
          el mínimo de $760,000, lo que sugiere que estás en un punto medio
          dentro de esta zona. Sin embargo, al comprar a $860,000, estás por
          encima del promedio del valor mínimo, lo que puede indicar que el
          inmueble tiene características que justifican este precio, como
          ubicación privilegiada o potencial de valorización. <br />
          <br />
          En la segunda gráfica, que muestra el valor del metro cuadrado en
          Medellín en general, el indicador negro también es de $860,000. Aquí,
          el rango es más amplio, con un máximo de $1,200,000 y un mínimo de
          $800,000. Esto implica que, comparado con la ciudad completa, tu
          compra está en el extremo inferior del rango, lo que puede significar
          que, dependiendo de la zona, estás comprando un activo que todavía
          tiene mucho potencial para crecer en valor, especialmente si
          consideramos que el mercado inmobiliario en esa área tiene una buena
          tendencia de valorización. <br />
          <br />
          Conclusión: Comparando ambas gráficas, puedes notar que, mientras que
          tu compra en la zona específica es competitiva en relación a su
          contexto local, en comparación con la ciudad, estás aprovechando un
          precio que tiene mucho margen para valorización. Esto sugiere una
          buena oportunidad de inversión.
          <br />
          <br /> Consejo: Antes de cerrar la compra, asegúrate de analizar las
          características específicas del inmueble y su potencial en el mercado.
          Asegúrate de que este proyecto cumpla con tus objetivos financieros y
          que forme parte de tu &quot;sistema repetitivo de inversiones&quot;.
          Recuerda que las inversiones deben ser estratégicas, así que evalúa si
          este es el momento óptimo para entrar al mercado y potenciar tu
          libertad financiera.
        </p>
        <div className="ml-auto flex gap-2 items-center">
          <p className="text-sm  font-medium text-white">
            Texto generado por IA
          </p>
          <img
            src="/assets/images/stars.webp"
            alt=""
            className="size-10 rounded-full"
          />
        </div>
      </div>

*/
