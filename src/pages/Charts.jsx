import { Lightbulb } from "lucide-react";
import { Container } from "../components/design/Container";
import { TiempoDeCompra } from "../components/charts/TiempoDeCompra";
import { ValorDeCompra } from "../components/charts/ValorDeCompra";
import { RecomendacionesCompra } from "../components/charts/RecomendacionesCompra";
import { TiempoDeVenta } from "../components/charts/TiempoDeVenta";
import { IndicadorDeRentabilidad } from "../components/charts/IndicadorDeRentabilidad";
import { ValorDeVenta } from "../components/charts/ValorDeVenta";
import { LineaDeTiempo } from "../components/charts/LineaDeTiempo";
import { Endeudamiento } from "../components/charts/Endeudamiento";
import { FlujoDeCaja } from "../components/charts/FlujoDeCaja";

const Charts = () => {
  return (
    <Container classNameParent={"my-20"} className="flex flex-col gap-20">

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de inversión</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Tiempos del proyecto</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Linea de tiempo</h2>

      <LineaDeTiempo />
      <br />

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de la compra</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Valor de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio de m²</h2>

      <div className="flex xl:flex-row flex-col items-center xl:gap-20 gap-10">
        {/* Analisis */}
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
          <div className="w-full flex items-center xl:gap-40 gap-30">
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
        {/* Analisis */}
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

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Tiempo de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio del inmueble</h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <TiempoDeCompra />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            La gráfica del precio del inmueble durante 240 meses muestra una tendencia de valorización clara y sostenida. Desde el inicio, el precio se ha incrementado mes a mes, lo que refleja un mercado inmobiliario en crecimiento. Al analizar la varianza máxima y mínima, se observa que el precio del inmueble se mantiene dentro de estos rangos, lo que sugiere una estabilidad en su valorización. En cada mes, el crecimiento constante media alrededor de un incremento mensual, destacando un potencial de inversión en bienes raíces que sorprende e inspira confianza.
            <br></br><br></br>
            Particularmente, en los últimos meses del análisis, aunque se presentan variaciones en el precio de compra real con respecto a los valores propuestos, la tendencia general sigue en ascenso. No se ha evidenciado ninguna caída sustancial en el precio, lo que es un indicador positivo para los futuros inversionistas. Las diferencias entre la varianza mínima y máxima sugieren que el mercado se mueve de manera controlada, permitiendo así que los inversionistas tengan un buen pie en la seguridad de su inversión.
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
          La conclusión es clara: el bien inmueble analizado presenta un comportamiento robusto y consistente en términos de valorización, lo que lo convierte en una excelente opción de inversión. Para aquellos que buscan alcanzar el bienestar financiero, contar con este tipo de activos como parte de su portafolio es fundamental.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Siempre evalúa el momento de la compra, haz tu investigación y asegúrate de adquirir propiedades en fases iniciales de sus proyectos. Así, maximizarás tu potencial de valorización y asegurarás un retorno atractivo. Recuerda que el verdadero negocio se hace en el momento de la compra, no en la venta.
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

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Recomendaciones</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Dinamica de valorización</h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <RecomendacionesCompra />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
      <br />

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de la venta</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Valor de venta</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio del inmueble</h2>

      {/* Gráfica  */}
      <div className="w-full flex flex-col gap-20 justify-center -mt-10">
        <div className="w-full flex items-center gap-40">
          <ValorDeVenta
            price={860000}
            minPrice={760000}
            maxPrice={920000}
          />
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Tiempo de venta</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Valorización del inmueble</h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Gráfica  */}
        <TiempoDeVenta />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            La gráfica ilustra una tendencia de crecimiento constante en el valor del inmueble, iniciando desde $580,719,993 en enero de 2023 hasta alcanzar los $1,186,963,994 en enero de 2043. Este incremento sostenido representa una valorización significativa del activo, destacando la importancia del timing en la inversión inmobiliaria. Desde el comienzo, el precio del inmueble presenta un aumento mensual relativamente regular, lo cual es un indicativo de un mercado robusto que respalda la posibilidad de rentabilidades atractivas.
            <br></br><br></br>
            En contraste, la Tasa Interna de Retorno (TIR) muestra una variación más volátil a lo largo de los meses. Observamos un incremento notable en abril de 2023, alcanzando un 0.42%, lo que sugiere un punto óptimo de compra. Sin embargo, la TIR comienza a decrecer sustancialmente y se estabiliza en cifras más bajas, en torno al 0.01%, en los últimos años del análisis. Esta disminución en la TIR puede estar indicando que, aunque el activo sigue valorizándose, el costo de adquisición y las condiciones del mercado pueden estar haciendo que las rentabilidades futuras sean más desafiantes, al tiempo que los flujos de caja se reducen.
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
          Conclusión: La gráfica subraya la importancia de entender el contexto temporal en la inversión inmobiliaria. Aunque el precio del inmueble continúa en aumento, la rentabilidad efectiva medida a través de la TIR ha mostrado señales de debilidad. Esto sugiere que se debe tener cuidado con los momentos de entrada y salida del mercado, entendiendo que una adquisición hecha en el momento adecuado puede resultar en rentabilidades significativamente más altas.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Mi recomendación es que enfoques tus inversiones en esos momentos donde la TIR se encuentre en niveles más altos, tal como sucedió en abril de 2023. Esto maximiza tus posibilidades de obtener rentabilidades que realmente sorprendan. Además, evalúa siempre el contexto del mercado y asegúrate de estar preparado para diversificar tus inversiones de manera estratégica. La paciencia y el análisis exhaustivo serán tus mejores aliados en esta travesía hacia la libertad financiera.
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

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Indicadores de rentabilidad</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">En tiempo de venta</h2>

      {/* Graficas */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center xl:gap-5 gap-0">
          {/* TIR */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={25} limit={100} />
            <h1 className="text-2xl font-bold">TIR</h1>
          </div>
          {/* Utilidad */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={30} limit={100} />
            <h1 className="text-2xl font-bold">Utilidad</h1>
          </div>
        </div>
        <div className="flex items-center xl:gap-5 gap-0">
          {/* ROI */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={40} limit={100} />
            <h1 className="text-2xl font-bold">ROI</h1>
          </div>
          {/* Cap Rate */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={60} limit={100} />
            <h1 className="text-2xl font-bold">Cap Rate</h1>
          </div>
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Financiamiento</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Apalancamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Viabilidad</h2>

      {/* Grafica */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-40">
          {/* Apalancamiento */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={3.33} limit={10} />
            <h1 className="text-2xl font-bold">Apalancamiento</h1>
          </div>

          {/* Analisis */}
          <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
            <p className="z-10 text-gray-800 text-sm font-medium leading-6">
              El apalancamiento de 3.333 en la compra del inmueble de $600.000.000, donde has aportado $180.000.000 y accedido a un crédito hipotecario de $420.000.000, indica que has utilizado un apalancamiento inteligente y eficiente. Esto significa que, por cada peso que inversoras, tienes el control de más de tres pesos en un activo que tiene potencial de valorización. Este enfoque no solo maximiza tus oportunidades de rentabilidad, sino que también permite optimizar el flujo de caja, ya que tu inversión inicial está multiplicada frente a los recursos que manejas a través del crédito.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Costo financiero</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Pago mensual</h2>

      {/* Grafica */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-5">
          {/* Costo financiero */}
          <div className="justify-items-center">
            <IndicadorDeRentabilidad value={20} limit={100} colorInverted={true} />
            <h1 className="text-2xl font-bold">Tasa de interés</h1>
          </div>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-orange-500" />

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Capacidad de endeudamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Según perfil</h2>

      {/* Grafica */}
      <div className="flex flex-col gap-10 pl-30">
        <div className="flex items-center gap-5">
          <Endeudamiento price={6000000} />
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Flujo de caja</h2>
      </div>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <FlujoDeCaja />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Flujo de caja mensual</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Según perfil</h2>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Rentabilidad</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Indicadores de rentabilidad</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">KPIs</h2>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Recomendaciones</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Recomendación</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Tiempo de venta</h2>

      <br />
    </Container>
  );
};

export default Charts;
