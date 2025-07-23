import { Lightbulb, Info, Sparkles, Undo2 } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Analisis = () => {
  let { id } = useParams();
  const [timeVectors, setTimeVectors] = useState(null);
  const [flowsResult, setFlowsResult] = useState(null);
  const [modelation, setModelation] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [user, setUser] = useState(null);
  const language = localStorage.getItem("language");

  // Funcion obtener modelacion
  const getModelation = async () => {
    const { data: modelation, error } = await supabase.from("modelaciones").select("*, ciudad:ciudades(nombre), pais:paises(nombre)").eq("id", id).single();
    if (error) console.log(error);
    setModelation(modelation);
  };

  // Funcion obtener usuario
  const getUser = async () => {
    const { data: user, error } = await supabase.from("usuarios").select().eq("id", modelation?.usuario_id).single();
    if (error) console.log(error);
    setUser(user);
  };

  // Funcion obtener vectores temporales
  const getTimeVectors = async () => {
    const { data: timeVectors, error } = await supabase.from("vectores_temporales").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setTimeVectors(timeVectors);
  };

  // Funcion obtener flujos resultado
  const getFlowsResult = async () => {
    const { data: flowsResult, error } = await supabase.from("flujos_resultado").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setFlowsResult(flowsResult);
  };

  // Funcion obtener analisis de las graficas
  const getAnalysis = async () => {
    const { data: analysis, error } = await supabase.from("analisis_modelacion_ia").select().eq("modelacion_id", id).single();
    if (error) console.log(error);
    setAnalysis(analysis);
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

  useEffect(() => {
    if (modelation) { getUser() }
  }, [modelation]);

  if (!modelation || !timeVectors || !flowsResult || !analysis || !user) {
    return (
      <Container classNameParent={"my-20"} className="flex flex-col gap-20">
        <DashboardSkeleton />
      </Container>)
  }

  // Fecha de venta
  let fechaVenta = modelation.fecha_prevista_venta.slice(0, 7);

  // Tir en ves de venta
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

  // Roi en ves de venta
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

  // Cap rate en ves de venta
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
  const cuota_inicial = modelation?.cuota_inicial || 0;
  const apalancamiento = Math.round(modelation.precio_de_compra / (modelation.precio_de_compra * cuota_inicial / 100));
  const credito_hipotecario = Math.round(modelation.precio_de_compra - (modelation.precio_de_compra * cuota_inicial / 100))

  // Capacidad de endeudamiento
  const maxEndeudamiento = (user?.ingresos_mensuales - user?.gastos_mensuales) * 0.4;
  const endeudamiento = timeVectors?.pagos_credito?.[0]?.[2];

  return (
    <Container classNameParent={"-my-15"} className="flex flex-col gap-20">

      {/* Informacion del analisis en popup */}
      <Dialog>
        <div className="flex justify-between">
          <Button variant="full_ghost" className="font-normal text-gray-600">
            <Link to="/" className="flex items-center gap-2">
              <Undo2 />
              <span>Volver</span>
            </Link>
          </Button>
          <DialogTrigger asChild>
            <Button variant="full_ghost" className="font-normal text-gray-600">
              Información del análisis
              <Info />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="w-[90%] xl:w-[35%] !max-w-none h-[70vh] p-8">
          <DialogTitle className="mt-2 text-2xl">Información del análisis</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="mb-2 space-y-3 overflow-y-auto text-gray-800 text-sm font-medium leading-6">
            <p><strong>Nombre del análisis:</strong> {modelation.titulo_modelacion}</p>
            <p><strong>Vigencia de la inversión:</strong> {modelation.vigencia ? "Actual" : "Ya realizada"}</p>
            <p><strong>Nombre del proyecto:</strong> {modelation.nombre_del_proyecto}</p>
            <p><strong>País:</strong> {modelation.pais.nombre}</p>
            <p><strong>Ciudad:</strong> {modelation.ciudad.nombre}</p>
            <p><strong>Zona:</strong> {modelation.zona}</p>
            <p><strong>Subzona:</strong> {modelation.subzona}</p>
            <p><strong>Tipo de inmueble:</strong> {modelation.tipo_inmueble}</p>
            <p><strong>Condición del inmueble:</strong> {modelation.estado_inmueble}</p>
            <p><strong>Titularidad:</strong> {modelation.titularidad ? modelation.titularidad : "No aplica"}</p>
            <p><strong>Modelo de negocio:</strong> {modelation.modelo_de_negocio}</p>
            <p><strong>Moneda:</strong> {modelation.moneda}</p>
            <p><strong>Precio de compra:</strong> {parsePrice(modelation.precio_de_compra)}</p>
            <p><strong>Precio de mercado:</strong> {modelation.precio_de_mercado ? parsePrice(modelation.precio_de_mercado) : "No aplica"}</p>
            <p><strong>Separación:</strong> {modelation.separacion ? parsePrice(modelation.separacion) : "No aplica"}</p>
            <p><strong>Forma de pago cuota inicial:</strong> {modelation.forma_pago_cuota_inicial ? modelation.forma_pago_cuota_inicial : "No aplica"}</p>
            <p><strong>Porcentaje de cuota inicial:</strong> {modelation.cuota_inicial ? modelation.cuota_inicial + "%" : "No aplica"}</p>
            <p><strong>Fecha inicio cuota inicial:</strong> {modelation.inicial_fecha_inicio_pago ? modelation.inicial_fecha_inicio_pago.slice(0, 7) : "No aplica"}</p>
            <p><strong>Fecha fin cuota inicial:</strong> {modelation.inicial_fecha_fin_pago ? modelation.inicial_fecha_fin_pago.slice(0, 7) : "No aplica"}</p>
            <p><strong>Número de pagos personalizados:</strong> {modelation.pagos_personalizados ? modelation.pagos_personalizados : "No aplica"}</p>
            <p><strong>Fecha de pagos personalizados:</strong> {modelation.fecha_pagos_personalizados ? modelation.fecha_pagos_personalizados : "No aplica"}</p>
            <p><strong>Valor de pagos personalizados:</strong> {modelation.valor_pagos_personalizados ? modelation.valor_pagos_personalizados : "No aplica"}</p>
            <p><strong>Crédito hipotecario:</strong> {modelation.credito_hipotecario ? "Si" : "No"}</p>
            <p><strong>Tasa de interés efectiva anual:</strong> {modelation.tasa_de_interes ? modelation.tasa_de_interes + "%" : "No aplica"}</p>
            <p><strong>Fecha inicio crédito:</strong> {modelation.credito_fecha_inicio_pago ? modelation.credito_fecha_inicio_pago.slice(0, 7) : "No aplica"}</p>
            <p><strong>Fecha fin crédito:</strong> {modelation.credito_fecha_fin_pago ? modelation.credito_fecha_fin_pago.slice(0, 7) : "No aplica"}</p>
            <p><strong>Edad de la propiedad:</strong> {modelation.edad_propiedad ? modelation.edad_propiedad + " años" : "No aplica"}</p>
            <p><strong>Área del inmueble:</strong> {modelation.area_inmueble ? modelation.area_inmueble + "m²" : "No aplica"}</p>
            <p><strong>Parqueaderos:</strong> {modelation.parqueaderos ? modelation.parqueaderos : "No aplica"}</p>
            <p><strong>VIS:</strong> {modelation.vivienda_vis ? "Si" : "No"}</p>
            <p><strong>Cesión de derechos:</strong> {modelation.cesion_de_derechos ? "Si" : "No"}</p>
            <p><strong>Fecha inicio ventas:</strong> {modelation.fecha_inicio_ventas ? modelation.fecha_inicio_ventas.slice(0, 7) : "No aplica"}</p>
            <p><strong>Fecha entrega del inmueble:</strong> {modelation.fecha_prevista_entrega ? modelation.fecha_prevista_entrega.slice(0, 7) : "No aplica"}</p>
            <p><strong>Fecha de compra:</strong> {modelation.fecha_compra.slice(0, 7)}</p>
            <p><strong>Fecha prevista de venta:</strong> {modelation.fecha_prevista_venta ? modelation.fecha_prevista_venta.slice(0, 7) : "No aplica"}</p>
            <p><strong>Etapa del proyecto:</strong> {modelation.etapa_proyecto ? modelation.etapa_proyecto : "No aplica"}</p>
            <p><strong>Comisión por venta:</strong> {modelation.comision_vendedor ? "Si" : "No"}</p>
            <p><strong>Porcentaje de comisión:</strong> {modelation.porcentaje_comision_vendedor ? modelation.porcentaje_comision_vendedor + "%" : "No aplica"}</p>
            <p><strong>Pago de administración:</strong> {modelation.administracion ? "Si" : "No"}</p>
            <p><strong>Valor de administración:</strong> {modelation.valor_administracion ? parsePrice(modelation.valor_administracion) : "No aplica"}</p>
            <p><strong>Valor de predial:</strong> {modelation.valor_predial ? parsePrice(modelation.valor_predial) : "No aplica"}</p>
            <p><strong>Requiere mejoras:</strong> {modelation.mejoras ? "Si" : "No"}</p>
            <p><strong>Valor de mejoras:</strong> {modelation.valor_mejoras ? parsePrice(modelation.valor_mejoras) : "No aplica"}</p>
            <p><strong>Requiere licencia de construcción:</strong> {modelation.licencia_construccion ? "Si" : "No"}</p>
            <p><strong>Valor licencia de construcción:</strong> {modelation.costos_licencias ? parsePrice(modelation.costos_licencias) : "No aplica"}</p>
            <p><strong>Renta:</strong> {modelation.renta ? "Si" : "No"}</p>
            <p><strong>Valor cánon de arrendamiento:</strong> {modelation.canon_de_arrendamiento ? parsePrice(modelation.canon_de_arrendamiento) : "No aplica"}</p>
            <p><strong>Valor noche:</strong> {modelation.valor_noche ? parsePrice(modelation.valor_noche) : "No aplica"}</p>
            <p><strong>Tarifa mensual:</strong> {modelation.tarifa_mensual ? parsePrice(modelation.tarifa_mensual) : "No aplica"}</p>
            <p><strong>Porcentaje de ocupacion media:</strong> {modelation.ocupacion_media ? modelation.ocupacion_media + "%" : "No aplica"}</p>
            <p><strong>Operador:</strong> {modelation.operador ? "Si" : "No"}</p>
            <p><strong>Porcentaje de operador:</strong> {modelation.porcentaje_del_operador ? modelation.porcentaje_del_operador + "%" : "No aplica"}</p>
            <p><strong>Inmobiliaria:</strong> {modelation.inmobiliaria ? "Si" : "No"}</p>
            <p><strong>Porcentaje de inmobiliaria:</strong> {modelation.porcentaje_inmobiliaria ? modelation.porcentaje_inmobiliaria + "%" : "No aplica"}</p>
            <p><strong>Precio de venta:</strong> {modelation.precio_venta ? parsePrice(modelation.precio_venta) : "No aplica"}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de inversión</h2>
      </div>
      <h2 className="-mt-20 text-center text-2xl font-bold text-gray-500">
        {modelation.titulo_modelacion}
      </h2>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Tiempos del proyecto</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Linea de tiempo</h2>

      <LineaDeTiempo modelation={modelation} />

      {/* Analisis */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
        <p className="z-10 text-gray-800 text-sm font-medium leading-6">
          {analysis.tiempos_del_proyecto.analisis_grafica[language]}
        </p>
        <div className="ml-auto flex gap-2 items-center">
          <Sparkles size={16} className="text-invertiria-2" />
          <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.tiempos_del_proyecto.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.tiempos_del_proyecto.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>
      <br />

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de la compra</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Valor de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Precio de m²</h2>

      <div className="flex xl:flex-row flex-col items-center xl:gap-30 gap-10 -mt-8">
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_compra.analisis_grafica_1[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>

        {/* Gráficas */}
        <div className="w-full flex flex-col gap-20 justify-center xl:pl-10 pl-2">
          <div className="w-full flex items-center xl:gap-40 gap-25">
            <ValorDeCompra
              price={modelation.area_inmueble ? modelation.precio_de_compra / modelation.area_inmueble : 0}
              minPrice={getVarianzaSubzona(true)}
              maxPrice={getVarianzaSubzona(false)}
              location={modelation.subzona}
            />
            <ValorDeCompra
              price={modelation.area_inmueble ? modelation.precio_de_compra / modelation.area_inmueble : 0}
              minPrice={4775632}
              maxPrice={12518275}
              location={modelation.ciudad.nombre}
            />
          </div>
        </div>
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_compra.analisis_grafica_2[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.valor_de_compra.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.valor_de_compra.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Tiempo de compra</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Precio del inmueble
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <TiempoDeCompra timeVectors={timeVectors} fechaCompra={modelation.fecha_compra.slice(0, 7)} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.tiempo_de_compra.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.tiempo_de_compra.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.tiempo_de_compra.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Recomendaciones</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Dinámica de valorización
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <RecomendacionesCompra timeVectors={timeVectors} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.recomendaciones_compra.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.recomendaciones_compra.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.recomendaciones_compra.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>
      <br />

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Análisis de la venta</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Valor de venta</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Precio del inmueble
      </h2>

      <div className="w-full flex xl:flex-row flex-col gap-10 xl:gap-80 items-center -mt-10">

        {/* Gráfica  */}
        <div className="xl:ml-0 -ml-30">
          <ValorDeVenta timeVectors={timeVectors} fechaVenta={fechaVenta} />
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.valor_de_venta.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.valor_de_venta.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.valor_de_venta.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Tiempo de venta</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        Valorización del inmueble
      </h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Gráfica  */}
        <TiempoDeVenta timeVectors={timeVectors} flowsResult={flowsResult} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.tiempo_de_venta.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.tiempo_de_venta.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.tiempo_de_venta.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Indicadores de rentabilidad</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">
        En tiempo de venta
      </h2>

      <div className="flex flex-col xl:flex-row items-center xl:gap-40 gap-10">
        {/* Graficas */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center xl:gap-5 gap-0">
            {/* TIR */}
            <div className="justify-items-center ml-3 -mr-3">
              <h3 className="text-lg font-bold">{mesVentaTir}%</h3>
              <IndicadorDeRentabilidad value={mesVentaTir} max={maxTir} min={minTir} />
              <h1 className="text-2xl font-bold">TIR</h1>
            </div>
            {/* Utilidad */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{parsePrice(mesVentaUtilidad)}</h3>
              <IndicadorDeRentabilidad value={mesVentaUtilidad} max={maxUtilidad} min={minUtilidad} />
              <h1 className="text-2xl font-bold">Utilidad</h1>
            </div>
          </div>
          <div className="flex items-center xl:gap-5 gap-0">
            {/* ROI */}
            <div className="justify-items-center ml-3 -mr-3">
              <h3 className="text-lg font-bold">{mesVentaRoi}%</h3>
              <IndicadorDeRentabilidad value={mesVentaRoi} max={maxRoi} min={minRoi} />
              <h1 className="text-2xl font-bold">ROI</h1>
            </div>
            {/* Cap Rate */}
            <div className="justify-items-center">
              <h3 className="text-lg font-bold">{mesVentaCapRate}%</h3>
              <IndicadorDeRentabilidad value={mesVentaCapRate} max={maxCapRate} min={minCapRate} />
              <h1 className="text-2xl font-bold">Cap Rate</h1>
            </div>
          </div>
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.indicadores_de_rentabilidad_venta.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.indicadores_de_rentabilidad_venta.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.indicadores_de_rentabilidad_venta.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Financiamiento</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Apalancamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Viabilidad</h2>

      {/* Grafica */}
      <div className="flex flex-col xl:flex-row items-center xl:gap-60 gap-10">
        {/* Apalancamiento */}
        <div className="justify-items-center">
          <h3 className="text-lg font-bold">{apalancamiento} veces tu capital</h3>
          <IndicadorDeRentabilidad value={apalancamiento} max={10} min={0} />
          <h1 className="text-2xl font-bold mb-8">Apalancamiento</h1>
          <h3 className="text-lg font-bold text-center">Crédito hipotecario {parsePrice(credito_hipotecario)}</h3>
        </div>

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.apalancamiento.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.apalancamiento.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.apalancamiento.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Costo financiero</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Pago mensual</h2>

      {/* Grafica */}
      <div className="flex flex-col xl:flex-row items-center xl:gap-60 gap-10">
        {/* Costo financiero */}
        <div className="justify-items-center">
          <h3 className="text-lg font-bold">{modelation?.tasa_de_interes}% efectivo anual</h3>
          <IndicadorDeRentabilidad value={modelation?.tasa_de_interes} max={30} min={0} colorInverted={true} />
          <h1 className="text-2xl font-bold mb-8">Tasa de interés</h1>
          <h3 className="text-lg font-bold text-center">Pago mensual de {parsePrice(timeVectors?.pagos_credito?.[0]?.[2])}</h3>
        </div>
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.costo_financiero.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.costo_financiero.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.costo_financiero.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-invertiria-2/35" />

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Capacidad de endeudamiento</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Según perfil</h2>

      <div className="flex xl:flex-row flex-col items-center xl:gap-40 gap-10 xl:pl-30">
        {/* Grafica */}
        <div className="-mt-20 xl:-mt-10">
          <Endeudamiento price={endeudamiento} minPrice={0} maxPrice={maxEndeudamiento} />
          <h3 className="text-lg -mt-5 font-bold text-center">Capacidad de endeudamiento de {parsePrice(maxEndeudamiento)}</h3>
        </div>
        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.capacidad_de_endeudamiento.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.capacidad_de_endeudamiento.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.capacidad_de_endeudamiento.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Flujo de caja</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Flujo de caja mensual</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">En mes de venta</h2>

      <div className="flex xl:flex-row flex-col items-center gap-10">
        {/* Grafica */}
        <FlujoDeCaja flowsResult={flowsResult} fechaVenta={fechaVenta} />

        {/* Analisis */}
        <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
          <p className="z-10 text-gray-800 text-sm font-medium leading-6">
            {analysis.flujo_de_caja.analisis_grafica[language]}
          </p>
          <div className="ml-auto flex gap-2 items-center">
            <Sparkles size={16} className="text-invertiria-2" />
            <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
          </div>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.flujo_de_caja.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.flujo_de_caja.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Rentabilidad</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Indicadores de rentabilidad</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">KPIs</h2>

      {/* Grafica */}
      <IndicadoresDeRentabilidad timeVectors={timeVectors} flowsResult={flowsResult} fechaVenta={fechaVenta} />

      {/* Analisis */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
        <p className="z-10 text-gray-800 text-sm font-medium leading-6">
          {analysis.indicadores_de_rentabilidad.analisis_grafica[language]}
        </p>
        <div className="ml-auto flex gap-2 items-center">
          <Sparkles size={16} className="text-invertiria-2" />
          <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.indicadores_de_rentabilidad.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.indicadores_de_rentabilidad.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>

      {/* Titulo */}
      <div className="w-full flex flex-col items-center text-center gap-9">
        <h2 className="h2 !max-w-none">Recomendaciones</h2>
      </div>

      {/* Titulo grafica */}
      <h1 className="lg:text-4xl text-3xl font-bold">Recomendación</h1>
      <h2 className="-mt-20 text-2xl font-bold text-gray-500">Tiempo de venta</h2>

      {/* Grafica */}
      <Recomendaciones timeVectors={timeVectors} flowsResult={flowsResult} fechaVenta={fechaVenta} />

      {/* Analisis */}
      <div className="w-full flex flex-col gap-4 p-6 relative rounded-3xl shadow-lg shadow-invertiria-2/20 border-2 border-invertiria-2/60">
        <p className="z-10 text-gray-800 text-sm font-medium leading-6">
          {analysis.recomendacion.analisis_grafica[language]}
        </p>
        <div className="ml-auto flex gap-2 items-center">
          <Sparkles size={16} className="text-invertiria-2" />
          <p className="text-xs font-medium text-invertiria-2">Generado por IA</p>
        </div>
      </div>
      {/* Conclusión */}
      <div className="w-full flex flex-col gap-6 p-6 max-sm:-mt-5 rounded-3xl bg-gradient-to-br from-invertiria-1 to-invertiria-2 shadow-xl shadow-invertiria-2/20 relative">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/juan-ia.jpeg"
            alt="Foto de Juan Londoño"
            className="w-14 h-14 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-base font-semibold">Juan Londoño</p>
            <p className="text-white text-xs opacity-70">Asesor financiero</p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {analysis.recomendacion.conclusion[language]}
        </p>
        {/* Consejo */}
        <div className="bg-white/90 p-5 rounded-2xl shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500 fill-yellow-200" />
            <span className="text-gray-800 font-semibold text-sm">Consejo</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {analysis.recomendacion.consejo[language]}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end mt-2">
          <Sparkles size={16} className="text-white" />
          <p className="text-xs text-white font-medium">Generado por IA</p>
        </div>
      </div>
      <br />
    </Container>
  );
};

export default Analisis;
