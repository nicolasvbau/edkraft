import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { gerarPlano } from '../lib/planoPersonalizado'
import './MeuPlano.css'

const metasIniciais = [
  { id: 1, texto: 'Começar curso de inglês', concluida: false },
  { id: 2, texto: 'Aprender Excel básico', concluida: false },
  { id: 3, texto: 'Fazer simulado ENEM', concluida: false },
  { id: 4, texto: 'Pesquisar sobre faculdades que me interessam', concluida: false },
  { id: 5, texto: 'Montar cronograma semanal de estudos', concluida: false },
]

export default function MeuPlano() {
  const navigate = useNavigate()
  const [metas, setMetas] = useLocalStorage('edkraft:metas', metasIniciais)
  const [novaMeta, setNovaMeta] = useState('')
  const [ultimoResultado] = useLocalStorage('edkraft:ultimoDiag', null)

  const plano = useMemo(() => gerarPlano(ultimoResultado), [ultimoResultado])
  const temDiagnostico = Boolean(plano)

  function toggleMeta(id) {
    setMetas((prev) =>
      prev.map((meta) => (meta.id === id ? { ...meta, concluida: !meta.concluida } : meta))
    )
  }

  function removerMeta(id) {
    setMetas((prev) => prev.filter((m) => m.id !== id))
  }

  function adicionarMeta(e) {
    e.preventDefault()
    const texto = novaMeta.trim()
    if (!texto) return
    setMetas((prev) => [...prev, { id: Date.now(), texto, concluida: false }])
    setNovaMeta('')
  }

  const concluidas = metas.filter((meta) => meta.concluida).length

  // Sem diagnóstico: mostra tela bloqueada, não faz sentido montar plano genérico
  if (!temDiagnostico) {
    return (
      <div className="meuplano-page">
        <div className="meuplano-container">
          <div className="plano-locked">
            <div className="plano-locked-icon">🔒</div>
            <h1 className="plano-locked-titulo">Seu plano fica pronto depois do diagnóstico</h1>
            <p className="plano-locked-desc">
              Aqui vão aparecer competências e dicas específicas pro seu perfil de carreira —
              não faz sentido montar isso sem entender primeiro pra onde você tende.
              O diagnóstico leva menos de 10 minutos.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/diagnostico')}>
              Fazer diagnóstico agora
            </button>
            <p className="plano-locked-nota">
              Depois de responder, essa página é liberada com um plano personalizado.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const competencias = plano.competencias
  const dicas = plano.dicas

  return (
    <div className="meuplano-page">
      <div className="meuplano-container">
        <header className="meuplano-header">
          <h1 className="meuplano-title">Seu plano de desenvolvimento</h1>
          <p className="meuplano-subtitle">
            Personalizado pro seu perfil {plano.areaPrincipal}
            {plano.areaSecundaria ? ' + ' + plano.areaSecundaria : ''}.
          </p>
        </header>

        <div className="meuplano-layout">
          <aside className="metas-sidebar">
            <div className="metas-card">
              <div className="metas-header">
                <h2 className="metas-title">Minhas metas</h2>
                <span className="metas-contador">
                  {concluidas}/{metas.length} concluídas
                </span>
              </div>

              <ul className="metas-lista">
                {metas.map((meta) => (
                  <li className="meta-item" key={meta.id}>
                    <label className="meta-label">
                      <input
                        type="checkbox"
                        checked={meta.concluida}
                        onChange={() => toggleMeta(meta.id)}
                      />
                      <span className="meta-checkbox">
                        {meta.concluida && <span className="meta-check">✓</span>}
                      </span>
                      <span className={`meta-texto ${meta.concluida ? 'concluida' : ''}`}>
                        {meta.texto}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="meta-remove"
                      onClick={() => removerMeta(meta.id)}
                      aria-label="Remover meta"
                      title="Remover"
                    >×</button>
                  </li>
                ))}
              </ul>

              <form className="metas-form" onSubmit={adicionarMeta}>
                <input
                  type="text"
                  className="metas-input"
                  placeholder="Adicionar nova meta..."
                  value={novaMeta}
                  onChange={(e) => setNovaMeta(e.target.value)}
                />
                <button type="submit" className="metas-add-btn">+</button>
              </form>
            </div>
          </aside>

          <main className="meuplano-main">
            <section className="plano-section">
              <h2 className="section-title">Competências pra {plano.areaPrincipal}</h2>
              <p className="section-subtitle">
                Priorizadas pra quem tem perfil {plano.areaPrincipal.toLowerCase()}.
              </p>

              <div className="competencias-lista">
                {competencias.map((comp) => (
                  <div className="competencia-item" key={comp.titulo}>
                    <div className="competencia-header">
                      <h3 className="competencia-titulo">{comp.titulo}</h3>
                      <span className={`prioridade-badge prioridade-${comp.prioridade.toLowerCase()}`}>
                        {comp.prioridade}
                      </span>
                    </div>
                    <p className="competencia-descricao">{comp.descricao}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="plano-section">
              <h2 className="section-title">Dicas práticas</h2>
              <p className="section-subtitle">
                Selecionadas pra quem quer seguir carreira em {plano.areaPrincipal}.
              </p>
              <div className="dicas-grid">
                {dicas.map((dica) => (
                  <div className="dica-card" key={dica.titulo}>
                    <h3 className="dica-titulo">{dica.titulo}</h3>
                    <p className="dica-texto">{dica.texto}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cta-card">
              <div className="cta-texto">
                <h3 className="cta-titulo">Quer refazer o diagnóstico?</h3>
                <p className="cta-descricao">
                  Se seus interesses mudaram, refazer o teste atualiza esse plano.
                </p>
              </div>
              <button className="cta-btn" onClick={() => navigate('/diagnostico')}>
                Refazer diagnóstico
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
