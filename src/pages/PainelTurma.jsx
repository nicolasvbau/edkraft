import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buscarTurma, resultadosDaTurma, agregarResultados } from '../lib/turma'
import './Escola.css'

const AREA_COLORS = {
  Tecnologia: '#3b82f6',
  Saúde: '#22c55e',
  Jurídica: '#a855f7',
  Negócios: '#f59e0b',
  Engenharia: '#64748b',
  Arquitetura: '#ec4899',
  Comunicação: '#06b6d4',
  Artes: '#f43f5e',
  Educação: '#10b981',
  Humanas: '#8b5cf6',
  Biológicas: '#14b8a6',
}

export default function PainelTurma() {
  const { codigo } = useParams()
  const navigate = useNavigate()

  const [turma, setTurma] = useState(null)
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let cancelled = false
    setCarregando(true)
    Promise.all([buscarTurma(codigo), resultadosDaTurma(codigo)]).then(([t, r]) => {
      if (!cancelled) {
        setTurma(t)
        setResultados(r)
        setCarregando(false)
      }
    })
    return () => { cancelled = true }
  }, [codigo])

  const agregado = useMemo(() => agregarResultados(resultados), [resultados])

  if (carregando) {
    return (
      <main className="escola-page">
        <div className="escola-container">
          <div className="escola-empty">Carregando...</div>
        </div>
      </main>
    )
  }

  if (!turma) {
    return (
      <main className="escola-page">
        <div className="escola-container">
          <div className="escola-empty">
            <h2>Turma não encontrada</h2>
            <button className="btn btn-primary" onClick={() => navigate('/escola')}>
              Voltar ao painel
            </button>
          </div>
        </div>
      </main>
    )
  }

  const maxTotal = agregado[0]?.total || 1

  return (
    <main className="escola-page">
      <div className="escola-container">
        <button className="escola-back-btn" onClick={() => navigate('/escola')}>
          ← Voltar ao painel
        </button>

        <div className="escola-header">
          <div>
            <span className="section-tag">Painel da turma</span>
            <h1 className="escola-title">{turma.nome}</h1>
            <p className="escola-desc">
              {turma.escola} · {turma.serie} · Código <code className="escola-inline-codigo">{turma.codigo}</code>
            </p>
          </div>
        </div>

        <section className="painel-stats">
          <div className="painel-stat-card">
            <span className="painel-stat-num">{resultados.length}</span>
            <span className="painel-stat-label">Diagnósticos concluídos</span>
          </div>
          <div className="painel-stat-card">
            <span className="painel-stat-num">{agregado.length}</span>
            <span className="painel-stat-label">Áreas mapeadas na turma</span>
          </div>
          <div className="painel-stat-card">
            <span className="painel-stat-num">
              {agregado[0]?.area || '—'}
            </span>
            <span className="painel-stat-label">Área com mais afinidade</span>
          </div>
        </section>

        {resultados.length === 0 ? (
          <div className="escola-empty">
            <h3>Nenhum aluno completou o diagnóstico ainda</h3>
            <p>
              Compartilhe o código <strong>{turma.codigo}</strong> com sua turma. Ao
              preencher em Perfil e completar o Diagnóstico, os resultados aparecem aqui.
            </p>
          </div>
        ) : (
          <>
            <section className="painel-secao">
              <h2 className="escola-section-title">Distribuição de áreas na turma</h2>
              <p className="painel-secao-desc">
                Ranking ponderado: 1º lugar do aluno vale 3 pontos, 2º vale 2, 3º vale 1.
              </p>
              <div className="painel-barras">
                {agregado.map(a => (
                  <div className="painel-barra-row" key={a.area}>
                    <span className="painel-barra-label">{a.area}</span>
                    <div className="painel-barra-track">
                      <div
                        className="painel-barra-fill"
                        style={{
                          width: `${(a.total / maxTotal) * 100}%`,
                          background: AREA_COLORS[a.area] || '#3b82f6',
                        }}
                      />
                    </div>
                    <span className="painel-barra-detalhes">
                      {a.first} × 1º · {a.second} × 2º · {a.third} × 3º
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="painel-secao">
              <h2 className="escola-section-title">Resultado por aluno</h2>
              <div className="painel-tabela-wrap">
                <table className="painel-tabela">
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>1º lugar</th>
                      <th>2º lugar</th>
                      <th>3º lugar</th>
                      <th>Última atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados
                      .slice()
                      .sort((a, b) => a.alunoNome.localeCompare(b.alunoNome))
                      .map(r => (
                        <tr key={r.alunoNome}>
                          <td className="painel-td-nome">{r.alunoNome}</td>
                          {[0, 1, 2].map(i => (
                            <td key={i}>
                              {r.top3[i] ? (
                                <span
                                  className="painel-chip"
                                  style={{ background: AREA_COLORS[r.top3[i].area] || '#3b82f6' }}
                                >
                                  {r.top3[i].area} · {r.top3[i].percent}%
                                </span>
                              ) : '—'}
                            </td>
                          ))}
                          <td className="painel-td-data">
                            {new Date(r.atualizadoEm).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
