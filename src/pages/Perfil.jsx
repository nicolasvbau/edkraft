import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { alunoLogado, deslogar } from '../lib/auth'
import './Perfil.css'

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]

const FORM_INICIAL = {
  telefone: '',
  nascimento: '',
  cidade: '',
  estado: '',
  sobre: '',
}

export default function Perfil() {
  const aluno = alunoLogado()
  const [form, setForm] = useLocalStorage('edkraft:perfilExtra', FORM_INICIAL)
  const [saved, setSaved] = useState(false)

  if (!aluno) return null

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const [confirmandoSair, setConfirmandoSair] = useState(false)

  function iniciarSair() {
    setConfirmandoSair(true)
  }

  function confirmarSair() {
    deslogar()
    window.location.href = '/'
  }

  function cancelarSair() {
    setConfirmandoSair(false)
  }

  const initial = aluno.nome[0].toUpperCase()

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <header className="perfil-header">
          <span className="perfil-subtitle">Perfil</span>
          <h1 className="perfil-title">Seus dados</h1>
          <p className="perfil-description">
            Complete pra receber recomendações mais precisas no seu plano.
          </p>
        </header>

        <div className="perfil-card">
          <div className="perfil-avatar-area">
            <div className="perfil-avatar">{initial}</div>
            <div className="perfil-avatar-info">
              <span className="perfil-avatar-nome">{aluno.nome}</span>
              <span className="perfil-avatar-tipo">
                {aluno.turmaNome ? `${aluno.turmaEscola || ''} — ${aluno.turmaNome}` : 'Estudante'}
              </span>
              <span className="perfil-avatar-codigo">Turma <code>{aluno.codigoTurma}</code></span>
            </div>
          </div>

          <form className="perfil-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="text"
                  className="form-input"
                  placeholder="(11) 99999-9999"
                  value={form.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="nascimento">Data de nascimento</label>
                <input
                  id="nascimento"
                  type="date"
                  className="form-input"
                  value={form.nascimento}
                  onChange={(e) => handleChange('nascimento', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  type="text"
                  className="form-input"
                  placeholder="Sua cidade"
                  value={form.cidade}
                  onChange={(e) => handleChange('cidade', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  className="form-input form-select"
                  value={form.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {estados.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="sobre">Sobre você</label>
              <textarea
                id="sobre"
                className="form-input form-textarea"
                placeholder="Conte um pouco sobre seus interesses, objetivos e o que busca pro futuro..."
                rows={5}
                value={form.sobre}
                onChange={(e) => handleChange('sobre', e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="form-submit-btn">
                Salvar alterações
              </button>
              {saved && <span className="form-saved-badge">✓ Dados salvos</span>}
            </div>
          </form>

          <div className="perfil-sair-area">
            {!confirmandoSair ? (
              <button type="button" className="perfil-sair-btn" onClick={iniciarSair}>
                Sair da conta
              </button>
            ) : (
              <div className="perfil-sair-confirm">
                <span className="perfil-sair-msg">Tem certeza? Vai precisar do código da turma pra voltar.</span>
                <div className="perfil-sair-actions">
                  <button type="button" className="perfil-sair-cancel" onClick={cancelarSair}>
                    Cancelar
                  </button>
                  <button type="button" className="perfil-sair-btn" onClick={confirmarSair}>
                    Sim, sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
