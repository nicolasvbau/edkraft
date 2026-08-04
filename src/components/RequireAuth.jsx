import { Navigate } from 'react-router-dom'
import { alunoLogado, professorLogadoNovo } from '../lib/auth'

export function RequireAluno({ children }) {
  if (!alunoLogado()) return <Navigate to="/" replace />
  return children
}

export function RequireProfessor({ children }) {
  if (!professorLogadoNovo()) return <Navigate to="/" replace />
  return children
}

export function RedirectIfAuth({ children }) {
  if (alunoLogado()) return <Navigate to="/inicio" replace />
  if (professorLogadoNovo()) return <Navigate to="/escola" replace />
  return children
}
