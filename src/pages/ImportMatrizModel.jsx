import Papa from "papaparse";
import { useState, useTransition } from "react";
import { CloudUpload, FileSpreadsheet, Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabase";

const ImportMatrizModel = () => {
  const [preview, setPreview] = useState(null);
  const [isSubmitting, startTransition] = useTransition();

  /* Preview
  _______________________________________ */
  const handleFileOnChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(file);
  };

  /* Transformar CSV
  _______________________________________ */
  const handleFileUpload = (file) => {
    if (!file || isSubmitting) return;

    Papa.parse(file, {
      header: true, // Opcional: convierte cada fila en un objeto con claves de la primera fila
      skipEmptyLines: true,
      complete: (result) => {
        handleFormatRecords(result.data);
      },
    });
  };

  /* Importar CSV
  _______________________________________ */
  const handleFormatRecords = (matriz_modelo) => {
    startTransition(async () => {
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
            Number(item.mes_proyecto),
            item.año_mes,
            Number(item.precio_promedio_m2),
            Number(item.varianza_precio_promedio_m2),
            Number(item.valorizacion_promedio),
            Number(item.varianza_valorizacion_promedio),
          ]);
      });

      // Si necesitas convertirlo a un array
      const result = Array.from(records.values());

      const { error } = await supabase
        .from("matriz_modelo")
        .upsert(result)
        .select();

      if (error) return;

      setPreview(null);
    });
  };

  return (
    <div className="flex flex-col p-2 gap-2 max-w-lg">
      <div className="relative">
        <div
          className={`border-2 border-dashed rounded-lg p-4 ${
            preview ? "border-green-500" : "border-gray-300"
          } transition-colors duration-200`}
        >
          {preview ? (
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center justify-center">
                <FileSpreadsheet
                  strokeWidth={1.3}
                  className="w-8 h-8 text-slate-500"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{preview.name}</p>
                  <span className="text-xs font-light">
                    {preview.size} bytes
                  </span>
                </div>
              </div>
              {isSubmitting ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              ) : (
                <div
                  className="cursor-pointer p-2 rounded-full bg-red-500 hover:bg-red-300"
                  onClick={() => setPreview(null)}
                >
                  <Trash strokeWidth={2} className="size-[15px] text-white" />
                </div>
              )}
            </div>
          ) : (
            <label className="flex gap-2 items-center justify-center cursor-pointer p-2">
              <CloudUpload className="size-5 text-gray-400" />
              <span className="text-sm text-gray-500 text-center">
                Choose file to upload
              </span>
              <input
                name="fileUpload"
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileOnChange}
              />
            </label>
          )}
        </div>
      </div>
      <Button
        disabled={!preview || isSubmitting}
        onClick={() => handleFileUpload(preview)}
      >
        Submit
      </Button>
    </div>
  );
};

export default ImportMatrizModel;
