import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const links = [
  { path: '/', label: 'Início' },
  { path: '/faculdades', label: 'Faculdades' },
  { path: '/meu-plano', label: 'Meu Plano' },
  { path: '/perfil', label: 'Perfil' },
]

function EdkraftLogo() {
  return (
    <svg className="navbar-logo-svg" viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftLeg" x1="0.5" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8a817" />
          <stop offset="60%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rightLeg" x1="0.5" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5b723" />
          <stop offset="60%" stopColor="#2dd4a8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* Triangle icon - left leg */}
      <polygon points="18,2 4,36 11,36 18,20" fill="url(#leftLeg)" />
      {/* Triangle icon - right leg */}
      <polygon points="18,2 32,36 25,36 18,20" fill="url(#rightLeg)" />
      {/* Arrow cutout */}
      <polygon points="18,15 15,21 21,21" fill="#0a0a0f" />
      {/* EDKRAFT text - white with subtle stroke for visibility */}
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="0.3">
        {/* E */}
        <path d="M46 10 L46 32 L60 32 L60 28.5 L50.5 28.5 L50.5 22.8 L58.5 22.8 L58.5 19.3 L50.5 19.3 L50.5 13.5 L60 13.5 L60 10 Z" />
        {/* D */}
        <path d="M64 10 L64 32 L73 32 Q80 32 80 21 Q80 10 73 10 Z M68.5 13.5 L72 13.5 Q75.5 13.5 75.5 21 Q75.5 28.5 72 28.5 L68.5 28.5 Z" />
        {/* K */}
        <path d="M84 10 L84 32 L88.5 32 L88.5 23.5 L90 21.5 L96.5 32 L102 32 L93.5 18.5 L101 10 L95.5 10 L88.5 18.5 L88.5 10 Z" />
        {/* R */}
        <path d="M105 10 L105 32 L109.5 32 L109.5 24 L112 24 L117 32 L122 32 L116.5 23.5 Q119.5 22.5 119.5 17 Q119.5 10 113 10 Z M109.5 13.5 L113 13.5 Q115 13.5 115 17 Q115 20.5 113 20.5 L109.5 20.5 Z" />
        {/* A */}
        <path d="M124 32 L128.5 32 L130 27 L138 27 L139.5 32 L144 32 L136 10 L132 10 Z M131 23.5 L134 14 L137 23.5 Z" />
        {/* F */}
        <path d="M147 10 L147 32 L151.5 32 L151.5 23 L159.5 23 L159.5 19.5 L151.5 19.5 L151.5 13.5 L161 13.5 L161 10 Z" />
        {/* T */}
        <path d="M163 10 L163 13.5 L169 13.5 L169 32 L173.5 32 L173.5 13.5 L179.5 13.5 L179.5 10 Z" />
      </g>
    </svg>
  )
}

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <EdkraftLogo />
        </div>
        <div className="navbar-links">
          {links.map(link => (
            <button
              key={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="navbar-user">
          <span className="user-avatar">V</span>
          <span className="user-name">Visitante</span>
        </div>
      </div>
    </nav>
  )
}
