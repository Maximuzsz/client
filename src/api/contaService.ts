import { Conta } from "@/types/conta";

export async function ContaRequest() {
    try {
        const token = JSON.parse(localStorage.getItem('token')|| 'null');
        const response = await fetch(`http://localhost:3000/compra`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const conta: Conta[] = await response.json();
          return conta;
        } else {
          console.error('Erro ao buscar contas do cliente:', await response.text());
          return null;
        }
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar contas do cliente:', error);
        throw new Error('Ocorreu um erro ao buscar contas do cliente. Por favor, tente novamente mais tarde.');
    }
}