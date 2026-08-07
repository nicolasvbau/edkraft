import { useNavigate } from 'react-router-dom'
import './Entrar.css'

export default function Entrar() {
  const navigate = useNavigate()

  return (
    <main className="entrar-page">
      <div className="entrar-container">
        <div className="entrar-header">
          <h1 className="entrar-title">Bem-vindo ao EDKRAFT</h1>
          <p className="entrar-desc">
            Escolha como você quer entrar. Cada perfil tem uma experiência dedicada.
          </p>
        </div>

        <div className="entrar-opcoes">
          <button className="entrar-card entrar-card-aluno" onClick={() => navigate('/entrar/aluno')}>
            <span className="entrar-emoji">🎓</span>
            <h2 className="entrar-card-title">Sou aluno</h2>
            <p className="entrar-card-desc">
              Descobrir minha carreira, fazer o diagnóstico vocacional e acompanhar meu plano de desenvolvimento.
            </p>
            <span className="entrar-card-req">Precisa do código da turma</span>
          </button>

          <button className="entrar-card entrar-card-prof" onClick={() => navigate('/entrar/professor')}>
            <span className="entrar-emoji">👩‍🏫</span>
            <h2 className="entrar-card-title">Sou professor</h2>
            <p className="entrar-card-desc">
              Criar turmas, gerar códigos, acompanhar o perfil vocacional dos alunos e ver relatórios agregados.
            </p>
            <span className="entrar-card-req">Sem cadastro — nome e escola</span>
          </button>
        </div>

        <p className="entrar-rodape">
          Ainda não sabe seu código de turma? Peça pro seu professor(a).
        </p>

        <p className="entrar-legal">
          Ao entrar, você concorda com nossa{' '}
          <button className="entrar-legal-link" onClick={() => navigate('/privacidade')}>
            Política de Privacidade e Termos de Uso
          </button>.
        </p>
      </div>
    </main>
  )
}
