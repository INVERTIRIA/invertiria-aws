import { parsePrice } from "../../constants/functions";

function ValorDeCompra({ price, minPrice, maxPrice, location }) {
  const indicatorPosition = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="mb-10 font-semibold text-xl">{location}</p>
      <span className="text-sm font-semibold">{parsePrice(maxPrice)}</span>
      <div
        style={{
          width: "80px",
          height: "300px",
          position: "relative",
          background: "linear-gradient(to top, #00ab09, #fff200, #f00000)",
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

        <div
          className="w-24 flex flex-col"
          style={{
            position: "absolute",
            left: "95px",
            bottom: `${indicatorPosition}%`,
            fontSize: "14px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <span className="text-[11px] font-normal">Valor Compra m²</span>
          <span className="leading-none">{parsePrice(price)}</span>{" "}
        </div>
      </div>
      <span className="text-sm font-semibold">{parsePrice(minPrice)}</span>
    </div>
  );
};

export { ValorDeCompra };