export interface Pedido {
    id: string; // ID do pedido no MongoDB
    clienteId: string; // ID do cliente que fez o pedido
    produtos: {
      produtoId: string;
      quantidade: number;
    }[];
    valorPago: number; // Valor já pago pelo cliente
    status: 'pendente' | 'processando' | 'concluido' | 'cancelado'; // Status do pedido
    createdAt: string; // Data de criação do pedido
    updatedAt: string; // Última atualização do pedido
}