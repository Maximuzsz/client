import { Produto } from "@/types/produto";
import { api } from "./api";

export async function ProdutoRequest() {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await api.get('/produtos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status == 200 || response.status ==201) {
          const produtos: Produto[] = await response.data;
          return produtos;
        } else {
          console.error('Erro ao buscar produtos:', response.statusText);
          return null;
        }
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar produtos:', error);
        throw new Error('Ocorreu um erro ao buscar produtos. Por favor, tente novamente mais tarde.');
    }
}


export async function ProdutoCreate(produto: Produto) {
  try {
    const data = {
        nome_produto: produto.nome_produto,
        preco:produto.preco,
        marca: produto.marca,
        status: produto.status,
        usuario_id: JSON.parse(localStorage.getItem('id') || 'null'),
    }

    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    
    const response = await api.post(`/produtos`, data,{
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


export async function ProdutoUpdate(produto: Produto) {
  try {
    const data = {
      preco: produto.preco,
      nome_produto: produto.nome_produto,
      status: produto.status
    };

    const token = JSON.parse(localStorage.getItem('token')|| 'null');

    const response = await api.put(`/produtos/update${produto.produto_id}`, data, {
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