import { api } from "./api";

export async function EmpresaRequest() {
    try {
        const response = await api.get('/empresa');
        return response.data;
    } catch (error) {
        alert(error);
        console.error('Erro ao buscar empresas:', error);
        throw new Error('Ocorreu um erro ao buscar empresas. Por favor, tente novamente mais tarde.');
    }
}


