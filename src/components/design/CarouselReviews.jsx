import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const CarouselReviews = ({ reviews = [] }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <div className="bg-[radial-gradient(ellipse_90.43%_118.53%_at_50.00%_-35.07%,_rgba(102,_38,_18,_0.80)_0%,_#111111_100%)] flex flex-col gap-10 p-6 rounded-2xl aspect-square">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-5 text-amber-600 fill-amber-600"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-invertiria-2 md:text-xl">
                      Libardo Valera
                    </p>
                    <span className="text-white text-xs font-light">
                      Developer
                    </span>
                  </div>
                  <img
                    className="w-14 h-14 rounded-[100px] outline-[5px] outline-Coquelicot-28%/30"
                    src="https://placehold.co/60x60"
                  />
                </div>
                <p className="text-justify font-light text-white">
                  La plataforma me permitió diversificar mis inversiones como
                  nunca antes. Me brindó información específica para explorar
                  nuevas oportunidades, disminuyendo riesgos y maximizando mis
                  retornos. Esta herramienta se ha convertido en una parte
                  esencial de mi estrategia empresarial.
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselReviews;
