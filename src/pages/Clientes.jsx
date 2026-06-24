import { useState } from 'react';
import { clients } from '../data/mockData';

function ClientRow({ client }) {
  const [open, setOpen] = useState(false);
  const atLimit = client.activeRentals >= 3;

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-6 py-4 cursor-pointer hover:bg-amber-50 transition-colors"
        style={{ borderBottom: '1px solid #D4C5A9', paddingLeft: 20, paddingRight: 20 }}
      >
        {/* Client number */}
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#D4C5A9', width: 28, flexShrink: 0 }}>
          #{String(client.id).padStart(3, '0')}
        </div>

        {/* Name + CPF */}
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#1A1410' }}>
            {client.name}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355', marginTop: 2 }}>
            CPF {client.cpf}
          </div>
        </div>

        {/* Phone */}
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, color: '#5C3D2E', width: 140, flexShrink: 0 }}>
          {client.phone}
        </div>

        {/* Rentals status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 0,
                  background: i < client.activeRentals ? (atLimit ? '#C1440E' : '#5C3D2E') : '#D4C5A9',
                }}
              />
            ))}
          </div>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: atLimit ? '#C1440E' : '#8B7355' }}>
            {client.activeRentals}/3
          </span>
        </div>

        {/* Stats */}
        <div className="text-right flex-shrink-0">
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914' }}>
            {client.totalRentals} aluguéis · {client.totalPurchases} compras
          </div>
        </div>
      </div>

      {/* Expanded */}
      {open && (
        <div style={{ padding: '16px 20px 16px 68px', background: '#FAF7F0', borderBottom: '1px solid #D4C5A9' }}>
          <div className="grid grid-cols-3 gap-4" style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12 }}>
            <div>
              <span style={{ fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>RG</span>
              {client.rg}
            </div>
            <div>
              <span style={{ fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Nascimento</span>
              {new Date(client.birthDate).toLocaleDateString('pt-BR')}
            </div>
            <div>
              <span style={{ fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>E-mail</span>
              {client.email || '—'}
            </div>
            <div className="col-span-2">
              <span style={{ fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Endereço</span>
              {client.address}
            </div>
            <div>
              <span style={{ fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Homepage</span>
              {client.homepage || '—'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.cpf.includes(search)
  );

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
            Cadastro
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#1A1410', lineHeight: 1 }}>
            Clientes
          </h2>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#8B7355', marginTop: 6 }}>
            {clients.length} clientes registrados
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onMouseOver={e => e.target.style.background = '#C1440E'}
          onMouseOut={e => e.target.style.background = '#1A1410'}
        >
          + Novo Cliente
        </button>
      </div>

      {/* New Client Form */}
      {showForm && (
        <div className="book-card mb-8" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#1A1410' }}>
            Ficha de Cadastro
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nome Completo', placeholder: 'Nome completo do cliente', required: true },
              { label: 'CPF', placeholder: '000.000.000-00', required: true },
              { label: 'RG', placeholder: '00.000.000-0' },
              { label: 'Data de Nascimento', placeholder: 'DD/MM/AAAA', required: true },
              { label: 'Telefone Principal', placeholder: '(00) 00000-0000', required: true },
              { label: 'Telefone Secundário', placeholder: '(00) 00000-0000' },
              { label: 'E-mail', placeholder: 'email@exemplo.com' },
              { label: 'Homepage', placeholder: 'www.exemplo.com' },
            ].map(({ label, placeholder, required }) => (
              <div key={label}>
                <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: required ? '#C1440E' : '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  {label}{required && ' *'}
                </label>
                <input className="lib-input" placeholder={placeholder} />
              </div>
            ))}
            <div className="col-span-2">
              <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#C1440E', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Endereço Completo *
              </label>
              <input className="lib-input" placeholder="Rua, número, bairro, cidade - UF" />
            </div>
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#D4C5A9', marginTop: 8 }}>
            * Campos obrigatórios
          </div>
          <div className="flex gap-3 mt-4">
            <button style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', border: 'none', cursor: 'pointer' }}>
              Salvar
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{ background: 'transparent', color: '#8B7355', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', border: '1px solid #D4C5A9', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          className="lib-input"
          style={{ maxWidth: 320 }}
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table header */}
      <div
        className="flex items-center gap-6"
        style={{
          padding: '8px 20px',
          background: '#1A1410',
          fontFamily: "'Courier Prime', monospace",
          fontSize: 9,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#8B6914',
        }}
      >
        <div style={{ width: 28, flexShrink: 0 }}>#</div>
        <div className="flex-1">Cliente</div>
        <div style={{ width: 140, flexShrink: 0 }}>Telefone</div>
        <div style={{ flexShrink: 0 }}>Aluguéis Ativos</div>
        <div style={{ flexShrink: 0 }}>Histórico</div>
      </div>

      {/* Client list */}
      <div className="book-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filtered.map(client => <ClientRow key={client.id} client={client} />)}
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'Courier Prime', monospace", color: '#D4C5A9', fontSize: 13 }}>
            Nenhum cliente encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
