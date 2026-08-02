import { useEffect, useRef, useState } from 'react'
import './EdConselheiro.css'

const EMOTIONS = {
  ansiedade: ['ansioso', 'ansiosa', 'ansiedade', 'nervoso', 'nervosa', 'preocupado', 'preocupada', 'medo', 'panico', 'pânico', 'tenso', 'tensa', 'pressão', 'pressao', 'apreensivo', 'apreensiva', 'aflito', 'aflita', 'angústia', 'angustia', 'sufocado', 'sufocada', 'apavorado', 'apavorada'],
  tristeza: ['triste', 'tristeza', 'desanimado', 'desanimada', 'deprimido', 'deprimida', 'pra baixo', 'sem animo', 'sem ânimo', 'sozinho', 'sozinha', 'vazio', 'vazia', 'chorando', 'chorar', 'chorei', 'desesperado', 'desesperada', 'abandonado', 'abandonada', 'saudade', 'falta', 'dói', 'dor'],
  confusao: ['confuso', 'confusa', 'perdido', 'perdida', 'não sei', 'nao sei', 'sem rumo', 'indeciso', 'indecisa', 'dúvida', 'duvida', 'não entendo', 'complicado', 'complicada', 'difícil', 'dificil', 'não tenho certeza', 'talvez', 'será que', 'sera que', 'não consigo decidir', 'entre', 'escolher'],
  frustração: ['frustrado', 'frustrada', 'raiva', 'irritado', 'irritada', 'cansado', 'cansada', 'esgotado', 'esgotada', 'não aguento', 'desistir', 'saco cheio', 'odeio', 'injusto', 'porra', 'merda', 'droga', 'impossível', 'impossivel', 'cansativo', 'estressado', 'estressada', 'saturado'],
  empolgação: ['animado', 'animada', 'empolgado', 'empolgada', 'feliz', 'contente', 'legal', 'massa', 'top', 'demais', 'incrível', 'incrivel', 'adorei', 'amei', 'motivado', 'motivada', 'show', 'boa', 'bom', 'curto', 'curtindo', 'gosto', 'amo', 'paixão', 'paixao', 'sonho', 'quero muito'],
  insegurança: ['inseguro', 'insegura', 'incapaz', 'burro', 'burra', 'não consigo', 'nao consigo', 'não sou bom', 'não sou boa', 'fracasso', 'fracassado', 'inferior', 'comparar', 'comparação', 'medo de errar', 'medo de falhar', 'todo mundo', 'menos eu', 'não sirvo', 'inútil', 'vergonha'],
}

const TOPICS = {
  vestibular: ['vestibular', 'enem', 'prova', 'nota', 'sisu', 'prouni', 'fuvest', 'unicamp', 'estudar pra', 'passar', 'aprovado', 'reprovado', 'cursinho', 'redação', 'redacao', 'simulado', 'gabarito'],
  carreira: ['carreira', 'profissão', 'profissao', 'trabalho', 'emprego', 'futuro profissional', 'mercado', 'salario', 'salário', 'área', 'area', 'curso', 'faculdade', 'universidade', 'formação', 'formacao', 'graduação', 'graduacao'],
  familia: ['família', 'familia', 'pai', 'mãe', 'mae', 'pais', 'irmão', 'irmã', 'irmao', 'irma', 'parente', 'casa', 'cobrança', 'cobranca', 'pressão dos', 'querem que eu', 'minha mãe', 'meu pai'],
  escola: ['escola', 'colégio', 'colegio', 'professor', 'professora', 'aula', 'matéria', 'materia', 'prova', 'trabalho escolar', 'colega', 'turma', 'bullying', 'nota baixa'],
  autoconhecimento: ['me conhecer', 'quem eu sou', 'personalidade', 'meu jeito', 'identidade', 'valores', 'propósito', 'proposito', 'sentido', 'vocação', 'vocacao', 'descobrir', 'entender', 'sobre mim'],
  relacionamento: ['namorado', 'namorada', 'ficante', 'crush', 'amigo', 'amiga', 'amizade', 'briga', 'brigamos', 'traição', 'traicao', 'solidão', 'solidao', 'ciúme', 'ciume', 'término', 'termino', 'solteiro', 'solteira'],
  saude_mental: ['terapia', 'terapeuta', 'psicólogo', 'psicologo', 'psiquiatra', 'remédio', 'remedio', 'medicação', 'medicacao', 'depressão', 'depressao', 'automutilação', 'suicídio', 'suicidio', 'pânico', 'panico', 'ansiolítico', 'ansiolitico'],
}

