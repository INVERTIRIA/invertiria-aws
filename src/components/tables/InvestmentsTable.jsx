import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CirclePlus,
  Trash,
} from "lucide-react";

// Componentes
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { parsePrice } from "../../constants/functions";

const FilterSection = ({ table, options }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    label: "Nombre",
    field: "titulo_modelacion",
  });

  return (
    <div className="flex flex-col-reverse sm:flex-row py-4 gap-4">
      <div className="w-full md:w-[30%] flex items-center gap-2">
        <Input
          placeholder="Ingrese un valor..."
          value={table.getColumn(selectedFilter.field)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table
              .getColumn(selectedFilter.field)
              ?.setFilterValue(event.target.value)
          }
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-fit justify-start border-gray-300 border-dashed rounded-md"
          >
            <CirclePlus className="h-4 w-4" />
            Filtro
            {selectedFilter.label && (
              <span className="bg-gray-200 px-2 py-[2px] rounded-md">
                {selectedFilter.label}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-2 w-56">
          <DropdownMenuGroup>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.field}
                textValue={option.field}
                onSelect={(e) => {
                  const currentValue = e.target.textContent;

                  if (
                    selectedFilter.label &&
                    selectedFilter.label === currentValue
                  ) {
                    setSelectedFilter({
                      label: "Nombre",
                      field: "titulo_modelacion",
                    });
                  } else {
                    setSelectedFilter(
                      options.find((option) => option.label === currentValue)
                    );
                  }
                }}
              >
                {option.label}
                <Check
                  className={cn(
                    "ml-auto",
                    selectedFilter?.label == option.label
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="justify-center font-medium text-red-600"
            onSelect={() => {
              // Reinicia el filtro seleccionado
              setSelectedFilter({
                label: "Nombre",
                field: "titulo_modelacion",
              });

              // Limpia el filtro en la tabla
              table.getColumn(selectedFilter.field)?.setFilterValue("");
            }}
          >
            <Trash className="h-4 w-4 text-red-600" /> Limpiar filtro
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const InvestmentsTable = ({
  records,
  additionalColumns = [],
  additionalFilters = [],
}) => {
  // Hooks table

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Columns
  const columns = [
    {
      accessorFn: (row) => row.titulo_modelacion,
      id: "titulo_modelacion",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="capitalize font-light">
          {row.original.titulo_modelacion}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.modelo_de_negocio,
      id: "modelo_de_negocio",
      header: "Modelo de negocio",
      cell: ({ row }) => (
        <div className="capitalize font-light">
          {row.original.modelo_de_negocio}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.vigencia,
      id: "vigencia",
      header: "Vigente",
      cell: ({ row }) => (
        <div className="w-fit flex font-light items-center gap-1 capitalize  px-2 py-1 ring ring-gray-300 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle
              cx="4"
              cy="4"
              r="3"
              className={cn(
                row.original.vigencia ? " fill-green-600" : " fill-red-600"
              )}
            />
          </svg>
          {row.original.vigencia ? "Sí" : "No"}
        </div>
      ),
    },
    {
      accessorKey: "tipo_inmueble",
      header: "Tipo de inmueble",
      cell: ({ row }) => {
        return <div className="font-light">{row.original.tipo_inmueble}</div>;
      },
    },
    {
      accessorFn: (row) => row.precio_de_compra,
      id: "precio_de_compra",
      header: "Precio de compra",
      cell: ({ row }) => (
        <div className="lowercase font-light">
          {parsePrice(row.original.precio_de_compra)}
        </div>
      ),
    },
    {
      accessorKey: "precio_de_mercado",
      header: "Precio de mercado",
      cell: ({ row }) => {
        return (
          <div className="font-light">
            {parsePrice(row.original.precio_de_mercado)}
          </div>
        );
      },
    },
    {
      accessorFn: (row) => row.estado_inmueble,
      id: "estado_inmueble",
      header: "Estado",
      cell: ({ row }) => (
        <div className="w-fit flex font-light items-center gap-1 capitalize  px-2 py-1 ring ring-gray-300 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle
              cx="4"
              cy="4"
              r="3"
              className={cn(
                row.original.estado_inmueble === "Sobre planos"
                  ? " fill-green-600"
                  : " fill-red-600"
              )}
            />
          </svg>
          {row.original.estado_inmueble}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.created_at,
      id: "created_at",
      header: ({ column }) => {
        return (
          <Button
            className="!px-0"
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Fecha de creación
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdAt = new Date(row.original.created_at).toLocaleString(
          "es-GB",
          {
            day: "2-digit",
            month: "short", // Short month (Jan, Feb, Mar, etc.)
            year: "numeric",
          }
        );

        return <div className="font-light">{createdAt}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Link
          to={`/analysis/${row.original.id}`}
          className={buttonVariants({
            variant: "ghost",
            className: "text-invertiria-2 hover:text-invertiria-2 flex",
          })}
        >
          Ver
          <span className="sr-only">Ver</span>
        </Link>
      ),
    },
  ];

  // Add additional columns
  if (additionalColumns.length > 0) columns.unshift(...additionalColumns);

  // Table
  const table = useReactTable({
    data: records,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  // Filter options
  const filterOptions = [
    {
      field: "titulo_modelacion",
      label: "Nombre",
    },
    {
      field: "modelo_de_negocio",
      label: "Modelo de negocio",
    },
    {
      field: "tipo_inmueble",
      label: "Tipo de inmueble",
    },
  ];

  // Add filter options
  if (additionalFilters.length > 0) filterOptions.push(...additionalFilters);

  return (
    <div>
      <FilterSection table={table} options={filterOptions} />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between px-4">
        <div className="ml-auto flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Filas por página
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsTable;
