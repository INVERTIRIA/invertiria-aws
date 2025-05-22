import { useState } from "react";
import { ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionItem = ({
  question,
  answer,
  isOpen,
  index,
  toggle,
  bgColor,
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "flex w-full items-center justify-between p-4 text-left text-white transition-colors",
          isOpen ? "bg-invertiria-2 rounded-t-md" : `${bgColor} rounded-md`
        )}
        onClick={() => toggle(index)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <Plus size={20} />}
      </button>
      {isOpen && (
        <div className="bg-[#222222] p-4 text-white rounded-b-md">
          <p className="text-sm sm:text-base">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(2);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqItems = [
    {
      question: "¿Cómo se asegura la precisión?",
      answer:
        "Nuestra calculadora utiliza algoritmos avanzados y datos actualizados para garantizar resultados precisos en cada cálculo.",
      bgColor: "bg-invertiria-2/50",
    },
    {
      question: "¿Qué nivel de acceso es mejor para mí?",
      answer:
        "Dependiendo de tus necesidades, ofrecemos diferentes niveles de acceso. La versión básica es gratuita, mientras que las versiones premium ofrecen características adicionales.",
      bgColor: "bg-invertiria-2/50",
    },
    {
      question: "¿Puedo usar la calculadora sin registrarme?",
      answer:
        "¡Sí! Nuestra calculadora está disponible sin necesidad de crear una cuenta. Queremos que explores su funcionalidad y veas el valor que aporta antes de decidir registrarte. Sin embargo, al registrarte obtendrás acceso a simulaciones más personalizadas y otras herramientas exclusivas.",
      bgColor: "bg-invertiria-2/50",
    },
  ];

  return (
    <div className="w-full mx-auto">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          index={index}
          toggle={toggle}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
};

export default FaqAccordion;
