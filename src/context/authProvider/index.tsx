import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";


export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if(user) {
            setUser(user);
        }
    }, [])

    async function authenticate(username: string, senha: string) {
        const response = await LoginRequest(username, senha);
        if(response != null){
            const payload = {token:response.token, nome:response.nome, id: response.id, empresa_id: response.empresa_id}
            setUser(payload);

            setUserLocalStorage(payload);
        }
        
    }

    function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user,authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}