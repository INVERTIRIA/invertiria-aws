import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
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

const FilterSection = ({ table, options }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    label: "Email",
    field: "email",
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
                      label: "Email",
                      field: "email",
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
                label: "Email",
                field: "email",
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

const InvestorsTable = ({ records }) => {
  // Hooks table
  const { user } = useAuth();

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
      accessorFn: (row) => row.usuario.nombre,
      id: "nombre",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="capitalize font-light">
          {row.original.usuario.nombre}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.usuario.apellidos,
      id: "apellidos",
      header: "Apellidos",
      cell: ({ row }) => (
        <div className="capitalize font-light">
          {row.original.usuario.apellidos}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.usuario.email,
      id: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="!px-0"
            onClick={() => {
              console.log(column.getIsSorted());
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase font-light">{row.original.usuario.email}</div>
      ),
    },
    {
      accessorKey: "telefono",
      header: "Télefono",
      cell: ({ row }) => {
        return (
          <div className="font-light">{row.original.usuario.telefono}</div>
        );
      },
    },
    {
      accessorFn: (row) => row.usuario.activo,
      id: "activo",
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
                row.original.usuario.activo
                  ? " fill-green-600"
                  : " fill-red-600"
              )}
            />
          </svg>
          {row.original.usuario.activo ? "Activo" : "Inactivo"}
        </div>
      ),
    },
    {
      accessorKey: "fecha_de_nacimiento",
      header: "Fecha de nacimiento",
      cell: ({ row }) => {
        return (
          <div className="font-light">
            {row.original.usuario.fecha_de_nacimiento}
          </div>
        );
      },
    },
    {
      accessorKey: "ciudad",
      header: "Ciudad",
      cell: ({ row }) => (
        <div className="capitalize font-light">
          {row.original.usuario.ciudad}
        </div>
      ),
    },
    {
      accessorFn: (row) => row.usuario.created_at,
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
        const createdAt = new Date(
          row.original.usuario.created_at
        ).toLocaleString("es-GB", {
          day: "2-digit",
          month: "short", // Short month (Jan, Feb, Mar, etc.)
          year: "numeric",
        });

        return <div className="font-light">{createdAt}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Link
          to={`/${user?.user_metadata.role}/investors/${row.original.usuario.id}`}
          className={buttonVariants({
            variant: "ghost",
            className: "text-invertiria-2 hover:text-invertiria-2 flex",
          })}
        >
          Ingresar
          <span className="sr-only">Ingresar</span>
        </Link>
      ),
    },
  ];

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

  // Functions

  // Varibles
  const filterOptions = [
    {
      field: "email",
      label: "Email",
    },
    {
      field: "nombre",
      label: "Nombre",
    },
    {
      field: "apellidos",
      label: "Apellidos",
    },
  ];

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
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
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

export default InvestorsTable;
