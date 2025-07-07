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
import IndicadoresDeRentabilidad from "../components/charts/IndicadoresDeRentabilidad";
import Recomendaciones from "../components/charts/Recomendaciones";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";
import DashboardSkeleton from "../components/design/DashboardSkeleton";
import { parsePrice } from "../constants/functions";
import { useParams } from "react-router";

const Analisis = () => {
  let { id } = useParams();
  const [timeVectors, setTimeVectors] = useState(null);
  const [flowsResult, setFlowsResult] = useState(null);
  const [modelation, setModelation] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const language = localStorage.getItem("language");

  if (!id) {
    id = '4ccdb1be-038d-464a-8059-0d532834cb09'
  }  

  // Funcion obtener modelacion
  const getModelation = async () => {
    const { data: modelation, error } = await supabase.from("modelaciones").select("*, ciudad:ciudades(nombre)").eq("id", id).single();
    if (error) console.log(error);
    setModelation(modelation);
    console.log(modelation);
  };

  // Funcion obtener vectores temporales
  const getTimeVectors = async () => {
    const { data: timeVectors, error } = await supabase.from("vectores_temporales").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setTimeVectors(timeVectors);
    console.log(timeVectors);
  };

  // Funcion obtener flujos resultado
  const getFlowsResult = async () => {
    const { data: flowsResult, error } = await supabase.from("flujos_resultado").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setFlowsResult(flowsResult);
    console.log(flowsResult);
  };

  // Funcion obtener analisis de las graficas
  const getAnalysis = async () => {
    const { data: analysis, error } = await supabase.from("analisis_modelacion_ia").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setAnalysis(analysis);
    console.log(analysis);
  };

  // Funcion obtener varianza subzona
  const getVarianzaSubzona = (min = false) => {
    const varianza = timeVectors?.valorizacion.filter((item) => item[1] == modelation?.fecha_compra.slice(0, 7))[0];
    return min ? varianza[2] - varianza[3] : varianza[2] + varianza[3];
  }

  useEffect(() => {
    getModelation()
    getTimeVectors()
    getFlowsResult()
    getAnalysis()
  }, []);

  if (!modelation || !timeVectors || !flowsResult || !analysis) {
    return (
      <Container classNameParent={"my-20"} className="flex flex-col gap-20">
        <DashboardSkeleton />
      </Container>)
  }

  // Tir en ves de venta
  let fechaVenta = modelation.fecha_prevista_venta.slice(0, 7);
  let mesVentaTir = 0;
  let maxTir = 0;
  let minTir = 0;
  for (let i = 0; i < flowsResult.tir_mensual.length; i++) {
    if (flowsResult.tir_mensual[i][1] == fechaVenta) {
      mesVentaTir = flowsResult.tir_mensual[i][2];
    }
    // Maximo tir
    if (flowsResult.tir_mensual[i][2] > maxTir) {
      maxTir = flowsResult.tir_mensual[i][2];
    }
    // Minimo tir
    if (flowsResult.tir_mensual[i][2] < minTir) {
      minTir = flowsResult.tir_mensual[i][2];
    }
  }

  // Utilidad en ves de venta
  let mesVentaUtilidad = 0;
  let maxUtilidad = 0;
  let minUtilidad = 0;
  for (let i = 0; i < flowsResult.utilidad.length; i++) {
    if (flowsResult.utilidad[i][1] == fechaVenta) {
      mesVentaUtilidad = flowsResult.utilidad[i][2];
    }
    // Maximo utilidad
    if (flowsResult.utilidad[i][2] > maxUtilidad) {
      maxUtilidad = flowsResult.utilidad[i][2];
    }
    // Minimo utilidad
    if (flowsResult.utilidad[i][2] < minUtilidad) {
      minUtilidad = flowsResult.utilidad[i][2];
    }
  }

  // // Roi en ves de venta
  let mesVentaRoi = 0;
  let maxRoi = 0;
  let minRoi = 0;
  for (let i = 0; i < flowsResult.roi.length; i++) {
    if (flowsResult.roi[i][1] == fechaVenta) {
      mesVentaRoi = flowsResult.roi[i][2];
    }
    // Maximo roi
    if (flowsResult.roi[i][2] > maxRoi) {
      maxRoi = flowsResult.roi[i][2];
    }
    // Minimo roi
    if (flowsResult.roi[i][2] < minRoi) {
      minRoi = flowsResult.roi[i][2];
    }
  }

  // // Cap rate en ves de venta
  let mesVentaCapRate = 0;
  let maxCapRate = 0;
  let minCapRate = 0;
  for (let i = 0; i < flowsResult.cap_rate.length; i++) {
    if (flowsResult.cap_rate[i][1] == fechaVenta) {
      mesVentaCapRate = flowsResult.cap_rate[i][2];
    }
    // Maximo tir
    if (flowsResult.cap_rate[i][2] > maxCapRate) {
      maxCapRate = flowsResult.cap_rate[i][2];
    }
    // Minimo tir
    if (flowsResult.cap_rate[i][2] < minCapRate) {
      minCapRate = flowsResult.cap_rate[i][2];
    }
  }

  // Apalancamiento
  const apalancamiento = Math.round(modelation.precio_de_compra / (modelation.precio_de_compra * modelation.cuota_inicial / 100));

  return (
    <Container classNameParent={"my-20"} className="flex flex-col gap-20">
      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de inversión</h2>
      </div>
      <h2 className="-mt-20 text-center text-2xl font-bold text-gray-500">
        {modelation.titulo_modelacion}
      </h2>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Tiempos del proyecto</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Linea de tiempo
      </h2>

      <LineaDeTiempo modelation={modelation} />
      <br />

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de la compra</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Valor de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio de m²</h2>

      <div className="flex xl:flex-row flex-col items-center xl:gap-30 gap-10">
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_compra.analisis_grafica_1[language]}
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
              price={modelation.precio_de_compra / modelation.area_inmueble}
              minPrice={getVarianzaSubzona(true)}
              maxPrice={getVarianzaSubzona(false)}
              location={modelation.subzona}
            />
            <ValorDeCompra
              price={modelation.precio_de_compra / modelation.area_inmueble}
              minPrice={4775632}
              maxPrice={12518275}
              location={modelation.ciudad.nombre}
            />
          </div>
        </div>
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_compra.analisis_grafica_2[language]}
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
          {analysis.valor_de_compra.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.valor_de_compra.consejo[language]}
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
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Precio del inmueble
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <TiempoDeCompra timeVectors={timeVectors} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.tiempo_de_compra.analisis_grafica[language]}
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
          {analysis.valor_de_compra.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.tiempo_de_compra.consejo[language]}
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
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Dinamica de valorización
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <RecomendacionesCompra timeVectors={timeVectors} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.recomendaciones_compra.analisis_grafica[language]}
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
          {analysis.recomendaciones_compra.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.recomendaciones_compra.consejo[language]}
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
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Precio del inmueble
      </h2>

      <div className="w-full flex xl:flex-row flex-col gap-10 xl:gap-60 items-center -mt-10">

        {/* Gráfica  */}
        <div className="xl:ml-0 -ml-30">
          <ValorDeVenta timeVectors={timeVectors} fechaVenta={fechaVenta} />
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_venta.analisis_grafica[language]}
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
          {analysis.valor_de_venta.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.valor_de_venta.consejo[language]}
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
      <h1 className="text-4xl font-bold">Tiempo de venta</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Valorización del inmueble
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Gráfica  */}
        <TiempoDeVenta timeVectors={timeVectors} flowsResult={flowsResult} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.tiempo_de_venta.analisis_grafica[language]}
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
          {analysis.tiempo_de_venta.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.tiempo_de_venta.consejo[language]}
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
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        En tiempo de venta
      </h2>

      <div className="flex flex-col xl:flex-row items-center xl:gap-20 gap-10">
        {/* Graficas */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center xl:gap-5 gap-0">
            {/* TIR */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{mesVentaTir}%</h3>
              <IndicadorDeRentabilidad value={mesVentaTir} max={maxTir} min={minTir} />
              <h1 className="text-2xl font-bold">TIR</h1>
            </div>
            {/* Utilidad */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{parsePrice(mesVentaUtilidad)}</h3>
              <IndicadorDeRentabilidad value={mesVentaUtilidad} max={maxUtilidad} min={minUtilidad} />
              <h1 className="text-2xl font-bold">Utilidad</h1>
            </div>
          </div>
          <div className="flex items-center xl:gap-5 gap-0">
            {/* ROI */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{mesVentaRoi}%</h3>
              <IndicadorDeRentabilidad value={mesVentaRoi} max={maxRoi} min={minRoi} />
              <h1 className="text-2xl font-bold">ROI</h1>
            </div>
            {/* Cap Rate */}
            <div className="justify-items-center">
              <h3 className="text-2xl font-bold">{mesVentaCapRate}%</h3>
              <IndicadorDeRentabilidad value={mesVentaCapRate} max={maxCapRate} min={minCapRate} />
              <h1 className="text-2xl font-bold">Cap Rate</h1>
            </div>
          </div>
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.indicadores_de_rentabilidad_venta.analisis_grafica[language]}
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
          {analysis.indicadores_de_rentabilidad_venta.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.indicadores_de_rentabilidad_venta.consejo[language]}
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

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Financiamiento</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Apalancamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Viabilidad</h2>

      {/* Grafica */}
      <div className="flex xl:flex-row flex-col xl:gap-40 gap-10">
        {/* Apalancamiento */}
        <div className="justify-items-center">
          <h3 className="text-lg font-bold">{apalancamiento} veces tu capital</h3>
          <IndicadorDeRentabilidad value={apalancamiento} max={10} min={0} />
          <h1 className="text-2xl font-bold">Apalancamiento</h1>
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.apalancamiento.analisis_grafica[language]}
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
          {analysis.apalancamiento.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.apalancamiento.consejo[language]}
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
      <div className="flex flex-col xl:flex-row items-center xl:gap-40 gap-10">
        {/* Costo financiero */}
        <div className="justify-items-center">
          <IndicadorDeRentabilidad value={20} max={100} colorInverted={true} />
          <h1 className="text-2xl font-bold">Tasa de interés</h1>
        </div>
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.costo_financiero.analisis_grafica[language]}
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
          {analysis.costo_financiero.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.costo_financiero.consejo[language]}
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
      <h1 className="text-4xl font-bold">Capacidad de endeudamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Según perfil</h2>

      <div className="flex xl:flex-row flex-col items-center xl:gap-60 gap-10 xl:pl-30">
        {/* Grafica */}
        <Endeudamiento price={6000000} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.capacidad_de_endeudamiento.analisis_grafica[language]}
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
          {analysis.capacidad_de_endeudamiento.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.capacidad_de_endeudamiento.consejo[language]}
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

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Flujo de caja</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Flujo de caja mensual</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Según perfil</h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <FlujoDeCaja />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.flujo_de_caja.analisis_grafica[language]}
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
          {analysis.flujo_de_caja.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.flujo_de_caja.consejo[language]}
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

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Rentabilidad</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Indicadores de rentabilidad</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">KPIs</h2>

      {/* Grafica */}
      <IndicadoresDeRentabilidad timeVectors={timeVectors} flowsResult={flowsResult} fechaVenta={fechaVenta} />

      {/* Analisis */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
        <p className="z-10 text-gray-800 text-sm font-medium leading-6">
          {analysis.indicadores_de_rentabilidad.analisis_grafica[language]}
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
          {analysis.indicadores_de_rentabilidad.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.indicadores_de_rentabilidad.consejo[language]}
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

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Recomendaciones</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="text-4xl font-bold">Recomendación</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Tiempo de venta</h2>

      {/* Grafica */}
      <Recomendaciones timeVectors={timeVectors} flowsResult={flowsResult} mesVenta={modelation.fecha_prevista_venta} />

      {/* Analisis */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl bg-gray-50 shadow-lg shadow-invertiria-2/30 ring-1 ring-gray-900/5">
        <p className="z-10 text-gray-800 text-sm font-medium leading-6">
          {analysis.recomendacion.analisis_grafica[language]}
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
          {analysis.recomendacion.conclusion[language]}
        </p>
        <div className="flex flex-col gap-4 bg-white/80 p-5 rounded-2xl">
          <div className="flex gap-1 items-center">
            <Lightbulb className="size-5 text-yellow-600 fill-amber-300" />
            <span className="text-gray-900 font-semibold">Consejo</span>
          </div>
          <p className="text-gray-900 text-sm">
            {analysis.recomendacion.consejo[language]}
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
    </Container>
  );
};

export default Analisis;
