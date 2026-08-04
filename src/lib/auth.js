import { supabase, isSupabaseEnabled } from './supabase'

const ALUNO_KEY = 'edkraft:aluno'
const OLD_PERFIL_KEY = 'edkraft:perfil'
const OLD_PROF_KEY = 'edkraft:professor'

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

/* ============ ALUNO (sem auth, só localStorage) ============ */
export function alunoLogado() {
  return readJson(ALUNO_KEY)
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
  return dados
}

export function deslogarAluno() {
  try {
    localStorage.removeItem(ALUNO_KEY)
    localStorage.removeItem(OLD_PERFIL_KEY)
    localStorage.removeItem('edkraft:perfilExtra')
  } catch {}
}

/* ============ PROFESSOR (via Supabase Auth) ============ */

let cachedProf = readJson(OLD_PROF_KEY)

export function professorLogadoNovo() {
  return cachedProf
}

export async function inicializarProfessorSession() {
  if (!isSupabaseEnabled()) {
    cachedProf = null
    return null
  }
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    cachedProf = null
    try { localStorage.removeItem(OLD_PROF_KEY) } catch {}
    return null
  }
  const meta = session.user.user_metadata || {}
  cachedProf = {
    id: session.user.id,
    email: session.user.email,
    nome: meta.nome || (session.user.email || '').split('@')[0],
    escola: meta.escola || '',
  }
  writeJson(OLD_PROF_KEY, cachedProf)
  return cachedProf
}

export async function entrarProfessor({ email, senha }) {
  if (!isSupabaseEnabled()) {
    return { erro: 'Login de professor requer Supabase configurado.' }
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha })
  if (error) {
    if (/invalid login credentials/i.test(error.message)) {
      return { erro: 'E-mail ou senha incorretos.' }
    }
    if (/email not confirmed/i.test(error.message)) {
      return { erro: 'E-mail não confirmado. Verifique a caixa de entrada ou peça pro admin desativar confirmação.' }
    }
    return { erro: error.message }
  }
  await inicializarProfessorSession()
  return { ok: true, professor: cachedProf }
}

export async function cadastrarProfessor({ nome, escola, email, senha }) {
  if (!isSupabaseEnabled()) {
    return { erro: 'Cadastro requer Supabase configurado.' }
  }
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: senha,
    options: {
      data: {
        nome: nome.trim(),
        escola: escola.trim(),
      },
    },
  })
  if (error) {
    if (/already registered|user already exists/i.test(error.message)) {
      return { erro: 'Esse e-mail já tem cadastro. Tente entrar em vez de criar conta.' }
    }
    if (/password/i.test(error.message)) {
      return { erro: 'Senha muito fraca (mínimo 6 caracteres).' }
    }
    return { erro: error.message }
  }
  // Se confirmação de email tá desabilitada, session vem no signUp
  if (data.session) {
    await inicializarProfessorSession()
    return { ok: true, professor: cachedProf }
  }
  // Se precisa confirmar email
  return { ok: true, precisaConfirmar: true }
}

export async function deslogarProfessor() {
  cachedProf = null
  try { localStorage.removeItem(OLD_PROF_KEY) } catch {}
  if (isSupabaseEnabled()) {
    try { await supabase.auth.signOut() } catch {}
  }
}

/* ============ TIPO ============ */
export function tipoUsuario() {
  if (alunoLogado()) return 'aluno'
  if (professorLogadoNovo()) return 'professor'
  return null
}

export async function deslogar() {
  deslogarAluno()
  await deslogarProfessor()
}
