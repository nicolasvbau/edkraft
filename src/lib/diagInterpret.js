/**
 * Motor de interpretação do diagnóstico.
 * Sem frases genéricas — a saída é gerada a partir dos padrões reais das respostas.
 */

const AREA_DESCRICOES = {
  Tecnologia: {
    verbo: 'construir sistemas',
    ambiente: 'trabalhar com dados, lógica e criação digital',
    forte_em: ['raciocínio abstrato', 'resolução de problemas', 'autonomia'],
  },
  Saúde: {
    verbo: 'cuidar de pessoas',
    ambiente: 'lidar diretamente com o corpo humano e vidas em jogo',
    forte_em: ['empatia', 'responsabilidade', 'atenção ao detalhe'],
  },
  Jurídica: {
    verbo: 'defender causas e interpretar regras',
    ambiente: 'trabalhar com argumentação, texto e conflito estruturado',
    forte_em: ['leitura crítica', 'oratória', 'senso de justiça'],
  },
  Negócios: {
    verbo: 'gerar valor e liderar',
    ambiente: 'lidar com pessoas, decisões rápidas e risco calculado',
    forte_em: ['negociação', 'visão estratégica', 'iniciativa'],
  },
  Engenharia: {
    verbo: 'projetar e construir soluções físicas',
    ambiente: 'combinar matemática com aplicação prática',
    forte_em: ['pensamento sistêmico', 'precisão', 'orientação a resultado'],
  },
  Arquitetura: {
    verbo: 'materializar espaços e experiências',
    ambiente: 'unir estética, função e viabilidade técnica',
    forte_em: ['visão espacial', 'criatividade', 'atenção ao contexto'],
  },
  Comunicação: {
    verbo: 'contar histórias e influenciar',
    ambiente: 'trabalhar com narrativa, imagem e audiência',
    forte_em: ['expressão', 'sensibilidade cultural', 'articulação'],
  },
  Artes: {
    verbo: 'criar do zero',
    ambiente: 'ter liberdade estética e voz autoral',
    forte_em: ['sensibilidade', 'originalidade', 'persistência criativa'],
  },
  Educação: {
    verbo: 'formar pessoas',
    ambiente: 'traduzir conhecimento e acompanhar processos humanos',
    forte_em: ['paciência', 'clareza didática', 'escuta'],
  },
  Humanas: {
    verbo: 'entender sociedade e comportamento',
    ambiente: 'trabalhar com pesquisa, análise de contexto e mudança social',
    forte_em: ['pensamento crítico', 'leitura de mundo', 'reflexão'],
  },
  Biológicas: {
    verbo: 'investigar o vivo',
    ambiente: 'pesquisa, campo, laboratório',
    forte_em: ['curiosidade científica', 'observação', 'método'],
  },
}

/**
 * Arquétipos combinando 2-3 áreas. Se o perfil da pessoa bate,
 * geramos uma interpretação híbrida específica (não genérica).
 */
