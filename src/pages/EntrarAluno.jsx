import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarTurma, buscarResultadoAluno } from '../lib/turma'
import { logarAluno } from '../lib/auth'
import './Entrar.css'

export default function EntrarAluno() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    const nomeTrim = nome.trim()
    const sobrenomeTrim = sobrenome.trim()
    const codigoTrim = codigo.trim().toUpperCase()

    if (!nomeTrim) {
      setErro('Digita seu nome pra continuar.')
      return
    }
    if (!sobrenomeTrim) {
      setErro('Digita seu sobrenome. Assim seu professor te identifica.')
      return
    }
    if (codigoTrim.length !== 6) {
      setErro('O código da turma tem 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      const turma = await buscarTurma(codigoTrim)
      if (!turma) {
        setErro('Código não encontrado. Confere com seu professor.')
        setLoading(false)
        return
      }
      const nomeCompleto = `${nomeTrim} ${sobrenomeTrim}`
      logarAluno({
        nome: nomeCompleto,
        codigoTurma: turma.codigo,
        turmaNome: turma.nome,
        turmaEscola: turma.escola,
      })

      // Recupera diagnóstico já feito (ex: aluno entrou de outro dispositivo)
      try {
        const anterior = await buscarResultadoAluno(turma.codigo, nomeCompleto)
        if (anterior?.top3?.length) {
          localStorage.setItem('edkraft:ultimoDiag', JSON.stringify({
            feitoEm: anterior.feitoEm,
            top3: anterior.top3,
          }))
        }
      } catch { /* segue mesmo se falhar */ }

      navigate('/inicio')
    } catch {
      setErro('Não consegui validar agora. Tenta de novo.')
      setLoading(false)
    }
  }

  return (
    <main className="entrar-page">
      <div className="entrar-container entrar-form-container">
        <button className="entrar-back" onClick={() => navigate('/')}>← Voltar</button>

        <h1 className="entrar-title">Entrar como aluno</h1>
        <p className="entrar-desc">
          Preenche teus dados e o código da turma que o professor te passou.
        </p>

        <form className="entrar-form" onSubmit={entrar}>
          <div className="form-row form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome</label>
              <input
                id="nome"
                className="form-input"
                type="text"
                placeholder="João"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="sobrenome">Sobrenome</label>
              <input
                id="sobrenome"
                className="form-input"
                type="text"
                placeholder="Silva"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="codigo">Código da turma</label>
            <input
              id="codigo"
              className="form-input entrar-codigo-input"
              type="text"
              placeholder="ABC123"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              maxLength={6}
              autoComplete="off"
            />
          </div>

          {erro && <div className="entrar-erro">{erro}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Validando...' : 'Entrar'}
          </button>
        </form>

        <p className="entrar-rodape-mini">
          Não tem código? Peça pro seu professor(a). Sem o código, o EDKRAFT não funciona.
        </p>
      </div>
    </main>
  )
}
