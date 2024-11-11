import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Cliente } from '@/types/clientes';
import { useEffect, useState } from 'react';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clienteData: Cliente) => void;
  cliente?: Cliente | null;
}

export default function ClienteModal({ isOpen, onClose, onSave, cliente }: ClienteModalProps) {
  const [cliente_id, setCliente_id] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    if (cliente) {
      setCliente_id(cliente.cliente_id || '');
      setNome(cliente.nome || '');
      setCpf(cliente.cpf || '');
      setTelefone(cliente.telefone || '');
      setEndereco(cliente.endereco || '');
    } else {
      setCliente_id('');
      setNome('');
      setCpf('');
      setTelefone('');
      setEndereco('');
    }
  }, [cliente]);

  const handleSave = () => {
    const clienteData: Cliente = { cliente_id, nome, cpf, telefone, endereco };
    onSave(clienteData);
    onClose(); // Fecha a modal após salvar
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">
              {cliente ? 'Editar Cliente' : 'Cadastrar Cliente'}
            </h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Cliente</Label>
                <Input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome de Usuário"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF/CNPJ</Label>
                <Input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite o CPF/CNPJ"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Digite o telefone"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Digite o Endereço"
                  className="w-full"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave}>
                  {cliente ? 'Salvar Alterações' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}
