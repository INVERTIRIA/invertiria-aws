import { Container } from "../components/design/Container";
import FadeIn from "../components/design/FadeIn";

const valores = [
  {
    name: 'Transparencia Total',
    description:
      'Todos nuestros análisis están basados en datos verificables y metodologías probadas. Sin letra pequeña, sin sorpresas.',
    icon:
      '/assets/svg/dartboard.svg',
  },
  {
    name: 'Decisiones Basadas en Datos',
    description:
      'Creemos que las mejores inversiones se hacen con números, no con emociones. Cada recomendación tiene fundamento analítico.',
    icon:
      '/assets/svg/data-report.svg',
  },
  {
    name: 'Compromiso con el Éxito',
    description:
      'Tu éxito es nuestro éxito. Proporcionamos seguimiento y actualizaciones continuas para asegurar que tus inversiones cumplan las proyecciones.',
    icon:
      '/assets/svg/relationship.svg',
  },
  {
    name: 'Innovación Constante',
    description:
      'Actualizamos constantemente nuestros algoritmos y base de datos para reflejar las condiciones reales del mercado.',
    icon:
      '/assets/svg/innovation.svg',
  }
]

const equipo = [
  {
    name: 'Juan Londoño - Fundador y CEO',
    role: 'Inversionista inmobiliario con más de 17 años de experiencia en el mercado colombiano. Ha analizado y gestionado inversiones por más de 100 millones USD en proyectos residenciales, comerciales y turísticos.',
    imageUrl:
      '/assets/images/juan-londoño.webp',
  },
  {
    name: 'Nuestro Enfoque Técnico',
    role: 'Combinamos algoritmos de machine learning con metodologías financieras tradicionales, utilizando datos en tiempo real del mercado inmobiliario colombiano.',
    imageUrl:
      '/assets/images/juan-londoño.webp',
  }
]

const About = () => {
  return (
    <Container
      className={"w-full items-center z-0"}
      classNameParent={"relative z-0 animate-fade-in"}
    >
      {/* Nuestra historia */}
      <div className="mx-auto max-w-7xl px-6 pt-25 pb-32 lg:px-8 lg:pt-15">
        <div className="mx-auto max-w-7xl lg:mx-0 lg:flex lg:max-w-none lg:items-center gap-10">
          <div className="relative w-full">
            <h1 className="h2 lg:text-7xl pb-10 font-bold">
              Nuestra Historia
            </h1>
            <p className="sm:text-lg max-w-2xl text-gray-700">
              <strong className="text-invertiria-2">InverTIRía</strong> nace de una necesidad real: democratizar el conocimiento inmobiliario experto y hacer que las mejores decisiones de inversión estén al alcance de todos.
            </p>
            <br />
            <p className="sm:text-lg max-w-2xl text-gray-700">
              Fundada por Juan Londoño, inversionista inmobiliario con más de 17 años de experiencia, <strong className="text-invertiria-2">InverTIRía</strong> surge después de analizar cientos de proyectos y identificar que la mayoría de inversionistas toman decisiones basadas en emociones en lugar de datos sólidos.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              alt=""
              src="/assets/images/nuestra-historia.webp"
              className="lg:w-full md:w-3/4 w-full lg:mt-0 mt-5 rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mision */}
      <FadeIn>
        <div className="flex flex-col lg:flex-row gap-10 mx-auto max-w-7xl px-6 lg:px-8 items-center justify-center">
          <div className="relative w-full">
            <h2 className="h2">Nuestra Misión</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="sm:text-lg max-w-xl text-gray-700">
                  Transformar la forma en que las personas invierten en bienes raíces mediante tecnología avanzada que combina inteligencia artificial con experiencia real, proporcionando análisis financieros precisos y herramientas de toma de decisiones que antes solo estaban disponibles para inversionistas institucionales.
                </p>
              </div>
            </div>
          </div>
          <div className="flex basis-3/4 justify-center lg:justify-end">
            <img
              alt=""
              src="/assets/images/mision.jpg"
              className="w-full lg:w-[90%] aspect-square object-cover rounded-3xl"
            />
          </div>
        </div>
      </FadeIn>

      {/* Vision */}
      <FadeIn>
        <div className="flex flex-col lg:flex-row gap-10 mx-auto mt-20 lg:mt-40 max-w-7xl px-6 lg:px-8 items-center justify-center">
          <div className="flex basis-3/4 justify-center lg:justify-start order-2 lg:order-1">
            <img
              alt=""
              src="/assets/images/vision.jpg"
              className="w-full lg:w-[90%] aspect-square object-cover rounded-3xl"
            />
          </div>
          <div className="relative w-full  order-1 lg:order-2">
            <h2 className="h2">Nuestra Visión</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="sm:text-lg max-w-2xl text-gray-700">
                  Ser la plataforma líder en análisis inmobiliario inteligente en Colombia y Latinoamérica, reconocida por democratizar el acceso a inversiones inmobiliarias rentables y sostenibles, construyendo un ecosistema donde cada persona pueda tomar decisiones de inversión con la confianza que dan los datos y la experiencia.              </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Nuestros valores */}
      <FadeIn>
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="h2">Nuestros Valores</h2>
          </div>
          <div className="mx-auto mt-24 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-18 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {valores.map((value) => (
              <div key={value.name} className="flex flex-row gap-10">
                <img
                  alt=""
                  src={value.icon}
                  className="mx-auto size-20"
                />
                <div>
                  <p className="font-semibold text-lg mb-3">{value.name}</p>
                  <p className="mt-1 text-gray-700 text-md">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* El equipo */}
      <FadeIn>
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8 pb-40">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="h2">Nuestro Equipo</h2>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 lg:gap-x-36 gap-x-20 gap-y-16 text-center md:grid-cols-2 xl:grid-cols-3 lg:mx-0 lg:max-w-none"
          >
            {equipo.map((person) => (
              <li key={person.name} className="flex flex-col items-center">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="aspect-2/3 w-64 object-cover mx-auto rounded-3xl"
                />
                <h3 className="font-semibold text-lg mb-3 mt-3">{person.name}</h3>
                <p className="mt-1 text-gray-700 text-md px-5">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Container>
  )
}

export default About