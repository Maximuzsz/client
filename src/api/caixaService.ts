import { Caixa } from "@/types/caixa";

export async function CaixaRequest() {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await fetch('http://localhost:3000/caixa', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const caixa: Caixa[] = await response.json();
          return caixa;
        } else {
          console.error('Erro ao buscar valor do caixa:', await response.text());
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
    
    const response = await fetch(`http://localhost:3000/caixa`, { // Altere a URL para o endpoint de criação
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

    const response = await fetch(`http://localhost:3000/caixa/update${caixa.caixa_id}`, {
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
      throw new Error('Erro ao atualizar caixa.');
    }
  } catch (error) {
    console.error('Erro ao atualizar caixa:', error);
    throw new Error('Ocorreu um erro ao atualizar o caixa. Por favor, tente novamente mais tarde.');
  }
}