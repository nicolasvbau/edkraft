import { useState } from 'react'
import './Perfil.css'

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]

export default function Perfil() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    nascimento: '',
    cidade: '',
    estado: '',
    sobre: '',
  })

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <header className="perfil-header">
          <span className="perfil-subtitle">Perfil</span>
          <h1 className="perfil-title">Seus dados</h1>
          <p className="perfil-description">
            Mantenha suas informações atualizadas para relatórios mais precisos.
          </p>
        </header>

        <div className="perfil-card">
          <div className="perfil-avatar-area">
            <div className="perfil-avatar">
              {form.nome.trim() ? form.nome.trim()[0].toUpperCase() : 'V'}
            </div>
            <div className="perfil-avatar-info">
              <span className="perfil-avatar-nome">{form.nome.trim() || 'Seu nome'}</span>
              <span className="perfil-avatar-tipo">Estudante</span>
            </div>
          </div>

          <form className="perfil-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                type="text"
                className="form-input"
                placeholder="Digite seu nome completo"
                value={form.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
              />
            </div>

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
                placeholder="Conte um pouco sobre seus interesses, objetivos e o que você busca para o futuro..."
                rows={5}
                value={form.sobre}
                onChange={(e) => handleChange('sobre', e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="form-submit-btn">
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
