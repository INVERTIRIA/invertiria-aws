import { parsePrice } from "../../constants/functions";

function ValorDeVenta({ timeVectors, fechaVenta }) {

  let priceInmueble = 0;
  let minPriceInmueble = 0;
  let maxPriceInmueble = 0;
  let priceM2 = 0;
  let minPriceM2 = 0;
  let maxPriceM2 = 0;

  for (let i = 0; i < timeVectors?.valor_inmueble.length; i++) {
    if (timeVectors.valor_inmueble[i][1] == fechaVenta) {
      priceInmueble = timeVectors.valor_inmueble[i][2];
      priceM2 = timeVectors?.valorizacion[i][2];
      const valorizacion = timeVectors?.valorizacion[i][5];
      minPriceInmueble = timeVectors?.valor_inmueble[i][2] - (timeVectors?.valor_inmueble[i][2] * (valorizacion));
      maxPriceInmueble = timeVectors?.valor_inmueble[i][2] + (timeVectors?.valor_inmueble[i][2] * (valorizacion));
      minPriceM2 = priceM2 - (timeVectors?.valorizacion[i][3]);
      maxPriceM2 = priceM2 + (timeVectors?.valorizacion[i][3]);
    }
  }

  let indicatorPositionInmueble = ((priceInmueble - minPriceInmueble) / (maxPriceInmueble - minPriceInmueble)) * 100;
  if (priceInmueble > maxPriceInmueble || priceM2 > maxPriceM2) {
    indicatorPositionInmueble = 96.5;
  }
  if (priceInmueble < minPriceInmueble || priceM2 < minPriceM2) {
    indicatorPositionInmueble = 0;
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-4 items-end">

        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs font-semibold">Precio por m²</span>
          <div className="w-24 flex flex-col justify-between items-center p-3 rounded-lg border border-gray-200 h-[300px] font-semibold text-sm">
            <p>{parsePrice(maxPriceM2)}</p>
            <p>{parsePrice(minPriceM2)}</p>
          </div>
        </div>

        <div
          style={{
            width: "80px",
            height: "300px",
            position: "relative",
            background: "linear-gradient(to top, #f00000, #fff200, #00ab09)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          {/* Indicador de precio actual */}
          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "12px",
              background: "black",
              borderRadius: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: `${indicatorPositionInmueble}%`,
            }}
          ></div>

          <div className="flex flex-col gap-2 items-center absolute left-[95px] -mt-5">
            <span className="text-xs font-semibold">Precio inmueble</span>
            <div className="w-28 h-[300px] flex flex-col justify-between items-center p-3 rounded-lg border border-gray-200 font-semibold text-sm">
              <p>{parsePrice(maxPriceInmueble)}</p>
              <p>{parsePrice(minPriceInmueble)}</p>
            </div>
          </div>

          <div
            className="w-24 flex flex-col"
            style={{
              position: "absolute",
              right: "90px",
              bottom: `${indicatorPositionInmueble}%`,
              fontSize: "14px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <span className="leading-none">{parsePrice(priceM2)}</span>{" "}
          </div>

          <div
            className="w-24 flex flex-col"
            style={{
              position: "absolute",
              left: "102px",
              bottom: `${indicatorPositionInmueble}%`,
              fontSize: "14px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <span className="leading-none">{parsePrice(priceInmueble)}</span>{" "}
          </div>

        </div>
      </div>
    </div>
  );
};

export { ValorDeVenta };