import { Link, useLocation } from "react-router";
import { ChevronRight, MenuIcon } from "lucide-react";

// Hooks
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// Componentes
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

const HamburgerMenu = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [openNavigation, setOpenNavigation] = useState(false);

  useEffect(() => {
    setOpenNavigation(false);
  }, [location.pathname]);

  return (
    <Sheet open={openNavigation} onOpenChange={setOpenNavigation}>
      <SheetTrigger className="bg-gray-100 rounded-md px-1 py-1 sm:ml-4">
        <MenuIcon className="stroke-black size-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col h-screen px-6">
          {/* Menu */}
          <div className="flex flex-col gap-4">
            <span className="text-xs text-invertiria-2">Menú</span>
            <nav className="">
              <ul className="flex flex-col gap-8 text-sm xl:text-base">
                <li>
                  <Link to="/analysis/create" className="flex items-center justify-between text-black hover:text-invertiria-1">
                    Crear Análsis
                    <ChevronRight className="size-5" />
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex items-center justify-between text-black hover:text-invertiria-1">
                    Quienes Somos
                    <ChevronRight className="size-5" />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center justify-between text-black hover:text-invertiria-1">
                    Contacto
                    <ChevronRight className="size-5" />
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="flex items-center justify-between text-black hover:text-invertiria-1">
                    Precios
                    <ChevronRight className="size-5" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* Menu */}
          <div className="mt-12 flex flex-col gap-4">
            <span className="text-xs text-invertiria-2">Cuenta</span>
            {isAuthenticated ? (
              <>
                <nav className="">
                  <ul className="flex flex-col gap-8 text-sm xl:text-base">
                    <li>
                      <Link
                        to={`/${user.user_metadata.role}/dashboard`}
                        className="text-sm flex items-center justify-between text-black hover:text-invertiria-1"
                      >
                        Mi perfil
                        <ChevronRight className="size-5" />
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="text-sm flex items-center justify-between text-black hover:text-invertiria-1">
                        Mis inversiones
                        <ChevronRight className="size-5" />
                      </Link>
                    </li> */}
                    <li>
                      <Button
                        className="w-full bg-invertiria-2 font-normal"
                        onClick={() => {
                          logout();
                          setOpenNavigation(false);
                        }}
                      >
                        Cerrar sesión
                      </Button>
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-8 text-sm xl:text-base">
                  <Link
                    to={"/login"}
                    className="px-3 py-2 bg-invertiria-2 rounded-md flex items-center justify-center text-white hover:text-invertiria-1"
                  >
                    Iniciar sesión
                  </Link>
                </div>
                <div className="flex flex-col 2xs:flex-row items-center justify-center gap-1 text-xs">
                  <span>¿Eres un usuario nuevo?</span>
                  <Link
                    to={"/register"}
                    className="text-invertiria-2 underline"
                  >
                    Empieza aquí.
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
