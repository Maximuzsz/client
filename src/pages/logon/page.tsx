'use client';

import { EmpresaRequest } from '@/api/empresaService';
import { Empresa } from '@/types/empresa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { UserCreate } from '@/api/authService';
import { User } from '@/types/user';
import { SuccessAlert } from '@/components/alert-sucess';
import { ErrorAlert } from '@/components/alert-error';
import { useNavigate } from 'react-router-dom';

const Logon: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await EmpresaRequest();
        setEmpresas(response);
      } catch (error) {
        console.error("Erro ao carregar empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const cadastroData: User = { name, username, password, empresa_id: empresaId };

    if (!name || !username || !password || !empresaId) {
      console.error("Por favor, preencha todos os campos.");
      setMensagem("Por favor, preencha todos os campos.")
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    try {
      await UserCreate(cadastroData);
      setShowSuccess(true); // Exibe o alerta de sucesso

      // Oculta o alerta automaticamente após 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      alert(error)
      setMensagem("Erro ao realizar cadastro:")
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
          <h2 className="text-2xl font-semibold text-center">Cadastro</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="userName">Nome de Usuário</Label>
              <Input
                id="userName"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full"
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
              />
            </div>
            <div>
              <Label htmlFor="empresaId">Empresa</Label>
              <Select onValueChange={(value) => setEmpresaId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.empresa_id} value={empresa.empresa_id}>
                        {empresa.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Já possui uma conta? <a onClick={() =>(navigate('/login'))} className="text-blue-500 hover:underline">Entre</a>
          </p>
        </CardFooter>
      </Card>

      {/* Alerta de sucesso no canto inferior direito */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4">
          <SuccessAlert description={mensagem} />
        </div>
      )}
      {showError && (
        <div className="fixed bottom-4 right-4">
          <ErrorAlert description={mensagem} />
        </div>
      )}
    </div>
  );
};

export default Logon;
