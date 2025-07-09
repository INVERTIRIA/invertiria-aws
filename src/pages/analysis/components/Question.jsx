const questions = [
  {
    title: "Vigencia",
    description: "Es una inversion nueva?",
  },
  {
    title: "Tipo del inmueble",
    description:
      "Selecciona el tipo del inmueble para afinar tu proyección de inversión.",
  },
  {
    title: "Estado del inmueble",
    description: "Seleccciona si el inmueble que deseas evaluar es:",
  },
  {
    title: "Tipo de titularidad",
    description:
      "Selecciona el tipo de titularidad del inmueble para afinar tu proyección de inversión.",
  },
  {
    title: "Modelo de negocio",
    description:
      "Selecciona el modelo de negocio para afinar tu proyección de inversión.",
  },
  {
    title: "Nombre de la inversión",
    description:
      "Ingrese un nombre para la inversión. Esto ayudará a identificarla.",
  },
  {
    title: "Nombre del proyecto",
    description: "Ingrese el nombre del proyecto el cual deseas evaluar.",
  },
];

const Question = ({ stepIndex }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="font-bold text-4xl">{questions[stepIndex]?.title}</h2>
      <p className="text-sm text-gray-700">
        {questions[stepIndex]?.description}
      </p>
    </div>
  );
};

export default Question;
