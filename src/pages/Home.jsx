import { useNavigate } from 'react-router-dom'
import './Home.css'

const chartData = [
  { label: 'Tecnologia', value: 148 },
  { label: 'Saúde', value: 42 },
  { label: 'Engenharia', value: 18 },
  { label: 'Negócios', value: -8 },
  { label: 'Comunicação', value: 12 },
  { label: 'Educação', value: 4 },
]

const MAX_POSITIVE = 148
const MAX_NEGATIVE = 8
const POS_ZONE_HEIGHT = 220
const NEG_ZONE_HEIGHT = 36

const dataFeatures = [
  {
    icon: '📈',
    title: 'Tendências de 10 anos',
    text: 'Análise de crescimento real de vagas por área desde 2015.',
  },
  {
    icon: '🤖',
    title: 'Alerta de automação',
    text: 'Avisamos se a profissão está ameaçada pela IA.',
  },
  {
    icon: '💰',
    title: 'Salários e concorrência',
    text: 'Dados reais de salário médio, vagas abertas e nível de concorrência.',
  },
]

const competencias = [
  { icon: '📊', title: 'Excel & Análise de Dados' },
  { icon: '🌎', title: 'Inglês para o Mercado' },
  { icon: '🤝', title: 'Liderança & Trabalho em Equipe' },
  { icon: '🎤', title: 'Oratória & Comunicação' },
  { icon: '🧭', title: 'Projeto de Vida' },
]

const diagnosticoFeatures = [
  {
    icon: '🧩',
    title: 'Mapeamento completo',
    text: 'Cruzamos seus interesses, habilidades e valores com dados reais de mercado.',
  },
  {
    icon: '📄',
    title: 'Relatório individual',
    text: 'Um relatório personalizado com as carreiras mais alinhadas ao seu perfil.',
  },
  {
    icon: '⚡',
    title: 'Rápido e direto',
    text: 'Leva menos de 10 minutos e já te dá um primeiro direcionamento claro.',
  },
]

function ChartBar({ label, value }) {
  const isPositive = value >= 0
  const posHeight = isPositive ? (value / MAX_POSITIVE) * POS_ZONE_HEIGHT : 0
  const negHeight = !isPositive ? (Math.abs(value) / MAX_NEGATIVE) * NEG_ZONE_HEIGHT : 0

  return (
    <div className="chart-col">
      <div className="chart-track">
        <div className="chart-zone chart-zone-pos">
          {isPositive && (
            <div className="chart-bar chart-bar-pos" style={{ height: `${posHeight}px` }}>
              <span className="chart-val">+{value}%</span>
            </div>
          )}
        </div>
        <div className="chart-zero-line" />
        <div className="chart-zone chart-zone-neg">
          {!isPositive && (
            <div className="chart-bar chart-bar-neg" style={{ height: `${negHeight}px` }}>
              <span className="chart-val chart-val-neg">{value}%</span>
            </div>
          )}
        </div>
      </div>
      <span className="chart-label">{label}</span>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  const goToDiagnostico = () => {
    navigate('/diagnostico')
  }

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <span className="section-tag">Orientação baseada em dados reais</span>
          <h1 className="hero-title">
            Antes de escolher seu curso, saiba se ele <span className="highlight">vai existir</span> daqui a 5 anos
          </h1>
          <p className="hero-desc">
            Usamos dados reais do mercado de trabalho brasileiro para te mostrar quais carreiras estão crescendo.
          </p>

          <div className="hero-stat-box">
            <p className="hero-stat-main">
              <strong>53%</strong> dos universitários se arrependem da escolha de curso.
            </p>
            <p className="hero-stat-sub">
              O EDKRAFT existe para mudar isso.{' '}
              <span className="hero-stat-source">
                Fonte: Instituto Semesp, Mapa do Ensino Superior 2018.
              </span>
            </p>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={goToDiagnostico}>
              Descubra meu caminho
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/faculdades')}>
              Ver profissões e faculdades
            </button>
          </div>
        </div>
      </section>

      {/* DADOS */}
      <section className="section data-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Previsibilidade de mercado</span>
            <h2 className="section-title">Dados reais — não achismo</h2>
            <p className="section-desc">
              Cruzamos 10 anos de dados do CAGED e do IBGE para entender de verdade quais áreas estão crescendo,
              estagnadas ou em queda — e te mostrar isso antes da hora de escolher.
            </p>
          </div>

          <div className="feature-grid">
            {dataFeatures.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Crescimento acumulado por área (%)</h3>
            <div className="chart">
              {chartData.map((d) => (
                <ChartBar key={d.label} label={d.label} value={d.value} />
              ))}
            </div>
            <p className="chart-source">
              Estimativas EDKRAFT com base em movimentação de vagas CAGED/MTE e PNAD-IBGE (2015–2025).
              Valores diretivos, não substituem análise setorial. * 2026 = projeção.
            </p>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS */}
      <section className="section competencias-section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Jornada contínua</span>
            <h2 className="section-title">Plano de Desenvolvimento de Competências</h2>
            <p className="section-desc">
              Mais do que indicar uma carreira, o EDKRAFT é um programa educacional contínuo: acompanhamos sua
              evolução em habilidades que fazem diferença em qualquer profissão do futuro.
            </p>
          </div>

          <div className="competencias-grid">
            {competencias.map((c) => (
              <div className="competencia-card" key={c.title}>
                <div className="competencia-icon">{c.icon}</div>
                <h3 className="competencia-title">{c.title}</h3>
              </div>
            ))}
          </div>

          <div className="como-funciona">
            <h3 className="como-funciona-title">Como funciona:</h3>
            <p className="como-funciona-text">
              A partir do seu diagnóstico, montamos um plano de desenvolvimento personalizado que evolui junto com
              você — combinando trilhas de estudo, prática e acompanhamento para fechar as lacunas entre onde você
              está e onde o mercado vai te exigir.
            </p>
          </div>
        </div>
      </section>

      {/* DIAGNÓSTICO */}
      <section className="section diagnostico-section" id="diagnostico">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Diagnóstico vocacional</span>
            <h2 className="section-title">Descubra seu caminho em minutos</h2>
            <p className="section-desc">
              Um questionário rápido que cruza seus interesses e habilidades com dados reais do mercado de
              trabalho brasileiro para apontar as carreiras com mais aderência ao seu perfil.
            </p>
          </div>

          <div className="diagnostico-grid">
            {diagnosticoFeatures.map((f) => (
              <div className="diagnostico-item" key={f.title}>
                <div className="diagnostico-icon">{f.icon}</div>
                <h3 className="diagnostico-title">{f.title}</h3>
                <p className="diagnostico-text">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="diagnostico-cta">
            <button className="btn btn-primary btn-lg" onClick={goToDiagnostico}>
              Fazer diagnóstico agora
            </button>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 EDKRAFT — Estimativas com base em CAGED/MTE e PNAD/IBGE.</p>
        <button className="home-footer-link" onClick={() => navigate('/privacidade')}>
          Privacidade e Termos de Uso
        </button>
      </footer>
    </main>
  )
}
