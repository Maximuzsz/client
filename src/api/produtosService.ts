import { Caixa } from "@/types/caixa";
import { Produto } from "@/types/produto";

export async function ProdutoRequest() {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await fetch('http://localhost:3000/produtos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const produtos: Produto[] = await response.json();
          return produtos;
        } else {
          console.error('Erro ao buscar produtos:', await response.text());
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
    
    const response = await fetch(`http://localhost:3000/produtos`, { // Altere a URL para o endpoint de criação
      method: 'POST', // Usando POST para criar um novo cliente
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json(); // Retorna a resposta caso seja necessária
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
      status: produto.status
    };

    const token = JSON.parse(localStorage.getItem('token')|| 'null');

    const response = await fetch(`http://localhost:3000/produtos/update${produto.produto_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json(); // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao atualizar produto.');
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error('Ocorreu um erro ao atualizar o produto. Por favor, tente novamente mais tarde.');
  }
}