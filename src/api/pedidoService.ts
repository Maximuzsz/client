import { Pedido } from "@/types/pedido";
import { api } from "./api";



export async function PedidoRequest(cliente_id: string) {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await api.get(`/pedido/${cliente_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status == 200 || response.status ==201) {
          const pedido: Pedido[] =  await response.data;
          return pedido;
        } else {
          console.error('Erro ao buscar pedidos:', response.statusText);
          return null;
        }
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar pedidos:', error);
        throw new Error('Ocorreu um erro ao buscar produtos. Por favor, tente novamente mais tarde.');
    }
}

export async function PedidoCreate(data) {
  try {

    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    
    const response = await api.post(`/pedido`, data,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.status == 200 || response.status ==201) {
      return await response.data; // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao cadastrar produto.');
    }
  } catch (error) {
    throw new Error('Ocorreu um erro ao cadastrar o produto. Por favor, tente novamente mais tarde.');
  }
}

export async function PedidoUpdate(pedido_id: string , data) {
  try {

    const token = JSON.parse(localStorage.getItem('token')|| 'null');

    const response = await api.put(`/pedido/${pedido_id}/pedidoCompleto`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }); 

    if (response.status == 200 || response.status ==201) {
      return await response.data; // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao atualizar produto.');
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error('Ocorreu um erro ao atualizar o produto. Por favor, tente novamente mais tarde.');
  }
}