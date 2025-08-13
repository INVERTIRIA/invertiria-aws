import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CirclePlus, Download } from "lucide-react";
import { Check } from "lucide-react";
import { Trash } from "lucide-react";

const ExportCsvFormat = () => {
  const options = [
    {
      value: "matriz_modelo",
      label: "Matriz Modelo",
      link: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/formatos/matriz_modelo.csv",
    },
    {
      value: "proyectos_inmobiliarios",
      label: "Proyectos Inmobiliarios",
      link: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/formatos/proyectos_inmobiliarios.csv",
    },
    {
      value: "datos_referencia",
      label: "Datos de Referencia",
      link: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/formatos/datos_referencia.csv",
    },
    {
      value: "promedios",
      label: "Promedios",
      link: "https://ncoelhfcbvlvsbyixgwi.supabase.co/storage/v1/object/public/resources/formatos/promedios.csv",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full 2xs:w-auto justify-start border-gray-300 border-dashed rounded-md"
        >
          <Download className="size-5" strokeWidth={1.5} />
          Descargar formato CSV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2 w-56">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              textValue={option.value}
              onSelect={() => window.open(option.link)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportCsvFormat;
