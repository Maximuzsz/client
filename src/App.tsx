import { Route, Routes } from 'react-router-dom';
import Page from './components/app-sidebar';
import { ProtectedRoutes } from './context/protectedRoutes';
import './index.css';
import { CaixaDiario } from './pages/caixa/page';
import Clientes from './pages/clientes/page';
import Login from './pages/login/page';
import Logon from './pages/logon/page';
import Produtos from './pages/produtos/page';
import Contas from './pages/contas/page';

function App() {
  return (
    <div>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logon" element={<Logon />} />
        
        {/* Páginas protegidas com layout do Page */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoutes>
              <Page>
                <Clientes />
              </Page>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/caixa"
          element={
            <ProtectedRoutes>
              <Page>
                <CaixaDiario />
              </Page>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/produtos"
          element={
            <ProtectedRoutes>
              <Page>
                <Produtos />
              </Page>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/contas"
          element={
            <ProtectedRoutes>
              <Page>
                <Contas cliente_id='' />
              </Page>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