function detect(text, map) {
  const lower = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const original = text.toLowerCase()
  const found = []
  for (const [key, keywords] of Object.entries(map)) {
    if (keywords.some(k => original.includes(k) || lower.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, '')))) {
      found.push(key)
    }
  }
  return found
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function isQuestion(text) {
  return text.includes('?') || /^(o que|como|qual|quando|onde|por que|será|sera|posso|devo|consigo|tem como|dá pra|da pra)/i.test(text.trim())
}

function isShortAffirmative(text) {
  const t = text.trim().toLowerCase()
  return /^(sim|sii+|ss+|yeah|yes|é|eh|uhum|aham|claro|com certeza|pode ser|bora|vamos|quero|ok|tá|ta|beleza|blz|top|show|massa|boa|isso|exato|exatamente|certeza|manda|fala|conta)[\s!.]*$/i.test(t)
}

function isShortNegative(text) {
  const t = text.trim().toLowerCase()
  return /^(não|nao|nah|nope|nem|nunca|de jeito nenhum|acho que não|acho que nao|n|nn)[\s!.]*$/i.test(t)
}

function isGreeting(text) {
  const t = text.trim().toLowerCase()
  return /^(oi|olá|ola|eai|e ai|fala|hey|hello|hi|bom dia|boa tarde|boa noite|salve|eae|oie)[\s!.,]*$/i.test(t)
}

const R = {
  ansiedade: [
    'Respira comigo. Eu sei que ansiedade pesa, mas ela também mostra que você se importa com o seu futuro — e isso já é muito. Me conta: qual parte te preocupa mais agora?',
    'Quando a ansiedade aperta, tudo parece urgente ao mesmo tempo, né? Mas olha: você não precisa resolver tudo hoje. Vamos focar numa coisa de cada vez. O que te tiraria um peso agora?',
    'É normal sentir isso, sério. A maioria dos estudantes passa por isso e ninguém fala. Mas escuta: o fato de você estar aqui já é um passo. O que você acha que te ajudaria a se sentir mais tranquilo(a)?',
    'Sabe o que funciona pra muita gente? Separar o que você pode controlar do que não pode. Vamos tentar? Me diz uma coisa que está no seu controle agora.',
  ],
  tristeza: [
    'Obrigado por me contar isso. De verdade. Às vezes só falar já alivia um pouco. Não precisa fingir que tá tudo bem comigo — pode ser honesto(a). O que tá pesando mais?',
    'Eu te ouço. Todo mundo tem dias difíceis, e tá tudo bem não estar bem o tempo todo. O que costumava te fazer sorrir? Às vezes relembrar isso ajuda.',
    'Sinto muito que você tá passando por isso. Quer me contar mais? Prometo que não vou julgar — tô aqui pra te ouvir mesmo.',
    'A tristeza é um sinal de que algo precisa de atenção. Não é fraqueza — é informação. O que você acha que está precisando e não está recebendo?',
  ],
  confusao: [
    'Olha, estar confuso(a) é literalmente o primeiro passo pra clareza. Sério! Ninguém sai do zero direto pra certeza. Vamos organizar isso: o que você sabe que NÃO quer? Eliminar opções é mais fácil que escolher.',
    'Eu entendo demais essa sensação. Mas escuta: você não precisa ter tudo decidido agora. Que tal a gente começar pelo que te dá curiosidade? Me conta algo que quando você vê, pensa "hmm, isso é legal".',
    'A dúvida faz parte do processo. Os profissionais mais realizados que eu conheço mudaram de ideia pelo menos 2 vezes antes de acertar. O importante é explorar. Quer explorar comigo?',
    'Quando tudo parece nebuloso, ajuda muito pensar em experiências concretas. Me conta: qual foi a última vez que você fez algo e pensou "quero mais disso"?',
  ],
  frustração: [
    'Eu entendo sua frustração. De verdade. Mas escuta: não desiste — essa energia pode virar combustível pra mudança. O que exatamente tá te frustrando? Vamos destrinchar isso.',
    'Cansaço e frustração são sinais de que algo precisa mudar. Não necessariamente o objetivo, mas talvez o caminho. Se você pudesse mudar uma coisa agora, o que seria?',
    'Respira. Você já enfrentou coisas difíceis antes e sobreviveu — essa também vai passar. Me conta: qual seria o cenário ideal pra você?',
    'Olha, raiva não é ruim quando canalizada certo. Pessoas que mudaram o mundo tinham raiva de algo injusto. A questão é: o que você quer fazer com esse sentimento?',
  ],
  empolgação: [
    'Que energia boa! Guarda esse sentimento porque ele é um GPS interno. Me conta mais — o que tá te deixando assim? Pode ser uma pista importantíssima.',
    'Adoro ver essa empolgação! Quando a gente se anima assim com algo, geralmente é o coração dizendo "é por aqui". Quer explorar mais essa direção?',
    'Show! Essa energia é exatamente o combustível que você precisa. Vamos aproveitar esse momento pra traçar uns próximos passos concretos?',
    'Isso é muito bom! Sabe por quê? Porque motivação intrínseca — essa que vem de dentro — é o que separa quem desiste de quem persiste. O que te anima nessa área?',
  ],
  insegurança: [
    'Ei, escuta: todo mundo — TODO MUNDO — sente insegurança. Os melhores profissionais que existem já se sentiram exatamente assim. O que importa não é ser perfeito, é continuar tentando.',
    'Você é mais capaz do que acha. Sério. Me conta uma coisa que você já conquistou, por menor que pareça. Quero te mostrar algo sobre você mesmo(a).',
    'Comparação é uma armadilha do Instagram. Você tá comparando seus bastidores com o palco dos outros. Vamos focar nas SUAS qualidades — o que as pessoas ao seu redor dizem que você faz bem?',
    'Sabe o que a insegurança realmente é? É seu cérebro tentando te proteger de errar. Mas errar faz parte. Toda pessoa de sucesso tem uma lista enorme de fracassos. Me conta: de que você tem medo?',
  ],
}

