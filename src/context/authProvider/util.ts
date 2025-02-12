import { api } from "@/api/api";
import { IUser } from "./types";


export function setUserLocalStorage(user: IUser | null) {
    if (user) {
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('id', JSON.stringify(user.id));
        localStorage.setItem('username', JSON.stringify(user.username));
        localStorage.setItem('empresa_id', JSON.stringify(user.empresa_id));
    } else {
        // Limpa os itens relacionados ao usuário no localStorage se user for null
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('empresa_id');
    }
}


export function getUserLocalStorage () {
    const json = localStorage.getItem('u');
    if(!json) {
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(username: string, senha: string) {
    try {
        const data ={
            "userName": username,
            "password": senha
        }
        const response = await api.post('/login',data)
        return response.data;
    } catch (error) {
        alert(error);
        console.error('Erro no login:', error);
        throw new Error('Ocorreu um erro ao fazer o login. Por favor, tente novamente mais tarde.');
    }
}