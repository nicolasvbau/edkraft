import { useMemo, useState } from 'react'
import { categorias, profissoes } from '../data/profissoes.js'
import './Faculdades.css'

const faculdadesPorCategoria = {
  Tecnologia: [
    { nome: 'USP — IME / ICMC', tipo: 'Pública' },
    { nome: 'UNICAMP — IC', tipo: 'Pública' },
    { nome: 'UFMG — DCC', tipo: 'Pública' },
    { nome: 'PUC-Rio', tipo: 'Privada' },
    { nome: 'FIAP', tipo: 'Privada' },
  ],
  Saúde: [
    { nome: 'USP — FMUSP', tipo: 'Pública' },
    { nome: 'UNICAMP — FCM', tipo: 'Pública' },
    { nome: 'UFMG — Medicina', tipo: 'Pública' },
    { nome: 'Einstein — Faculdade', tipo: 'Privada' },
    { nome: 'PUC-SP', tipo: 'Privada' },
  ],
  Jurídica: [
    { nome: 'USP — Largo São Francisco', tipo: 'Pública' },
    { nome: 'UERJ — Direito', tipo: 'Pública' },
    { nome: 'FGV Direito SP', tipo: 'Privada' },
    { nome: 'PUC-SP — Direito', tipo: 'Privada' },
    { nome: 'Mackenzie — Direito', tipo: 'Privada' },
  ],
  Negócios: [
    { nome: 'FGV — EAESP', tipo: 'Privada' },
    { nome: 'Insper', tipo: 'Privada' },
    { nome: 'USP — FEA', tipo: 'Pública' },
    { nome: 'UNICAMP — IE', tipo: 'Pública' },
    { nome: 'IBMEC', tipo: 'Privada' },
  ],
  Engenharia: [
    { nome: 'ITA', tipo: 'Pública' },
    { nome: 'USP — Poli', tipo: 'Pública' },
    { nome: 'UNICAMP — FEC', tipo: 'Pública' },
    { nome: 'IME — Rio', tipo: 'Pública' },
    { nome: 'UFSC — CTC', tipo: 'Pública' },
  ],
  Arquitetura: [
    { nome: 'USP — FAU', tipo: 'Pública' },
    { nome: 'UNICAMP — FEC', tipo: 'Pública' },
    { nome: 'Mackenzie — Arquitetura', tipo: 'Privada' },
    { nome: 'UFRJ — FAU', tipo: 'Pública' },
    { nome: 'UFMG — EA', tipo: 'Pública' },
  ],
  Comunicação: [
    { nome: 'USP — ECA', tipo: 'Pública' },
    { nome: 'PUC-SP — Comunicação', tipo: 'Privada' },
    { nome: 'ESPM', tipo: 'Privada' },
    { nome: 'UFRJ — ECO', tipo: 'Pública' },
    { nome: 'Cásper Líbero', tipo: 'Privada' },
  ],
  Artes: [
    { nome: 'USP — ECA', tipo: 'Pública' },
    { nome: 'UNICAMP — IA', tipo: 'Pública' },
    { nome: 'UFRJ — Belas Artes', tipo: 'Pública' },
    { nome: 'UNESP — IA', tipo: 'Pública' },
    { nome: 'Santa Marcelina', tipo: 'Privada' },
  ],
  Educação: [
    { nome: 'USP — FE', tipo: 'Pública' },
    { nome: 'UNICAMP — FE', tipo: 'Pública' },
    { nome: 'UERJ — Educação', tipo: 'Pública' },
    { nome: 'UNESP — Pedagogia', tipo: 'Pública' },
    { nome: 'PUC-RS — Educação', tipo: 'Privada' },
  ],
  Humanas: [
    { nome: 'USP — FFLCH', tipo: 'Pública' },
    { nome: 'UNICAMP — IFCH', tipo: 'Pública' },
    { nome: 'UFRJ — IFCS', tipo: 'Pública' },
    { nome: 'UnB — Humanas', tipo: 'Pública' },
    { nome: 'PUC-Rio — CSS', tipo: 'Privada' },
  ],
  Biológicas: [
    { nome: 'USP — IB', tipo: 'Pública' },
    { nome: 'UNICAMP — IB', tipo: 'Pública' },
    { nome: 'UNESP — Rio Claro', tipo: 'Pública' },
    { nome: 'UFMG — ICB', tipo: 'Pública' },
    { nome: 'UFRJ — CCS', tipo: 'Pública' },
  ],
}

