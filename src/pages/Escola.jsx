import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  listarTurmas,
  criarTurma,
  removerTurma,
  professorLogado,
  logarProfessor,
  deslogarProfessor,
} from '../lib/turma'
import './Escola.css'

export default function Escola() {
  const navigate = useNavigate()
  const [prof, setProf] = useState(professorLogado())
  const [turmas, setTurmas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [modo, setModo] = useState('login')
  const [loginForm, setLoginForm] = useState({ nome: '', escola: '' })
  const [novaTurma, setNovaTurma] = useState({ nome: '', serie: '' })

  useEffect(() => {
    if (!prof) return
    let cancelled = false
    setCarregando(true)
    listarTurmas({ professor: prof.nome, escola: prof.escola }).then(t => {
      if (!cancelled) {
        setTurmas(t)
        setCarregando(false)
      }
    })
    return () => { cancelled = true }
  }, [prof])

  function entrar(e) {
    e.preventDefault()
    if (!loginForm.nome.trim() || !loginForm.escola.trim()) return
    logarProfessor(loginForm)
    setProf(loginForm)
  }

  function sair() {
    deslogarProfessor()
    setProf(null)
    setTurmas([])
  }

  async function criar(e) {
    e.preventDefault()
    if (!novaTurma.nome.trim() || !novaTurma.serie.trim()) return
    await criarTurma({
      nome: novaTurma.nome,
      serie: novaTurma.serie,
      escola: prof.escola,
      professor: prof.nome,
    })
    const atual = await listarTurmas({ professor: prof.nome, escola: prof.escola })
    setTurmas(atual)
    setNovaTurma({ nome: '', serie: '' })
    setModo('lista')
  }

  async function excluir(codigo) {
    if (!confirm('Excluir esta turma? Os resultados associados também serão apagados.')) return
    await removerTurma(codigo)
    const atual = await listarTurmas({ professor: prof.nome, escola: prof.escola })
    setTurmas(atual)
  }

  if (!prof) {
    return (
      <main className="escola-page">
        <div className="escola-container">
          <div className="escola-login-card">
            <span className="section-tag">Área do educador</span>
            <h1 className="escola-title">Painel do Professor</h1>
            <p className="escola-desc">
              Acompanhe os diagnósticos vocacionais da sua turma, veja tendências e apoie
              seus alunos com dados. Sem cadastro, sem senha — só entre.
            </p>

            <form onSubmit={entrar} className="escola-login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="nome">Seu nome</label>
                <input
                  id="nome"
                  className="form-input"
                  type="text"
                  placeholder="Professor(a)..."
                  value={loginForm.nome}
                  onChange={(e) => setLoginForm({ ...loginForm, nome: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="escola">Escola</label>
                <input
                  id="escola"
                  className="form-input"
                  type="text"
                  placeholder="Nome da instituição"
                  value={loginForm.escola}
                  onChange={(e) => setLoginForm({ ...loginForm, escola: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary">Entrar no painel</button>
              <p className="escola-login-help">
                * Versão demonstrativa. Os dados ficam apenas no seu navegador.
              </p>
            </form>
          </div>
        </div>
      </main>
    )
  }

  const minhasTurmas = turmas

  return (
    <main className="escola-page">
      <div className="escola-container">
        <div className="escola-header">
          <div>
            <span className="section-tag">Painel do Professor</span>
            <h1 className="escola-title">Olá, {prof.nome}</h1>
            <p className="escola-desc">{prof.escola}</p>
          </div>
          <button className="escola-sair-btn" onClick={sair}>Sair</button>
        </div>

        <section className="escola-nova-turma">
          <div className="escola-nova-head">
            <h2 className="escola-section-title">Suas turmas</h2>
            {modo !== 'nova' ? (
              <button className="btn btn-primary" onClick={() => setModo('nova')}>
                + Criar turma
              </button>
            ) : (
              <button className="btn btn-outline" onClick={() => setModo('lista')}>
                Cancelar
              </button>
            )}
          </div>

          {modo === 'nova' && (
            <form onSubmit={criar} className="escola-form-turma">
              <div className="form-group">
                <label className="form-label">Nome da turma</label>
                <input
                  className="form-input"
                  placeholder="Ex: 3º Ano B - Matutino"
                  value={novaTurma.nome}
                  onChange={(e) => setNovaTurma({ ...novaTurma, nome: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Série / Ano</label>
                <input
                  className="form-input"
                  placeholder="Ex: 3º ano EM"
                  value={novaTurma.serie}
                  onChange={(e) => setNovaTurma({ ...novaTurma, serie: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Gerar código da turma</button>
            </form>
          )}

          {carregando && (
            <div className="escola-empty">
              <p>Carregando turmas...</p>
            </div>
          )}

          {!carregando && minhasTurmas.length === 0 && modo === 'lista' && (
            <div className="escola-empty">
              <p>Você ainda não tem turmas. Crie a primeira e compartilhe o código com seus alunos.</p>
            </div>
          )}

          <div className="escola-turmas-grid">
            {minhasTurmas.map(t => (
              <article className="escola-turma-card" key={t.codigo}>
                <div className="escola-turma-head">
                  <h3 className="escola-turma-nome">{t.nome}</h3>
                  <button
                    className="escola-turma-del"
                    onClick={() => excluir(t.codigo)}
                    title="Excluir turma"
                    aria-label="Excluir turma"
                  >×</button>
                </div>
                <p className="escola-turma-serie">{t.serie}</p>
                <div className="escola-turma-codigo-wrap">
                  <span className="escola-turma-codigo-label">Código da turma:</span>
                  <code className="escola-turma-codigo">{t.codigo}</code>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => navigate(`/escola/turma/${t.codigo}`)}
                >
                  Ver painel
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
