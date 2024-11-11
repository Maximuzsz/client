import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Produto } from "@/types/produto";
import { useEffect, useState } from "react";

interface ProdutoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (produtoData: Produto) => void;
    produto?: Produto | null;
}

export default function ProdutoModal({ isOpen, onClose, onSave, produto }: ProdutoModalProps) {
    const [produto_id, setProduto_id] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco]  = useState(0);
    const [status, setStatus] = useState('');

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
        onSave(produtoData);
        onClose(); // Fecha a modal após salvar
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
              <CardHeader>
                <h2 className="text-2xl font-semibold text-center">
                  {produto ? 'Editar Produto' : 'Cadastrar Produto'}
                </h2>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
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
                </form>
              </CardContent>
            </Card>
          </div>
        </Modal>
    );
}
