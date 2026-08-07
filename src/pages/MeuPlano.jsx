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

const competenciasBase = [
  { titulo: 'Comunicação e oratória', prioridade: 'Alta', descricao: 'Apresentações, argumentação e postura profissional.' },
  { titulo: 'Excel e análise de dados', prioridade: 'Alta', descricao: 'Fundamental em qualquer área do mercado.' },
  { titulo: 'Inglês fluente', prioridade: 'Alta', descricao: 'Abre portas no mercado global.' },
  { titulo: 'Liderança e trabalho em equipe', prioridade: 'Média', descricao: 'Diferencial estratégico em qualquer carreira.' },
  { titulo: 'Pensamento crítico', prioridade: 'Contínua', descricao: 'Base pra qualquer decisão profissional.' },
]

const dicasBase = [
  { titulo: 'Não espere o vestibular pra começar', texto: 'A preparação pro mercado começa muito antes da faculdade.' },
  { titulo: 'Pesquise o mercado antes do curso', texto: 'Vagas, salário e demanda real da profissão.' },
  { titulo: 'Soft skills valem tanto quanto técnicas', texto: 'Comunicação, liderança e trabalho em equipe são metade da carreira.' },
  { titulo: 'Inglês não é opcional', texto: 'Em quase toda área, fluência em inglês abre 2x mais oportunidades.' },
]

export default function MeuPlano() {
  const navigate = useNavigate()
  const [metas, setMetas] = useLocalStorage('edkraft:metas', metasIniciais)
  const [novaMeta, setNovaMeta] = useState('')
  const [ultimoResultado] = useLocalStorage('edkraft:ultimoDiag', null)

  const plano = useMemo(() => gerarPlano(ultimoResultado), [ultimoResultado])
  const temDiagnostico = Boolean(plano)

  const competencias = plano?.competencias || competenciasBase
  const dicas = plano?.dicas || dicasBase

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

  return (
    <div className="meuplano-page">
      <div className="meuplano-container">
        <header className="meuplano-header">
          <h1 className="meuplano-title">Seu plano de desenvolvimento</h1>
          <p className="meuplano-subtitle">
            {temDiagnostico
              ? `Personalizado pro seu perfil ${plano.areaPrincipal}${plano.areaSecundaria ? ' + ' + plano.areaSecundaria : ''}.`
              : 'Um plano geral pra você. Faça o diagnóstico pra receber recomendações específicas.'}
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
            {!temDiagnostico && (
              <section className="plano-alerta-card">
                <div className="plano-alerta-icon">💡</div>
                <div>
                  <h3 className="plano-alerta-titulo">Faça o diagnóstico pra desbloquear o plano personalizado</h3>
                  <p className="plano-alerta-desc">
                    O que você vê abaixo é genérico. Depois do diagnóstico, vamos mostrar exatamente o que
                    desenvolver com base no seu perfil.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/diagnostico')}>
                  Fazer diagnóstico
                </button>
              </section>
            )}

            <section className="plano-section">
              <h2 className="section-title">
                {temDiagnostico ? `Competências pra ${plano.areaPrincipal}` : 'Competências pro Ensino Médio'}
              </h2>
              <p className="section-subtitle">
                {temDiagnostico
                  ? `Priorizadas pra quem tem perfil ${plano.areaPrincipal.toLowerCase()}.`
                  : 'Competências que fazem diferença em qualquer área profissional.'}
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
                {temDiagnostico
                  ? `Selecionadas pra quem quer seguir carreira em ${plano.areaPrincipal}.`
                  : 'Válidas pra qualquer perfil profissional.'}
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

            {temDiagnostico && (
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
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
