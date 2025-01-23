import { User } from "@/types/user";
import { api } from "./api";

export async function LoginRequest(username: string, senha: string) {
    try {
        const data ={
            "userName": username,
            "password": senha
        }
        const response = await api.post('/login',data)
        console.log(response.status)
        return response.data;
    } catch (error) {
        alert(error);
        console.error('Erro no login:', error);
        throw new Error('Ocorreu um erro ao fazer o login. Por favor, tente novamente mais tarde.');
    }
}


export async function UserCreate(user: User) {
    try {
        const data = {
            "name": user.name,
            "userName": user.username,
            "password": user.password,
            "empresa_id": user.empresa_id
          }
        const response = await api.post('logon',data)
        return response.data;
    } catch (error) {
        alert(error);
        console.error('Erro ao cadastrar usuario:', error);
        throw new Error('Ocorreu um erro ao cadastrar usuario. Por favor, tente novamente mais tarde.');
    }
}


