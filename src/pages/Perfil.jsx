import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buscarTurma } from '../lib/turma'
import './Perfil.css'

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]

const FORM_INICIAL = {
  nome: '',
  telefone: '',
  nascimento: '',
  cidade: '',
  estado: '',
  sobre: '',
  codigoTurma: '',
}

export default function Perfil() {
  const [form, setForm] = useLocalStorage('edkraft:perfil', FORM_INICIAL)
  const [saved, setSaved] = useState(false)
  const [turmaInfo, setTurmaInfo] = useState(null)
  const [turmaErro, setTurmaErro] = useState('')

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    setSaved(false)
    if (campo === 'codigoTurma') {
      setTurmaInfo(null)
      setTurmaErro('')
    }
  }

  async function validarTurma() {
    const codigo = form.codigoTurma.trim().toUpperCase()
    if (!codigo) {
      setTurmaInfo(null)
      setTurmaErro('')
      return
    }
    setTurmaErro('Validando...')
    const t = await buscarTurma(codigo)
    if (t) {
      setTurmaInfo(t)
      setTurmaErro('')
    } else {
      setTurmaInfo(null)
      setTurmaErro('Código não encontrado. Peça pro seu professor conferir.')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
              <label className="form-label" htmlFor="codigoTurma">
                Código da turma <span className="form-optional">(opcional)</span>
              </label>
              <div className="form-turma-row">
                <input
                  id="codigoTurma"
                  type="text"
                  className="form-input"
                  placeholder="Ex: ABC123"
                  value={form.codigoTurma}
                  onChange={(e) => handleChange('codigoTurma', e.target.value.toUpperCase())}
                  onBlur={validarTurma}
                  maxLength={6}
                />
                <button type="button" className="form-turma-check" onClick={validarTurma}>
                  Validar
                </button>
              </div>
              {turmaInfo && (
                <p className="form-turma-ok">
                  ✓ {turmaInfo.escola} — {turmaInfo.nome} ({turmaInfo.serie})
                </p>
              )}
              {turmaErro && <p className="form-turma-err">✗ {turmaErro}</p>}
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
              {saved && <span className="form-saved-badge">✓ Dados salvos</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