const ARQUETIPOS = [
  {
    id: 'stem-analitico',
    match: (top) => hasAll(top, ['Tecnologia', 'Engenharia']) || hasAll(top, ['Tecnologia', 'Biológicas']),
    titulo: 'Perfil Analítico-Técnico',
    descricao: 'Você combina raciocínio lógico com vontade de construir coisas que funcionem. Esse perfil é raro e altamente demandado — áreas como Engenharia de Software, Data Science, Engenharia Biomédica e Robótica encaixam quase perfeitamente com você.',
    proximos_passos: [
      'Aprofunde matemática e lógica de programação (Python é ótimo começo).',
      'Faça pelo menos 1 projeto prático (site, app, análise de dados) antes de escolher o curso.',
      'Considere cursos híbridos: Engenharia + Computação, Biotech, Ciência de Dados.',
    ],
  },
  {
    id: 'cuidador',
    match: (top) => hasAll(top, ['Saúde', 'Educação']) || hasAll(top, ['Saúde', 'Humanas']),
    titulo: 'Perfil Cuidador',
    descricao: 'Você é movido por impacto direto na vida de outras pessoas. Isso aparece nas suas respostas de forma consistente. Áreas como Psicologia, Enfermagem, Medicina, Terapia Ocupacional e Fonoaudiologia se alinham com esse perfil.',
    proximos_passos: [
      'Faça voluntariado ou estágio de observação em hospital, escola ou ONG.',
      'Converse com profissionais reais dessas áreas antes de escolher (é uma rotina exigente).',
      'Pesquise a diferença entre cursos: Medicina x Enfermagem x Psicologia x Serviço Social.',
    ],
  },
  {
    id: 'criativo',
    match: (top) => hasAll(top, ['Artes', 'Comunicação']) || hasAll(top, ['Artes', 'Arquitetura']),
    titulo: 'Perfil Criativo',
    descricao: 'Suas respostas mostram forte pulsão pra criação estética e expressão. Áreas como Design, Publicidade, Cinema, Arquitetura, Moda e Games se alinham com você. Diferente de outros perfis, o criativo precisa investir cedo em portfólio, não só em nota.',
    proximos_passos: [
      'Comece um portfólio agora, mesmo que informal (Instagram, Behance, Youtube).',
      'Faça um curso livre curto na área (Design UI, edição de vídeo, redação) pra testar.',
      'Pesquise faculdades pelo trabalho dos ex-alunos, não só pelo nome.',
    ],
  },
  {
    id: 'lider-negociador',
    match: (top) => hasAll(top, ['Negócios', 'Jurídica']) || hasAll(top, ['Negócios', 'Comunicação']),
    titulo: 'Perfil Líder / Negociador',
    descricao: 'Você mostra afinidade com decisão, influência e articulação — combinação típica de quem lidera empresas, projetos ou causas. Áreas como Administração, Direito, Economia, Marketing e Relações Internacionais encaixam com esse perfil.',
    proximos_passos: [
      'Desenvolva oratória agora (debate, apresentações, oficina no ensino médio).',
      'Faça um curso básico de finanças e outro de negociação — vai adiantar 2 anos de faculdade.',
      'Considere fazer inglês fluente cedo (essas áreas exigem).',
    ],
  },
  {
    id: 'investigador',
    match: (top) => hasAll(top, ['Biológicas', 'Humanas']) || hasAll(top, ['Humanas', 'Educação']),
    titulo: 'Perfil Investigador',
    descricao: 'Você prefere entender antes de agir. Isso é sinal claro de perfil de pesquisador ou analista de contexto. Áreas como Ciências Sociais, Biologia, Antropologia, Filosofia e Ciência Política se alinham com você.',
    proximos_passos: [
      'Comece a ler artigos científicos ou livros da área (SciELO tem material gratuito em português).',
      'Considere iniciação científica na universidade — é o ambiente natural pra esse perfil.',
      'Realista: essas carreiras exigem mestrado/doutorado. Vale se você curte estudar por conta própria.',
    ],
  },
]

function hasAll(top, areas) {
  const nomes = top.map(a => a.area)
  return areas.every(a => nomes.includes(a))
}

/**
 * Gera texto personalizado quando não bate arquétipo específico.
 * Constrói frase a partir das áreas reais e traços delas.
 */
function interpretacaoLivre(top) {
  const primeira = top[0]
  const segunda = top[1]
  const terceira = top[2]

  const desc1 = AREA_DESCRICOES[primeira.area] || {}
  const desc2 = AREA_DESCRICOES[segunda?.area] || {}

  const forte = desc1.forte_em?.slice(0, 2).join(' e ') || 'suas qualidades específicas'

  let texto = `Seu perfil aponta principalmente pra ${primeira.area} (${primeira.percent}%) — o que sugere que você tem afinidade com ${desc1.verbo || 'essa área'} e se destaca em ${forte}.`

  if (segunda && segunda.percent >= 50) {
    texto += ` Junto com isso, ${segunda.area} (${segunda.percent}%) aparece forte, o que amplia suas opções: você pode considerar áreas híbridas entre ${primeira.area} e ${segunda.area}, ou usar ${segunda.area} como diferencial dentro de ${primeira.area}.`
  } else if (segunda) {
    texto += ` A ${segunda.area} aparece em segundo (${segunda.percent}%), mas com menos intensidade — vale investigar se é interesse real ou consequência de algumas poucas respostas.`
  }

  if (terceira && terceira.percent >= 40) {
    texto += ` A terceira área, ${terceira.area}, sugere uma faceta secundária que pode ficar como hobby ou complemento futuro.`
  }

  return texto
}

