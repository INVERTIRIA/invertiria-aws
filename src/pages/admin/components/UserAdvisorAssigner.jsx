// Hooks
import { supabase } from "../../../supabase";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../../hooks/use-debounces";
import { useAuth } from "../../../contexts/AuthContext";

// Components
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { CheckIcon, SearchIcon, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import BulkDeleteConfirmation from "../../../components/BulkDeleteConfirmation";

const SearchUser = ({ width, advisorId, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [options, setOptions] = useState([]);

  const { createAdminInstance, setErrorToast } = useAuth();
  const adminInstance = createAdminInstance({});

  const debouncedQuery = useDebounce(search, 500);

  const fetchRecords = async (query) => {
    const res = await adminInstance.getUsersBy("email", query, "user");
    setOptions(res);
  };

  const handlerAddToList = async () => {
    const { error } = await supabase.from("asesorados").insert({
      usuario_id: userSelected.id,
      asesor_id: advisorId,
    });

    setValue(null);
    setUserSelected(null);

    if (error) {
      const message = error.message.includes("duplicate key")
        ? "El usuario ya se encuentra asignado a un asesor."
        : "No autorizado, su rol no tiene los permisos necesarios.";

      setErrorToast(message);
      return;
    }

    return await onSuccess();
  };

  useEffect(() => {
    if (!debouncedQuery) {
      fetchRecords(" ");
      return;
    }

    fetchRecords(debouncedQuery);
    return;
  }, [debouncedQuery]);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="col-span-2 lg:col-span-1 xl:col-span-2 justify-between font-normal text-gray-600"
          >
            {value || "Buscar usuario"}
            <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: width }} className="max-w-xl">
          <Command>
            <CommandInput
              placeholder="Buscar por email..."
              onValueChange={(value) => setSearch(value)}
              onBlur={() => {
                setSearch("");
              }}
            />
            <CommandList>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={item.email}
                    value={item.email}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? null : currentValue);
                      setUserSelected(item);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <p>{item.email}</p>
                      <p className="text-xs text-gray-500">
                        {item.nombre} {item.apellidos}
                      </p>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.email ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>Sin resultados.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="button" onClick={handlerAddToList} disabled={!value}>
        Agregar
      </Button>
    </div>
  );
};

const UserAdvisorAssigner = ({ advisorId }) => {
  const [records, setRecords] = useState([]);
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [recordsDelete, setRecordsDelete] = useState([]);

  const containerRef = useRef(null);
  const effectRan = useRef(false);

  const fetchRecords = async () => {
    const res = await supabase
      .from("asesorados")
      .select("usuario:usuario_id(id, nombre, apellidos, email)")
      .eq("asesor_id", advisorId);

    setRecords(res.data);
  };

  useEffect(() => {
    if (!effectRan.current) {
      fetchRecords();
      effectRan.current = true;
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div ref={containerRef} className="pt-5">
        <SearchUser
          width={width}
          onSuccess={fetchRecords}
          advisorId={advisorId}
        />
      </div>
      {/* Listado */}
      <Separator />
      <ScrollArea className="flex flex-col gap-2 bg-white shadow-custom-sm p-3 w-full rounded-md min-h-20 max-h-80">
        <ul className="flex flex-col gap-2">
          {records.map((item, index) => (
            <li
              className="py-3 px-3 rounded-md bg-gray-100 text-sm flex items-center gap-2 justify-between"
              key={index}
            >
              <div className="flex flex-col">
                <p>
                  {item.usuario.nombre} {item.usuario.apellidos}
                </p>
                <p className="text-xs text-gray-500">{item.usuario.email}</p>
              </div>
              <Button
                type="button"
                variant={"theme"}
                size={"icon"}
                className="size-7"
                onClick={() => {
                  setRecordsDelete([item.usuario.id]);
                  setIsOpen(true);
                }}
              >
                <X className="size-3" />
              </Button>
            </li>
          ))}
          {records.length === 0 && (
            <span className="text-sm text-gray-500 text-center h-20 rounded-md flex items-center justify-center">
              No se han agregado usuarios
            </span>
          )}
        </ul>
      </ScrollArea>
      {/* Bulk delete confirmation */}
      <BulkDeleteConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={fetchRecords}
        tableName="asesorados"
        fieldName="usuario_id"
        records={recordsDelete}
      />
    </div>
  );
};

export default UserAdvisorAssigner;
