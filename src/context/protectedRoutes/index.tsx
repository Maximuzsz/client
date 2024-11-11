
import { useAuth } from "../authProvider/useAuth";



export const ProtectedRoutes = ({ children }: {children: JSX.Element}) => {
    const auth = useAuth();

    if(!auth.token) {
        return(
            <h1>Você não tem acesso</h1>
        )
    }
    return children;
}   