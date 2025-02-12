import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Produto } from '@/types/produto';
import { ProdutoRequest } from '@/api/produtosService';
import { PedidoCreate, PedidoUpdate } from '@/api/pedidoService';
import ProdutoModal from '@/pages/produtos/produtoModal/page';
import { Label } from '@/components/ui/label';

interface NovoPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  clienteId: string;
  pedidoExistente?: {
    _id: string;
    produtos: {
      produtoId: string;
      nome_produto: string;
      preco: number;
      quantidade: number;
    }[];
    valorPago: number;
    status: string;
  } | null;
}

interface ProdutoSelecionado {
  produtoId: string;
  nome_produto: string;
  preco: number;
  quantidade: number;
}

const NovoPedidoModal = ({ isOpen, onClose, clienteId, pedidoExistente }: NovoPedidoModalProps) => {
  const [valorPago, setValorPago] = useState('');
  const [status, setStatus] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);
  const [isCadastroProdutoModalOpen, setIsCadastroProdutoModalOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      ProdutoRequest().then((produtos)=> setTodosProdutos(produtos || []));
      console.log(pedidoExistente)
      if (pedidoExistente) {
        setValorPago(pedidoExistente.valorPago.toString());
        setStatus(pedidoExistente.status.toString());
        setProdutosSelecionados(pedidoExistente.produtos);
      } else {
        setValorPago('');
        setProdutosSelecionados([]);
      }
    }
  }, [isOpen, pedidoExistente]);

  useEffect(() => {
    if (!pesquisa.trim()) {
      setProdutosFiltrados([]);
    } else {
      setProdutosFiltrados(
        todosProdutos.filter((produto) =>
          produto.nome_produto.toLowerCase().includes(pesquisa.toLowerCase())
        )
      );
    }
  }, [pesquisa, todosProdutos]);

  const handleAddProduto = (produto: Produto) => {
    setProdutosSelecionados((prev) => {
      if (prev.some((p) => p.produtoId === produto.produto_id)) return prev;
      return [...prev, { produtoId: produto.produto_id, nome_produto: produto.nome_produto, preco: produto.preco, quantidade: 1 }];
    });
  };

  const handleRemoveProduto = (produtoId: string) => {
    setProdutosSelecionados((prev) => prev.filter((p) => p.produtoId !== produtoId));
  };

  const handleQuantidadeChange = (produtoId: string, quantidade: number) => {
    setProdutosSelecionados((prev) =>
      prev.map((p) =>
        p.produtoId === produtoId ? { ...p, quantidade: Math.max(1, quantidade) } : p
      )
    );
  };

  const handleSaveOrUpdatePedido = async () => {
    if (!clienteId || !valorPago || produtosSelecionados.length === 0) return;
    const pedido = {
      clienteId,
      produtos: produtosSelecionados.map(({ produtoId, quantidade }) => ({ produtoId, quantidade })),
      valorPago: parseFloat(valorPago),
      status: status,
    };

    try {
      if (pedidoExistente) {
        await PedidoUpdate(pedidoExistente._id, pedido);
        console.log('Pedido atualizado com sucesso:', pedido);
      } else {
        await PedidoCreate(pedido);
        console.log('Pedido salvo com sucesso:', pedido);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg z-[1000]">
        <DialogHeader>
          <DialogTitle>{pedidoExistente ? 'Editar Pedido' : 'Novo Pedido'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>Selecione o status</option>
            <option value="EM_ABERTO">Em aberto</option>
            <option value="PAGA">Paga</option>
          </select>

          {/* 🔍 Barra de Pesquisa */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Buscar produto..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>

          {/* 📦 Lista de Produtos Encontrados */}
          {produtosFiltrados.length > 0 ? (
            <Table className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosFiltrados.map((produto) => (
                  <TableRow key={produto.produto_id}>
                    <TableCell>{produto.nome_produto}</TableCell>
                    <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => handleAddProduto(produto)}>
                        Adicionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ): (
            pesquisa && (
              <div className="text-gray-500 text-center">
                Nenhum produto encontrado.{' '}
                <Button variant="link" onClick={() => setIsCadastroProdutoModalOpen(true)}>
                  Cadastrar Novo Produto
                </Button>
              </div>
            )
          )}

          {/* 📋 Lista de Produtos Selecionados */}
          {produtosSelecionados.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Produtos Adicionados:</h3>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço Unitário</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtosSelecionados.map((produto) => (
                    <TableRow key={produto.produtoId}>
                      <TableCell>{produto.nome_produto}</TableCell>
                      <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={produto.quantidade}
                          onChange={(e) => handleQuantidadeChange(produto.produtoId, Number(e.target.value))}
                          className="w-16 text-center"
                        />
                      </TableCell>
                      <TableCell>R$ {(produto.preco * produto.quantidade).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveProduto(produto.produtoId)}>
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

        </div>
        <div>
          <Label htmlFor="preco">Valor Pago</Label>
          <Input
            id="valorPago"
            type="number"
            value={valorPago}
            onChange={(e) => setValorPago(e.target.value)}
            placeholder="Digite o valor pago"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveOrUpdatePedido} disabled={!valorPago || produtosSelecionados.length === 0}>
            {pedidoExistente ? 'Atualizar Pedido' : 'Salvar Pedido'}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Modal de Cadastro de Produto */}
      <ProdutoModal
        isOpen={isCadastroProdutoModalOpen}
        onClose={() => setIsCadastroProdutoModalOpen(false)}
      />
    </Dialog>
  );
};

export default NovoPedidoModal;
