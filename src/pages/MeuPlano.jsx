import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './MeuPlano.css'

const metasIniciais = [
  { id: 1, texto: 'Começar curso de inglês', concluida: false },
  { id: 2, texto: 'Aprender Excel básico', concluida: false },
  { id: 3, texto: 'Fazer simulado ENEM', concluida: false },
  { id: 4, texto: 'Pesquisar sobre faculdades que me interessam', concluida: false },
  { id: 5, texto: 'Montar cronograma semanal de estudos', concluida: false },
]

const competencias = [
  {
    titulo: 'Comunicação e oratória',
    prioridade: 'Alta',
    descricao: 'Apresentações, argumentação e postura profissional',
  },
  {
    titulo: 'Excel e análise de dados',
    prioridade: 'Alta',
    descricao: 'Fundamental em qualquer área do mercado',
  },
  {
    titulo: 'Inglês fluente',
    prioridade: 'Alta',
    descricao: 'Abre portas no mercado global',
  },
  {
    titulo: 'Liderança e gestão de pessoas',
    prioridade: 'Média',
    descricao: 'Para seu perfil, é um diferencial estratégico',
  },
  {
    titulo: 'Estatística básica',
    prioridade: 'Média',
    descricao: 'Para decisões baseadas em dados',
  },
  {
    titulo: 'Pensamento crítico',
    prioridade: 'Contínua',
    descricao: 'Você já tem — cultivar é o desafio',
  },
]

const dicas = [
  {
    titulo: 'Não espere o vestibular para começar',
    texto:
      'O maior erro é achar que a preparação para o mercado de trabalho e para os estudos começa na faculdade.',
  },
  {
    titulo: 'Pesquise o mercado antes de escolher o curso',
    texto:
      'Antes de escolher a faculdade, pesquise vagas, salário médio e demanda real da profissão no mercado.',
  },
  {
    titulo: 'Soft skills valem mais do que você imagina',
    emoji: '🗣️',
    texto:
      'Comunicação, liderança e trabalho em equipe costumam pesar tanto quanto o conhecimento técnico.',
  },
  {
    titulo: 'Inglês não é opcional',
    texto:
      'Em praticamente todas as áreas, o inglês fluente abre portas para melhores oportunidades e salários.',
  },
  {
    titulo: 'Aprenda uma ferramenta digital profissional',
    texto:
      'Excel, Google Sheets, Canva, Figma, Python — dominar pelo menos uma ferramenta te destaca desde cedo.',
  },
  {
    titulo: 'Autoconhecimento é vantagem competitiva',
    texto:
      'Saber seus pontos fortes e fracos ajuda a escolher melhor e a se posicionar com mais confiança.',
  },
]

const destaques = [
  'Ambientes que valorizam pensamento analítico',
  'Equipes que precisam de liderança organizada',
  'Projetos que exigem planejamento de longo prazo',
  'Contextos que combinam criatividade com dados',
]

export default function MeuPlano() {
  const navigate = useNavigate()
  const [metas, setMetas] = useLocalStorage('edkraft:metas', metasIniciais)
  const [novaMeta, setNovaMeta] = useState('')

  function removerMeta(id) {
    setMetas((prev) => prev.filter((m) => m.id !== id))
  }

  const concluidas = metas.filter((meta) => meta.concluida).length

  function toggleMeta(id) {
    setMetas((prev) =>
      prev.map((meta) => (meta.id === id ? { ...meta, concluida: !meta.concluida } : meta))
    )
  }

  function adicionarMeta(e) {
    e.preventDefault()
    const texto = novaMeta.trim()
    if (!texto) return
    setMetas((prev) => [...prev, { id: Date.now(), texto, concluida: false }])
    setNovaMeta('')
  }

  return (
    <div className="meuplano-page">
      <div className="meuplano-container">
        <header className="meuplano-header">
          <h1 className="meuplano-title">Seu plano de desenvolvimento</h1>
          <p className="meuplano-subtitle">
            Competências para desenvolver durante o Ensino Médio, metas pessoais e dicas
            práticas para se preparar para o futuro.
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
                    >
                      ×
                    </button>
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
                <button type="submit" className="metas-add-btn">
                  +
                </button>
              </form>
            </div>
          </aside>

          <main className="meuplano-main">
            <section className="plano-section">
              <h2 className="section-title">Plano de desenvolvimento</h2>
              <p className="section-subtitle">
                Competências para desenvolver durante o Ensino Médio
              </p>

              <div className="competencias-lista">
                {competencias.map((comp) => (
                  <div className="competencia-item" key={comp.titulo}>
                    <div className="competencia-header">
                      <h3 className="competencia-titulo">{comp.titulo}</h3>
                      <span
                        className={`prioridade-badge prioridade-${comp.prioridade.toLowerCase()}`}
                      >
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
              <div className="dicas-grid">
                {dicas.map((dica) => (
                  <div className="dica-card" key={dica.titulo}>
                    <h3 className="dica-titulo">
                      {dica.emoji && <span className="dica-emoji">{dica.emoji}</span>}
                      {dica.titulo}
                    </h3>
                    <p className="dica-texto">{dica.texto}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="plano-section">
              <h2 className="section-title">Onde você pode se destacar</h2>
              <ul className="destaques-lista">
                {destaques.map((item) => (
                  <li className="destaque-item" key={item}>
                    <span className="destaque-icone">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="cta-card">
              <div className="cta-texto">
                <h3 className="cta-titulo">Ainda não fez o diagnóstico vocacional?</h3>
                <p className="cta-descricao">
                  Descubra seu perfil e receba recomendações personalizadas
                </p>
              </div>
              <button className="cta-btn" onClick={() => navigate('/diagnostico')}>
                Fazer diagnóstico
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
