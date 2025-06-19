function LineaDeTiempo() {
  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="relative flex items-center w-full mt-2">
        {/* Línea de tiempo */}
        <div className="absolute w-full h-[3px] bg-gray-300" />

        {/* Puntos */}
        <div className="relative flex w-full justify-between">
          <div className="relative flex flex-col items-center">
            <span className="mt-2 text-gray-500">Enero 2024</span>
            <div className="w-6 h-6 bg-invertiria-1 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Inicio Ventas</span>
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mt-2 text-gray-500">Enero 2024</span>
            <div className="w-6 h-6 bg-invertiria-1 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Compra</span>
            {/* <span className="text-xs text-gray-500">400 millones</span> */}
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mt-2 text-gray-500">Enero 2024</span>
            <div className="w-6 h-6 bg-invertiria-1 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Venta</span>
            {/* <span className="text-xs text-gray-500">500 millones</span> */}
          </div>

          <div className="relative flex flex-col items-center">
            <span className="mt-2 text-gray-500">Enero 2024</span>
            <div className="w-6 h-6 bg-invertiria-1 rounded-full border-4 border-invertiria-2" />
            <span className="mt-2 text-gray-500">Entrega</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LineaDeTiempo };