function isPositiveBadge(badge) {
  return !badge.trim().startsWith('-')
}

export default function Faculdades() {
  const [activeCategoria, setActiveCategoria] = useState('Todas')
  const [openPopup, setOpenPopup] = useState(null)

  const filtered = useMemo(() => {
    if (activeCategoria === 'Todas') return profissoes
    return profissoes.filter((p) => p.categoria === activeCategoria)
  }, [activeCategoria])

  function togglePopup(nome) {
    setOpenPopup(openPopup === nome ? null : nome)
  }

  return (
    <main className="faculdades">
      <header className="faculdades-header">
        <div className="faculdades-header-inner">
          <span className="section-tag">Profissões e faculdades</span>
          <h1 className="faculdades-title">Escolha a carreira, veja onde estudar</h1>
          <p className="faculdades-desc">
            Salários médios, crescimento nos últimos 10 anos, demanda de vagas e risco de automação por IA —
            tudo em um só lugar para você comparar carreiras com dados reais antes de decidir.
          </p>
        </div>
      </header>

      <div className="faculdades-body">
        <div className="category-filters">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategoria === cat ? 'active' : ''}`}
              onClick={() => setActiveCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="results-count">
          {filtered.length} {filtered.length === 1 ? 'profissão encontrada' : 'profissões encontradas'}
        </p>

        <div className="profissoes-grid">
          {filtered.map((p) => (
            <article className="profissao-card" key={p.nome}>
              <div className="profissao-card-head">
                <div>
                  <h2 className="profissao-nome">{p.nome}</h2>
                  <span className="profissao-categoria">{p.categoria}</span>
                </div>
                <span className={`profissao-badge ${isPositiveBadge(p.badge) ? 'positive' : 'negative'}`}>
                  {p.badge}
                </span>
              </div>

              <p className="profissao-descricao">{p.descricao}</p>

              <div className="profissao-stats">
                <div className="stat-item">
                  <span className="stat-label">Salário médio</span>
                  <span className="stat-value">{p.salario}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Demanda</span>
                  <span className="stat-value">{p.demanda}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Crescimento 10a</span>
                  <span className="stat-value">{p.crescimento}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Vagas</span>
                  <span className="stat-value">{p.vagas}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Concorrência</span>
                  <span className="stat-value">{p.concorrencia}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Risco IA</span>
                  <span className="stat-value">{p.riscoIA}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Nota do mercado</span>
                  <span className="stat-value">{p.nota}</span>
                </div>
              </div>

              <p className="profissao-analise">{p.analise}</p>

              <div className="onde-estudar-wrapper">
                <button
                  className="btn-onde-estudar"
                  onClick={() => togglePopup(p.nome)}
                >
                  Onde estudar
                </button>
                {openPopup === p.nome && (
                  <div className="onde-estudar-popup">
                    <div className="popup-title">
                      <span>Melhores faculdades</span>
                      <button className="popup-close" onClick={() => setOpenPopup(null)}>x</button>
                    </div>
                    <div className="popup-list">
                      {(faculdadesPorCategoria[p.categoria] || []).map((f) => (
                        <div className="popup-item" key={f.nome}>
                          <span className="popup-item-icon">🎓</span>
                          <span className="popup-item-name">{f.nome}</span>
                          <span className="popup-item-type">{f.tipo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-state">Nenhuma profissão encontrada nessa categoria.</p>
        )}
      </div>
    </main>
  )
}
