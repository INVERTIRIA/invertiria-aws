import { parsePrice } from "../../constants/functions";

function ValorDeCompra({ price, minPrice, maxPrice, location }) {
  let indicatorPosition = ((price - minPrice) / (maxPrice - minPrice)) * 100;
  if (price > maxPrice) {
    indicatorPosition = 96;
  }
  if (price < minPrice) {
    indicatorPosition = 0;
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="mb-8 font-semibold text-xl">{location}</p>
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
            width: "90px",
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
            left: "90px",
            bottom: `${indicatorPosition}%`,
            fontSize: "14px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <span className="text-[11px] max-sm:text-[10px] font-normal">Valor Compra m²</span>
          <span className="leading-none max-sm:text-[10px]">{parsePrice(price)}</span>{" "}
        </div>
      </div>
      <span className="text-sm font-semibold">{parsePrice(minPrice)}</span>
    </div>
  );
};

export { ValorDeCompra };