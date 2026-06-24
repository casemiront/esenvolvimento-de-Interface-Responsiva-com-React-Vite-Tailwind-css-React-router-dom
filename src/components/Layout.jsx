import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Acervo', icon: '◈' },
  { to: '/clientes', label: 'Clientes', icon: '◉' },
  { to: '/alugueis', label: 'Aluguéis', icon: '◫' },
  { to: '/reservas', label: 'Reservas', icon: '◧' },
  { to: '/relatorios', label: 'Relatórios', icon: '◪' },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex" style={{ background: '#F5F0E8' }}>
      {/* Sidebar */}
      <aside className="w-64 min-h-screen flex flex-col" style={{ background: '#1A1410', borderRight: '1px solid #2D2018' }}>
        {/* Logo area */}
        <div className="p-8 pb-6">
          <div className="mb-1" style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: '0.2em', color: '#8B6914', textTransform: 'uppercase' }}>
            Est. 2026
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: '#F5F0E8', lineHeight: 1 }}>
            Book<span style={{ color: '#C1440E' }}>.</span>Net
          </h1>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: '#8B6914', marginTop: 4, letterSpacing: '0.05em' }}>
            Livraria Informática
          </p>
        </div>

        {/* Ruled divider */}
        <div style={{ height: 1, background: '#2D2018', margin: '0 24px' }} />

        {/* Navigation */}
        <nav className="flex-1 py-8 px-6">
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#5C3D2E', textTransform: 'uppercase', marginBottom: 16 }}>
            Navegação
          </div>
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-3 transition-all duration-200 group ${isActive ? 'active' : ''}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#F5F0E8' : '#8B7355',
                    background: isActive ? 'rgba(193, 68, 14, 0.15)' : 'transparent',
                    borderLeft: isActive ? '2px solid #C1440E' : '2px solid transparent',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.02em',
                  })}
                >
                  <span style={{ fontSize: 14, opacity: 0.8 }}>{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom info */}
        <div className="p-6 pt-0">
          <div style={{ height: 1, background: '#2D2018', marginBottom: 16 }} />
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, color: '#5C3D2E', lineHeight: 1.8 }}>
            <div>4.500+ TÍTULOS</div>
            <div>INFORMÁTICA & DEV</div>
            <div>SÃO LUÍS — MA</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
