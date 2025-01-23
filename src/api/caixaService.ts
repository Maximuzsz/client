import { Caixa } from "@/types/caixa";
import { api } from "./api";

export async function CaixaRequest() {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await api.get('/caixa', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status ==200) {
          const caixa: Caixa[] = await response.data;
          return caixa;
        } else {
          console.error('Erro ao buscar valor do caixa:',  response.status);
          return null;
        }
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar valores do caixa:', error);
        throw new Error('Ocorreu um erro ao buscar valores do caixa. Por favor, tente novamente mais tarde.');
    }
}


export async function CaixaCreate(caixa: Caixa) {
  try {
    const data = {
      valorCartaoMaquina1: caixa.valorCartaoMaquina1,
      valorCartaoMaquina2: caixa.valorCartaoMaquina2,
      valorDinheiro: caixa.valorDinheiro,
      valorPix: caixa.valorPix,
      valorentrada: caixa.valorentrada,
      valorFinal: caixa.valorPix,
      saida: caixa.saida,
      totalDiario:caixa.totalDiario,
      empresa_id: JSON.parse(localStorage.getItem('empresa_id') || 'null'),
      usuario_id: JSON.parse(localStorage.getItem('id') || 'null'),
      fechado: false
    }

    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    
    const response = await api.post(`/caixa`,  data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      return await response.data; // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao cadastrar caixa.');
    }
  } catch (error) {
    throw new Error('Ocorreu um erro ao cadastrar o caixa. Por favor, tente novamente mais tarde.');
  }
}


export async function CaixaUpdate(caixa: Caixa) {
  try {
    const data = {
      valorCartaoMaquina1: caixa.valorCartaoMaquina1,
      valorCartaoMaquina2: caixa.valorCartaoMaquina2,
      valorDinheiro: caixa.valorDinheiro,
      valorPix: caixa.valorPix,
      valorentrada: caixa.valorentrada,
      valorFinal: caixa.valorPix,
      saida: caixa.saida,
      totalDiario:caixa.totalDiario,
      fechado: caixa.fechado
    };

    const token = JSON.parse(localStorage.getItem('token')|| 'null');
    console.log('feschadno')

      const response = await api.put(`/caixa/update${caixa.caixa_id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

    if (response.data) {
      return await response.data // Retorna a resposta caso seja necessária
    } else {
      throw new Error('Erro ao atualizar caixa.');
    }
  } catch (error) {
    console.error('Erro ao atualizar caixa:', error);
    throw new Error('Ocorreu um erro ao atualizar o caixa. Por favor, tente novamente mais tarde.');
  }
}