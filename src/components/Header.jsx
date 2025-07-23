import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import clsx from "clsx";

import { LogOut, MenuIcon, User } from "lucide-react";

// Componentes
import { Container } from "./design/Container";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "../contexts/AuthContext";
import { Instagram, Linkedin, X, Youtube } from "./icons";
import HamburgerMenu from "./design/HambuerguerMenu";

// Redes sociales
const socials = [
  {
    name: "Lindkedin",
    svg: <Linkedin className="text-[#232322]" />,
  },
  {
    name: "Instagram",
    svg: <Instagram className="text-[#232322]" />,
  },
  {
    name: "X",
    svg: <X className="text-[#232322]" />,
  },
  {
    name: "Youtube",
    svg: <Youtube className="text-[#232322]" />,
  },
];

// Header
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile(1023);

  const { isAuthenticated, user, logout } = useAuth();

  // Throttle manual para scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full transition-[background,shadow] duration-300">
      <Container
        className={clsx(
          "py-4 transition-all duration-500 ease-in-out overflow-hidden",
          scrolled
            ? "opacity-0 max-h-0 translate-y-[-20px] pointer-events-none"
            : "opacity-100 max-h-[100px] translate-y-0"
        )}
      >
        <div className="flex flex-col xs:flex-row gap-y-4 items-center justify-between text-xs">
          <span className="">Simulador Inteligente para Bienes Raíces</span>
          <div className="flex items-center">
            <Link className="hover:text-invertiria-1" to="/">
              Soporte
            </Link>
            <div className="w-0.5 h-5 bg-invertiria-1 mx-4" />
            <div className="flex items-center gap-3">
              {socials.map((social, index) => (
                <Link key={index} to={social.link}>
                  {social.svg}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container
        className={clsx(
          "px-8 py-4 bg-white/85 rounded-4xl shadow-sm outline outline-offset-[-1px] outline-black/20 backdrop-blur-[2.85px]",
          scrolled && "shadow-white/50"
        )}
      >
        <div className="flex items-center justify-between text-xs">
          <Link to="/">
            <img src="/assets/svg/logo.svg" className="h-8 w-auto " />
          </Link>
          {!isMobile && (
            <nav className="hidden lg:flex">
              <ul className="flex items-center gap-10 text-sm xl:text-base ">
                <li>
                  <Link to={"/analysis/create"} className="text-black hover:text-invertiria-1">
                    Crear análisis
                  </Link>
                </li>
                <li>
                  <Link className="text-black hover:text-invertiria-1">
                    Quienes Somos
                  </Link>
                </li>
                <li>
                  <Link className="text-black hover:text-invertiria-1">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link className="text-black hover:text-invertiria-1">
                    Precios
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          <div className="flex items-center text-sm xl:text-base text-black">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center  gap-4 mr-2">
                <Link
                  className="flex hover:text-invertiria-1 "
                  to={`/${user.user_metadata.role}/dashboard`}
                >
                  Mi Perfil
                </Link>
                <LogOut
                  className="stroke-black size-5 hover:stroke-invertiria-1 cursor-pointer"
                  onClick={logout}
                />
              </div>
            ) : (
              <div className="hidden sm:flex items-center text-black">
                <Link className="hover:text-invertiria-1" to="/login">
                  Login
                </Link>
                <div className="w-0.5 h-5 bg-invertiria-1 mx-4" />
                <Link className="hover:text-invertiria-1 mr-4" to="/register">
                  Sign in
                </Link>
              </div>
            )}
            {/* <LanguageSelector /> */}
            {isMobile && <HamburgerMenu />}
          </div>
        </div>
      </Container>
    </header>
  );
}

export { Header };
