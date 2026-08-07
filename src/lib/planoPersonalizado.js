/**
 * Gera plano de desenvolvimento personalizado a partir do resultado do diagnóstico.
 * Cada área top gera competências prioritárias específicas.
 */

const COMPETENCIAS_POR_AREA = {
  Tecnologia: [
    { titulo: 'Lógica de programação (Python)', prioridade: 'Alta', descricao: 'Base pra qualquer área tech. Foca em pensar em pequenos passos.' },
    { titulo: 'Excel avançado + fundamentos SQL', prioridade: 'Alta', descricao: 'Praticamente toda empresa usa. É o "inglês da tecnologia".' },
    { titulo: 'Inglês técnico', prioridade: 'Alta', descricao: 'Documentação, cursos e comunidade estão em inglês. Não é opcional.' },
    { titulo: 'Projetos práticos no GitHub', prioridade: 'Média', descricao: 'Um portfólio real vale mais que qualquer nota. Comece pequeno.' },
    { titulo: 'Comunicação técnica', prioridade: 'Média', descricao: 'Saber explicar o que você fez pra quem não é da área.' },
  ],
  Saúde: [
    { titulo: 'Ciências biológicas (base sólida)', prioridade: 'Alta', descricao: 'Bio + Química são o alicerce. Vale o dobro do esforço.' },
    { titulo: 'Empatia + escuta ativa', prioridade: 'Alta', descricao: 'A parte técnica se aprende. Escutar bem é o que separa profissionais.' },
    { titulo: 'Resistência emocional', prioridade: 'Alta', descricao: 'Área desgastante. Aprender a lidar com carga emocional cedo é vital.' },
    { titulo: 'Inglês pra literatura médica', prioridade: 'Média', descricao: 'Toda pesquisa relevante sai em inglês primeiro.' },
    { titulo: 'Método científico', prioridade: 'Média', descricao: 'Aprender a ler estudo científico é diferencial gigante.' },
  ],
  Jurídica: [
    { titulo: 'Leitura crítica de textos densos', prioridade: 'Alta', descricao: 'Direito é 90% leitura. Treine com artigos jurídicos e clássicos.' },
    { titulo: 'Argumentação e debate', prioridade: 'Alta', descricao: 'Faça oficinas de debate, oratória ou modelo ONU.' },
    { titulo: 'Redação analítica', prioridade: 'Alta', descricao: 'Peças jurídicas exigem escrita clara e estruturada.' },
    { titulo: 'Interpretação de contexto histórico', prioridade: 'Média', descricao: 'Direito não existe no vácuo. História + Filosofia ajudam demais.' },
    { titulo: 'Inglês jurídico', prioridade: 'Média', descricao: 'Diferencial em Direito Internacional, contratos corporativos.' },
  ],
  Negócios: [
    { titulo: 'Excel avançado + análise de dados', prioridade: 'Alta', descricao: 'Ferramenta #1 de qualquer área de negócios. Domine cedo.' },
    { titulo: 'Comunicação + apresentação', prioridade: 'Alta', descricao: 'Ideia vale zero sem saber comunicar. Treine apresentações.' },
    { titulo: 'Inglês fluente', prioridade: 'Alta', descricao: 'Não-negociável na área. Consiga fluência antes da faculdade.' },
    { titulo: 'Finanças pessoais + básico de investimentos', prioridade: 'Média', descricao: 'Aprender a lidar com dinheiro na prática.' },
    { titulo: 'Negociação e liderança', prioridade: 'Média', descricao: 'Puxe iniciativas na escola pra treinar.' },
  ],
  Engenharia: [
    { titulo: 'Matemática (foco em cálculo e geometria)', prioridade: 'Alta', descricao: 'A base sem atalho. Engenharia vive de matemática aplicada.' },
    { titulo: 'Física (mecânica e eletromagnetismo)', prioridade: 'Alta', descricao: 'Fundamento pra 80% das especializações.' },
    { titulo: 'Pensamento sistêmico', prioridade: 'Alta', descricao: 'Ver como partes conectam. Treine com projetos práticos.' },
    { titulo: 'CAD ou ferramentas de projeto', prioridade: 'Média', descricao: 'AutoCAD, SolidWorks ou similar dependendo da engenharia.' },
    { titulo: 'Inglês técnico', prioridade: 'Média', descricao: 'Datasheets, manuais e artigos são em inglês.' },
  ],
  Arquitetura: [
    { titulo: 'Desenho técnico + observação', prioridade: 'Alta', descricao: 'Aprenda a ver o espaço com olho de arquiteto.' },
    { titulo: 'História da arquitetura', prioridade: 'Alta', descricao: 'Referências visuais e conceituais. Bauhaus, Niemeyer, Lina Bo Bardi.' },
    { titulo: 'AutoCAD, SketchUp ou similares', prioridade: 'Alta', descricao: 'Cursos livres já dão base pra chegar preparado na faculdade.' },
    { titulo: 'Física e matemática', prioridade: 'Média', descricao: 'Base pra cálculo estrutural. Não deixe pra trás.' },
    { titulo: 'Portfólio visual', prioridade: 'Média', descricao: 'Comece a documentar croquis, ideias, fotos de referência.' },
  ],
  Comunicação: [
    { titulo: 'Produção de conteúdo próprio', prioridade: 'Alta', descricao: 'Crie por 30 dias. Texto, vídeo ou áudio. Vale mais que qualquer curso.' },
    { titulo: 'Redação clara e persuasiva', prioridade: 'Alta', descricao: 'Base de qualquer área de com: publicidade, jornalismo, marketing.' },
    { titulo: 'Análise crítica de mídia', prioridade: 'Alta', descricao: 'Por que algo viraliza? Por que uma capa funciona? Aprenda a ler.' },
    { titulo: 'Edição básica (vídeo, foto, texto)', prioridade: 'Média', descricao: 'Ferramentas mudam, o pensamento editorial fica.' },
    { titulo: 'Cultura pop + jornalismo sério', prioridade: 'Média', descricao: 'Consumo diverso alimenta repertório.' },
  ],
  Artes: [
    { titulo: 'Prática diária (mesmo 20 min)', prioridade: 'Alta', descricao: 'Não existe atalho pra técnica. Consistência bate talento.' },
    { titulo: 'Portfólio (mesmo informal)', prioridade: 'Alta', descricao: 'Comece a organizar. Instagram, Behance, drive — o importante é ter.' },
    { titulo: 'Referências históricas e contemporâneas', prioridade: 'Alta', descricao: 'Estude artistas. Copiar pra aprender é válido.' },
    { titulo: 'Comunicação sobre o próprio trabalho', prioridade: 'Média', descricao: 'Artista precisa explicar a obra. Treine descrever o processo.' },
    { titulo: 'Empreendedorismo criativo', prioridade: 'Média', descricao: 'Realidade: precisa saber viver da arte. Aprenda cedo.' },
  ],
  Educação: [
    { titulo: 'Didática (como ensinar algo)', prioridade: 'Alta', descricao: 'Explique algo que você domina pra alguém. Melhor treino que existe.' },
    { titulo: 'Comunicação clara + paciência', prioridade: 'Alta', descricao: 'A área mais humana. Treine na convivência.' },
    { titulo: 'Área de especialização', prioridade: 'Alta', descricao: 'Escolha uma matéria/tema e vá fundo. Vira sua base pra dar aula.' },
    { titulo: 'Psicologia da aprendizagem', prioridade: 'Média', descricao: 'Como as pessoas aprendem. Muda tudo na sua abordagem.' },
    { titulo: 'Tecnologia educacional', prioridade: 'Média', descricao: 'Sala de aula moderna. Explore ferramentas de ensino digital.' },
  ],
  Humanas: [
    { titulo: 'Leitura consistente (filosofia, sociologia, história)', prioridade: 'Alta', descricao: 'A área respira livro. Sem hábito de leitura, dá desistência.' },
    { titulo: 'Redação argumentativa', prioridade: 'Alta', descricao: 'Toda avaliação é ensaio ou artigo. Escreva muito.' },
    { titulo: 'Análise de contexto e senso crítico', prioridade: 'Alta', descricao: 'Aprender a questionar o dado, ler entre linhas.' },
    { titulo: 'Inglês pra literatura acadêmica', prioridade: 'Média', descricao: 'Textos-chave em várias áreas ainda estão em inglês.' },
    { titulo: 'Metodologia de pesquisa', prioridade: 'Média', descricao: 'Como fazer investigação séria. Fundamento pra ciência humana.' },
  ],
  Biológicas: [
    { titulo: 'Biologia + Química (base sólida)', prioridade: 'Alta', descricao: 'Não tem como fugir. Reforce cedo.' },
    { titulo: 'Método científico + estatística', prioridade: 'Alta', descricao: 'Base de qualquer pesquisa. Aprenda a interpretar dados.' },
    { titulo: 'Inglês científico', prioridade: 'Alta', descricao: 'Toda literatura relevante primeiro sai em inglês.' },
    { titulo: 'Observação e registro (campo/lab)', prioridade: 'Média', descricao: 'Ciência começa em ver bem. Treine.' },
    { titulo: 'Programação básica (bioinformática)', prioridade: 'Média', descricao: 'R ou Python abrem portas em pesquisa moderna.' },
  ],
}

