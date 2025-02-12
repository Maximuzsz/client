import { Cliente } from "@/types/clientes";
import { api } from "./api";

export async function ClienteRequest() {
    try {
      const token = JSON.parse(localStorage.getItem('token')|| 'null');
      
        const response = await api.get('/cliente',{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status ==200) {
          const clientes: Cliente[] = await response.data;
          return clientes;
        } else {
          console.error('Erro ao buscar clientes:', await response.data());
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
    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    const response = await api.put(`/cliente/update${cliente.cliente_id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status == 200) {
      return await response.data; // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao atualizar cliente.');
    }
  } catch (error) {
    alert(error)
    throw new Error('Ocorreu um erro ao atualizar o cliente. Por favor, tente novamente mais tarde.');
  }
}



export async function ClienteCreate(cliente: Cliente) {
  try {
    const data = {
      nome: cliente.nome,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      usuario_id:JSON.parse(localStorage.getItem('id') || 'null')
    };
    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    const response = await api.post('/cliente',  data,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status == 200 || response.status == 201) {
      return await response.data; // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao cadastrar cliente.');
    }
  } catch (error) {
    alert(error)
    throw new Error('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente mais tarde.');
  }
}