const T = {
  vestibular: [
    'Vestibular é tenso, eu sei. Mas lembra: ele é uma porta, não a única. Que curso você tá pensando? Vamos conversar sobre isso.',
    'Sobre estudos: ter consistência vale mais que maratona. Estudar 2h todo dia > 10h num dia. Como tá sua rotina?',
    'O ENEM/vestibular mede uma coisa, mas a vida profissional mede outra. Não se defina por uma nota. Qual área te atrai mais?',
  ],
  carreira: [
    'Boa! Quando pensa em trabalho, o que é mais importante pra você: ganhar bem, fazer algo que ama, ajudar pessoas, ou ter liberdade? Não tem resposta errada.',
    'O mercado muda muito, mas existem habilidades que sempre vão ser valorizadas: comunicação, pensamento crítico, adaptabilidade. Já pensou em qual dessas é seu forte?',
    'Quer uma dica? Em vez de pensar "qual profissão escolher", pensa "que tipo de problema eu gostaria de resolver todo dia". Muda tudo! Que problemas te interessam?',
  ],
  familia: [
    'Família é complicado, né? Eles querem o melhor pra você, mas às vezes a pressão pesa demais. A decisão final é sua — são seus próximos 40 anos, não os deles. Como você tá lidando?',
    'Entendo a pressão. Uma coisa que funciona: mostrar pra família que você tá pensando no futuro de forma séria. Quando eles veem planejamento, a cobrança diminui. Quer que a gente monte um plano juntos?',
    'Sabe, muitas vezes os pais projetam os medos deles na gente. Não é maldade — é medo de ver o filho sofrer. Já tentou explicar como se sente sem brigar? Às vezes eles não percebem o peso.',
  ],
  escola: [
    'A escola pode parecer distante do mundo real, mas ela te dá ferramentas importantes. Qual matéria você mais curte? Pode revelar muito sobre seus interesses.',
    'Se uma matéria não faz sentido, tenta conectar com algo que gosta. Curte games? Física e matemática tão por trás de cada jogo. Gosta de séries? É roteiro, comunicação, produção.',
    'Os amigos e experiências da escola são tão importantes quanto as notas. O que tá rolando na escola que tá te afetando?',
  ],
  autoconhecimento: [
    'Querer se conhecer melhor é um sinal incrível de maturidade. Começa assim: se você tivesse um dia inteiro livre, sem obrigação nenhuma, o que faria?',
    'Autoconhecimento é uma jornada, não um destino. Cada experiência te ensina algo novo. O que você descobriu sobre si mesmo(a) recentemente?',
    'Uma coisa que ajuda muito: pedir pra 3 pessoas próximas descreverem você em 3 palavras. A diferença entre como você se vê e como os outros te veem é reveladora.',
  ],
  relacionamento: [
    'Relacionamentos mexem com tudo, né? O mais importante é lembrar que você é uma pessoa completa sozinho(a) — o outro complementa, não completa. O que tá acontecendo?',
    'Entendo que isso tá pesando. Mas olha: relações saudáveis não devem te fazer sentir menos. Devem te fazer crescer. Como esse relacionamento te faz sentir a maior parte do tempo?',
    'Amizade e amor são essenciais, mas você vem primeiro. Cuidar de si não é egoísmo — é necessidade. Como você tá cuidando de você?',
  ],
  saude_mental: [
    'Obrigado por confiar em mim pra falar sobre isso. É muito importante. Se você tiver sentimentos muito intensos, considere falar com um profissional. O CVV (188) tá disponível 24h, tá? Como posso te ajudar agora?',
    'Saúde mental é tão importante quanto saúde física. Não tem nada de errado em pedir ajuda — na verdade, é a coisa mais corajosa que alguém pode fazer. Você já conversou com alguém sobre isso?',
    'Eu me preocupo com você. Lembra que eu sou uma IA e não substituo um profissional. Mas posso te ouvir e te ajudar a organizar o que sente. O CVV (188) tá sempre disponível se precisar.',
  ],
}

