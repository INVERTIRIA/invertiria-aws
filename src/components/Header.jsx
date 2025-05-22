import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { MenuIcon } from "lucide-react";

// Componentes
import { Container } from "./design/Container";
import { LanguageSelector } from "./LanguageSelector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useAuth } from "../contexts/AuthContext";
import { Instagram, Linkedin, X, Youtube } from "@/components/icons";

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
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();

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

  useEffect(() => {
    setOpenNavigation(false);
  }, [location.pathname]);

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
          <span className="font-poppins">
            Simulador Inteligente para Bienes Raíces
          </span>
          <div className="flex items-center font-poppins">
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
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-10 text-base font-poppins">
              <li>
                <Link className="text-black font-poppins hover:text-invertiria-1">
                  Personas
                </Link>
              </li>
              <li>
                <Link className="text-black font-poppins hover:text-invertiria-1">
                  Compañías
                </Link>
              </li>
              <li>
                <Link className="text-black font-poppins hover:text-invertiria-1">
                  Inversionistas
                </Link>
              </li>
              <li>
                <Link className="text-black font-poppins hover:text-invertiria-1">
                  Planes
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center text-base text-black">
            {isAuthenticated ? (
              <div className="flex items-center font-poppins gap-4">
                <button onClick={logout}>Cerrar sesion</button>
                <Link
                  className="hover:text-invertiria-1 font-poppins "
                  to={`/${user.user_metadata.role}/dashboard`}
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center text-black">
                <Link
                  className="hover:text-invertiria-1 font-poppins "
                  to="/login"
                >
                  Login
                </Link>
                <div className="w-0.5 h-5 bg-invertiria-1 mx-4" />
                <Link
                  className="hover:text-invertiria-1 font-poppins mr-4"
                  to="/register"
                >
                  Sign in
                </Link>
              </div>
            )}
            <LanguageSelector />
            <div className="flex items-center lg:hidden bg-gray-100 rounded-md px-1 py-1 sm:ml-4">
              <MenuIcon
                className="stroke-black size-5"
                onClick={() => setOpenNavigation(true)}
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="block h-0 lg:hidden">
        <Sheet open={openNavigation} onOpenChange={setOpenNavigation}>
          <SheetTrigger />
          <SheetContent>
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <div className="flex flex-col h-screen">
              <nav className="text-center h-full pb-6">
                <ul className="flex flex-col items-center gap-6"></ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export { Header };
