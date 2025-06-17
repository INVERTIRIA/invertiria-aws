import { Lightbulb } from "lucide-react";
import { Container } from "../components/design/Container";
import { TiempoDeCompra } from "../components/charts/TiempoDeCompra";
import { ValorDeCompra } from "../components/charts/ValorDeCompra";

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
            <ValorDeCompra
              price={860000}
              minPrice={760000}
              maxPrice={920000}
              location={"El Poblado"}
            />
            <ValorDeCompra
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
    </Container>
  );
};

export default Charts;