const DICAS_POR_AREA = {
  Tecnologia: [
    { titulo: 'Faça 1 projeto real por trimestre', texto: 'Site, app, joguinho, script útil. Portfólio > diploma nessa área.' },
    { titulo: 'Aprenda inglês pra ler documentação', texto: 'Stack Overflow, docs oficiais, cursos de qualidade — quase tudo em inglês.' },
    { titulo: 'Cuidado com o mito do "gênio de programação"', texto: 'É trabalho, não talento místico. Consistência bate inspiração todo dia.' },
  ],
  Saúde: [
    { titulo: 'Acompanhe um profissional por 1 dia', texto: 'Muda tudo saber a rotina real antes de escolher o curso.' },
    { titulo: 'Desenvolva resistência emocional cedo', texto: 'Meditação, terapia, esporte — algo pra sustentar o desgaste que vem.' },
    { titulo: 'Diferencie os cursos com cuidado', texto: 'Medicina, Enfermagem, Fisio, Psico, Nutri: rotinas muito diferentes.' },
  ],
  Jurídica: [
    { titulo: 'Assista audiências públicas', texto: 'Muitas são abertas. Ver a área na prática vale mais que qualquer aula.' },
    { titulo: 'Leia sites como JOTA e Consultor Jurídico', texto: 'Se você aguenta a leitura diária, é sinal muito bom.' },
    { titulo: 'Considere carreiras alternativas', texto: 'Direito não é só advocacia. Magistratura, MP, jurídico de empresa.' },
  ],
  Negócios: [
    { titulo: 'Faça uma mini-empreitada real', texto: 'Revenda algo, preste serviço, organize uma vaquinha. Prática > teoria.' },
    { titulo: 'Aprenda finanças pessoais AGORA', texto: 'Antes de administrar empresa, aprenda a administrar sua vida.' },
    { titulo: 'Cultive rede de contatos cedo', texto: 'Muito da carreira em negócios acontece por relacionamento.' },
  ],
  Engenharia: [
    { titulo: 'Descubra sua sub-área antes do vestibular', texto: 'Civil, Mecânica, Elétrica, Produção, Computação — muito diferentes.' },
    { titulo: 'Envolva-se em projetos práticos', texto: 'Feiras de ciência, robótica, competições. Aprendizado real acontece fazendo.' },
    { titulo: 'Base matemática é sagrada', texto: 'Perdeu Cálculo? Repete. Base fraca destrói a graduação.' },
  ],
  Arquitetura: [
    { titulo: 'Comece a documentar espaços', texto: 'Fotografe prédios, faça croquis, catalogue referências.' },
    { titulo: 'Estude cinema e artes visuais', texto: 'Arquitetura conversa com cultura visual inteira.' },
    { titulo: 'Prepare-se pra ser generalista', texto: 'Arquiteto lida com estrutura, estética, cliente, obra, orçamento.' },
  ],
  Comunicação: [
    { titulo: 'Crie conteúdo público por 30 dias seguidos', texto: 'Não pra fama — pra treinar disciplina e receber feedback real.' },
    { titulo: 'Estude o mercado além da criação', texto: 'Métricas, distribuição, ROI. Criativo bom + estratégico = raro.' },
    { titulo: 'Consuma variado', texto: 'Leia jornalismo sério, veja publicidade boa, ouça podcasts diversos.' },
  ],
  Artes: [
    { titulo: 'Aceite que é maratona, não sprint', texto: 'Reconhecimento demora. Foco no processo, não no resultado imediato.' },
    { titulo: 'Aprenda o lado business', texto: 'Preço, contrato, negociação, marketing. Artista independente precisa.' },
    { titulo: 'Escolha faculdade pelo trabalho dos ex-alunos', texto: 'Nome da escola importa menos que a linhagem que ela produz.' },
  ],
  Educação: [
    { titulo: 'Teste antes de decidir', texto: 'Dê aula de reforço, monitoria, curso pra amigos. Sente se te energiza.' },
    { titulo: 'Diferencia Licenciatura x Bacharelado x Pedagogia', texto: 'Carreiras muito distintas. Pesquise cada uma a fundo.' },
    { titulo: 'Prepare-se pra dificuldade estrutural', texto: 'Educação no Brasil tem desafios reais. Vai com isso na cabeça.' },
  ],
  Humanas: [
    { titulo: 'Leitura é seu esporte principal', texto: 'Sem hábito de leitura, dá desistência na faculdade. Comece hoje.' },
    { titulo: 'Considere carreira acadêmica', texto: 'Muitas áreas de Humanas pedem mestrado/doutorado. Realista.' },
    { titulo: 'Explore áreas híbridas', texto: 'História + tech, Sociologia + dados, Filosofia + design. Combinações abrem portas.' },
  ],
  Biológicas: [
    { titulo: 'Faça iniciação científica cedo', texto: 'Universidades federais tem editais logo no 1º ano. Ambiente natural.' },
    { titulo: 'Aprenda estatística e programação', texto: 'Bio moderna é dados. Domine ferramentas.' },
    { titulo: 'Realidade sobre carreira acadêmica', texto: 'Vagas competitivas, salários variáveis. Vale muito o quanto ama.' },
  ],
}

/**
 * Gera plano personalizado com base no top-3 do diagnóstico.
 * Retorna competências ordenadas por prioridade e dicas relevantes.
 */
export function gerarPlano(ultimoResultado) {
  if (!ultimoResultado?.top3?.length) return null

  const areasTop = ultimoResultado.top3.map(t => t.area)
  const primeira = areasTop[0]
  const segunda = areasTop[1]

  // Competências: pega TODAS da 1ª área + 2 competências ALTA da 2ª (dedupe)
  const competencias = []
  const seen = new Set()

  const add = (c) => {
    const key = c.titulo.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    competencias.push(c)
  }

  ;(COMPETENCIAS_POR_AREA[primeira] || []).forEach(add)
  ;(COMPETENCIAS_POR_AREA[segunda] || [])
    .filter(c => c.prioridade === 'Alta')
    .slice(0, 2)
    .forEach(add)

  const dicas = [
    ...(DICAS_POR_AREA[primeira] || []),
    ...(DICAS_POR_AREA[segunda] || []).slice(0, 1),
  ].slice(0, 4)

  return {
    areaPrincipal: primeira,
    areaSecundaria: segunda,
    competencias,
    dicas,
  }
}
