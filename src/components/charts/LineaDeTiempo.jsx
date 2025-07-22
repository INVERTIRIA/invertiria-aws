import { parsePrice } from "../../constants/functions";

function LineaDeTiempo({ modelation }) {

  const fecha_inicio_ventas = modelation?.fecha_inicio_ventas?.slice(0, 7) || "No aplica"
  const fecha_prevista_entrega = modelation?.fecha_prevista_entrega?.slice(0, 7) || "No aplica"
  const fecha_prevista_venta = modelation?.fecha_prevista_venta?.slice(0, 7) || "No aplica"

  return (
    <div className="flex flex-col items-center w-full pt-10 pb-10">
      <div className="relative w-full">
        <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-gradient-to-r from-invertiria-2/25 to-invertiria-2/45 transform -translate-y-1/2" />
        <div className="flex justify-between items-center relative z-10 w-full">
          {[
            { label: "Inicio Ventas", date: fecha_inicio_ventas },
            { label: "Compra", date: modelation?.fecha_compra.slice(0, 7), price: modelation?.precio_de_compra },
            { label: "Entrega", date: fecha_prevista_entrega },
            { label: "Venta", date: fecha_prevista_venta, price: modelation?.precio_venta },
          ].map((event, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group min-w-[60px] flex-1">
              <span className="mb-0 text-md max-sm:text-sm text-gray-500">
                {event.date}
              </span>
              <div className="w-6 h-6 rounded-full bg-invertiria-2 border-4 border-white shadow-md" />
              <span className="mt-2 text-md max-sm:text-sm text-gray-600">
                {event.label}
              </span>
              <span className={`mt-2 text-md max-sm:text-sm text-gray-500 ${!event.price ? "invisible" : ""}`}>
                {event.price ? parsePrice(event.price) : " "}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LineaDeTiempo };