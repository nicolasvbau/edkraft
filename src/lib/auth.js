const ALUNO_KEY = 'edkraft:aluno'
const PROF_KEY = 'edkraft:professor'
const OLD_PERFIL_KEY = 'edkraft:perfil'

function readJson(key) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}

function writeJson(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {}
}

/* ============ ALUNO ============ */
export function alunoLogado() {
  const a = readJson(ALUNO_KEY)
  if (a) return a
  const legado = readJson(OLD_PERFIL_KEY)
  if (legado?.nome && legado?.codigoTurma) {
    const migrado = {
      nome: legado.nome,
      codigoTurma: legado.codigoTurma,
      turmaNome: null,
      turmaEscola: null,
      entrouEm: new Date().toISOString(),
    }
    writeJson(ALUNO_KEY, migrado)
    return migrado
  }
  return null
}

export function logarAluno({ nome, codigoTurma, turmaNome, turmaEscola }) {
  const dados = {
    nome: nome.trim(),
    codigoTurma: codigoTurma.toUpperCase().trim(),
    turmaNome: turmaNome || null,
    turmaEscola: turmaEscola || null,
    entrouEm: new Date().toISOString(),
  }
  writeJson(ALUNO_KEY, dados)
  writeJson(OLD_PERFIL_KEY, {
    ...(readJson(OLD_PERFIL_KEY) || {}),
    nome: dados.nome,
    codigoTurma: dados.codigoTurma,
  })
  return dados
}

export function deslogarAluno() {
  try {
    localStorage.removeItem(ALUNO_KEY)
  } catch {}
}

/* ============ PROFESSOR ============ */
export function professorLogadoNovo() {
  return readJson(PROF_KEY)
}

export function logarProfessor({ nome, escola }) {
  const dados = {
    nome: nome.trim(),
    escola: escola.trim(),
    entrouEm: new Date().toISOString(),
  }
  writeJson(PROF_KEY, dados)
  return dados
}

export function deslogarProfessor() {
  try {
    localStorage.removeItem(PROF_KEY)
  } catch {}
}

/* ============ TIPO ============ */
export function tipoUsuario() {
  if (alunoLogado()) return 'aluno'
  if (professorLogadoNovo()) return 'professor'
  return null
}

export function deslogar() {
  deslogarAluno()
  deslogarProfessor()
}
