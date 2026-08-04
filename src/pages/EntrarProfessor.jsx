import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logarProfessor } from '../lib/auth'
import './Entrar.css'

export default function EntrarProfessor() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [escola, setEscola] = useState('')
  const [erro, setErro] = useState('')

  function entrar(e) {
    e.preventDefault()
    setErro('')
    if (!nome.trim() || !escola.trim()) {
      setErro('Preenche seu nome e o nome da escola.')
      return
    }
    logarProfessor({ nome, escola })
    navigate('/escola')
  }

  return (
    <main className="entrar-page">
      <div className="entrar-container entrar-form-container">
        <button className="entrar-back" onClick={() => navigate('/')}>← Voltar</button>

        <h1 className="entrar-title">Entrar como professor</h1>
        <p className="entrar-desc">
          Sem cadastro. Só precisamos do seu nome e da escola pra organizar suas turmas.
        </p>

        <form className="entrar-form" onSubmit={entrar}>
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

          {erro && <div className="entrar-erro">{erro}</div>}

          <button type="submit" className="btn btn-primary btn-block">Entrar no painel</button>
        </form>
      </div>
    </main>
  )
}
