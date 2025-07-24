import { Link } from "react-router";
import { ArrowUpRightIcon } from "lucide-react";
import { Container } from "../components/design/Container";
import CarouselReviews from "../components/design/CarouselReviews";
import FaqAccordion from "../components/FaqAccordion";
import {
  ComprarVender,
  Engorde,
  Flipping,
  RentaCorta,
  RentaTradicional,
} from "../components/design/Icons";

const features = [
  {
    title: (
      <h2 className="sm:text-xl text-center">
        Años de experiencia en inversiones inmobiliarias
      </h2>
    ),
    svg: (
      <div className="h-[72px] flex justify-center items-center">
        <span className="text-6xl font-semibold text-[#D93F12]">+15</span>
      </div>
    ),
  },
  {
    title: (
      <h2 className="sm:text-xl text-center">
        Datos actualizados del mercado colombiano en tiempo real
      </h2>
    ),
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="82"
        height="82"
        viewBox="0 0 82 82"
        fill="none"
      >
        <path
          d="M20.375 48.4437C19.2782 48.4437 18.7298 48.4436 18.2853 48.6872C17.9187 48.8881 17.5774 49.2653 17.4141 49.6502C17.2162 50.1168 17.266 50.6132 17.3656 51.6061C17.8821 56.7537 19.6537 61.7138 22.5458 66.0421C26.0264 71.2512 30.9736 75.3113 36.7617 77.7088C42.5498 80.1063 48.9188 80.7336 55.0635 79.5113C61.2081 78.2891 66.8522 75.2722 71.2823 70.8422C75.7123 66.4122 78.7292 60.768 79.9514 54.6234C81.1736 48.4788 80.5463 42.1097 78.1488 36.3216C75.7513 30.5335 71.6913 25.5864 66.4821 22.1057C62.1539 19.2137 57.1938 17.442 52.0462 16.9255C51.0533 16.8259 50.5568 16.7761 50.0903 16.9741C49.7054 17.1374 49.3281 17.4786 49.1272 17.8453C48.8837 18.2898 48.8837 18.8382 48.8837 19.9349V45.276C48.8837 46.3848 48.8837 46.9392 48.6679 47.3627C48.4781 47.7352 48.1752 48.0381 47.8027 48.2279C47.3792 48.4437 46.8248 48.4437 45.7161 48.4437H20.375Z"
          stroke="#D93F12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33.0455 4.09678C33.0455 2.99997 33.0455 2.45156 32.802 2.00709C32.6011 1.64043 32.2239 1.29915 31.839 1.13586C31.3725 0.937908 30.876 0.987706 29.8831 1.0873C22.6434 1.81348 15.8373 5.01658 10.647 10.2069C5.45664 15.3973 2.25354 22.2034 1.52736 29.443C1.42776 30.4359 1.37796 30.9324 1.57591 31.399C1.73921 31.7838 2.08048 32.1611 2.44714 32.3619C2.89161 32.6055 3.44002 32.6055 4.53683 32.6055L29.8779 32.6055C30.9867 32.6055 31.5411 32.6055 31.9646 32.3897C32.3371 32.1999 32.6399 31.897 32.8298 31.5245C33.0455 31.101 33.0455 30.5466 33.0455 29.4378V4.09678Z"
          stroke="#D93F12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: (
      <h2 className="sm:text-xl text-center">
        Metodología probada con casos reales de éxito
      </h2>
    ),
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="76"
        viewBox="0 0 54 76"
        fill="none"
      >
        <path
          d="M27 58.35H27.0364M13.1571 75H40.8429C44.9232 75 46.9634 75 48.5219 74.1934C49.8928 73.484 51.0074 72.3519 51.7059 70.9595C52.5 69.3766 52.5 67.3044 52.5 63.16V12.84C52.5 8.69561 52.5 6.62342 51.7059 5.04047C51.0074 3.64807 49.8928 2.51601 48.5219 1.80655C46.9634 1 44.9232 1 40.8429 1H13.1571C9.07676 1 7.03657 1 5.47807 1.80655C4.10717 2.51601 2.9926 3.64807 2.2941 5.04047C1.5 6.62342 1.5 8.69561 1.5 12.84V63.16C1.5 67.3044 1.5 69.3766 2.2941 70.9595C2.9926 72.3519 4.10717 73.484 5.47807 74.1934C7.03657 75 9.07676 75 13.1571 75ZM28.8214 58.35C28.8214 59.3717 28.0059 60.2 27 60.2C25.9941 60.2 25.1786 59.3717 25.1786 58.35C25.1786 57.3283 25.9941 56.5 27 56.5C28.0059 56.5 28.8214 57.3283 28.8214 58.35Z"
          stroke="#D93F12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: (
      <h2 className="sm:text-xl text-center">
        Análisis realizados exitosamente
      </h2>
    ),
    svg: (
      <div className="h-[72px] flex justify-center items-center">
        <span className="text-6xl font-semibold text-[#D93F12]">+500</span>
      </div>
    ),
  },
];

