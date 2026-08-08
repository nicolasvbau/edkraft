import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { entrarProfessor, cadastrarProfessor, recuperarSenhaProfessor } from '../lib/auth'
import { validarSenha } from '../lib/senhaValidador'
import './Entrar.css'

export default function EntrarProfessor() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('entrar') // 'entrar' | 'criar'
  const [nome, setNome] = useState('')
  const [escola, setEscola] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setErro('')
    setAviso('')

    const emailTrim = email.trim()
    if (!emailTrim || !senha) {
      setErro('Preencha e-mail e senha.')
      return
    }
    if (modo === 'criar' && (!nome.trim() || !escola.trim())) {
      setErro('Preencha nome e escola.')
      return
    }

    // Validação de força só no cadastro. No login, a senha já existe.
    if (modo === 'criar') {
      const problema = validarSenha(senha, emailTrim, nome)
      if (problema) {
        setErro(problema.erro)
        return
      }
    } else if (senha.length < 6) {
      setErro('Senha inválida.')
      return
    }

    setLoading(true)
    try {
      let res
      if (modo === 'entrar') {
        res = await entrarProfessor({ email: emailTrim, senha })
      } else {
        res = await cadastrarProfessor({ nome, escola, email: emailTrim, senha })
      }

      if (res.erro) {
        setErro(res.erro)
      } else if (res.precisaConfirmar) {
        setAviso('Conta criada. Confirme seu e-mail antes de entrar.')
      } else {
        navigate('/escola')
      }
    } catch (err) {
      setErro('Erro inesperado. Tente de novo.')
    } finally {
      setLoading(false)
    }
  }

  async function esqueciSenha() {
    setErro('')
    setAviso('')
    const emailTrim = email.trim()
    if (!emailTrim) {
      setErro('Digite seu e-mail primeiro pra receber o link de recuperação.')
      return
    }
    setLoading(true)
    const res = await recuperarSenhaProfessor(emailTrim)
    setLoading(false)
    if (res.erro) {
      setErro(res.erro)
    } else {
      setAviso(`Link de recuperação enviado pra ${emailTrim}. Confira sua caixa de entrada e spam.`)
    }
  }

  return (
    <main className="entrar-page">
      <div className="entrar-container entrar-form-container">
        <button className="entrar-back" onClick={() => navigate('/entrar')}>← Voltar</button>

        <h1 className="entrar-title">
          {modo === 'entrar' ? 'Entrar como professor' : 'Criar conta de professor'}
        </h1>
        <p className="entrar-desc">
          {modo === 'entrar'
            ? 'Use o e-mail e a senha que você cadastrou.'
            : 'Cadastro rápido pra criar turmas e acompanhar o diagnóstico dos alunos.'}
        </p>

        <div className="entrar-tabs">
          <button
            type="button"
            className={`entrar-tab ${modo === 'entrar' ? 'active' : ''}`}
            onClick={() => { setModo('entrar'); setErro(''); setAviso('') }}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`entrar-tab ${modo === 'criar' ? 'active' : ''}`}
            onClick={() => { setModo('criar'); setErro(''); setAviso('') }}
          >
            Criar conta
          </button>
        </div>

        <form className="entrar-form" onSubmit={onSubmit}>
          {modo === 'criar' && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="nome">Seu nome</label>
                <input
                  id="nome"
                  className="form-input"
                  type="text"
                  placeholder="Professor(a)..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="escola">Escola</label>
                <input
                  id="escola"
                  className="form-input"
                  type="text"
                  placeholder="Nome da instituição"
                  value={escola}
                  onChange={(e) => setEscola(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="voce@escola.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus={modo === 'entrar'}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              className="form-input"
              type="password"
              placeholder={modo === 'criar' ? 'Mínimo 8 caracteres, letras e números' : 'Sua senha'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'}
            />
          </div>

          {erro && <div className="entrar-erro">{erro}</div>}
          {aviso && <div className="entrar-aviso">{aviso}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading
              ? (modo === 'entrar' ? 'Entrando...' : 'Criando...')
              : (modo === 'entrar' ? 'Entrar no painel' : 'Criar conta')}
          </button>

          {modo === 'entrar' && (
            <button
              type="button"
              className="entrar-esqueci"
              onClick={esqueciSenha}
              disabled={loading}
            >
              Esqueci minha senha
            </button>
          )}
        </form>

        <p className="entrar-rodape-mini">
          Sua conta é individual — cada professor tem suas próprias turmas, isoladas por senha.
        </p>
      </div>
    </main>
  )
}
