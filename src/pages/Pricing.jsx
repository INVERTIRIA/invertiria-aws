import { Check } from "lucide-react";
import { Container } from "../components/design/Container";
import { Button } from "@/components/ui/button"
import { Link } from "react-router";

const Pricing = () => {

  const paquetes = [
    {
      name: 'Inicial',
      id: 'tier-inicial',
      href: '#',
      price: '$5',
      tokens: '12',
      description: 'Empieza en la plataforma de InverTIRía.',
      features: ['Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'],
      featured: false,
    },
    {
      name: 'Crecimiento',
      id: 'tier-crecimiento',
      href: '#',
      price: '$12',
      tokens: '24',
      description: 'Aumenta la capacidad de tu inversión.',
      features: [
        'Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'
      ],
      featured: true,
    },
    {
      name: 'Profesional',
      id: 'tier-profesional',
      href: '#',
      price: '$20',
      tokens: '50',
      description: 'Para inversionistas profesionales.',
      features: [
        'Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'
      ],
      featured: false,
    },
  ]

  const planes = [
    {
      name: 'Explorador',
      id: 'tier-explorador',
      href: '#',
      price: '$15',
      tokens: '50',
      free_tokens: '5',
      description: 'Perfecto para empezar tu inversión.',
      features: ['Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'],
      featured: false,
    },
    {
      name: 'Inversionista',
      id: 'tier-inversionista',
      href: '#',
      price: '$25',
      tokens: '100',
      free_tokens: '10',
      description: 'Para inverionistas activos y experimentados.',
      features: [
        'Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'
      ],
      featured: true,
    },
    {
      name: 'Experto',
      id: 'tier-experto',
      href: '#',
      price: '$40',
      tokens: '200',
      free_tokens: '20',
      description: 'Para inversionistas profesionales y expertos.',
      features: [
        'Análisis básicos de rentabilidad', 'Cálculos TIR, ROI, VPN'
      ],
      featured: false,
    },
  ]

  return (
    <Container
      className={"w-full items-center z-0"}
      classNameParent={"relative z-0"}
    >
      <div className="mx-auto max-w-7xl pb-20">

        {/* Paquetes */}
        <div className="relative px-6 pt-25 sm:pt-15 lg:px-8 lg:py-24 ">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold sm:text-6xl">
              Paquetes de tokens
            </h2>
            <p className="sm:text-lg max-w-2xl text-gray-700 mt-10 mx-auto">
              Compra un paquete de tokens a medida que lo necesites
            </p>
          </div>
          <div className="isolate mx-auto mt-15 grid max-w-md grid-cols-1 gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {paquetes.map((tier) => (
              <div
                key={tier.id}
                data-featured={tier.featured ? 'true' : undefined}
                className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:ring-2 data-featured:ring-invertiria-2 xl:p-10 xl:pb-20 data-featured:lg:scale-105"
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={`tier-${tier.id}`}
                    className="text-lg/8 font-semibold text-gray-900 group-data-featured/tier:text-invertiria-2"
                  >
                    {tier.name}
                  </h3>
                  <p className="rounded-full bg-invertiria-1/10 px-2.5 py-1 text-xs/5 font-semibold text-invertiria-2 group-not-data-featured/tier:hidden">
                    Más popular
                  </p>
                </div>
                <p className="mt-4 text-sm/6 text-gray-700">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-semibold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">/{tier.tokens} tokens</span>
                </p>
                <Button variant={tier.featured ? "theme" : "theme_outline"} className="w-full flex flex-row gap-2 mt-8" asChild>
                  <Link to={tier.href}>
                    Comprar
                  </Link>
                </Button>
                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-700 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check aria-hidden="true" className="h-6 w-5 flex-none text-invertiria-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Planes */}
        <div className="relative px-6 pt-25 sm:pt-15 lg:px-8 lg:py-24 ">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold sm:text-6xl">
              Paga por suscripción
            </h2>
            <p className="sm:text-lg max-w-2xl text-gray-700 mt-10 mx-auto">
              Suscripción mensual que añade tokens a tu cuenta cada mes.
            </p>
          </div>
          <div className="isolate mx-auto mt-15 grid max-w-md grid-cols-1 gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {planes.map((tier) => (
              <div
                key={tier.id}
                data-featured={tier.featured ? 'true' : undefined}
                className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:ring-2 data-featured:ring-invertiria-2 xl:p-10 xl:pb-20 data-featured:lg:scale-105"
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={`tier-${tier.id}`}
                    className="text-lg/8 font-semibold text-gray-900 group-data-featured/tier:text-invertiria-2"
                  >
                    {tier.name}
                  </h3>
                  <p className="rounded-full bg-invertiria-1/10 px-2.5 py-1 text-xs/5 font-semibold text-invertiria-2 group-not-data-featured/tier:hidden">
                    Más popular
                  </p>
                </div>
                <p className="mt-4 text-sm/6 text-gray-700">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-semibold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">/{tier.tokens} tokens</span>
                </p>
                <p className="mt-3 flex items-baseline gap-x-1">
                  <span className="text-sm/6 font-medium text-invertiria-2">
                    Obtienes {tier.free_tokens} tokens gratis
                  </span>
                </p>
                <Button variant={tier.featured ? "theme" : "theme_outline"} className="w-full flex flex-row gap-2 mt-8" asChild>
                  <Link to={tier.href}>
                    Suscribirse
                  </Link>
                </Button>
                <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-700 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check aria-hidden="true" className="h-6 w-5 flex-none text-invertiria-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Pricing