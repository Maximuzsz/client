'use client';

import { ErrorAlert } from "@/components/alert-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authProvider/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {
    const { authenticate } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>(''); // Especificando o tipo para o useState
    const [password, setPassword] = useState<string>(''); // Especificando o tipo para o useState
    const [mensagem, setMensagem] = useState<string>(''); // Especificando o tipo para o useState
    const [showError, setShowError] = useState<boolean>(false); // Especificando o tipo para o useState


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => { // Especificando o tipo para o evento
        event.preventDefault();
        
        if (!username || !password) {
            setMensagem("Por favor, preencha todos os campos.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
            return;
        }

        try {
            await authenticate(username, password);
            navigate("/clientes");
        } catch (error) {
            alert(error)
            setMensagem("Erro ao realizar Login");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-center">Login</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="username">Nome de Usuário</Label> {/* Adicionado htmlFor para acessibilidade */}
                            <Input
                                id="username"
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Digite seu nome de Usuário"
                                className="w-full"
                                required // Adicionando requisito de campo
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                className="w-full"
                                required // Adicionando requisito de campo
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                            Entrar
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center">
                    <p className="text-sm text-gray-600">
                        Ainda não tem uma conta? <a onClick={() =>(navigate(`/logon`))} className="text-blue-500 hover:underline">Registre-se</a>
                    </p>
                </CardFooter>
            </Card>
            {showError && (
                <div className="fixed bottom-4 right-4">
                    <ErrorAlert description={mensagem} />
                </div>
            )}
        </div>
    );
}

export default Login;