const HomePage = () => {
  return (
    <>
      {/* Seccion Principal */}
      <Container
        className={"w-full flex gap-14 items-center my-20 xl:my-60 z-0"}
        classNameParent={"relative z-0"}
      >
        <div className="lg:w-1/2 flex flex-col gap-10 xl:-mt-10">
          <h1 className="h2 lg:text-7xl font-bold">
          <h1 className="h2 lg:text-7xl font-bold">
            Invierte en Bienes Raíces con Inteligencia Artificial
          </h1>
          <p className="sm:text-xl max-w-xl">
            La plataforma que combina más de 17 años de experiencia inmobiliaria
            con algoritmos avanzados de IA para analizar, evaluar y optimizar
            tus inversiones en tiempo real.{" "}
            {/* <br className="hidden sm:block" />
            toma decisiones informadas y maximiza tu rentabilidad. */}
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between max-w-2xl">
            <Link
              to="/analysis/create"
              className="w-full group bg-invertiria-2 border border-invertiria-2 py-2.5 px-5 rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-white"
            >
              <span className="group-hover:text-invertiria-2 uppercase text-sm text-white">
                Analizar mi Primera Inversión
              </span>
              <ArrowUpRightIcon
                strokeWidth={1}
                className="text-white size-6 group-hover:stroke-invertiria-2"
              />
            </Link>
            <Link
              to="/analysis/7cff7a9b-21d7-44e4-857c-9baa947649ed"
              className="w-full group bg-white border border-black py-2.5 px-5 rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-invertiria-2 hover:border-invertiria-2"
            >
              <span className="group-hover:text-white uppercase text-sm">
                Ver Demo Gratuito
              </span>
              <ArrowUpRightIcon
                strokeWidth={1}
                className="text-black size-6 group-hover:stroke-white"
              />
            </Link>
          </div>
        </div>
        <div className="hidden absolute right-0 lg:flex items-center gap-4 w-1/2">
          <div className="flex items-center gap-4 w-full relative">
            <div className="absolute inset-x-0 z-10 flex flex-col gap-1">
              <img
                src="/assets/svg/IA.svg"
                alt="Invertiria IA"
                className="size-96"
              />
            </div>
            <div className="size-full">
              <img
                className="object-cover size-full "
                src="/assets/images/home/banner-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </Container>
      <Container classNameParent={"pt-10 z-0"}>
        <div className="w-full h-0.5 bg-orange-500" />
      </Container>
      {/* Seccion Secundaria */}
      <div className="my-20 relative w-full lg:h-screen">
        {/* Video como fondo */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/videos/home.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute -top-40 z-10 w-full h-[444px] bg-orange-600/15 blur-[55.56px]" />
        {/* Contenido encima del video */}
        <Container
          classNameParent={
            "relative z-10 flex items-center justify-center h-full overflow-hidden bg-black/15"
          }
        >
          <div className="py-20 grid lg:grid-cols-2 gap-8 grid-cols-1">
            <div className="flex flex-col items-center justify-center text-center gap-10 bg-white/80 px-20 py-10 rounded-4xl">
              <h2 className="h2">Respaldado por Experiencia Real</h2>
              <p className="sm:text-xl max-w-2xl text-pretty">
                Utilizamos tecnología avanzada para optimizar el mercado
                inmobiliario y transformar tus decisiones financieras.
              </p>
            </div>
            <div className="grid 2xs:grid-cols-2 gap-x-4 gap-y-8">
              {features.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white/80 p-10 rounded-4xl flex flex-col gap-4 items-center"
                  >
                    {feature.svg}
                    {feature.title}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
      {/* Seccion Terciaria */}
      <Container
        className={"flex flex-col gap-10 md:gap-20 items-center my-20 sm:my-40"}
      >
        <div className="w-full flex flex-col items-center text-center gap-9">
          <h2 className="h2 !max-w-none">La nueva era de las inversiones</h2>
          <p className="sm:text-2xl text-gray-700">
            Toma decisiones informadas con análisis financieros precisos,
            proyecciones de rentabilidad confiables y evaluaciones de riesgo
            personalizadas para tu perfil de inversionista.
          </p>
          {/* <p className="text-gray-600 sm:text-xl font-semibold">
            Toma decisiones informadas con análisis financieros precisos, proyecciones de rentabilidad confiables y evaluaciones de riesgo personalizadas para tu perfil de inversionista.
          </p> */}
        </div>
        <div className="flex flex-col md:flex-row items-center md:h-[400px] gap-8">
          <div className="w-full xl:w-80 h-full bg-zinc-100/50 border-4 border-orange-700/50 flex flex-col gap-4 rounded-4xl p-4">
            <img
              className="w-full md:h-40 rounded-[30px]"
              src="/assets/images/home/feature-1.png"
            />
            <h3 className="text-xl font-semibold max-w-3">
              Proyecciones Precisas
            </h3>
            <p className="text-sm">
              Visualiza flujos de caja detallados mes a mes y proyecciones de
              rentabilidad basadas en datos reales del mercado colombiano.
            </p>
          </div>
          <div className="w-full xl:w-[400.07px] h-full bg-zinc-100/50 border-4 border-invertiria-2 flex flex-col gap-4 rounded-4xl p-4">
            <img
              className="w-full md:h-40 rounded-[30px]"
              src="/assets/images/home/feature-2.png"
            />
            <h3 className="text-xl font-semibold">Análisis Inteligente</h3>
            <p className="text-sm">
              Obtén TIR, ROI, VPN y otros indicadores clave calculados
              automáticamente con la precisión de un experto en segundos.
            </p>
            <Link
              to={"/analysis/create"}
              className="xl:w-fit group bg-invertiria-2 border border-invertiria-2 py-2 lg:px-14 rounded-[30px] flex justify-center items-center gap-1 hover:bg-white"
            >
              <span className="group-hover:text-invertiria-2 uppercase text-sm text-white">
                VER MÁS
              </span>
              <ArrowUpRightIcon
                strokeWidth={1}
                className="text-white size-6 group-hover:stroke-invertiria-2"
              />
            </Link>
          </div>
          <div className="w-full xl:w-80 h-full bg-zinc-100/50 border-4 border-orange-700/50 flex flex-col gap-4 rounded-4xl p-4">
            <img
              className="w-full h-40 rounded-[30px]"
              src="/assets/images/home/feature-4.jpg"
            />
            <h3 className="text-xl font-semibold">Decisiones Rápidas</h3>
            <p className="text-sm">
              Compara múltiples opciones de inversión simultáneamente y
              identifica las mejores oportunidades para tu perfil.
            </p>
          </div>
          <div className="w-full xl:w-80 h-full bg-zinc-100/50 border-4 border-orange-700/50 flex flex-col gap-4 rounded-4xl p-4">
            <img
              className="w-full h-40 rounded-[30px]"
              src="/assets/images/home/feature-3.png"
            />
            <h3 className="text-xl font-semibold">Gestión de Riesgos</h3>
            <p className="text-sm">
              Evalúa escenarios múltiples y factores de riesgo para cada tipo de
              inversión con análisis de sensibilidad.
            </p>
          </div>
        </div>
      </Container>
      {/* Seccion Cuarta */}
      <div className="w-full py-20 md:py-50 relative overflow-hidden">
        <div className="w-[1757.01px] h-[1616.88px] left-[-1805px] top-[1081.40px] absolute origin-top-left rotate-[-66.10deg] bg-orange-600/20 blur-[175px]" />
        <div className="w-[5261.45px] h-[842.15px] left-[820.74px] top-[337.71px] absolute origin-top-left rotate-[-66.10deg] bg-orange-600/20 blur-[175px]" />
        <Container
          classNameParent={
            "relative z-10 flex items-center justify-center w-full h-full"
          }
          className={"w-full"}
        >
          <div className="px-5 xs:px-10 xl:px-30 w-full flex flex-col lg:flex-row items-center justify-between text-center gap-5 bg-white rounded-4xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-full lg:flex-1 pt-10 sm:py-10 flex flex-col items-center lg:items-start text-left gap-8">
              <h2 className="h2 text-center max-w-none lg:text-left lg:max-w-lg">
                Invertir nunca{" "}
                <span className="text-invertiria-2">fue tan Simple</span>
              </h2>
              <Link
                to={"/analysis/create"}
                className="w-full sm:w-1/2 lg:w-fit group bg-invertiria-2 border border-invertiria-2 py-2 lg:px-14 rounded-[30px] flex justify-center items-center gap-1 hover:bg-white"
              >
                <span className="group-hover:text-invertiria-2 uppercase text-sm text-white">
                  EMPIEZA AHORA
                </span>
                <ArrowUpRightIcon
                  strokeWidth={1}
                  className="text-white size-6 group-hover:stroke-invertiria-2"
                />
              </Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="235"
              height="375"
              viewBox="0 0 235 375"
              fill="none"
              className="hidden lg:block"
            >
              <path
                d="M151.209 0.838379H98.2377L0 374.161H53.1808L151.209 0.838379Z"
                fill="url(#paint0_linear_463_5268)"
              />
              <path
                d="M235 0.838379H182.029L83.791 374.161H136.762L235 0.838379Z"
                fill="url(#paint1_linear_463_5268)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_463_5268"
                  x1="149.024"
                  y1="-82.3188"
                  x2="-74.3121"
                  y2="219.142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_463_5268"
                  x1="149.024"
                  y1="-82.3188"
                  x2="-74.3121"
                  y2="219.142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                </linearGradient>
              </defs>
            </svg>
            <div className="pb-10 lg:pb-0 flex-1 flex flex-col items-center text-left gap-8">
              <div className="flex items-center gap-6">
                <span className="text-orange-500/50 text-3xl xs:text-5xl xl:text-6xl font-bold">
                  01
                </span>
                <span className="text-orange-700 text-5xl xs:text-7xl xl:text-8xl font-bold">
                  02
                </span>
                <span className="text-orange-500/50 text-4xl xs:text-6xl xl:text-7xl font-bold">
                  03
                </span>
                <span className="text-orange-500/50 text-2xl xs:text-4xl xl:text-5xl font-bold">
                  04
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container classNameParent={"mt-20 z-0"}>
        <div className="w-full h-0.5 bg-orange-500" />
      </Container>
      {/* Seccion Nueva Modelos de Negocio */}
      <Container
        classNameParent={"mt-20 py-10 sm:py-20"}
        className={"flex flex-col gap-10 md:gap-20 items-center"}
      >
        <div className="w-full flex flex-col items-center text-center gap-9">
          <h2 className="h2 !max-w-[100%] sm:-mb-10 sm:mt-10 my-10">Todos los Modelos de Inversión Inmobiliaria</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:h-[400px] gap-8 text-center max-sm:w-[66%]">
          <div className="w-full xl:w-100 h-64 items-center justify-center bg-white border-1 border-invertiria-2 flex flex-col gap-4 rounded-2xl p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-20 h-20 flex items-center justify-center">
              <ComprarVender className="text-invertiria-2 size-16" />
            </div>
            <h3 className="text-xl font-semibold">
              Comprar para Vender
            </h3>
            <p className="text-sm text-gray-700">
              Optimización de márgenes y timing
            </p>
          </div>
          <div className="w-full xl:w-100 h-64 items-center justify-center md:mt-10 bg-white border-1 border-invertiria-2 flex flex-col gap-4 rounded-2xl p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-20 h-20 flex items-center justify-center">
              <RentaTradicional className="text-invertiria-2 size-16" />
            </div>
            <h3 className="text-xl font-semibold ">
              Renta Tradicional
            </h3>
            <p className="text-sm text-gray-700">
              Evaluación de ingresos por arrendamiento
            </p>
          </div>
          <div className="w-full xl:w-100 h-64 items-center justify-center bg-white border-1 border-invertiria-2 flex flex-col gap-4 rounded-2xl p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-20 h-20 flex items-center justify-center">
              <RentaCorta className="text-invertiria-2 size-16" />
            </div>
            <h3 className="text-xl font-semibold">
              Renta Corta/ Renta Turística 
            </h3>
            <p className="text-sm text-gray-700">
              Análisis especializado para Airbnb y similares
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:h-[400px] gap-8 md:-mt-30 text-center xl:w-full w-[66%]">
          <div className="w-full xl:w-100 h-64 items-center justify-center bg-white border-1 border-invertiria-2 flex flex-col gap-4 rounded-2xl p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-20 h-20 flex items-center justify-center">
              <Flipping className="text-invertiria-2 size-16" />
            </div>
            <h3 className="text-xl font-semibold">
              Flipping
            </h3>
            <p className="text-sm text-gray-700">
              Venta rápida y grandes ganancias
            </p>
          </div>
          <div className="w-full xl:w-100 h-64 items-center justify-center bg-white border-1 border-invertiria-2 flex flex-col gap-4 rounded-2xl p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.20)]">
            <div className="w-20 h-20 flex items-center justify-center">
              <Engorde className="text-invertiria-2 size-16" />
            </div>
            <h3 className="text-xl font-semibold">
              Engorde
            </h3>
            <p className="text-sm">
              Potencial de crecimiento y rentabilidad
            </p>
          </div>
        </div>
      </Container>
      <Container classNameParent={"mt-20 z-0"}>
        <div className="w-full h-0.5 bg-orange-500" />
      </Container>
      {/* Seccion Quinta */}
      <Container
        className={"flex flex-col gap-10 md:gap-20 items-center my-20 sm:my-40"}
      >
        <div className="md:px-10 xl:px-30 w-full grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="flex flex-col items-center md:items-start gap-8">
            <h2 className="h2 text-center max-w-none md:text-left lg:max-w-lg">
              <span className="text-invertiria-2">Elige el plan perfecto</span>{" "}
              para tu perfil de inversionista
            </h2>
            <p className="sm:text-2xl text-gray-700">
              Todos los planes incluyen acceso completo a análisis de IA,
              proyecciones financieras y contenido educativo.
            </p>
            <Link className="w-full sm:w-1/2 lg:w-fit group bg-invertiria-2 border border-invertiria-2 py-2 lg:px-14 rounded-[30px] flex justify-center items-center gap-1 hover:bg-white">
              <span className="group-hover:text-invertiria-2 uppercase text-sm text-white">
                EMPIEZA AHORA
              </span>
              <ArrowUpRightIcon
                strokeWidth={1}
                className="text-white size-6 group-hover:stroke-invertiria-2"
              />
            </Link>
          </div>
          <div className="flex flex-col xs:flex-row lg:flex-col gap-8">
            <div className="ring-1 ring-orange-600/50 flex flex-col-reverse gap-y-4 lg:flex-row justify-between lg:items-center py-8 px-8 gap-2 rounded-2xl bg-[radial-gradient(ellipse_102.80%_132.00%_at_53.52%_-47.46%,_rgba(217,_63,_18,_0.10)_10%,_rgba(217,_63,_18,_0.10)_13%)]">
              <div className="max-w-sm flex flex-col gap-4">
                <h4 className="text-invertiria-2 text-2xl md:text-3xl font-semibold">
                  Paquetes de tokens
                </h4>
                <p className="text-zinc-950 md:text-xl">
                  Compra un paquete de tokens a medida que lo necesites
                </p>
              </div>
              <img
                src="/assets/svg/calculator.svg"
                alt=""
                className="my-auto w-[30%] lg:w-[18%]"
              />
            </div>
            <div className="ring-1 ring-orange-600/50 lg:mx-auto lg:w-[80%] flex flex-col-reverse gap-y-4 lg:flex-row justify-between lg:items-center py-8 px-8 gap-2 rounded-2xl bg-[radial-gradient(ellipse_102.80%_132.00%_at_53.52%_-47.46%,_rgba(217,_63,_18,_0.10)_10%,_rgba(217,_63,_18,_0.10)_13%)]">
              <div className="max-w-sm flex flex-col gap-4">
                <h4 className="text-invertiria-2 text-2xl md:text-3xl font-semibold">
                  Paga por suscripción
                </h4>
                <p className="text-zinc-950 md:text-xl">
                  Suscripción mensual que añade tokens a tu cuenta cada mes.
                </p>
              </div>
              <img
                src="/assets/svg/prime_chart-bar.svg"
                alt="Paga por suscripción"
                className="w-[40%]"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container classNameParent={"lg:pt-10 z-0"}>
        <div className="w-full h-0.5 bg-orange-500" />
      </Container>
      {/* Seccion Sexta */}
      <Container
        classNameParent={"bg-gray-100 mt-20 py-10 sm:py-20"}
        className={"flex flex-col gap-10 md:gap-20 items-center"}
      >
        <div className="w-full flex flex-col items-center text-center gap-8">
          <h2 className="h2 max-w-none lg:text-left">
            Casos de éxito que hablan
          </h2>
          <p className="text-zinc-700 md:text-xl">
            Historias reales que demuestran cómo el análisis preciso y
            decisiones estratégicas pueden marcar la diferencia en los
            resultados financieros.
          </p>
          <CarouselReviews />
        </div>
      </Container>
      {/* Seccion Septima */}
      <Container
        className={"flex flex-col gap-10 md:gap-20 items-center py-20"}
      >
        <div className="w-full px-8 xs:px-14 py-7 rounded-4xl flex items-center gap-4 bg-radial-[at_5%_90%] from-neutral-900 to-orange-700">
          <div className="w-full flex flex-col gap-8">
            <h2 className="text-white h2 text-center max-w-none md:text-left lg:max-w-3xl">
              ¿Listo para tu primera inversión inteligente?
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link
                to="/analysis/create"
                className="w-full sm:w-1/2 lg:w-fit group bg-invertiria-2 border border-invertiria-2 py-2 lg:px-14 rounded-[30px] flex justify-center items-center gap-1 hover:bg-transparent"
              >
                <span className="group-hover:text-invertiria-2 uppercase text-sm text-white">
                  Comenzar Análisis Gratuito
                </span>
                <ArrowUpRightIcon
                  strokeWidth={1}
                  className="text-white size-6 group-hover:stroke-invertiria-2"
                />
              </Link>
              <Link className="w-full sm:w-1/2 lg:w-fit group bg-transparent border border-white py-2 lg:px-14 rounded-[30px] flex justify-center items-center gap-1 hover:bg-invertiria-2 hover:border-invertiria-2">
                <span className="uppercase text-sm text-white">
                  Agendar Demo Personalizado
                </span>
                <ArrowUpRightIcon
                  strokeWidth={1}
                  className="text-white size-6"
                />
              </Link>
            </div>
          </div>
          <img
            src="/assets/svg/layer-1.svg"
            alt="Paga por suscripción"
            className="hidden md:block w-[25%] lg:w-[40%]"
          />
        </div>
      </Container>
      {/* Seccion Octava */}
      <Container
        className={"flex flex-col gap-10 md:gap-20 items-center pb-20 lg:py-20"}
      >
        <div className="w-full grid lg:grid-cols-2 gap-x-4 gap-y-10 items-center">
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h2 className="text-invertiria-2 h2 text-center max-w-none lg:text-left lg:max-w-2xl">
              Preguntas Frecuentes
            </h2>
            <p className="text-center lg:text-left max-w-lg sm:text-2xl text-gray-700">
              ¿Aún tienes dudas? Recibe ayuda personalizada para resolverlas.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
