import { CaixaCreate, CaixaRequest, CaixaUpdate } from "@/api/caixaService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Caixa } from "@/types/caixa";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import React from "react";
import CaixaModal from "./caixaModal/page";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CaixaDiario() {
    const [caixaDiario, setCaixaDiario] = React.useState<Caixa[]>([]);
    const [selectedCaixa, setSelectedCaixa] = React.useState<Caixa | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const handleEditCliente = (caixa: Caixa) => {
      setSelectedCaixa(caixa);
      setIsModalOpen(true);
    };

    const handleNewCaixa = () => {
      setSelectedCaixa(null); // Limpar cliente selecionado para novo cadastro
      setIsModalOpen(true);
    };

    const handleSaveCaixa = async (caixaData: Caixa) => {
      try {
        if (selectedCaixa) {
          await CaixaUpdate(caixaData);
        } else {
          await CaixaCreate(caixaData);
        }
  
        // Recarrega a lista de clientes após salvar
        const caixasData = await CaixaRequest();
        setCaixaDiario(caixasData || []);
        setIsModalOpen(false); // Fecha a modal após salvar
      } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        alert("Ocorreu um erro ao salvar o cliente.");
      }
    };
    



    React.useEffect(() => {
        const fetchCaixa = async () => {
          try {
            const caixaData = await CaixaRequest();
            setCaixaDiario(caixaData || []);
          } catch (error) {
            console.error("Erro ao buscar valores de caixa:", error);
            alert("Ocorreu um erro ao buscar os valores de caixa.");
          }
        };
    
        fetchCaixa();
    }, []);


    const columns: ColumnDef<Caixa>[] = [
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
          accessorKey: "valorentrada",
          header: "Valor Inicial",
          cell: ({ row }) => {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(row.getValue("valorentrada"));
          }
        },
        {
          accessorKey: "dataLancamento",
          header: "Data",
          cell: ({ row }) =>{
            return new Date(row.getValue("dataLancamento")).toLocaleDateString("pt-BR");
          }
        },
        
        {
            accessorKey: "valorCartaoMaquina1",
            header: "Maquina Geo",
            cell: ({ row }) =>  {
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(row.getValue("valorCartaoMaquina1"));
            },
        },
        {
            accessorKey: "valorCartaoMaquina2",
            header: "Maquina Leão",
            cell: ({ row }) =>  {
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(row.getValue("valorCartaoMaquina2"));
            },
        },
        {
            accessorKey: "valorDinheiro",
            header: "Valor Dinheiro",
            cell: ({ row }) =>  {
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(row.getValue("valorDinheiro"));
            },
        },
        {
          accessorKey: "valorPix",
          header: "Valor Pix",
          cell: ({ row }) =>  {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(row.getValue("valorPix"));
          },
        },
        {
          accessorKey: "valorFinal",
          header: "Valor Final",
          cell: ({ row }) => {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(row.getValue("valorFinal"));
          },
        },
        {
          accessorKey: "saida",
          header: "Valor Saida",
          cell: ({ row }) =>  {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(row.getValue("saida"));
          },
        },
        {
          accessorKey: "totalDiario",
          header: "TotalDiário",
          cell: ({ row }) =>  {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(row.getValue("totalDiario"));
          },
        },
        {
          header: "Editar",
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => (
            <Button variant="outline" onClick={() => handleEditCliente(row.original)}>
              <Edit2Icon />
            </Button>
          ),
        },
    ]

    const table = useReactTable({
      data: caixaDiario,
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

    return(
      <div className="w-full p-4">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar por data..."
            className="max-w-sm"
          />
          <Button onClick={handleNewCaixa} className="ml-auto">
            Abrir Caixa
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


        <CaixaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCaixa}
          caixa={selectedCaixa}
        />
      </div>
    )

}


export default CaixaDiario;