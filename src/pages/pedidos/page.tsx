import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import NovoPedidoModal from './pedidoModal/page'; // Importa a modal de novo pedido
import { PedidoRequest } from '@/api/pedidoService';
import { Pedido } from '@/types/pedido';


// Mapeamento do enum para valores legíveis
const statusEnumMap: Record<string, string> = {
  EM_ABERTO: "Em Aberto",
  PAGA: "Paga"
};

const PedidosCliente = () => {
  const { clienteId } = useParams<{ clienteId: string }>();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNovoPedidoModalOpen, setIsNovoPedidoModalOpen] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!clienteId) return;
    const fetchPedidos = async () => {
      const response = await PedidoRequest(clienteId);
      setPedidos(response || []);
      setIsLoading(false);
    };

    fetchPedidos();
  }, [clienteId]);

  const handleOpenNovoPedidoModal = () => {
    setPedidoEditando(null); // Criando um novo pedido
    setIsNovoPedidoModalOpen(true);
  };

  const handleOpenEditarPedidoModal = (pedido: Pedido) => {
    setPedidoEditando(pedido); // Editando um pedido existente
    setIsNovoPedidoModalOpen(true);
  };

  const handleCloseNovoPedidoModal = async () => {
    if (clienteId){
      const response = await PedidoRequest(clienteId);
      setPedidos(response || []);
    }
    setIsNovoPedidoModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-4 text-lg font-medium">Carregando...</div>;
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pedidos do Cliente</CardTitle>
          <Button onClick={handleOpenNovoPedidoModal}>+ Novo Pedido</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor Pago</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.length ? (
                pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{new Date(pedido.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>R$ {pedido.valorPago.toFixed(2)}</TableCell>
                    <TableCell>{statusEnumMap[pedido.status]}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => handleOpenEditarPedidoModal(pedido)}>
                        Editar Pedido
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    Sem pedidos cadastrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* Modal de Novo Pedido / Edição de Pedido */}
      {isNovoPedidoModalOpen && (
        <NovoPedidoModal 
          isOpen={isNovoPedidoModalOpen} 
          onClose={handleCloseNovoPedidoModal}  
          clienteId={clienteId || ''} 
          pedidoExistente= {pedidoEditando || undefined} // Passa o pedido caso esteja editando
        />
      )}
    </Card>
  );
};

export default PedidosCliente;
