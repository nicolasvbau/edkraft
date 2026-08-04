import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { profissoes } from '../data/profissoes.js'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buscarTurma, salvarResultado } from '../lib/turma'
import { alunoLogado } from '../lib/auth'
import { interpretar } from '../lib/diagInterpret'
import { baixarPDF } from '../lib/diagPDF'
import './Diagnostico.css'

const SECTIONS = [
  {
    title: 'Quem é você',
    desc: 'Vamos entender sua personalidade e como você funciona.',
    questions: [
      {
        text: 'Num fim de semana livre, o que mais te atrai?',
        options: [
          { label: 'Ficar em casa lendo, jogando ou criando algo', tags: ['Tecnologia', 'Artes'] },
          { label: 'Sair com amigos, conversar e conhecer gente', tags: ['Comunicação', 'Negócios'] },
          { label: 'Fazer algo ao ar livre, esporte ou explorar', tags: ['Engenharia', 'Biológicas'] },
          { label: 'Ajudar alguém, fazer trabalho voluntário', tags: ['Saúde', 'Educação', 'Humanas'] },
        ],
      },
      {
        text: 'Quando surge um problema, como você reage?',
        options: [
          { label: 'Analiso com calma e busco dados antes de agir', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Converso com pessoas pra entender melhor', tags: ['Comunicação', 'Humanas'] },
          { label: 'Vou tentando soluções até achar uma que funcione', tags: ['Negócios', 'Arquitetura'] },
          { label: 'Penso em como isso afeta as pessoas envolvidas', tags: ['Saúde', 'Educação'] },
        ],
      },
      {
        text: 'Como seus amigos te descreveriam?',
        options: [
          { label: 'Inteligente e curioso(a)', tags: ['Tecnologia', 'Biológicas'] },
          { label: 'Comunicativo(a) e engraçado(a)', tags: ['Comunicação', 'Artes'] },
          { label: 'Responsável e organizado(a)', tags: ['Negócios', 'Jurídica'] },
          { label: 'Acolhedor(a) e sensível', tags: ['Saúde', 'Educação', 'Humanas'] },
        ],
      },
      {
        text: 'O que mais te incomoda no dia a dia?',
        options: [
          { label: 'Falta de lógica e desorganização', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Injustiça e desigualdade', tags: ['Jurídica', 'Humanas'] },
          { label: 'Rotina sem criatividade', tags: ['Artes', 'Comunicação', 'Arquitetura'] },
          { label: 'Pessoas sofrendo sem necessidade', tags: ['Saúde', 'Educação'] },
        ],
      },
      {
        text: 'Quando criança, o que você mais gostava de fazer?',
        options: [
          { label: 'Desmontar coisas pra ver como funcionam', tags: ['Engenharia', 'Tecnologia'] },
          { label: 'Inventar histórias, desenhar ou atuar', tags: ['Artes', 'Comunicação'] },
          { label: 'Brincar de escola ou de médico', tags: ['Educação', 'Saúde'] },
          { label: 'Organizar brincadeiras e liderar o grupo', tags: ['Negócios', 'Jurídica'] },
        ],
      },
    ],
  },
  {
    title: 'O que te interessa',
    desc: 'Vamos descobrir quais áreas te atraem de verdade.',
    questions: [
      {
        text: 'Qual desses conteúdos você consumiria voluntariamente?',
        options: [
          { label: 'Documentário sobre tecnologia e inovação', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Série sobre crimes, direito ou política', tags: ['Jurídica', 'Humanas'] },
          { label: 'Podcast sobre empreendedorismo e finanças', tags: ['Negócios'] },
          { label: 'Vídeo sobre saúde, psicologia ou bem-estar', tags: ['Saúde', 'Educação'] },
        ],
      },
      {
        text: 'Se pudesse resolver um problema do Brasil, qual seria?',
        options: [
          { label: 'Educação de qualidade pra todos', tags: ['Educação', 'Humanas'] },
          { label: 'Acesso a saúde e saneamento', tags: ['Saúde', 'Biológicas'] },
          { label: 'Corrupção e sistema jurídico', tags: ['Jurídica', 'Humanas'] },
          { label: 'Defasagem tecnológica e inovação', tags: ['Tecnologia', 'Engenharia'] },
        ],
      },
      {
        text: 'Qual matéria da escola mais te atrai?',
        options: [
          { label: 'Matemática, Física ou Química', tags: ['Engenharia', 'Tecnologia'] },
          { label: 'Biologia ou Ciências', tags: ['Saúde', 'Biológicas'] },
          { label: 'História, Geografia ou Filosofia', tags: ['Humanas', 'Jurídica'] },
          { label: 'Artes, Literatura ou Redação', tags: ['Artes', 'Comunicação'] },
        ],
      },
      {
        text: 'Qual projeto escolar te animaria mais?',
        options: [
          { label: 'Criar um aplicativo ou site', tags: ['Tecnologia'] },
          { label: 'Montar uma campanha social', tags: ['Comunicação', 'Humanas'] },
          { label: 'Fazer uma pesquisa científica', tags: ['Biológicas', 'Saúde'] },
          { label: 'Projetar uma maquete ou espaço', tags: ['Arquitetura', 'Engenharia'] },
        ],
      },
      {
        text: 'O que te faz perder a noção do tempo?',
        options: [
          { label: 'Programar, montar planilhas ou resolver puzzles', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Criar conteúdo, editar vídeo ou escrever', tags: ['Comunicação', 'Artes'] },
          { label: 'Conversar com pessoas e ouvir histórias', tags: ['Saúde', 'Educação', 'Humanas'] },
          { label: 'Pesquisar sobre um assunto até esgotar', tags: ['Biológicas', 'Jurídica'] },
        ],
      },
    ],
  },
  {
    title: 'Suas habilidades',
    desc: 'O que você faz bem e onde tem mais facilidade.',
    questions: [
      {
        text: 'Em qual dessas tarefas você se destacaria?',
        options: [
          { label: 'Organizar dados e encontrar padrões', tags: ['Tecnologia', 'Negócios'] },
          { label: 'Convencer pessoas e negociar', tags: ['Negócios', 'Jurídica', 'Comunicação'] },
          { label: 'Cuidar de alguém que precisa de ajuda', tags: ['Saúde', 'Educação'] },
          { label: 'Criar algo visual ou artístico', tags: ['Artes', 'Arquitetura'] },
        ],
      },
      {
        text: 'As pessoas pedem sua ajuda pra quê?',
        options: [
          { label: 'Consertar algo ou resolver problema técnico', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Dar conselho pessoal ou emocional', tags: ['Saúde', 'Educação', 'Humanas'] },
          { label: 'Explicar algo de forma clara', tags: ['Educação', 'Comunicação'] },
          { label: 'Planejar e organizar eventos ou projetos', tags: ['Negócios', 'Arquitetura'] },
        ],
      },
      {
        text: 'Qual dessas habilidades é mais forte em você?',
        options: [
          { label: 'Raciocínio lógico e matemático', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Comunicação e escrita', tags: ['Comunicação', 'Jurídica', 'Artes'] },
          { label: 'Empatia e escuta ativa', tags: ['Saúde', 'Educação', 'Humanas'] },
          { label: 'Criatividade e visão espacial', tags: ['Artes', 'Arquitetura'] },
        ],
      },
      {
        text: 'Num trabalho em grupo, qual é seu papel natural?',
        options: [
          { label: 'Quem pesquisa e traz os dados', tags: ['Tecnologia', 'Biológicas'] },
          { label: 'Quem lidera e distribui tarefas', tags: ['Negócios', 'Jurídica'] },
          { label: 'Quem faz a apresentação final', tags: ['Comunicação', 'Artes'] },
          { label: 'Quem cuida pra todo mundo participar', tags: ['Educação', 'Saúde', 'Humanas'] },
        ],
      },
      {
        text: 'Qual ferramenta você aprenderia mais rápido?',
        options: [
          { label: 'Excel, Python ou ferramentas de dados', tags: ['Tecnologia', 'Engenharia'] },
          { label: 'Photoshop, Figma ou edição de vídeo', tags: ['Artes', 'Comunicação', 'Arquitetura'] },
          { label: 'Técnicas de oratória e debate', tags: ['Jurídica', 'Comunicação', 'Negócios'] },
          { label: 'Primeiros socorros ou mediação de conflitos', tags: ['Saúde', 'Humanas'] },
        ],
      },
    ],
  },
  {
    title: 'O que você valoriza',
    desc: 'Seus valores dizem muito sobre qual caminho faz sentido pra você.',
    questions: [
      {
        text: 'O que é mais importante num trabalho pra você?',
        options: [
          { label: 'Bom salário e estabilidade financeira', tags: ['Tecnologia', 'Engenharia', 'Negócios'] },
          { label: 'Fazer diferença na vida das pessoas', tags: ['Saúde', 'Educação', 'Humanas'] },
          { label: 'Liberdade criativa e flexibilidade', tags: ['Artes', 'Comunicação', 'Arquitetura'] },
          { label: 'Prestígio, respeito e reconhecimento', tags: ['Jurídica', 'Negócios'] },
        ],
      },
      {
        text: 'Qual frase mais combina com você?',
        options: [
          { label: '"Quero construir o futuro com tecnologia"', tags: ['Tecnologia', 'Engenharia'] },
          { label: '"Quero defender os direitos das pessoas"', tags: ['Jurídica', 'Humanas'] },
          { label: '"Quero curar e aliviar o sofrimento"', tags: ['Saúde'] },
          { label: '"Quero inspirar e transformar através da arte"', tags: ['Artes', 'Comunicação', 'Educação'] },
        ],
      },
      {
        text: 'Onde você se imagina trabalhando?',
        options: [
          { label: 'Escritório moderno ou home office com tecnologia', tags: ['Tecnologia', 'Negócios'] },
          { label: 'Hospital, clínica ou laboratório', tags: ['Saúde', 'Biológicas'] },
          { label: 'Tribunal, ONG ou espaço público', tags: ['Jurídica', 'Humanas'] },
          { label: 'Estúdio, ateliê ou espaço criativo', tags: ['Artes', 'Arquitetura', 'Comunicação'] },
        ],
      },
      {
        text: 'Como você lida com dinheiro?',
        options: [
          { label: 'Planejo tudo, gosto de ter controle', tags: ['Negócios', 'Engenharia'] },
          { label: 'Gasto com experiências e coisas que amo', tags: ['Artes', 'Comunicação'] },
          { label: 'Economizo pensando no futuro', tags: ['Tecnologia', 'Jurídica'] },
          { label: 'Dinheiro é secundário — quero propósito', tags: ['Saúde', 'Educação', 'Humanas'] },
        ],
      },
      {
        text: 'O que te daria mais orgulho de contar pros seus netos?',
        options: [
          { label: 'Criei uma empresa ou produto que mudou algo', tags: ['Tecnologia', 'Negócios', 'Engenharia'] },
          { label: 'Salvei vidas ou ajudei milhares de pessoas', tags: ['Saúde', 'Educação'] },
          { label: 'Lutei por justiça e mudei leis', tags: ['Jurídica', 'Humanas'] },
          { label: 'Criei obras que emocionaram pessoas', tags: ['Artes', 'Comunicação', 'Arquitetura'] },
        ],
      },
    ],
  },
  {
    title: 'Como você trabalha',
    desc: 'Seu estilo de trabalho ajuda a filtrar o ambiente ideal pra você.',
    questions: [
      {
        text: 'Você prefere trabalhar...',
        options: [
          { label: 'Sozinho(a), com foco e autonomia', tags: ['Tecnologia', 'Artes'] },
          { label: 'Em equipe, com troca constante', tags: ['Comunicação', 'Negócios', 'Educação'] },
          { label: 'Com pessoas que precisam de mim', tags: ['Saúde', 'Humanas'] },
          { label: 'Com projetos que posso ver o resultado', tags: ['Engenharia', 'Arquitetura'] },
        ],
      },
      {
        text: 'Qual ritmo de trabalho combina mais com você?',
        options: [
          { label: 'Intenso com prazos — gosto da pressão', tags: ['Negócios', 'Comunicação', 'Jurídica'] },
          { label: 'Constante e organizado — sem pressa', tags: ['Educação', 'Biológicas'] },
          { label: 'Flexível — cada dia é diferente', tags: ['Artes', 'Saúde'] },
          { label: 'Técnico — mergulho fundo num problema', tags: ['Tecnologia', 'Engenharia'] },
        ],
      },
      {
        text: 'Como você se sente com rotina repetitiva?',
        options: [
          { label: 'Odeio — preciso de variedade', tags: ['Artes', 'Comunicação'] },
          { label: 'Gosto — me sinto seguro(a) com previsibilidade', tags: ['Jurídica', 'Biológicas'] },
          { label: 'Depende — rotina com propósito tá ok', tags: ['Saúde', 'Educação'] },
          { label: 'Prefiro desafios novos constantemente', tags: ['Tecnologia', 'Engenharia', 'Negócios'] },
        ],
      },
      {
        text: 'O que mais te estressa?',
        options: [
          { label: 'Lidar com muita gente ao mesmo tempo', tags: ['Tecnologia', 'Biológicas'] },
          { label: 'Ficar parado(a) sem fazer nada', tags: ['Negócios', 'Engenharia'] },
          { label: 'Trabalho sem significado ou impacto', tags: ['Saúde', 'Educação', 'Humanas'] },
          { label: 'Regras rígidas que limitam criatividade', tags: ['Artes', 'Comunicação', 'Arquitetura'] },
        ],
      },
      {
        text: 'Daqui a 10 anos, onde você se vê?',
        options: [
          { label: 'Liderando meu próprio negócio', tags: ['Negócios', 'Tecnologia'] },
          { label: 'Sendo referência na minha área', tags: ['Engenharia', 'Jurídica', 'Saúde'] },
          { label: 'Viajando e trabalhando de qualquer lugar', tags: ['Tecnologia', 'Comunicação', 'Artes'] },
          { label: 'Fazendo a diferença na minha comunidade', tags: ['Educação', 'Humanas', 'Saúde'] },
        ],
      },
    ],
  },
]

const AREA_INFO = {
  Tecnologia: { icon: '💻', cor: 'var(--accent-blue)' },
  Saúde: { icon: '🏥', cor: '#22c55e' },
  Jurídica: { icon: '⚖️', cor: '#a855f7' },
  Negócios: { icon: '📊', cor: '#f59e0b' },
  Engenharia: { icon: '⚙️', cor: '#64748b' },
  Arquitetura: { icon: '🏛️', cor: '#ec4899' },
  Comunicação: { icon: '🎙️', cor: '#06b6d4' },
  Artes: { icon: '🎨', cor: '#f43f5e' },
  Educação: { icon: '📚', cor: '#10b981' },
  Humanas: { icon: '🧠', cor: '#8b5cf6' },
  Biológicas: { icon: '🔬', cor: '#14b8a6' },
}

const totalQuestions = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0)

export default function Diagnostico() {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [ultimoResultado, setUltimoResultado] = useLocalStorage('edkraft:ultimoDiag', null)
  const [envioTurma, setEnvioTurma] = useState(null)

  const section = SECTIONS[currentSection]
  const question = section?.questions[currentQuestion]

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / totalQuestions) * 100

  // Peso da primeira tag = 2 (primária, indicativo forte)
  // Peso das demais = 1 (secundárias)
  const areaMaxPossible = useMemo(() => {
    const max = {}
    SECTIONS.forEach(s => {
      s.questions.forEach(q => {
        // Para cada área, o máximo que ela pode fazer numa questão é
        // se a opção escolhida tiver essa área como primária.
        const bestPerArea = {}
        q.options.forEach(o => {
          o.tags.forEach((t, i) => {
            const peso = i === 0 ? 2 : 1
            if (!bestPerArea[t] || bestPerArea[t] < peso) bestPerArea[t] = peso
          })
        })
        Object.entries(bestPerArea).forEach(([a, p]) => {
          max[a] = (max[a] || 0) + p
        })
      })
    })
    return max
  }, [])

  const results = useMemo(() => {
    if (!finished) return null
    const scores = {}
    Object.values(answers).forEach(tags => {
      tags.forEach((tag, i) => {
        const peso = i === 0 ? 2 : 1
        scores[tag] = (scores[tag] || 0) + peso
      })
    })

    const sorted = Object.entries(scores)
      .map(([area, score]) => {
        const max = areaMaxPossible[area] || 1
        const rawPercent = (score / max) * 100
        return { area, score, max, rawPercent }
      })
      .sort((a, b) => b.rawPercent - a.rawPercent || b.score - a.score)

    const top = sorted.slice(0, 3).map(({ area, score, rawPercent }) => ({
      area,
      score,
      percent: Math.max(15, Math.min(98, Math.round(rawPercent))),
      info: AREA_INFO[area] || { icon: '📌', cor: 'var(--accent-blue)' },
      profissoes: profissoes.filter(p => p.categoria === area).slice(0, 3),
    }))
    return top
  }, [finished, answers, areaMaxPossible])

  const interpretacao = useMemo(() => (results ? interpretar(results) : null), [results])

  useEffect(() => {
    if (!finished || !results) return

    let cancelled = false
    ;(async () => {
      const aluno = alunoLogado()

      const snapshot = {
        feitoEm: new Date().toISOString(),
        top3: results.map(r => ({ area: r.area, percent: r.percent })),
      }
      if (cancelled) return
      setUltimoResultado(snapshot)

      if (aluno?.codigoTurma && aluno?.nome) {
        const turma = await buscarTurma(aluno.codigoTurma)
        if (cancelled) return
        if (turma) {
          await salvarResultado({
            turmaCodigo: turma.codigo,
            alunoNome: aluno.nome,
            top3: snapshot.top3,
            feitoEm: snapshot.feitoEm,
          })
          if (!cancelled) setEnvioTurma({ ok: true, turma })
        }
      }
    })()

    return () => { cancelled = true }
  }, [finished, results, setUltimoResultado])

  function handleSelect(optionIndex) {
    setSelectedOption(optionIndex)
  }

  function handleNext() {
    if (selectedOption === null) return

    const key = `${currentSection}-${currentQuestion}`
    const tags = question.options[selectedOption].tags
    setAnswers(prev => ({ ...prev, [key]: tags }))
    setSelectedOption(null)

    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      setFinished(true)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(null)
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setCurrentQuestion(SECTIONS[currentSection - 1].questions.length - 1)
      setSelectedOption(null)
    }
  }

  function handleRestart() {
    setCurrentSection(0)
    setCurrentQuestion(0)
    setAnswers({})
    setFinished(false)
    setSelectedOption(null)
  }

  if (finished && results) {
    return (
      <main className="diagnostico-page">
        <div className="diagnostico-container">
          <div className="resultado-header">
            <span className="section-tag">Resultado do diagnóstico</span>
            <h1 className="resultado-titulo">Seu perfil vocacional</h1>
            <p className="resultado-desc">
              Baseado nas suas {totalQuestions} respostas, mapeamos as áreas que mais combinam com sua personalidade,
              interesses, habilidades e valores.
            </p>
            {envioTurma?.ok && (
              <div className="resultado-envio-badge">
                ✓ Resultado enviado para a turma <strong>{envioTurma.turma.nome}</strong> ({envioTurma.turma.codigo})
              </div>
            )}
          </div>

          <div className="resultado-cards">
            {results.map((r, i) => (
              <div className="resultado-card" key={r.area}>
                <div className="resultado-card-head">
                  <div className="resultado-rank">{i + 1}°</div>
                  <div className="resultado-area-info">
                    <span className="resultado-icon">{r.info.icon}</span>
                    <h2 className="resultado-area">{r.area}</h2>
                  </div>
                  <span className="resultado-match" style={{ color: r.info.cor }}>
                    {r.percent}% match
                  </span>
                </div>

                <div className="resultado-bar-track">
                  <div
                    className="resultado-bar-fill"
                    style={{ width: `${r.percent}%`, background: r.info.cor }}
                  />
                </div>

                {r.profissoes.length > 0 && (
                  <div className="resultado-profissoes">
                    <span className="resultado-prof-label">Profissões em destaque:</span>
                    <div className="resultado-prof-list">
                      {r.profissoes.map(p => (
                        <div className="resultado-prof-item" key={p.nome}>
                          <span className="resultado-prof-nome">{p.nome}</span>
                          <span className="resultado-prof-salario">{p.salario}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {interpretacao && (
            <section className="resultado-interpretacao">
              <div className="resultado-interp-head">
                <h2 className="resultado-interp-titulo">{interpretacao.titulo}</h2>
                <span className={`resultado-interp-conf conf-${interpretacao.confianca}`}>
                  Confiança: {interpretacao.confianca}
                </span>
              </div>
              <p className="resultado-interp-desc">{interpretacao.descricao}</p>

              <div className="resultado-passos">
                <h3 className="resultado-passos-titulo">Próximos passos concretos</h3>
                <ol className="resultado-passos-lista">
                  {interpretacao.proximos_passos.map((passo, i) => (
                    <li key={i}>{passo}</li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          <div className="resultado-acoes">
            <button
              className="btn btn-primary"
              onClick={() => baixarPDF({
                aluno: alunoLogado(),
                top: results,
                interpretacao,
                totalQuestions,
              })}
            >
              📄 Baixar resultado em PDF
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/faculdades')}>
              Ver faculdades e carreiras
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/meu-plano')}>
              Montar meu plano
            </button>
            <button className="btn btn-outline" onClick={handleRestart}>
              Refazer diagnóstico
            </button>
          </div>

          <div className="resultado-disclaimer">
            Este diagnóstico é uma ferramenta de autoconhecimento e não substitui acompanhamento profissional.
            Os resultados são baseados nas suas respostas e dados de mercado.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="diagnostico-page">
      <div className="diagnostico-container">
        {ultimoResultado && answeredCount === 0 && (
          <div className="diag-ultimo-card">
            <div>
              <span className="diag-ultimo-tag">Seu último resultado</span>
              <div className="diag-ultimo-top">
                {ultimoResultado.top3.map(a => (
                  <span key={a.area} className="diag-ultimo-chip">
                    {a.area} · {a.percent}%
                  </span>
                ))}
              </div>
              <span className="diag-ultimo-data">
                Feito em {new Date(ultimoResultado.feitoEm).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <button
              className="diag-ultimo-limpar"
              onClick={() => setUltimoResultado(null)}
              title="Apagar histórico"
            >
              Apagar
            </button>
          </div>
        )}

        <div className="diag-progress-area">
          <div className="diag-progress-bar">
            <div className="diag-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="diag-progress-text">{answeredCount}/{totalQuestions}</span>
        </div>

        <div className="diag-section-header">
          <span className="diag-section-number">Parte {currentSection + 1} de {SECTIONS.length}</span>
          <h1 className="diag-section-title">{section.title}</h1>
          <p className="diag-section-desc">{section.desc}</p>
        </div>

        <div className="diag-question-card">
          <p className="diag-question-text">{question.text}</p>

          <div className="diag-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`diag-option ${selectedOption === i ? 'selected' : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className="diag-option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="diag-option-text">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="diag-nav">
          <button
            className="btn btn-outline diag-btn-back"
            onClick={handleBack}
            disabled={currentSection === 0 && currentQuestion === 0}
          >
            Voltar
          </button>
          <button
            className="btn btn-primary diag-btn-next"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {currentSection === SECTIONS.length - 1 && currentQuestion === section.questions.length - 1
              ? 'Ver resultado'
              : 'Próxima'}
          </button>
        </div>
      </div>
    </main>
  )
}
