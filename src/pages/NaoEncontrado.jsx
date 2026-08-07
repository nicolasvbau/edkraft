import { useNavigate } from 'react-router-dom'
import { alunoLogado, professorLogadoNovo } from '../lib/auth'
import './Entrar.css'

export default function NaoEncontrado() {
  const navigate = useNavigate()

  const destino = alunoLogado() ? '/inicio' : professorLogadoNovo() ? '/escola' : '/'
  const rotulo = alunoLogado()
    ? 'Voltar ao início'
    : professorLogadoNovo()
      ? 'Voltar ao painel'
      : 'Voltar à página inicial'

  return (
    <main className="entrar-page">
      <div className="entrar-container entrar-form-container" style={{ textAlign: 'center' }}>
        <h1 className="entrar-title">Página não encontrada</h1>
        <p className="entrar-desc" style={{ margin: '0 auto 28px' }}>
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <button className="btn btn-primary btn-block" onClick={() => navigate(destino)}>
          {rotulo}
        </button>
      </div>
    </main>
  )
}