const QUESTION_RESPONSES = [
  'Boa pergunta! Olha, na minha visão: {CONTEXT}. Mas o mais importante é o que faz sentido pra VOCÊ. O que seu instinto diz?',
  'Hmm, depende muito do que você valoriza. {CONTEXT}. Me conta mais sobre o que te importa e eu posso dar uma opinião mais certeira.',
  'Essa é uma dúvida super comum. {CONTEXT}. Quer que a gente explore isso mais a fundo?',
]

const QUESTION_CONTEXTS = {
  carreira: 'não existe profissão perfeita — existe a que combina com seus valores, habilidades e estilo de vida',
  vestibular: 'o caminho até a aprovação é feito de constância e autoconhecimento, não só de horas de estudo',
  familia: 'é possível respeitar seus pais e ainda assim seguir o que faz sentido pra você — as duas coisas coexistem',
  escola: 'as matérias que você mais gosta geralmente apontam pra áreas que combinam com seu perfil',
  autoconhecimento: 'se conhecer é um processo — ninguém tem todas as respostas de uma vez, e tá tudo bem',
  relacionamento: 'pessoas vêm e vão, mas a relação que você tem consigo mesmo é pra vida toda',
  saude_mental: 'cuidar da mente é a decisão mais inteligente que alguém pode tomar',
}

const FOLLOW_UPS = [
  'Hmm, faz sentido. E como isso te faz sentir?',
  'Entendi. E isso tá afetando outras áreas da sua vida também?',
  'Obrigado por compartilhar. O que você acha que seria um primeiro passo prático pra melhorar isso?',
  'Interessante. E o que você já tentou fazer a respeito?',
  'Te entendo. Se pudesse mudar uma coisa sobre essa situação agora, o que seria?',
  'Hmm, imagino como é. Você já conversou com alguém sobre isso além de mim?',
]

const DEEP_FOLLOW = {
  ansiedade: [
    'Você mencionou ansiedade antes. Esse sentimento continua? Lembra que ansiedade é como um alarme — às vezes dispara mesmo quando não tem perigo real. O que te ajuda a acalmar?',
    'Percebo que a preocupação com o futuro aparece bastante no que você fala. Que tal a gente criar uma lista do que tá no seu controle? Pode ajudar muito.',
  ],
  tristeza: [
    'Quero saber como você tá agora. Melhorou um pouco desde que a gente começou a conversar? Saiba que pode voltar aqui sempre que precisar.',
    'Pelo que você me contou, tem muita coisa pesando. Já pensou em escrever o que sente? Tipo um diário. Tirar da cabeça e colocar no papel alivia mais do que parece.',
  ],
  confusao: [
    'Voltando à sua dúvida: das coisas que a gente conversou, alguma te deu aquele "clique"? Às vezes clareza vem quando a gente para de forçar.',
    'Olha, das opções que você considerou, qual te dá um frio na barriga bom? Aquele friozinho de "e se der certo?" — esse é o caminho.',
  ],
  insegurança: [
    'Quero te lembrar: as qualidades que você tem e talvez não valorize são exatamente o que alguém lá fora tá precisando. Vamos listar seus pontos fortes?',
    'A insegurança aparece mais quando a gente tá tentando algo novo. E sabe o que isso significa? Que você tá crescendo. Ficar na zona de conforto não dá insegurança, mas também não te leva a lugar nenhum.',
  ],
}

