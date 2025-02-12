import { Pedido } from "./pedido";

export interface PedidoDetalhado extends Pedido {
    produtos: {
      produtoId: string;
      quantidade: number;
      detalhes?: {
        nome: string;
        preco: number;
        descricao?: string;
      };
    }[];
}
  