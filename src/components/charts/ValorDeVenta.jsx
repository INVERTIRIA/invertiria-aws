import { parsePrice } from "../../constants/functions";

function ValorDeVenta({ price, minPrice, maxPrice }) {
  const indicatorPosition = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-4 items-end">

        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs font-semibold">Precio por m²</span>
          <div className="w-24 flex flex-col justify-between items-center p-2 rounded-lg border border-gray-300 h-[300px] font-semibold text-sm">
            <p>{parsePrice(950000)}</p>
            <p>{parsePrice(300000)}</p>
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
              width: "100px",
              height: "12px",
              background: "black",
              borderRadius: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: `${indicatorPosition}%`,
            }}
          ></div>

          <div className="flex flex-col gap-2 items-center absolute left-[95px] -mt-5">
            <span className="text-xs font-semibold">Precio inmueble</span>
            <div className="w-24 h-[300px] flex flex-col justify-between items-center p-2 rounded-lg border border-gray-300 font-semibold text-sm">
              <p>{parsePrice(920000)}</p>
              <p>{parsePrice(400000)}</p>
            </div>
          </div>

          <div
            className="w-24 flex flex-col"
            style={{
              position: "absolute",
              right: "84px",
              bottom: `${indicatorPosition}%`,
              fontSize: "14px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <span className="leading-none">{parsePrice(price)}</span>{" "}
          </div>

          <div
            className="w-24 flex flex-col"
            style={{
              position: "absolute",
              left: "108px",
              bottom: `${indicatorPosition}%`,
              fontSize: "14px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <span className="leading-none">{parsePrice(price)}</span>{" "}
          </div>

        </div>
      </div>
    </div>
  );
};

export { ValorDeVenta };