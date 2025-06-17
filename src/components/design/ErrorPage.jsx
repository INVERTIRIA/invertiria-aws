import { ArrowLeft, ArrowRight, Mails } from "lucide-react";
import { Link } from "react-router";
import { Container } from "./Container";

const ErrorPage = ({ errorCode, title, description }) => {
  return (
    <Container
      classNameParent={"w-full my-10"}
      className={
        "w-full flex flex-col gap-5 items-center justify-center relative"
      }
    >
      <img
        src="/assets/svg/pattern-authorization.svg"
        alt=""
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="z-2 w-fit flex gap-1 items-center px-3 py-2 rounded-2xl ring-1 ring-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <circle
            cx="4"
            cy="4"
            r="3"
            className="fill-invertiria-2 animate-pulse"
          />
        </svg>
        <span className="text-xs font-medium">Error {errorCode}</span>
      </div>
      <h1 className="z-2 h2 text-center max-w-none">{title}</h1>
      <p className="z-2 text-base md:text-lg">{description}</p>
      <Link
        to="/"
        className="z-2 w-fit group bg-invertiria-2 border border-invertiria-2 py-2.5 px-5 rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-white"
      >
        <ArrowLeft
          strokeWidth={1}
          className="text-white size-5 group-hover:stroke-invertiria-2"
        />
        <span className="group-hover:text-invertiria-2 text-sm text-white">
          Volver al Inicio
        </span>
      </Link>
      <ul className="z-2 mt-10 max-w-2xl w-full">
        <li className="border-y border-gray-200 py-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-lg ring-1 ring-gray-300">
              <Mails className="text-gray-800" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Contacta con nosotros</span>
              <span className="text-sm">¿No encuentras lo que buscas?</span>
            </div>
          </div>
          <ArrowRight className="text-gray-800" />
        </li>
        <li className="flex items-center py-6 justify-between">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-lg ring-1 ring-gray-300">
              <Mails className="text-gray-800" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Contacta con nosotros</span>
              <span className="text-sm">¿No encuentras lo que buscas?</span>
            </div>
          </div>
          <ArrowRight className="text-gray-800" />
        </li>
        <li className="flex items-center border-y border-gray-200 py-6 justify-between">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-lg ring-1 ring-gray-300">
              <Mails className="text-gray-800" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Contacta con nosotros</span>
              <span className="text-sm">¿No encuentras lo que buscas?</span>
            </div>
          </div>
          <ArrowRight className="text-gray-800" />
        </li>
      </ul>
    </Container>
  );
};

export default ErrorPage;
