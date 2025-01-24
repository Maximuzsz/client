export const ProtectedRoutes = ({ children }: {children: JSX.Element}) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return(
            <h1>Você não tem acesso</h1>
        )
    }
    return children;
}   