import { ContaRequest } from "@/api/contaService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Conta } from "@/types/conta";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import React from "react";


interface ContaProps {
    cliente_id: string
}
  
export default function Contas({ cliente_id }: ContaProps) {
    const [contas, setContas] = React.useState<Conta[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [ filter, setfilter] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    

    React.useEffect(() => {
      const fetchClientes = async () => {
        try {
          console.log(cliente_id);
          const clientesData = await ContaRequest();
          console.log(clientesData);
          setContas(clientesData || []);
        } catch (error) {
          console.error("Erro ao buscar contas do cliente:", error);
          alert("Ocorreu um erro ao buscar contas do cliente.");
        }
      };
      fetchClientes();
  }, [cliente_id]);

    const columns: ColumnDef<Conta>[] = [
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
          accessorKey: "nome_cliente",
          header: "Cliente",
          cell: ({ row }) => row.getValue("nome_cliente"),
        },
        {
          accessorKey: "dataCompra",
          header: "Data da Compra",
          cell: ({ row }) =>{
            return new Date(row.getValue("dataCompra")).toLocaleDateString("pt-BR");
          }
        },
        {
          accessorKey: "usuario_name",
          header: "Atendente",
          cell: ({ row }) =>row.getValue("usuario_name")
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => row.getValue("total"),
        },
        {
            accessorKey: "valorPago",
            header: "Valor Pago",
            cell: ({ row }) => row.getValue("valorPago"),
        },
        {
          header: "Editar",
          id: "editar",
          enableHiding: false,
          cell: ({ row }) => (
            <Button variant="outline" >
              <Edit2Icon />
            </Button>
          ),
        },
        
    ];



    const table = useReactTable({
        data: contas,
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
              <select
                    id="filtro"
                    value={filter}
                    onChange={(e) => setfilter(e.target.value)}
                    className=" max-w-sm p-2 border rounded"
              >
                    <option value="" disabled>Selecione o filtro</option>
                    <option value="nome_cliente">Cliente</option>
                    <option value="dataCompra">Data da Compra</option>
              </select>
              <Input
                    placeholder='Filtrar'
                    className="max-w-sm"
                    value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filter)?.setFilterValue(event.target.value)
                    }
                />
              <Button className="ml-auto" >
                Abrir Conta
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
        </div>
    )
    
}