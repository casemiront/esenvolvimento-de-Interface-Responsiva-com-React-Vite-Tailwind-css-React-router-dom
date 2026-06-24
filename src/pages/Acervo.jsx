import { useState } from 'react';
import { books } from '../data/mockData';

const typeLabel = { both: 'Venda & Aluguel', sale: 'Venda', rent: 'Aluguel' };
const subjects = ['Todos', ...new Set(books.map(b => b.subject))];

function BookCard({ book }) {
  const [open, setOpen] = useState(false);
  const isUnavailable = book.available === 0;

  return (
    <div
      className="book-card cursor-pointer transition-all duration-200"
      style={{ padding: 0, overflow: 'hidden' }}
      onClick={() => setOpen(!open)}
    >
      {/* Card header — library catalog style */}
      <div className="card-texture" style={{ padding: '16px 20px', borderBottom: open ? '1px solid #D4C5A9' : 'none' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* ISBN */}
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', marginBottom: 4 }}>
              ISBN {book.isbn}
            </div>
            {/* Title */}
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#1A1410', lineHeight: 1.2, marginBottom: 2 }}>
              {book.title}
            </h3>
            {/* Author */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#5C3D2E', fontStyle: 'italic', marginBottom: 8 }}>
              {book.author}
            </div>
            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={book.type === 'sale' ? 'badge-sale' : book.type === 'rent' ? 'badge-rent' : 'badge-reserved'}>
                {typeLabel[book.type]}
              </span>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>
                {book.origin === 'importado' ? '🌐 Importado' : '🇧🇷 Nacional'}
              </span>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>
                {book.subject}
              </span>
            </div>
          </div>

          {/* Availability stamp */}
          <div className="flex-shrink-0 text-right">
            <div
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 11,
                fontWeight: 700,
                color: isUnavailable ? '#C1440E' : '#5C3D2E',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {isUnavailable ? 'Indisponível' : `${book.available} disp.`}
            </div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#D4C5A9', marginTop: 2 }}>
              de {book.quantity} exemplares
            </div>
            {book.reserved && (
              <div className="badge-reserved" style={{ marginTop: 6, display: 'inline-block' }}>Reservado</div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded detail — like a library card pull-out */}
      {open && (
        <div style={{ padding: '16px 20px', background: '#FAF7F0' }}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3" style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12 }}>
            <div>
              <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Editora</span>
              <span style={{ color: '#1A1410' }}>{book.publisher}</span>
            </div>
            <div>
              <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Ano</span>
              <span style={{ color: '#1A1410' }}>{book.year}</span>
            </div>
            {book.salePrice && (
              <div>
                <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Preço de Venda</span>
                <span style={{ color: '#1A1410' }}>R$ {book.salePrice.toFixed(2)}</span>
              </div>
            )}
            {book.rentPrice && (
              <div>
                <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Preço de Aluguel</span>
                <span style={{ color: '#1A1410' }}>R$ {book.rentPrice.toFixed(2)} / 2 sem.</span>
              </div>
            )}
            {book.renewPrice && (
              <div>
                <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Taxa de Renovação</span>
                <span style={{ color: '#1A1410' }}>R$ {book.renewPrice.toFixed(2)}</span>
              </div>
            )}
            <div>
              <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Aluguéis totais</span>
              <span style={{ color: '#1A1410' }}>{book.rentCount}</span>
            </div>
            <div>
              <span style={{ color: '#8B6914', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Vendas totais</span>
              <span style={{ color: '#1A1410' }}>{book.salesCount}</span>
            </div>
          </div>
          {book.rentedBy && (
            <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(193, 68, 14, 0.06)', borderLeft: '2px solid #C1440E' }}>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#C1440E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Alugado para: {book.rentedBy}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Acervo() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search);
    const matchSubject = subject === 'Todos' || b.subject === subject;
    const matchType = typeFilter === 'all' || b.type === typeFilter || (typeFilter === 'both' && b.type === 'both');
    return matchSearch && matchSubject && matchType;
  });

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      {/* Page header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
            Catálogo
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#1A1410', lineHeight: 1 }}>
            Acervo
          </h2>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#8B7355', marginTop: 6 }}>
            {books.length} títulos cadastrados
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#1A1410',
            color: '#F5F0E8',
            fontFamily: "'Courier Prime', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.target.style.background = '#C1440E'}
          onMouseOut={e => e.target.style.background = '#1A1410'}
        >
          + Cadastrar Livro
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && (
        <div className="book-card mb-8" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#1A1410' }}>
            Novo Cadastro
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'ISBN', placeholder: '978-xx-xxx-xxxx-x' },
              { label: 'Título', placeholder: 'Nome do livro' },
              { label: 'Editora', placeholder: 'Nome da editora' },
              { label: 'Autor', placeholder: 'Nome do autor' },
              { label: 'Ano de Publicação', placeholder: '2024' },
              { label: 'Assunto', placeholder: 'Ex: Banco de Dados' },
              { label: 'Quantidade', placeholder: '1' },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  {label}
                </label>
                <input className="lib-input" placeholder={placeholder} />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Tipo
              </label>
              <select className="lib-input">
                <option value="both">Venda e Aluguel</option>
                <option value="sale">Somente Venda</option>
                <option value="rent">Somente Aluguel</option>
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Origem
              </label>
              <select className="lib-input">
                <option value="nacional">Nacional</option>
                <option value="importado">Importado</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
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

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <input
          className="lib-input"
          style={{ maxWidth: 260 }}
          placeholder="Buscar por título, autor ou ISBN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="lib-input"
          style={{ maxWidth: 180 }}
          value={subject}
          onChange={e => setSubject(e.target.value)}
        >
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>
        <div className="flex gap-1">
          {[['all', 'Todos'], ['sale', 'Venda'], ['rent', 'Aluguel'], ['both', 'Ambos']].map(([val, lab]) => (
            <button
              key={val}
              onClick={() => setTypeFilter(val)}
              style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                border: '1px solid #D4C5A9',
                background: typeFilter === val ? '#1A1410' : 'transparent',
                color: typeFilter === val ? '#F5F0E8' : '#8B7355',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {lab}
            </button>
          ))}
        </div>
      </div>

      {/* Book list */}
      <div className="space-y-3">
        {filtered.map(book => <BookCard key={book.id} book={book} />)}
        {filtered.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: "'Courier Prime', monospace", color: '#D4C5A9', fontSize: 13 }}>
            Nenhum título encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
