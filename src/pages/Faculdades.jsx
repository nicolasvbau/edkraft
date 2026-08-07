import { useMemo, useState } from 'react'
import { categorias, profissoes } from '../data/profissoes.js'
import { REGIOES, filtrarFaculdades } from '../data/faculdades.js'
import './Faculdades.css'

function isPositiveBadge(badge) {
  return !badge.trim().startsWith('-')
}

const UF_PARA_REGIAO = {
  AC: 'Norte', AM: 'Norte', AP: 'Norte', PA: 'Norte', RO: 'Norte', RR: 'Norte', TO: 'Norte',
  AL: 'Nordeste', BA: 'Nordeste', CE: 'Nordeste', MA: 'Nordeste', PB: 'Nordeste',
  PE: 'Nordeste', PI: 'Nordeste', RN: 'Nordeste', SE: 'Nordeste',
  DF: 'Centro-Oeste', GO: 'Centro-Oeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste',
  ES: 'Sudeste', MG: 'Sudeste', RJ: 'Sudeste', SP: 'Sudeste',
  PR: 'Sul', RS: 'Sul', SC: 'Sul',
}

function detectarRegiaoAluno() {
  try {
    const perfil = JSON.parse(localStorage.getItem('edkraft:perfilExtra') || 'null')
    if (perfil?.estado && UF_PARA_REGIAO[perfil.estado]) return UF_PARA_REGIAO[perfil.estado]
  } catch { /* ignore */ }
  return 'Todas'
}

export default function Faculdades() {
  const [activeCategoria, setActiveCategoria] = useState('Todas')
  const [activeRegiao, setActiveRegiao] = useState(detectarRegiaoAluno)
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
        <div className="filter-group">
          <span className="filter-label">Área</span>
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
        </div>

        <div className="filter-group">
          <span className="filter-label">Região</span>
          <div className="category-filters">
            {REGIOES.map((reg) => (
              <button
                key={reg}
                className={`category-btn ${activeRegiao === reg ? 'active' : ''}`}
                onClick={() => setActiveRegiao(reg)}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <p className="results-count">
          {filtered.length} {filtered.length === 1 ? 'profissão encontrada' : 'profissões encontradas'}
          {activeRegiao !== 'Todas' && ` · faculdades filtradas por ${activeRegiao}`}
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
                {openPopup === p.nome && (() => {
                  const lista = filtrarFaculdades(p.categoria, activeRegiao)
                  return (
                    <div className="onde-estudar-popup">
                      <div className="popup-title">
                        <span>{activeRegiao === 'Todas' ? 'Faculdades' : `Faculdades · ${activeRegiao}`}</span>
                        <button className="popup-close" onClick={() => setOpenPopup(null)}>×</button>
                      </div>
                      {lista.length === 0 ? (
                        <p className="popup-empty">
                          Nenhuma faculdade catalogada nessa região. Tente outra região ou "Todas".
                        </p>
                      ) : (
                        <div className="popup-list">
                          {lista.map((f) => (
                            <div className="popup-item" key={f.nome + f.uf}>
                              <span className="popup-item-icon">🎓</span>
                              <span className="popup-item-name">{f.nome}</span>
                              <span className="popup-item-uf">{f.uf}</span>
                              <span className="popup-item-type">{f.tipo}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })()}
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
