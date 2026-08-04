import { supabase, isSupabaseEnabled } from './supabase'

const TURMAS_KEY = 'edkraft:turmas'
const RESULTS_KEY = 'edkraft:diagResultados'
const PROF_KEY = 'edkraft:professor'

function readJson(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {}
}

export function gerarCodigoTurma() {
  const consoantes = 'BCDFGHJKLMNPQRSTVWXYZ'
  let code = ''
  for (let i = 0; i < 3; i++) {
    code += consoantes[Math.floor(Math.random() * consoantes.length)]
  }
  for (let i = 0; i < 3; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

/* ================= TURMAS ================= */

export async function listarTurmas({ professor, escola } = {}) {
  if (isSupabaseEnabled()) {
    let q = supabase.from('turmas').select('*').order('criada_em', { ascending: false })
    if (professor) q = q.eq('professor', professor)
    if (escola) q = q.eq('escola', escola)
    const { data, error } = await q
    if (error) {
      console.warn('Supabase listarTurmas:', error.message)
      return listarTurmasLocal({ professor, escola })
    }
    return (data || []).map(fromRowTurma)
  }
  return listarTurmasLocal({ professor, escola })
}

function listarTurmasLocal({ professor, escola } = {}) {
  let all = readJson(TURMAS_KEY, [])
  if (professor) all = all.filter(t => t.professor === professor)
  if (escola) all = all.filter(t => t.escola === escola)
  return all
}

export async function criarTurma({ nome, escola, serie, professor }) {
  const nova = {
    codigo: gerarCodigoTurma(),
    nome: nome.trim(),
    escola: escola.trim(),
    serie: serie.trim(),
    professor: professor.trim(),
    criadaEm: new Date().toISOString(),
  }

  if (isSupabaseEnabled()) {
    const row = toRowTurma(nova)
    let attempts = 0
    while (attempts < 5) {
      const { error } = await supabase.from('turmas').insert(row)
      if (!error) break
      if (error.code === '23505') {
        nova.codigo = gerarCodigoTurma()
        row.codigo = nova.codigo
        attempts++
        continue
      }
      console.warn('Supabase criarTurma:', error.message)
      break
    }
  }

  const locais = readJson(TURMAS_KEY, [])
  writeJson(TURMAS_KEY, [nova, ...locais.filter(t => t.codigo !== nova.codigo)])
  return nova
}

export async function removerTurma(codigo) {
  if (isSupabaseEnabled()) {
    await supabase.from('turmas').delete().eq('codigo', codigo)
    await supabase.from('resultados').delete().eq('turma_codigo', codigo)
  }
  writeJson(TURMAS_KEY, readJson(TURMAS_KEY, []).filter(t => t.codigo !== codigo))
  writeJson(RESULTS_KEY, readJson(RESULTS_KEY, []).filter(r => r.turmaCodigo !== codigo))
}

export async function buscarTurma(codigo) {
  const code = (codigo || '').toUpperCase().trim()
  if (!code) return null
  if (isSupabaseEnabled()) {
    const { data, error } = await supabase.from('turmas').select('*').eq('codigo', code).maybeSingle()
    if (!error && data) return fromRowTurma(data)
  }
  return readJson(TURMAS_KEY, []).find(t => t.codigo === code) || null
}

/* ================= RESULTADOS ================= */

export async function salvarResultado(resultado) {
  const enriched = { ...resultado, atualizadoEm: new Date().toISOString() }

  if (isSupabaseEnabled()) {
    const { error } = await supabase.from('resultados').upsert(toRowResultado(enriched), {
      onConflict: 'turma_codigo,aluno_nome',
    })
    if (error) console.warn('Supabase salvarResultado:', error.message)
  }

  const locais = readJson(RESULTS_KEY, [])
  const idx = locais.findIndex(
    r => r.turmaCodigo === enriched.turmaCodigo && r.alunoNome === enriched.alunoNome
  )
  if (idx >= 0) locais[idx] = enriched
  else locais.push(enriched)
  writeJson(RESULTS_KEY, locais)
}

export async function resultadosDaTurma(codigo) {
  if (isSupabaseEnabled()) {
    const { data, error } = await supabase.from('resultados').select('*').eq('turma_codigo', codigo)
    if (!error && data) return data.map(fromRowResultado)
  }
  return readJson(RESULTS_KEY, []).filter(r => r.turmaCodigo === codigo)
}

/* ================= PROFESSOR ================= */

export function professorLogado() {
  return readJson(PROF_KEY, null)
}

export function logarProfessor(dados) {
  writeJson(PROF_KEY, { ...dados, entrouEm: new Date().toISOString() })
}

export function deslogarProfessor() {
  try {
    localStorage.removeItem(PROF_KEY)
  } catch {}
}

/* ================= AGREGADOR ================= */

export function agregarResultados(resultados) {
  const agregado = {}
  resultados.forEach(r => {
    r.top3.forEach((area, i) => {
      if (!agregado[area.area]) {
        agregado[area.area] = { area: area.area, total: 0, first: 0, second: 0, third: 0 }
      }
      agregado[area.area].total += 3 - i
      if (i === 0) agregado[area.area].first++
      if (i === 1) agregado[area.area].second++
      if (i === 2) agregado[area.area].third++
    })
  })
  return Object.values(agregado).sort((a, b) => b.total - a.total)
}

/* ================= ROW MAPPERS ================= */

function toRowTurma(t) {
  return {
    codigo: t.codigo,
    nome: t.nome,
    escola: t.escola,
    serie: t.serie,
    professor: t.professor,
    criada_em: t.criadaEm,
  }
}

function fromRowTurma(r) {
  return {
    codigo: r.codigo,
    nome: r.nome,
    escola: r.escola,
    serie: r.serie,
    professor: r.professor,
    criadaEm: r.criada_em,
  }
}

function toRowResultado(r) {
  return {
    turma_codigo: r.turmaCodigo,
    aluno_nome: r.alunoNome,
    top3: r.top3,
    feito_em: r.feitoEm,
    atualizado_em: r.atualizadoEm,
  }
}

function fromRowResultado(r) {
  return {
    turmaCodigo: r.turma_codigo,
    alunoNome: r.aluno_nome,
    top3: r.top3,
    feitoEm: r.feito_em,
    atualizadoEm: r.atualizado_em,
  }
}
