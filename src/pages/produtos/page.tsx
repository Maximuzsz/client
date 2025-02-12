import { ProdutoRequest } from "@/api/produtosService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Produto } from "@/types/produto";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import React, { useState } from "react";
import ProdutoModal from "./produtoModal/page";

// Mapeamento do enum para valores legíveis
const statusEnumMap: Record<string, string> = {
    EM_FALTA: "Em Falta",
    EM_ESTOQUE: "Em Estoque",
    PEDIDO: "Pedido"
};


const Produtos: React.FC = () => {

    const [produto, setProduto] = React.useState<Produto[]>([]);
    const [selectedProduto, setSelectedProduto] = React.useState<Produto | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [ filter, setfilter] = useState('');



    React.useEffect(() => {
        const fetchProdutos = async () => {
          try {
            const produto = await ProdutoRequest();
            setProduto(produto || []);
          } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            alert("Ocorreu um erro ao buscar os produtos.");
          }
        };
    
        fetchProdutos();
    }, []);

    const handleEditProduto = (produto: Produto) => {
        setSelectedProduto(produto);
        setIsModalOpen(true);
    };

    const columns: ColumnDef<Produto>[] = [
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
          accessorKey: "nome_produto",
          header: "Produto",
          cell: ({ row }) => row.getValue("nome_produto"),
        },
        {
            accessorKey: "preco",
            header: "Preço",
            cell: ({ row }) => {
              const valor = row.getValue("preco");
              return Number(valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
            },
        },
        {
            accessorKey: "marca",
            header: "Marca",
            cell: ({ row }) => row.getValue("marca"),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status");
                return statusEnumMap[status]; // Mapear o status para o valor legível
            },
        },
        {
          header: "Ações",
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => (
            <Button variant="outline" onClick={() => handleEditProduto(row.original)}>
              <Edit2Icon />
            </Button>
          ),
        },
    ];

    const table = useReactTable({
        data: produto,
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

    const handleNewProduto = () => {
        setSelectedProduto(null); // Limpar produto selecionado para novo cadastro
        setIsModalOpen(true);
    };

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
                    <option value="status">Status</option>
                    <option value="nome_produto">Produto</option>
                    <option value="marca">Marca</option>
                </select>
                <Input
                    placeholder="Filtrar por ..."
                    className="max-w-sm"
                    value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filter)?.setFilterValue(event.target.value)
                    }
                />
                <Button onClick={handleNewProduto} className="ml-auto">
                    Cadastrar Produto
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
            <ProdutoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                produto={selectedProduto}
            />
        </div>
    );
}

export default Produtos;
