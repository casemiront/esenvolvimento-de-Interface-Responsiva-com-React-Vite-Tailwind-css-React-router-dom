import { books, clients, rentals } from '../data/mockData';

const sorted = {
  mostRented: [...books].sort((a, b) => b.rentCount - a.rentCount),
  leastRented: [...books].sort((a, b) => a.rentCount - b.rentCount),
  mostSold: [...books].sort((a, b) => b.salesCount - a.salesCount),
  topClients: [...clients].sort((a, b) => (b.totalRentals + b.totalPurchases) - (a.totalRentals + a.totalPurchases)),
};

function BookRankRow({ book, rank, metric, metricLabel }) {
  const maxVal = 203; // max in dataset
  const pct = Math.max(4, (book[metric] / maxVal) * 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #D4C5A9' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: '#D4C5A9', width: 36, flexShrink: 0, lineHeight: 1 }}>
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: '#1A1410', marginBottom: 2 }}>
          {book.title}
        </div>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355', marginBottom: 8 }}>
          {book.author}
        </div>
        {/* Bar */}
        <div style={{ height: 3, background: '#D4C5A9', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            height: '100%',
            width: `${pct}%`,
            background: rank === 1 ? '#C1440E' : rank === 2 ? '#8B6914' : '#5C3D2E',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
      <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 18, fontWeight: 700, color: '#1A1410', width: 60, textAlign: 'right', flexShrink: 0 }}>
        {book[metric]}
        <div style={{ fontSize: 8, fontWeight: 400, color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{metricLabel}</div>
      </div>
    </div>
  );
}

function Section({ title, eyebrow, children }) {
  return (
    <div className="book-card" style={{ padding: 28, marginBottom: 24 }}>
      <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
        {eyebrow}
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: '#1A1410', marginBottom: 20 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Relatorios() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <div className="mb-8">
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
          Análise
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: '#1A1410', lineHeight: 1 }}>
          Relatórios
        </h2>
        <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: '#8B7355', marginTop: 6 }}>
          Rankings e controle de desempenho do acervo
        </p>
      </div>

      {/* Overview stats — minimal, editorial */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginBottom: 32, background: '#D4C5A9' }}>
        {[
          { value: books.length, label: 'Títulos no Acervo' },
          { value: clients.length, label: 'Clientes Ativos' },
          { value: rentals.length, label: 'Aluguéis Ativos' },
          { value: rentals.filter(r => r.overdue).length, label: 'Em Atraso', highlight: true },
        ].map(({ value, label, highlight }) => (
          <div key={label} style={{ background: '#FAF7F0', padding: '20px 24px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: highlight && value > 0 ? '#C1440E' : '#1A1410', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#8B7355', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Most rented */}
        <Section eyebrow="Ranking" title="Mais Alugados">
          {sorted.mostRented.slice(0, 5).map((b, i) => (
            <BookRankRow key={b.id} book={b} rank={i + 1} metric="rentCount" metricLabel="aluguéis" />
          ))}
        </Section>

        {/* Most sold */}
        <Section eyebrow="Ranking" title="Mais Vendidos">
          {sorted.mostSold.slice(0, 5).map((b, i) => (
            <BookRankRow key={b.id} book={b} rank={i + 1} metric="salesCount" metricLabel="vendas" />
          ))}
        </Section>
      </div>

      {/* Least rented — promotion candidates */}
      <Section eyebrow="Promoção" title="Pouco Alugados — Candidatos a Promoção">
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355', marginBottom: 16, lineHeight: 1.8 }}>
          Livros com baixo índice de aluguel. Considere promoção de venda.
        </div>
        {sorted.leastRented.filter(b => b.type !== 'sale').slice(0, 3).map((b, i) => (
          <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #D4C5A9' }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: '#1A1410' }}>{b.title}</div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>{b.author} · {b.rentCount} aluguéis totais</div>
            </div>
            <button style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 12px', background: '#C1440E', color: '#F5F0E8', border: 'none', cursor: 'pointer' }}>
              Iniciar Promoção
            </button>
          </div>
        ))}
      </Section>

      {/* Top clients */}
      <Section eyebrow="Clientes" title="Melhores Clientes — Notificar Primeiro">
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355', marginBottom: 16, lineHeight: 1.8 }}>
          Clientes com maior volume de aluguéis e compras. Notificar sobre promoções prioritariamente.
        </div>
        {sorted.topClients.map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #D4C5A9' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: '#D4C5A9', width: 28 }}>{i + 1}</div>
            <div className="flex-1">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: '#1A1410' }}>{c.name}</div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B7355' }}>
                {c.totalRentals} aluguéis · {c.totalPurchases} compras
              </div>
            </div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 16, fontWeight: 700, color: '#1A1410' }}>
              {c.totalRentals + c.totalPurchases}
              <span style={{ fontSize: 8, color: '#8B7355', display: 'block', textAlign: 'right', textTransform: 'uppercase' }}>total</span>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
