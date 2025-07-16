function LineaDeTiempo( { modelation }) {
  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="relative flex items-center w-full mt-2">
        {/* Línea de tiempo */}
        <div className="absolute w-full h-[3px] bg-invertiria-2/35" />

        {/* Puntos */}
        <div className="relative flex w-full justify-between">
          <div className="relative flex flex-col items-center">
            <span className="mb-2 text-gray-500">{modelation?.fecha_inicio_ventas.slice(0, 7)}</span>
            <div className="w-5 h-5 bg-invertiria-2 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Inicio Ventas</span>
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mb-2 text-gray-500">{modelation?.fecha_compra.slice(0, 7)}</span>
            <div className="w-5 h-5 bg-invertiria-2 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Compra</span>
            {/* <span className="text-xs text-gray-500">400 millones</span> */}
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mb-2 text-gray-500">{modelation?.fecha_prevista_entrega.slice(0, 7)}</span>
            <div className="w-5 h-5 bg-invertiria-2 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Entrega</span>
            {/* <span className="text-xs text-gray-500">500 millones</span> */}
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mb-2 text-gray-500">{modelation?.fecha_prevista_venta.slice(0, 7)}</span>
            <div className="w-5 h-5 bg-invertiria-2 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Venta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LineaDeTiempo };