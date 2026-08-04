import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarTurma } from '../lib/turma'
import { logarAluno } from '../lib/auth'
import './Entrar.css'

export default function EntrarAluno() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    const nomeTrim = nome.trim()
    const codigoTrim = codigo.trim().toUpperCase()

    if (!nomeTrim) {
      setErro('Digita seu nome pra continuar.')
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
      logarAluno({
        nome: nomeTrim,
        codigoTurma: turma.codigo,
        turmaNome: turma.nome,
        turmaEscola: turma.escola,
      })
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
          Digita seu nome e o código da turma que seu professor te passou.
        </p>

        <form className="entrar-form" onSubmit={entrar}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              className="form-input"
              type="text"
              placeholder="Como você quer ser chamado"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
            />
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
