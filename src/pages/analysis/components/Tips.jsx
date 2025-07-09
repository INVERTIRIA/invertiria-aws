import { useEffect, useState } from "react";

const tips = [
  {
    title: "Define tu punto de partida",
    description:
      "Seleccionar si el inmueble es usado o está sobre planos nos permite proyectar escenarios personalizados para tu inversión desde el inicio.",
    img: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/images/tips/tip-1.png",
  },
  {
    title: "Define tu punto de partida",
    description:
      "Seleccionar si el inmueble es usado o está sobre planos nos permite proyectar escenarios personalizados para tu inversión desde el inicio.",
    img: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/images/tips/tip-1.png",
  },
  {
    title: "Enfoque de uso = Proyección real",
    description:
      "Tu decisión de uso es clave para afinar retornos, gastos y tiempos de inversión.",
    img: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/images/tips/tips-2.png",
  },
  {
    title: "Enfoque de uso = Proyección real",
    description:
      "Tu decisión de uso es clave para afinar retornos, gastos y tiempos de inversión.",
    img: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/images/tips/tips-2.png",
  },
  {
    title: "Define tu punto de partida",
    description:
      "Seleccionar si el inmueble es usado o está sobre planos nos permite proyectar escenarios personalizados para tu inversión desde el inicio.",
    img: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/images/tips/tip-1.png",
  },
];

const Tips = ({ step }) => {
  const [randomTip, setRandomTip] = useState(0);

  useEffect(() => {
    if (step > 0) {
      setRandomTip(Math.floor(Math.random() * tips.length));
    }
  }, [step]);

  return (
    <div className="flex flex-col w-[25%]">
      <img
        src={tips[randomTip]?.img}
        alt=""
        className="rounded-tl-2xl w-full h-[458px] object-cover"
        width={426}
        height={500}
      />
      <div className="bg-white w-full flex-1 rounded-bl-2xl ring-1 ring-gray-100 flex flex-col justify-center gap-2 p-4">
        <h2 className="font-semibold text-lg">{tips[randomTip]?.title}</h2>
        <p className="text-sm text-gray-700">{tips[randomTip]?.description}</p>
      </div>
    </div>
  );
};

export default Tips;
