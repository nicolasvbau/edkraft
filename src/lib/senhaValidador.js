/**
 * Validador de senha pra cadastro de professor.
 * Compensa a falta do HaveIBeenPwned (recurso Pro do Supabase)
 * bloqueando senhas óbvias que respondem por >90% dos ataques de dicionário.
 */

// Top senhas mais usadas no Brasil e globalmente (fontes: SplashData, NordPass,
// vazamentos brasileiros conhecidos). Lista compacta focada em cobertura x tamanho.
const SENHAS_COMUNS = new Set([
  // Sequências numéricas
  '12345678', '123456789', '1234567890', '87654321', '11111111', '00000000',
  '12341234', '123123123', '112233', '11223344', '00112233',
  // Teclado
  'qwertyui', 'qwerty123', 'qwertyuiop', 'asdfghjk', 'asdfghjkl', 'zxcvbnm',
  '1qaz2wsx', '1q2w3e4r', '1q2w3e4r5t', 'qazwsxedc', 'qwe123qwe',
  // Palavras óbvias
  'password', 'password1', 'password123', 'passw0rd', 'p@ssw0rd', 'admin123',
  'welcome1', 'letmein1', 'iloveyou', 'monkey12', 'dragon12', 'sunshine',
  // Português comum
  'senha123', 'senhasenha', 'brasil123', 'brasil2024', 'brasil2025', 'brasil2026',
  'flamengo1', 'corinthians', 'palmeiras', 'saopaulo', 'internet1', 'familia1',
  'amor2024', 'amor2025', 'teamo123', 'coracao1', 'jesuscristo', 'deusfiel1',
  'mudar123', 'trocar12', 'primeira', 'padrao12',
  // Nomes/datas comuns
  'nicolas12', 'joaosilva', 'mariajose', 'ana12345',
  '01011990', '01011980', '01012000', '01012024', '01012025', '01012026',
])

// Padrões que sempre são fracos
const PADROES_FRACOS = [
  /^(\d)\1+$/,                 // Só um dígito repetido (11111111)
  /^([a-zA-Z])\1+$/,          // Só uma letra repetida (aaaaaaaa)
  /^0?123456\d*$/,             // 123456, 01234567, 12345678, etc
  /^987654\d*$/,               // sequência descendente
  /^abcdef\w*$/i,              // alfabeto
]

// Palavras banais que se combinadas com números viram senha "esperta"
const RAIZES_BANAIS = [
  'senha', 'password', 'admin', 'user', 'login', 'test', 'teste',
  'edkraft', 'escola', 'professor', 'aluno', 'brasil', 'amor',
]

/**
 * Valida senha e retorna null (ok) ou { erro: string }.
 * @param {string} senha - senha em texto
 * @param {string} [email] - email do usuário (pra checar se senha ≠ email)
 * @param {string} [nome] - nome do usuário (pra checar se senha ≠ nome)
 */
export function validarSenha(senha, email = '', nome = '') {
  if (!senha) return { erro: 'Escolha uma senha.' }

  if (senha.length < 8) {
    return { erro: 'Senha muito curta. Use pelo menos 8 caracteres.' }
  }

  if (senha.length > 72) {
    return { erro: 'Senha muito longa. Use no máximo 72 caracteres.' }
  }

  const s = senha.toLowerCase().trim()

  // Bloqueia lista comum
  if (SENHAS_COMUNS.has(s)) {
    return { erro: 'Essa senha é uma das mais usadas no mundo — muito fácil de descobrir. Escolhe outra.' }
  }

  // Bloqueia padrões óbvios
  for (const p of PADROES_FRACOS) {
    if (p.test(senha)) {
      return { erro: 'Senha muito previsível (sequência ou repetição). Mistura letras e números.' }
    }
  }

  // Bloqueia raiz banal + números no fim (ex: senha123, admin2024, escola1)
  for (const raiz of RAIZES_BANAIS) {
    const regex = new RegExp(`^${raiz}\\d{0,4}$`, 'i')
    if (regex.test(senha)) {
      return { erro: `"${senha}" é muito comum. Combina palavras que não têm relação óbvia com o serviço.` }
    }
  }

  // Bloqueia senha = email ou parte dele
  if (email) {
    const emailLower = email.toLowerCase().trim()
    const parteEmail = emailLower.split('@')[0]
    if (s === emailLower || s === parteEmail) {
      return { erro: 'Senha não pode ser igual ao seu email.' }
    }
    // Email + números (nicolas123, admin@site.com -> admin123)
    if (parteEmail && parteEmail.length >= 4) {
      const regex = new RegExp(`^${escapeRegex(parteEmail)}\\d{0,4}$`, 'i')
      if (regex.test(senha)) {
        return { erro: 'Senha muito parecida com seu email. Escolhe algo bem diferente.' }
      }
    }
  }

  // Bloqueia senha = nome ou nome + números
  if (nome) {
    const nomeLower = nome.toLowerCase().trim()
    const primeiroNome = nomeLower.split(/\s+/)[0]
    if (primeiroNome && primeiroNome.length >= 4) {
      const regex = new RegExp(`^${escapeRegex(primeiroNome)}\\d{0,4}$`, 'i')
      if (regex.test(senha) || s === nomeLower) {
        return { erro: 'Senha muito parecida com seu nome. Fica fácil de adivinhar.' }
      }
    }
  }

  // Bloqueia senhas só com um tipo de caractere quando tem menos de 12
  const temLetra = /[a-zA-Z]/.test(senha)
  const temNumero = /\d/.test(senha)
  if (senha.length < 12 && !(temLetra && temNumero)) {
    return { erro: 'Combine letras e números pra deixar mais forte.' }
  }

  return null
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