const QUICK_REPLIES = [
  { label: 'Tô ansioso(a) com o futuro', emotion: 'ansiedade' },
  { label: 'Não sei qual carreira seguir', emotion: 'confusao', topic: 'carreira' },
  { label: 'Me sinto pressionado(a)', emotion: 'frustração', topic: 'familia' },
  { label: 'Quero me conhecer melhor', emotion: 'empolgação', topic: 'autoconhecimento' },
]

const INITIAL_MESSAGE = {
  id: 'initial',
  sender: 'bot',
  text: 'Oi! Eu sou o Ed, seu conselheiro aqui no EDKRAFT. Pode falar comigo sobre qualquer coisa — medos, dúvidas, o que te anima, o que te preocupa. Eu vou te ouvindo e te ajudando a refletir. Como você tá se sentindo hoje?',
}

let messageIdCounter = 1
function nextId() {
  return `msg-${++messageIdCounter}`
}

function generateResponse(text, memory) {
  const emotions = detect(text, EMOTIONS)
  const topics = detect(text, TOPICS)

  emotions.forEach(e => { memory.emotions[e] = (memory.emotions[e] || 0) + 1 })
  topics.forEach(t => { memory.topics[t] = (memory.topics[t] || 0) + 1 })
  memory.messageCount += 1
  memory.lastUserText = text

  if (isGreeting(text)) {
    if (memory.messageCount <= 1) {
      return 'E aí! Que bom que você veio conversar comigo. Me conta: como andam as coisas? Pode falar sobre qualquer coisa.'
    }
    return 'E aí! Bom te ver de novo. Me conta: o que tá na sua cabeça agora?'
  }

  if (topics.includes('saude_mental')) {
    return pickRandom(T.saude_mental)
  }

  if (memory.messageCount > 5 && memory.messageCount % 4 === 0) {
    const dominant = Object.entries(memory.emotions).sort((a, b) => b[1] - a[1])[0]
    if (dominant && DEEP_FOLLOW[dominant[0]]) {
      const pool = DEEP_FOLLOW[dominant[0]]
      return pool[Math.min(memory.deepIdx || 0, pool.length - 1)]
    }
  }

  if (isShortAffirmative(text)) {
    const lastTopic = Object.entries(memory.topics).sort((a, b) => b[1] - a[1])[0]
    const lastEmotion = Object.entries(memory.emotions).sort((a, b) => b[1] - a[1])[0]
    if (lastTopic && T[lastTopic[0]]) {
      const pool = T[lastTopic[0]]
      return pickRandom(pool)
    }
    if (lastEmotion && R[lastEmotion[0]]) {
      return pickRandom(R[lastEmotion[0]])
    }
    return 'Show! Me conta mais então — o que exatamente você quer conversar?'
  }

  if (isShortNegative(text)) {
    return 'Tudo bem, sem problema. Quer falar sobre outra coisa? Tô aqui pra te ouvir.'
  }

  if (isQuestion(text)) {
    const topicKey = topics[0] || Object.entries(memory.topics).sort((a, b) => b[1] - a[1])[0]?.[0]
    const ctx = QUESTION_CONTEXTS[topicKey] || 'cada pessoa tem um caminho único, e o mais importante é você estar aberto(a) a se conhecer'
    const template = pickRandom(QUESTION_RESPONSES)
    return template.replace('{CONTEXT}', ctx)
  }

  if (emotions.length > 0) {
    const primary = emotions[0]
    const pool = R[primary]
    if (pool) {
      const used = memory.usedR[primary] || []
      const available = pool.filter((_, i) => !used.includes(i))
      const chosen = available.length > 0 ? pickRandom(available) : pickRandom(pool)
      const idx = pool.indexOf(chosen)
      memory.usedR[primary] = [...used, idx]
      return chosen
    }
  }

  if (topics.length > 0) {
    const primary = topics[0]
    const pool = T[primary]
    if (pool) return pickRandom(pool)
  }

  const lower = text.toLowerCase()
  if (lower.includes('obrigad') || lower.includes('valeu') || lower.includes('brigado')) {
    return 'Fico feliz em ajudar! Tô aqui sempre que precisar. Tem mais alguma coisa que queira conversar?'
  }

  if (text.trim().length < 12) {
    return 'Pode falar mais sobre isso? Quanto mais você me contar, melhor eu consigo te ajudar de verdade.'
  }

  return pickRandom(FOLLOW_UPS)
}

