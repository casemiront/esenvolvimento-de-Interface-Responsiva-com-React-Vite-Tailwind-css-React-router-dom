import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Acervo from './pages/Acervo';
import Clientes from './pages/Clientes';
import Alugueis from './pages/Alugueis';
import Reservas from './pages/Reservas';
import Relatorios from './pages/Relatorios';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Acervo />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="alugueis" element={<Alugueis />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
