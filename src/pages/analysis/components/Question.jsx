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
  {
    title: "Ubicación del proyecto",
    description: "Seleccione la ubicación del proyecto.",
  },
  {
    title: "Precio de compra",
    description: "Ingrese el precio de compra del inmueble.",
  },
  {
    title: "Precio de mercado",
    description: "Ingrese el precio de mercado del inmueble.",
  },
  {
    title: "Separación",
    description: "Ingrese el valor de la separación.",
  },
  {
    title: "Pago cuota inicial",
    description: "Seleccione la forma de pago de la cuota inicial.",
  },
  {
    title: "Cuota inicial",
    description: "Ingrese los detalles de la cuota inicial.",
  },
  {
    title: "Pagos personalizados",
    description:
      "Ingrese los pagos personalizados antes del pago de la cuota final.",
  },
  {
    title: "Crédito hipotecario",
    description: "Seleccione si el inmueble tiene crédito hipotecario.",
  },
  {
    title: "Detalles del crédito",
    description: "Ingrese los detalles del crédito hipotecario.",
  },
  {
    title: "Edad de la propiedad",
    description: "Ingrese la edad de la propiedad.",
  },
  {
    title: "Area",
    description: "Ingrese area de la propiedad.",
  },
  {
    title: "Parqueaderos",
    description: "Ingrese número de parqueaderos.",
  },
  {
    title: "Vivienda vis",
    description: "¿Es vivienda vis?.",
  },
  {
    title: "Cesión de derechos",
    description: "¿Se puede hacer cesión de derechos?.",
  },
  {
    title: "Detalles del proyecto",
    description: "Información detalles del proyecto.",
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
