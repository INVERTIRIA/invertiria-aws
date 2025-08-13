import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Papa from "papaparse";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import UploadFiles from "../../../../components/UploadFiles";
import { useAuth } from "../../../../contexts/AuthContext";
import { useOutletContext } from "react-router";
import { importDataSchema } from "../../../../constants/schema/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formatRecordsML,
  formatRecordsPI,
  formatRecordsPR,
  formatRecordsVR,
  getExpectedHeadersByType,
} from "../../../../constants/functions/imports";
import { supabase } from "../../../../supabase";
import { toast } from "sonner";

const ImportDataForm = ({ onOpenChange, onSuccess }) => {
  const { userInfo } = useOutletContext();

  const [isSubmitting, startTransition] = useTransition();
  const [openPopovers, setOpenPopovers] = useState({});
  const { uploadFiles, setErrorToast } = useAuth();
  const uploadFilesRef = useRef(null);

  const options = [
    { value: "matriz_modelo", label: "Matriz Modelo" },
    { value: "proyectos_inmobiliarios", label: "Proyectos Inmobiliarios" },
    { value: "datos_referencia", label: "Datos de Referencia" },
    { value: "promedios", label: "Promedios" },
  ];

  // Functions
  const togglePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const closePopover = (name) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleFileUpload = async (file, ref, fileName) => {
    const name = `${fileName} ${Date.now()}`;

    // Iniciar la simulación de carga
    ref.current?.startSimulateUpload();

    const resImage = await uploadFiles(name, file, "imports");

    // Completar la barra al 100%
    ref.current?.completeSimulateUpload();

    if (!resImage) {
      setErrorToast("No tienes permiso para subir archivos");
      return;
    }

    return name;
  };

  const handleFileUploadCSV = (file, type) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject("No se proporcionó ningún archivo");

      Papa.parse(file, {
        encoding: "ISO-8859-1",
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          try {
            const actualHeaders = result.meta.fields;
            const expectedHeaders = getExpectedHeadersByType(type);

            // Columnas faltantes
            const missingHeaders = expectedHeaders.filter(
              (h) => !actualHeaders.includes(h)
            );

            // Columnas extra
            const extraHeaders = actualHeaders.filter(
              (h) => !expectedHeaders.includes(h)
            );

            if (missingHeaders.length > 0) {
              return reject(
                `Faltan las siguientes columnas: ${missingHeaders.join(", ")}`
              );
            }

            if (extraHeaders.length > 0) {
              return reject(
                `El archivo contiene columnas no permitidas: ${extraHeaders.join(
                  ", "
                )}`
              );
            }

            const formattedData = handleFormatRecords(result.data, type);
            resolve(formattedData);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const handleFormatRecords = (data, type) => {
    switch (type) {
      case "matriz_modelo":
        return formatRecordsML(data);
      case "proyectos_inmobiliarios":
        return formatRecordsPI(data);
      case "datos_referencia":
        return formatRecordsVR(data);
      case "promedios":
        return formatRecordsPR(data);
      default:
        return [];
    }
  };

  // Form
  const form = useForm({
    resolver: zodResolver(importDataSchema),
    defaultValues: {
      tipo: "",
      path: "",
    },
  });

  // Submit
  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { path, tipo } = values;
      try {
        const res = await handleFileUploadCSV(path, tipo);
        if (!res) return onOpenChange(false);

        // Subir los archivos
        let filePath = path;

        if (path instanceof File) {
          filePath = await handleFileUpload(
            path,
            uploadFilesRef,
            path.name.split(".")[0]
          );
          if (!filePath) return;
        }

        const res2 = await supabase.from("carga_datos").insert({
          nombre: path.name.split(".")[0],
          peso: path.size,
          tipo,
          path: filePath,
          created_by: userInfo.id,
        });

        if (res2.error) {
          setErrorToast(res.error.message);
          return;
        }

        await onSuccess();
        toast.success("Datos importados correctamente");
        onOpenChange(false);

        return;
      } catch (error) {
        const errorText =
          error instanceof Error ? error.message : String(error);
        setErrorToast(errorText);
        onOpenChange(false);
        return;
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo <span className="text-black">*</span>
                </FormLabel>
                <Dialog
                  open={!!openPopovers["tipo"]}
                  onOpenChange={() => togglePopover("tipo")}
                >
                  <DialogTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        role="combobox"
                        className={cn(
                          "w-full justify-between font-normal text-base md:text-sm",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? options.find(
                              (option) => option.value === field.value
                            )?.label
                          : "Seleccione el tipo"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tipo</DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <Command>
                      <CommandInput placeholder="Buscar..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron registros.
                        </CommandEmpty>
                        <CommandGroup>
                          {options.map((option) => (
                            <CommandItem
                              key={option.value}
                              onSelect={() => {
                                form.setValue("tipo", option.value);
                                closePopover("tipo");
                              }}
                            >
                              {option.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  option.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="path"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 xl:col-span-1">
                <span className="text-sm font-medium leading-none select-none">
                  Archivo *
                </span>
                <FormControl>
                  <UploadFiles
                    id="path"
                    fieldTitle="Haga clic o arrastre para cargar."
                    onChange={field.onChange}
                    ref={uploadFilesRef}
                    description="CSV (Tamaño maximo: 10MB)"
                    acceptedFileTypes={[".csv"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full mt-6">
          {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          Importar datos
        </Button>
      </form>
    </Form>
  );
};

export default ImportDataForm;
