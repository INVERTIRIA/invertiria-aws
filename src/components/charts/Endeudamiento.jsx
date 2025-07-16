import { parsePrice } from "../../constants/functions";

function Endeudamiento({ price, minPrice, maxPrice }) {

  minPrice = 2000000;
  maxPrice = 8000000;

  let indicatorPosition = ((price - minPrice) / (maxPrice - minPrice)) * 100;
  if (price > maxPrice) {
    indicatorPosition = 96;
  }
  if (price < minPrice) {
    indicatorPosition = 0;
  }

  return (
    <div className="flex flex-col gap-1 items-center">
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
          rotate: "90deg",
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
          className="w-24 flex flex-col -m-5 items-center"
          style={{
            position: "absolute",
            left: "95px",
            // top: "150px",
            bottom: `${indicatorPosition}%`,
            fontSize: "14px",
            fontWeight: "bold",
            color: "black",
            rotate: "-90deg",
          }}
        >
          <span className="leading-none">{parsePrice(price)}</span>
          <span className="text-[11px] font-normal">Capacidad</span>
        </div>
      </div>
    </div>
  );
};

export { Endeudamiento };