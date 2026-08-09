import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { profissoes } from '../data/profissoes.js'
import { SECTIONS } from '../data/diagQuestoes.js'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buscarTurma, salvarResultado } from '../lib/turma'
import { alunoLogado } from '../lib/auth'
import { interpretar } from '../lib/diagInterpret'
import { baixarPDF } from '../lib/diagPDF'
import './Diagnostico.css'


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
  const [gerandoPDF, setGerandoPDF] = useState(false)

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

  const { results, traits } = useMemo(() => {
    if (!finished) return { results: null, traits: null }

    const scoresArea = {}
    const scoresTrait = {}

    Object.values(answers).forEach(ans => {
      // Compat: se resposta antiga era só array de tags
      const tags = Array.isArray(ans) ? ans : (ans.tags || [])
      const tr = Array.isArray(ans) ? [] : (ans.traits || [])

      tags.forEach((tag, i) => {
        const peso = i === 0 ? 2 : 1
        scoresArea[tag] = (scoresArea[tag] || 0) + peso
      })
      tr.forEach((t, i) => {
        const peso = i === 0 ? 2 : 1
        scoresTrait[t] = (scoresTrait[t] || 0) + peso
      })
    })

    const sorted = Object.entries(scoresArea)
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

    // Top 3 traços ordenados
    const topTraits = Object.entries(scoresTrait)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => t)

    return { results: top, traits: topTraits }
  }, [finished, answers, areaMaxPossible])

  const interpretacao = useMemo(
    () => (results ? interpretar(results, traits) : null),
    [results, traits]
  )

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
    const opt = question.options[selectedOption]
    setAnswers(prev => ({
      ...prev,
      [key]: { tags: opt.tags || [], traits: opt.traits || [] },
    }))
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
            <h1 className="resultado-titulo">Seu perfil de carreira</h1>
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

              {interpretacao.traits?.length > 0 && (
                <div className="resultado-tracos">
                  <span className="resultado-tracos-label">Seus traços dominantes:</span>
                  <div className="resultado-tracos-list">
                    {interpretacao.traits.map(t => (
                      <span key={t} className="resultado-traco">{t}</span>
                    ))}
                  </div>
                </div>
              )}

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
              disabled={gerandoPDF}
              onClick={async () => {
                setGerandoPDF(true)
                await baixarPDF({
                  aluno: alunoLogado(),
                  top: results,
                  interpretacao,
                  totalQuestions,
                })
                setGerandoPDF(false)
              }}
            >
              {gerandoPDF ? 'Gerando PDF...' : '📄 Baixar resultado em PDF'}
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
