import { supabase } from "@/api/auth";
import Papa from "papaparse";

const TestPage = () => {
  /* Generar Embedding
  _______________________________________ */
  const generateEmbedding = async (input) => {
    const url = "https://api.openai.com/v1/embeddings";
    const apiKey = import.meta.env.VITE_OPENIA_KEY;
    const body = {
      model: "text-embedding-3-small",
      input: input,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return result.data.map((item) => item.embedding);
  };

  /* Generar Prompt
  _______________________________________ */

  /* Transformar CSV
  _______________________________________ */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true, // Opcional: convierte cada fila en un objeto con claves de la primera fila
      skipEmptyLines: true,
      complete: (result) => {
        console.log(result.data); // Array con los datos
        handleFormatRecords(result.data);
      },
    });
  };

  /* Importar CSV
  _______________________________________ */
  const handleFormatRecords = async (matriz_modelo) => {
    const records = new Map();

    matriz_modelo.forEach((item) => {
      const key = `${item.ciudad}|${item.zona}|${item.sub_zona}|${item.tipo}`;

      if (!records.has(key)) {
        records.set(key, {
          id: key,
          ciudad: item.ciudad,
          zona: item.zona,
          sub_zona: item.sub_zona,
          tipo: item.tipo,
          matriz: [],
        });
      }

      records
        .get(key)
        .matriz.push([
          item.año_mes,
          item.mes_proyecto,
          item.precio_promedio_m2,
          item.varianza_precio_promedio_m2,
          item.valorizacion_promedio,
          item.varianza_valorizacion_promedio,
        ]);
    });

    // Si necesitas convertirlo a un array
    const result = Array.from(records.values());

    const res = await supabase.from("matriz_modelo").upsert(result).select();
    console.log(res);

    //console.log("records", result);
  };

  const handleGetRecords = async () => {
    const res = await supabase.from(`modelaciones`).select(
      `*,
        cidudad:ciudades(nombre), 
        pais:paises(pais),
        analisis:analisis_modelacion_ia(tiempo_de_compra, valor_de_compra)`
    );

    for (const item of res.data) {
      const context = {
        pais: item.pais.pais,
        ciudad: item.cidudad.nombre,
        zona: item.zona,
        subzona: item.subzona,
        modelo_de_negocio: item.modelo_de_negocio,
        renta: item.renta,
        tipo_inmueble: item.tipo_inmueble,
        credito_hipotecario: item.credito_hipotecario,
        //analisis: item.analisis,
      };

      //console.log(context);

      const response = await generateEmbedding(JSON.stringify(context));

      await supabase
        .from("modelaciones")
        .update({
          vector: response[0],
        })
        .eq("id", item.id);
    }
  };

  /* BUSQUEDA SEMANTICA
  _____________________________________ */

  const handleSemanticSearch = async () => {
    const embedding = [0.1, 0.2, 0.3, 0.4, 0.5];

    const { data } = await supabase.rpc("match_modelaciones", {
      query_embedding: embedding, // pass the query embedding
      match_threshold: 0.5, // choose an appropriate threshold for your data
      match_count: 3, // choose the number of matches
    });

    console.log(data);
  };

  /* Zonas
  _______________________________________ */

  // Pais = (country)
  // Ciudad = (city)
  // Zona = (district || locality || street)
  // Subzona = (locality || street || name)

  return (
    <div className="flex flex-col p-2 gap-2">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="p-2 rounded-lg bg-slate-300 w-1/2 cursor-pointer"
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 p-2 w-[30%] rounded-lg cursor-pointer"
          onClick={handleGetRecords}
        >
          Get records
        </button>
        <button
          className="bg-green-500 p-2 w-[30%] rounded-lg cursor-pointer"
          onClick={handleSemanticSearch}
        >
          Busqueda semantica.
        </button>
      </div>
    </div>
  );
};

export default TestPage;
