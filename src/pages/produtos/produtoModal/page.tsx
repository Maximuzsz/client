import { ProdutoCreate, ProdutoUpdate } from "@/api/produtosService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Produto } from "@/types/produto";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface ProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
}

const ProdutoModal = ({ isOpen, onClose, produto }: ProdutoModalProps) => {
  const [produto_id, setProduto_id] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState(0);
  const [status, setStatus] = useState('');

  const handleSaveProduto = async (produtoData: Produto) => {
    try {
      if (produto_id) {
        await ProdutoUpdate(produtoData);
      } else {
        await ProdutoCreate(produtoData);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Ocorreu um erro ao salvar o produto.");
    }
  };

  useEffect(() => {
    if (produto) {
      setProduto_id(produto.produto_id || '');
      setNomeProduto(produto.nome_produto || '');
      setMarca(produto.marca || '');
      setPreco(produto.preco || 0);
      setStatus(produto.status || '');
    } else {
      setProduto_id('');
      setNomeProduto('');
      setMarca('');
      setPreco(0);
      setStatus('');
    }
  }, [produto]);

  const handleSave = () => {
    const produtoData: Produto = { produto_id, nome_produto: nomeProduto, marca, preco, status };
    handleSaveProduto(produtoData);
    onClose(); // Fecha a modal após salvar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg z-[1000]">
        <DialogHeader >
          <DialogTitle>{produto ? 'Editar Produto' : 'Cadastrar Produto'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome_produto">Nome do Produto</Label>
            <Input
              id="nome_produto"
              type="text"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              placeholder="Digite o nome do produto"
              className="w-full"
              required
            />
          </div>
          <div>
            <Label htmlFor="marca">Marca</Label>
            <Input
              id="marca"
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Digite a marca"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="preco">Preço</Label>
            <Input
              id="preco"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.valueAsNumber)}
              placeholder="Digite o preço"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Selecione o status</option>
              <option value="EM_FALTA">Em falta</option>
              <option value="EM_ESTOQUE">Em estoque</option>
              <option value="PEDIDO">Pedido</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>
              {produto ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ProdutoModal;