function proximosPassosLivres(top) {
  const passos = []
  const areaTop = top[0].area

  const acoesPorArea = {
    Tecnologia: [
      'Começa um curso básico de Python ou HTML/CSS agora (grátis, dá pra fazer em 2 meses).',
      'Faz 1 projeto pessoal — site, jogo, planilha automatizada — pra ter algo pra mostrar.',
      'Explora perfis de pessoas na sua área no LinkedIn pra ver o dia a dia real.',
    ],
    Saúde: [
      'Acompanha 1 profissional da área por 1 dia — muda tudo saber a rotina real.',
      'Faz voluntariado em hospital/clínica popular.',
      'Diferencia bem os cursos: Medicina, Enfermagem, Fisio, Psicologia, Nutrição — rotinas muito distintas.',
    ],
    Jurídica: [
      'Assiste 1 audiência pública (várias são abertas).',
      'Lê artigos do Consultor Jurídico ou JOTA por 2 semanas — se você aguenta, é sinal bom.',
      'Faz um curso curto de oratória ou debate.',
    ],
    Negócios: [
      'Cria uma mini-empreitada real: revende algo, presta serviço, faz uma vaquinha organizada.',
      'Aprende Excel avançado e o básico de finanças pessoais.',
      'Faz inglês pra fluente — é diferencial não-negociável na área.',
    ],
    Engenharia: [
      'Reforça matemática e física — são a base sem atalho.',
      'Descobre a diferença entre as engenharias (elétrica, civil, mecânica, produção, computação, química).',
      'Faz 1 projeto físico que envolva medir, calcular e construir (mesmo pequeno).',
    ],
    Arquitetura: [
      'Começa a treinar desenho técnico e observação de espaços.',
      'Estuda casos famosos de arquitetura (Niemeyer, Lina Bo Bardi, Bauhaus).',
      'Faz um curso curto de SketchUp ou AutoCAD pra testar afinidade com software.',
    ],
    Comunicação: [
      'Cria conteúdo próprio (texto, vídeo, podcast) por 30 dias — assunto que você domina.',
      'Estuda estratégia de mídia: por que certas coisas viralizam e outras não.',
      'Faz um curso de copywriting ou fotografia.',
    ],
    Artes: [
      'Monta portfólio agora, nem que seja só pra você — Instagram, Behance ou pasta no drive.',
      'Escolhe um artista que admira e estuda o processo dele a fundo.',
      'Pesquisa escolas pelos ex-alunos, não pelo nome.',
    ],
    Educação: [
      'Dá aula pra alguém (irmão, primo, colega) sobre algo que você domina — sente se te alimenta ou drena.',
      'Acompanha 1 professor num dia inteiro.',
      'Explora Licenciatura vs Pedagogia vs Bacharelado — carreiras muito diferentes.',
    ],
    Humanas: [
      'Lê 1 livro de sociologia, filosofia ou antropologia (nível iniciante — não precisa ser acadêmico).',
      'Acompanha debates de política/sociedade e vai fazendo seu próprio recorte.',
      'Considera Ciências Sociais, Filosofia, Relações Internacionais, História.',
    ],
    Biológicas: [
      'Faz voluntariado em ONG ambiental, zoológico, museu de ciências.',
      'Assiste documentários sérios (David Attenborough, Cosmos) — se te fascina, é bom sinal.',
      'Considera iniciação científica cedo — é a porta natural da área.',
    ],
  }

  return acoesPorArea[areaTop] || [
    'Pesquise 3 profissionais da área e veja a rotina real deles.',
    'Faça 1 experiência prática relacionada nas próximas 4 semanas.',
    'Converse com alguém que já trabalha na área.',
  ]
}

/**
 * Ponto de entrada principal.
 * Recebe o top3 e retorna interpretação estruturada.
 */
export function interpretar(top) {
  if (!top || top.length === 0) return null

  const arquetipo = ARQUETIPOS.find(a => a.match(top))

  if (arquetipo) {
    return {
      titulo: arquetipo.titulo,
      descricao: arquetipo.descricao,
      proximos_passos: arquetipo.proximos_passos,
      confianca: calcularConfianca(top),
    }
  }

  return {
    titulo: `Perfil ${top[0].area}`,
    descricao: interpretacaoLivre(top),
    proximos_passos: proximosPassosLivres(top),
    confianca: calcularConfianca(top),
  }
}

/**
 * Confiança do diagnóstico: quanto maior a diferença entre 1º e 3º,
 * mais confiável é a leitura. Se tudo empatou, a pessoa tem
 * interesses espalhados (não é erro do teste).
 */
function calcularConfianca(top) {
  if (top.length < 2) return 'baixa'
  const diff = top[0].percent - (top[top.length - 1].percent || 0)
  if (diff >= 30) return 'alta'
  if (diff >= 15) return 'média'
  return 'baixa'
}
