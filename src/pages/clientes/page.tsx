"use client";

import { ClienteCreate, ClienteRequest, ClienteUpdate } from '@/api/clientesService';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cliente } from '@/types/clientes';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import * as React from "react";
import ClienteModal from './clienteModal/page';
import { ListBulletIcon } from '@radix-ui/react-icons';

export function Clientes() {
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedCliente, setSelectedCliente] = React.useState<Cliente | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await ClienteRequest();
        setClientes(clientesData || []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Ocorreu um erro ao buscar os clientes.");
      }
    };

    fetchClientes();
  }, []);

  const handleNewClient = () => {
    setSelectedCliente(null); // Limpar cliente selecionado para novo cadastro
    setIsModalOpen(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleSaveCliente = async (clienteData: Cliente) => {
    try {
      if (selectedCliente) {
        // Se um cliente está sendo editado, atualiza o cliente
        await ClienteUpdate(clienteData);
      } else {
        await ClienteCreate(clienteData);
       
      }

      // Recarrega a lista de clientes após salvar
      const clientesData = await ClienteRequest();
      setClientes(clientesData || []);
      setIsModalOpen(false); // Fecha a modal após salvar
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Ocorreu um erro ao salvar o cliente.");
    }
  };

  const columns: ColumnDef<Cliente>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => row.getValue("nome"),
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      cell: ({ row }) => row.getValue("cpf"),
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
      cell: ({ row }) => row.getValue("telefone") || "N/A",
    },
    {
      accessorKey: "endereco",
      header: "Endereço",
      cell: ({ row }) => row.getValue("endereco") || "N/A",
    },
    {
      header: "Contas",
      id: "contas",
      enableHiding: false,
      cell: ({ row }) => (
        <Button variant="outline" onClick={() => handleEditCliente(row.original)}>
          <ListBulletIcon />
        </Button>
        
      ),
    },
    {
      header: "Editar",
      id: "editar",
      enableHiding: false,
      cell: ({ row }) => (
        <Button variant="outline" onClick={() => handleEditCliente(row.original)}>
          <Edit2Icon />
        </Button>
        
      ),
    },
    
  ];

  const table = useReactTable({
    data: clientes,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
    },
  });

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={handleNewClient} className="ml-auto">
          Cadastrar Novo Cliente
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground flex-1">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>

      {/* Modal para cadastro/edição de cliente */}
      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCliente}
        cliente={selectedCliente}
      />
      
    </div>
  );
}

export default Clientes;
