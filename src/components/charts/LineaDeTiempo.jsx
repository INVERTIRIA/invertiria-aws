function LineaDeTiempo() {
  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="flex w-full justify-between text-gray-600 text-sm">
        <span>Enero 2024</span>
        <span>Mayo 2024</span>
        <span>Junio 2026</span>
        <span>Abril 2027</span>
      </div>
      <div className="relative flex items-center w-full mt-2">
        {/* Línea de tiempo */}
        <div className="absolute w-full h-1 bg-gray-300" />

        {/* Puntos */}
        <div className="relative flex w-full justify-between">
          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-600" />
            <span className="mt-2 text-gray-500">Inicio Ventas</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-600" />
            <span className="mt-2 text-gray-500">Compra</span>
            <span className="text-xs text-gray-500">400 millones</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-blue-700" />
            <span className="mt-2 text-blue-600">Venta</span>
            <span className="text-xs text-gray-500">500 millones</span>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full border-4 border-gray-500 opacity-50" />
            <span className="mt-2 text-gray-500">Entrega</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LineaDeTiempo };