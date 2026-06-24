import { useState } from 'react';
import { reservations, books } from '../data/mockData';

export default function Reservas() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
            Fila de Espera
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#1A1410', lineHeight: 1 }}>
            Reservas
          </h2>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#8B7355', marginTop: 6 }}>
            {reservations.length} reserva{reservations.length !== 1 ? 's' : ''} pendente{reservations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onMouseOver={e => e.target.style.background = '#C1440E'}
          onMouseOut={e => e.target.style.background = '#1A1410'}
        >
          + Nova Reserva
        </button>
      </div>

      {showForm && (
        <div className="book-card mb-8" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Registrar Reserva
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Cliente
              </label>
              <input className="lib-input" placeholder="Buscar cliente..." />
            </div>
            <div>
              <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                Livro
              </label>
              <select className="lib-input">
                <option value="">— Selecione um livro indisponível —</option>
                {books.filter(b => b.available === 0).map(b => (
                  <option key={b.id} value={b.id}>{b.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', border: 'none', cursor: 'pointer' }}>
              Reservar
            </button>
            <button onClick={() => setShowForm(false)} style={{ background: 'transparent', color: '#8B7355', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', border: '1px solid #D4C5A9', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Reservations list */}
      {reservations.length === 0 ? (
        <div className="book-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#D4C5A9', fontStyle: 'italic' }}>
            Nenhuma reserva pendente
          </div>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#D4C5A9', marginTop: 8 }}>
            Todos os livros estão disponíveis ou sem fila de espera.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((res, i) => {
            const book = books.find(b => b.id === res.bookId);
            return (
              <div key={res.id} className="book-card" style={{ padding: 24 }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Position in queue */}
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                      Posição na fila: #{i + 1}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1A1410', marginBottom: 4 }}>
                      {res.bookTitle}
                    </h3>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#5C3D2E', marginBottom: 12 }}>
                      Reservado por: <strong>{res.clientName}</strong>
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>
                      Data da reserva: {new Date(res.reservedDate).toLocaleDateString('pt-BR')}
                    </div>
                    {book?.rentedBy && (
                      <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#C1440E', marginTop: 6 }}>
                        Atualmente com: {book.rentedBy}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', background: '#1A1410', color: '#F5F0E8', border: 'none', cursor: 'pointer' }}>
                      Confirmar
                    </button>
                    <button style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', background: 'transparent', color: '#C1440E', border: '1px solid #C1440E', cursor: 'pointer' }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
