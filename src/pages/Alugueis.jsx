import { useState } from 'react';
import { rentals } from '../data/mockData';

function daysDiff(dueDate) {
  const today = new Date('2026-06-24');
  const due = new Date(dueDate);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
}

export default function Alugueis() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
            Controle
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#1A1410', lineHeight: 1 }}>
            Aluguéis
          </h2>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#8B7355', marginTop: 6 }}>
            {rentals.filter(r => r.overdue).length} em atraso · {rentals.length} ativos
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onMouseOver={e => e.target.style.background = '#C1440E'}
          onMouseOut={e => e.target.style.background = '#1A1410'}
        >
          + Novo Aluguel
        </button>
      </div>

      {/* New Rental Form */}
      {showForm && (
        <div className="book-card mb-8" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Registrar Aluguel
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Cliente (CPF ou Nome)', placeholder: 'Buscar cliente...' },
              { label: 'Livro (ISBN ou Título)', placeholder: 'Buscar livro...' },
              { label: 'Data de Início', placeholder: 'DD/MM/AAAA' },
              { label: 'Data de Devolução', placeholder: 'DD/MM/AAAA (máx. 14 dias)' },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  {label}
                </label>
                <input className="lib-input" placeholder={placeholder} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(139, 105, 20, 0.06)', borderLeft: '2px solid #8B6914', fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>
            Limite: 3 livros por cliente · Prazo máximo: 14 dias
          </div>
          <div className="flex gap-3 mt-4">
            <button style={{ background: '#1A1410', color: '#F5F0E8', fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', border: 'none', cursor: 'pointer' }}>
              Registrar
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

      {/* Rental list */}
      <div className="space-y-4">
        {rentals.map(rental => {
          const days = daysDiff(rental.dueDate);
          const isOverdue = days < 0;
          const isClose = days >= 0 && days <= 2;

          return (
            <div key={rental.id} className="book-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Status bar */}
              <div style={{
                height: 4,
                background: isOverdue ? '#C1440E' : isClose ? '#8B6914' : '#5C3D2E',
              }} />

              <div style={{ padding: '20px 24px' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Rental ID */}
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#D4C5A9', letterSpacing: '0.15em', marginBottom: 8 }}>
                      FICHA #{String(rental.id).padStart(4, '0')}
                    </div>
                    {/* Book */}
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1A1410', marginBottom: 4 }}>
                      {rental.bookTitle}
                    </h3>
                    {/* Client */}
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#5C3D2E', marginBottom: 12 }}>
                      Cliente: <strong>{rental.clientName}</strong>
                    </div>

                    {/* Dates */}
                    <div className="flex gap-6" style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11 }}>
                      <div>
                        <div style={{ fontSize: 8, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>Início</div>
                        <div>{new Date(rental.startDate).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: '#8B6914', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>Devolução</div>
                        <div style={{ color: isOverdue ? '#C1440E' : '#1A1410', fontWeight: isOverdue ? 700 : 400 }}>
                          {new Date(rental.dueDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side: status + actions */}
                  <div className="text-right flex-shrink-0">
                    {isOverdue ? (
                      <div>
                        <div className="stamp" style={{ display: 'inline-block', padding: '6px 12px', marginBottom: 8 }}>
                          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, fontWeight: 700, color: '#C1440E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            ATRASADO
                          </span>
                        </div>
                        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#C1440E', marginBottom: 8 }}>
                          {Math.abs(days)} dia{Math.abs(days) !== 1 ? 's' : ''} em atraso
                        </div>
                        {rental.fine > 0 && (
                          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, color: '#C1440E', fontWeight: 700 }}>
                            Multa: R$ {rental.fine.toFixed(2)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: isClose ? '#8B6914' : '#5C3D2E', marginBottom: 8 }}>
                          {days} dia{days !== 1 ? 's' : ''} restante{days !== 1 ? 's' : ''}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', background: '#1A1410', color: '#F5F0E8', border: 'none', cursor: 'pointer' }}
                      >
                        Renovar
                      </button>
                      <button
                        style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', background: 'transparent', color: '#5C3D2E', border: '1px solid #D4C5A9', cursor: 'pointer' }}
                      >
                        Devolver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
