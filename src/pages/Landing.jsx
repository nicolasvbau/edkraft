import { useNavigate } from 'react-router-dom'
import './Landing.css'

const PROBLEMAS = [
  {
    numero: '53%',
    texto: 'dos universitários se arrependem da escolha de curso',
    fonte: 'Instituto Semesp, 2018',
  },
  {
    numero: '49%',
    texto: 'dos estudantes de Ensino Médio não sabem que carreira seguir',
    fonte: 'Pesquisa Nacional de Juventude',
  },
  {
    numero: '1 em 4',
    texto: 'abandona a graduação antes do segundo ano',
    fonte: 'Censo da Educação Superior, INEP',
  },
]

const COMO_FUNCIONA = [
  {
    passo: '01',
    titulo: 'O professor cria a turma',
    texto: 'Cadastro em 30 segundos, sem burocracia. A plataforma gera um código único pra turma.',
  },
  {
    passo: '02',
    titulo: 'Os alunos entram com o código',
    texto: 'Sem senha, sem e-mail, sem cadastro complicado. Só nome e o código que o professor passou.',
  },
  {
    passo: '03',
    titulo: 'Cada aluno faz o diagnóstico',
    texto: '25 perguntas sobre personalidade, interesses, habilidades e valores. Leva menos de 10 minutos.',
  },
  {
    passo: '04',
    titulo: 'Resultado individual + panorama da turma',
    texto: 'O aluno recebe um relatório em PDF. O professor vê a turma inteira num painel, com quem precisa de atenção.',
  },
]

const PARA_ALUNO = [
  'Diagnóstico de perfil com 3 áreas de maior afinidade',
  'Relatório em PDF pra levar pra casa e mostrar aos pais',
  'Plano de desenvolvimento personalizado pro seu perfil',
  'Catálogo de profissões com salário, demanda e risco de automação',
  'Faculdades por região — do Norte ao Sul do Brasil',
]

const PARA_ESCOLA = [
  'Painel com a distribuição de perfis de carreira da turma inteira',
  'Identificação de alunos com perfil indefinido, que precisam de conversa',
  'Exportação em CSV pra relatórios e reuniões pedagógicas',
  'Dados isolados por professor — cada um vê só as próprias turmas',
  'Conformidade com LGPD e coleta mínima de dados',
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <span className="section-tag">Descoberta de carreira para o Ensino Médio</span>
          <h1 className="lp-hero-title">
            Ajude seus alunos a escolherem o futuro com{' '}
            <span className="lp-highlight">dados</span>, não com achismo
          </h1>
          <p className="lp-hero-desc">
            O EDKRAFT combina diagnóstico de perfil com informação real de mercado
            para que cada estudante entenda quem é antes de decidir o que fazer.
          </p>
          <div className="lp-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/entrar')}>
              Começar agora
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/privacidade')}>
              Como tratamos os dados
            </button>
          </div>
          <p className="lp-hero-nota">Feito para escolas que levam a orientação de carreira a sério.</p>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="lp-section lp-problema">
        <div className="lp-inner">
          <div className="lp-section-head">
            <span className="section-tag">O problema</span>
            <h2 className="lp-section-title">Escolher carreira aos 17 anos é difícil — e ninguém prepara</h2>
            <p className="lp-section-desc">
              A maioria dos estudantes decide o curso com base em pressão familiar, salário que ouviu
              falar ou influência de amigos. O resultado aparece nos números.
            </p>
          </div>

          <div className="lp-problema-grid">
            {PROBLEMAS.map(p => (
              <div className="lp-problema-card" key={p.numero}>
                <span className="lp-problema-num">{p.numero}</span>
                <p className="lp-problema-texto">{p.texto}</p>
                <span className="lp-problema-fonte">{p.fonte}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="lp-section">
        <div className="lp-inner">
          <div className="lp-section-head">
            <span className="section-tag">Como funciona</span>
            <h2 className="lp-section-title">Da turma ao relatório em quatro passos</h2>
          </div>

          <div className="lp-passos">
            {COMO_FUNCIONA.map(p => (
              <div className="lp-passo" key={p.passo}>
                <span className="lp-passo-num">{p.passo}</span>
                <div>
                  <h3 className="lp-passo-titulo">{p.titulo}</h3>
                  <p className="lp-passo-texto">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="lp-section lp-publico">
        <div className="lp-inner">
          <div className="lp-section-head">
            <span className="section-tag">Para quem</span>
            <h2 className="lp-section-title">Duas experiências, uma plataforma</h2>
          </div>

          <div className="lp-publico-grid">
            <div className="lp-publico-card">
              <span className="lp-publico-emoji">🎓</span>
              <h3 className="lp-publico-titulo">Para o aluno</h3>
              <ul className="lp-lista">
                {PARA_ALUNO.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="lp-publico-card lp-publico-card-escola">
              <span className="lp-publico-emoji">🏫</span>
              <h3 className="lp-publico-titulo">Para a escola</h3>
              <ul className="lp-lista">
                {PARA_ESCOLA.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HONESTIDADE */}
      <section className="lp-section">
        <div className="lp-inner">
          <div className="lp-transparencia">
            <h2 className="lp-transparencia-titulo">O que o EDKRAFT não é</h2>
            <p className="lp-transparencia-texto">
              Não é um teste psicológico validado, e não promete descobrir a vocação de ninguém em
              10 minutos. É uma ferramenta de autoconhecimento estruturado, que organiza o que o
              estudante já sabe sobre si e cruza com informação de mercado.
            </p>
            <p className="lp-transparencia-texto">
              Os dados de salário e crescimento são estimativas construídas a partir de fontes
              públicas (CAGED/MTE e PNAD/IBGE), sujeitas a variação regional. Servem para dar
              direção, não para garantir resultado.
            </p>
            <p className="lp-transparencia-texto">
              O acompanhamento humano — professor, orientador, psicólogo — continua sendo
              insubstituível. O EDKRAFT existe para tornar essa conversa mais informada.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="lp-cta">
        <div className="lp-inner lp-cta-inner">
          <h2 className="lp-cta-titulo">Pronto pra começar?</h2>
          <p className="lp-cta-desc">
            Professor cria a turma em menos de um minuto. Aluno entra com o código.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/entrar')}>
            Entrar na plataforma
          </button>
        </div>
      </section>

      <footer className="lp-footer">
        <p>© 2026 EDKRAFT — Estimativas com base em CAGED/MTE e PNAD/IBGE.</p>
        <button className="lp-footer-link" onClick={() => navigate('/privacidade')}>
          Privacidade e Termos de Uso
        </button>
      </footer>
    </main>
  )
}
