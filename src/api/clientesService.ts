import { Cliente } from "@/types/clientes";

export async function ClienteRequest() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/cliente', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYTJiZTM4My0wZTQzLTQ1YTEtYmZlMS01ZWMwMjhmMWU1NGYiLCJ1c2VyTmFtZSI6IlBhdWxvIiwibmFtZSI6IlBhdWxvIFNpbHZhIiwiaWF0IjoxNzMwMjk5OTk5LCJleHAiOjE3MzI4OTE5OTl9.LkaOzY7BRkKOp4WtEt-prFwFaoLbHfeWCnZgxVhnQuU',
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const clientes: Cliente[] = await response.json();
          return clientes;
        } else {
          console.error('Erro ao buscar clientes:', await response.text());
          return null;
        }
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar Clientes:', error);
        throw new Error('Ocorreu um erro ao buscar clientes. Por favor, tente novamente mais tarde.');
    }
}


export async function ClienteUpdate(cliente: Cliente) {
  try {
    console.log(cliente)
    const data = {
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
    };
    console.log(cliente.cliente_id, data);

    const response = await fetch(`http://localhost:3000/cliente/update${cliente.cliente_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYTJiZTM4My0wZTQzLTQ1YTEtYmZlMS01ZWMwMjhmMWU1NGYiLCJ1c2VyTmFtZSI6IlBhdWxvIiwibmFtZSI6IlBhdWxvIFNpbHZhIiwiaWF0IjoxNzMwMjk5OTk5LCJleHAiOjE3MzI4OTE5OTl9.LkaOzY7BRkKOp4WtEt-prFwFaoLbHfeWCnZgxVhnQuU',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json(); // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao atualizar cliente.');
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw new Error('Ocorreu um erro ao atualizar o cliente. Por favor, tente novamente mais tarde.');
  }
}



export async function ClienteCreate(cliente: Cliente) {
  try {
    console.log(cliente);
    const data = {
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      usuario_id:JSON.parse(localStorage.getItem('id') || 'null')
    };
    
    const response = await fetch(`http://localhost:3000/cliente`, { // Altere a URL para o endpoint de criação
      method: 'POST', // Usando POST para criar um novo cliente
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYTJiZTM4My0wZTQzLTQ1YTEtYmZlMS01ZWMwMjhmMWU1NGYiLCJ1c2VyTmFtZSI6IlBhdWxvIiwibmFtZSI6IlBhdWxvIFNpbHZhIiwiaWF0IjoxNzMwMjk5OTk5LCJleHAiOjE3MzI4OTE5OTl9.LkaOzY7BRkKOp4WtEt-prFwFaoLbHfeWCnZgxVhnQuU',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json(); // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao cadastrar cliente.');
    }
  } catch (error) {
    throw new Error('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente mais tarde.');
  }
}
