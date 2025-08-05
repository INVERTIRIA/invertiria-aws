import { HousePlus, MapPinHouse, CircleDollarSign, HandCoins, Landmark, House, Timer, ChartNoAxesCombined, Banknote } from "lucide-react";
import { useState } from "react";
import { ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { parsePrice } from "../constants/functions";

// Forma de pago de cuota inicial
const formaPagoCuotaInicial = {
  1: "Pagos constantes",
  2: "Pagos constantes y personalizados",
  3: "Pagos personalizados",
};

// Renta
const renta = {
  0: "Sin renta",
  1: "Renta tradicional",
  2: "Renta corta",
};

const AccordionItem = ({
  question,
  answer,
  isOpen,
  index,
  toggle,
  bgColor,
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "flex w-full items-center justify-between p-4 text-left text-white transition-colors",
          isOpen ? "bg-invertiria-2 rounded-t-xl" : `${bgColor} rounded-xl`
        )}
        onClick={() => toggle(index)}
      >
        <span className="font-medium text-lg">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <Plus size={20} />}
      </button>
      {isOpen && (
        <div className="bg-gray-100 p-4 text-black rounded-b-xl">
          <div className="text-sm sm:text-base">{answer}</div>
        </div>
      )}
    </div>
  );
};

const InfoAnalysisAccordion = ({ modelation }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqItems = [
    {
      question: "Datos Generales del Proyecto y del Inmueble",
      answer:
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:px-10 px-2 py-8 rounded-3xl">
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <ChartNoAxesCombined size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información del Análisis</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Nombre del análisis:</strong> {modelation.titulo_modelacion}</p>
              <p><strong>Vigencia de la inversión:</strong> {modelation.vigencia ? "Actual" : "Ya realizada"}</p>
              <p><strong>Titularidad:</strong> {modelation.titularidad ? modelation.titularidad : "No aplica"}</p>
              <p><strong>Modelo de negocio:</strong> {modelation.modelo_de_negocio}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <MapPinHouse size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información del Proyecto</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Nombre del proyecto:</strong> {modelation.nombre_del_proyecto}</p>
              <p><strong>Ubicación:</strong> {modelation.pais.nombre}, {modelation.ciudad.nombre}, {modelation.zona}, {modelation.subzona}</p>
              <p><strong>Etapa del proyecto:</strong> {modelation.etapa_proyecto ? modelation.etapa_proyecto : "No aplica"}</p>
              <p><strong>VIS:</strong> {modelation.vivienda_vis ? "Si" : "No"}</p>
              <p><strong>Estrato:</strong> {modelation.estrato ? modelation.estrato : "No aplica"}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <House size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información del Inmueble</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Tipo de inmueble:</strong> {modelation.tipo_inmueble}</p>
              <p><strong>Condición del inmueble:</strong> {modelation.estado_inmueble}</p>
              <p><strong>Edad de la propiedad:</strong> {modelation.edad_propiedad ? modelation.edad_propiedad + " años" : "No aplica"}</p>
              <p><strong>Área del inmueble:</strong> {modelation.area_inmueble ? modelation.area_inmueble + "m²" : "No aplica"}</p>
              <p><strong>Parqueaderos:</strong> {modelation.parqueaderos ? modelation.parqueaderos : "No aplica"}</p>
            </div>
          </div>
        </div>,
      bgColor: "bg-invertiria-2/50",
    },
    {
      question: "Condiciones Financieras y de Crédito",
      answer:
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:px-10 px-2 py-8 rounded-3xl">
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <CircleDollarSign size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información Financiera</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Precio de compra:</strong> {parsePrice(modelation.precio_de_compra)}</p>
              <p><strong>Precio de mercado:</strong> {modelation.precio_de_mercado ? parsePrice(modelation.precio_de_mercado) : "No aplica"}</p>
              <p><strong>Precio de venta:</strong> {modelation.precio_venta ? parsePrice(modelation.precio_venta) : "No aplica"}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <HandCoins size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información de Pagos</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Separación:</strong> {modelation.separacion ? parsePrice(modelation.separacion) : "No aplica"}</p>
              <p><strong>Forma de pago cuota inicial:</strong> {modelation.forma_pago_cuota_inicial ? formaPagoCuotaInicial[modelation.forma_pago_cuota_inicial] || "No aplica" : "No aplica"}</p>
              <p><strong>Porcentaje de cuota inicial:</strong> {modelation.cuota_inicial ? modelation.cuota_inicial + "%" : "No aplica"}</p>
              <p><strong>Fecha inicio cuota inicial:</strong> {modelation.inicial_fecha_inicio_pago ? modelation.inicial_fecha_inicio_pago.slice(0, 7) : "No aplica"}</p>
              <p><strong>Fecha fin cuota inicial:</strong> {modelation.inicial_fecha_fin_pago ? modelation.inicial_fecha_fin_pago.slice(0, 7) : "No aplica"}</p>
              <p><strong>Número de pagos personalizados:</strong> {modelation.pagos_personalizados ? modelation.pagos_personalizados : "No aplica"}</p>
              <p><strong>Fecha de pagos personalizados:</strong> {modelation.fecha_pagos_personalizados ? modelation.fecha_pagos_personalizados.join(', ') : "No aplica"}</p>
              <p><strong>Valor de pagos personalizados:</strong> {modelation.valor_pagos_personalizados ? modelation.valor_pagos_personalizados.map(valor => parsePrice(valor)).join(', ') : "No aplica"}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <Landmark size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información del Crédito</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Crédito hipotecario:</strong> {modelation.credito_hipotecario ? "Si" : "No"}</p>
              <p><strong>Tasa de interés efectiva anual:</strong> {modelation.tasa_de_interes ? modelation.tasa_de_interes + "%" : "No aplica"}</p>
              <p><strong>Fecha inicio crédito:</strong> {modelation.credito_fecha_inicio_pago ? modelation.credito_fecha_inicio_pago.slice(0, 7) : "No aplica"}</p>
              <p><strong>Fecha fin crédito:</strong> {modelation.credito_fecha_fin_pago ? modelation.credito_fecha_fin_pago.slice(0, 7) : "No aplica"}</p>
            </div>
          </div>
        </div>,
      bgColor: "bg-invertiria-2/50",
    },
    {
      question: "Condiciones de Inversión y Alquiler",
      answer:
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:px-10 px-2 py-8 rounded-3xl">
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <Timer size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Cronograma de Inversión</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Fecha inicio ventas:</strong> {modelation.fecha_inicio_ventas ? modelation.fecha_inicio_ventas.slice(0, 7) : "No aplica"}</p>
              <p><strong>Fecha de compra:</strong> {modelation.fecha_compra.slice(0, 7)}</p>
              <p><strong>Fecha entrega del inmueble:</strong> {modelation.fecha_prevista_entrega ? modelation.fecha_prevista_entrega.slice(0, 7) : "No aplica"}</p>
              <p><strong>Fecha prevista de venta:</strong> {modelation.fecha_prevista_venta ? modelation.fecha_prevista_venta.slice(0, 7) : "No aplica"}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <Banknote size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Información de Alquiler</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Renta:</strong> {modelation.renta ? renta[modelation.renta] || "No" : "No"}</p>
              <p><strong>Valor cánon de arrendamiento:</strong> {modelation.canon_de_arrendamiento ? parsePrice(modelation.canon_de_arrendamiento) : "No aplica"}</p>
              <p><strong>Valor noche:</strong> {modelation.valor_noche ? parsePrice(modelation.valor_noche) : "No aplica"}</p>
              <p><strong>Tarifa mensual:</strong> {modelation.tarifa_mensual ? parsePrice(modelation.tarifa_mensual) : "No aplica"}</p>
              <p><strong>Porcentaje de ocupacion media:</strong> {modelation.ocupacion_media ? modelation.ocupacion_media + "%" : "No aplica"}</p>
              <p><strong>Operador:</strong> {modelation.operador ? "Si" : "No"}</p>
              <p><strong>Porcentaje de operador:</strong> {modelation.porcentaje_del_operador ? modelation.porcentaje_del_operador + "%" : "No aplica"}</p>
              <p><strong>Inmobiliaria:</strong> {modelation.inmobiliaria ? "Si" : "No"}</p>
              <p><strong>Porcentaje de inmobiliaria:</strong> {modelation.porcentaje_inmobiliaria ? modelation.porcentaje_inmobiliaria + "%" : "No aplica"}</p>
            </div>
          </div>
          <div className="rounded-3xl p-10 bg-white border-2 border-gray-200">
            <div className="flex gap-3 items-center mb-6">
              <HousePlus size={24} className="text-invertiria-2" />
              <p className="text-gray-800 text-xl font-medium">Otros</p>
            </div>
            <div className="text-gray-800 text-sm font-medium leading-6 mb-2 space-y-2">
              <p><strong>Cesión de derechos:</strong> {modelation.cesion_de_derechos ? "Si" : "No"}</p>
              <p><strong>Comisión por venta:</strong> {modelation.comision_vendedor ? "Si" : "No"}</p>
              <p><strong>Porcentaje de comisión:</strong> {modelation.porcentaje_comision_vendedor ? modelation.porcentaje_comision_vendedor + "%" : "No aplica"}</p>
              <p><strong>Pago de administración:</strong> {modelation.administracion ? "Si" : "No"}</p>
              <p><strong>Valor de administración:</strong> {modelation.valor_administracion ? parsePrice(modelation.valor_administracion) : "No aplica"}</p>
              <p><strong>Valor de predial:</strong> {modelation.valor_predial ? parsePrice(modelation.valor_predial) : "No aplica"}</p>
              <p><strong>Requiere mejoras:</strong> {modelation.mejoras ? "Si" : "No"}</p>
              <p><strong>Valor de mejoras:</strong> {modelation.valor_mejoras ? parsePrice(modelation.valor_mejoras) : "No aplica"}</p>
              <p><strong>Requiere licencia de construcción:</strong> {modelation.licencia_construccion ? "Si" : "No"}</p>
              <p><strong>Valor licencia de construcción:</strong> {modelation.costos_licencias ? parsePrice(modelation.costos_licencias) : "No aplica"}</p>
            </div>
          </div>
        </div>,
      bgColor: "bg-invertiria-2/50",
    },
  ];

  return (
    <div className="w-full mx-auto sm:my-5">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          index={index}
          toggle={toggle}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
};

export default InfoAnalysisAccordion