import { Link } from "react-router";
import { Container } from "./design/Container";
import Logo from "./design/Logo";
import { Instagram, Linkedin, X, Youtube } from "./icons";
import { ArrowRightIcon } from "lucide-react";

const socials = [
  {
    name: "Lindkedin",
    svg: <Linkedin className="text-neutral-300 size-7" />,
  },
  {
    name: "Instagram",
    svg: <Instagram className="text-neutral-300 size-7" />,
  },
  {
    name: "X",
    svg: <X className="text-neutral-300 size-7" />,
  },
  {
    name: "Youtube",
    svg: <Youtube className="text-neutral-300 size-7" />,
  },
];

const explore = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Beneficios",
    link: "/inversiones",
  },
  {
    name: "Nivel de Acceso",
    link: "/inversiones",
  },
  {
    name: "Casos de Éxito",
    link: "/inversiones",
  },
];

const help = [
  {
    name: "Preguntas Frecuentes",
    link: "/inversiones",
  },
  {
    name: "Contacto",
    link: "/inversiones",
  },
  {
    name: "Términos y Condiciones",
    link: "/inversiones",
  },
];

// Footer
function Footer() {
  return (
    <footer className="flex flex-col items-center">
      <Container
        classNameParent={"w-full bg-neutral-800 py-12"}
        //className={"flex flex-col md:flex-row gap-4 justify-between"}
        className={
          "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 justify-between"
        }
      >
        <div className="flex flex-col gap-5 items-center sm:items-start">
          <h2 className="text-invertiria-2 md:text-xl font-medium">Síguenos</h2>
          <p className="text-white text-xs max-w-44 font-light font-poppins text-center sm:text-left">
            El futuro de tus inversiones comienza aquí.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social, index) => (
              <Link key={index} to={social.link}>
                {social.svg}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center sm:items-start">
          <h2 className="text-invertiria-2 md:text-xl font-medium">Explora</h2>
          {explore.map((item) => (
            <Link
              className="text-neutral-300 text-xs font-poppins font-light"
              key={item.name}
              to={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-5 items-center sm:items-start">
          <h2 className="text-invertiria-2 md:text-xl font-medium">Ayuda</h2>
          {help.map((item) => (
            <Link
              className="text-neutral-300 text-xs font-poppins font-light"
              key={item.name}
              to={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:mt-10 sm:col-span-2 lg:mt-0 lg:col-span-1 flex flex-col gap-5 items-center sm:items-start">
          <h2 className="text-invertiria-2 md:text-xl font-medium">
            Informes Clave en tu Inbox
          </h2>
          <p className="text-white text-xs font-light font-poppins text-center sm:text-left">
            Descubre tendencias y consejos exclusivos para potenciar tus
            inversiones.
          </p>
          <div className="w-full flex items-center justify-between ga-4 p-1 rounded-full ring-1 ring-invertiria-2">
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="ml-3 w-[80%] bg-transparent text-white text-xs font-light font-poppins outline-none"
            />
            <div className="p-1 rounded-full bg-invertiria-2 group hover:bg-white cursor-pointer">
              <ArrowRightIcon
                strokeWidth={1}
                className="text-white size-6 -rotate-45 group-hover:text-invertiria-2"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container
        classNameParent={"w-full bg-invertiria-2"}
        className={
          "flex flex-col md:flex-row gap-4 items-center justify-between py-6"
        }
      >
        <Link to="/">
          <Logo className="h-8 w-auto text-white" />
        </Link>
        <p className="text-white text-sm text-center">
          Copyright @ {new Date().getFullYear()}. Todos los derechos reservados.
        </p>
        <div className="flex text-center items-center gap-3 text-sm text-white">
          <Link to="/">Políticas de Privacidad</Link>
          <span>|</span>
          <Link to="/">Terminos y Condiciones</Link>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