export default function EdConselheiro() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const memoryRef = useRef({
    emotions: {},
    topics: {},
    messageCount: 0,
    usedR: {},
    deepIdx: 0,
    lastUserText: '',
  })

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  function addMessage(sender, text) {
    setMessages(prev => [...prev, { id: nextId(), sender, text }])
  }

  function botRespond(userText) {
    setIsTyping(true)
    const words = userText.split(/\s+/).length
    const delay = Math.min(600 + words * 80, 2000)
    setTimeout(() => {
      const response = generateResponse(userText, memoryRef.current)
      setIsTyping(false)
      addMessage('bot', response)
    }, delay)
  }

  function handleQuickReply(reply) {
    setShowQuickReplies(false)
    addMessage('user', reply.label)
    const mem = memoryRef.current
    if (reply.emotion) mem.emotions[reply.emotion] = (mem.emotions[reply.emotion] || 0) + 1
    if (reply.topic) mem.topics[reply.topic] = (mem.topics[reply.topic] || 0) + 1
    mem.messageCount += 1

    setIsTyping(true)
    setTimeout(() => {
      const pool = reply.emotion && R[reply.emotion] ? R[reply.emotion] : FOLLOW_UPS
      setIsTyping(false)
      addMessage('bot', pool[0])
      if (reply.emotion) mem.usedR[reply.emotion] = [0]
    }, 900)
  }

  function handleSend() {
    const trimmed = inputValue.trim()
    if (!trimmed || isTyping) return
    setShowQuickReplies(false)
    addMessage('user', trimmed)
    setInputValue('')
    botRespond(trimmed)
  }

  return (
    <div className="ed-conselheiro">
      {!isOpen && (
        <button className="ed-fab" onClick={() => setIsOpen(true)} aria-label="Abrir Ed Conselheiro">
          <span className="ed-fab-icon">💬</span>
          <span>Ed Conselheiro</span>
        </button>
      )}

      <div className={`ed-panel ${isOpen ? 'ed-panel-open' : ''}`}>
        <div className="ed-header">
          <div className="ed-header-info">
            <span className="ed-header-title">Ed Conselheiro</span>
            <span className="ed-header-status">
              <span className="ed-status-dot" />
              Online
            </span>
          </div>
          <div className="ed-header-actions">
            <button className="ed-icon-btn" onClick={() => setIsOpen(false)} aria-label="Minimizar" title="Minimizar">
              &#95;
            </button>
            <button className="ed-icon-btn" onClick={() => setIsOpen(false)} aria-label="Fechar" title="Fechar">
              &#10005;
            </button>
          </div>
        </div>

        <div className="ed-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`ed-message ${msg.sender === 'user' ? 'ed-message-user' : 'ed-message-bot'}`}>
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="ed-message ed-message-bot ed-typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}

          {showQuickReplies && (
            <div className="ed-quick-replies">
              {QUICK_REPLIES.map(reply => (
                <button key={reply.label} className="ed-quick-reply-btn" onClick={() => handleQuickReply(reply)}>
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="ed-input-area">
          <input
            type="text"
            className="ed-input"
            placeholder="Me conta como você está..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="ed-send-btn" onClick={handleSend} aria-label="Enviar" disabled={isTyping}>
            &#10148;
          </button>
        </div>

        <div className="ed-disclaimer">
          Ed é uma IA — não substitui acompanhamento profissional.
        </div>
      </div>
    </div>
  )
}
