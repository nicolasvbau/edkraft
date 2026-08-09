/**
 * Banco de questões do diagnóstico de perfil de carreira EDKRAFT.
 *
 * Design das perguntas:
 * 1) Cenários concretos ("Você tá na fila...") em vez de "eu gosto de X"
 *    — reduz o viés de escolher a resposta socialmente esperada.
 * 2) Trade-offs entre opções todas plausíveis — força escolha real.
 * 3) Cada opção mapeia PRIMEIRO em traços de personalidade
 *    (analítico, social, criativo, etc), e depois em áreas.
 * 4) O primeiro item de tags/traits pesa mais no scoring (peso 2 vs 1).
 *
 * TRAÇOS (dimensão independente das áreas):
 *  - analitico     — resolve por lógica, gosta de dados
 *  - investigador  — vai fundo, pesquisa, quer entender
 *  - criativo      — inventa, expressão original
 *  - estruturado   — ordem, sistemas, previsibilidade
 *  - social        — precisa de gente, interage bem
 *  - humanista     — foco em impacto humano, valores
 *  - empreendedor  — inicia, arrisca, decide rápido
 *  - pratico       — quer resultado concreto, mão na massa
 *  - artistico     — sensibilidade estética, criação autoral
 */

export const SECTIONS = [
  {
    title: 'Como você se comporta',
    desc: 'Situações do dia a dia. Escolha o que mais parece com você — sem julgar se é "certo".',
    questions: [
      {
        text: 'Você tá na fila de um restaurante lotado. O que provavelmente faz?',
        options: [
          {
            label: 'Fico no celular, sem interagir',
            tags: ['Tecnologia', 'Humanas'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Puxo papo com quem tá do lado',
            tags: ['Comunicação', 'Negócios'],
            traits: ['social', 'empreendedor'],
          },
          {
            label: 'Reclamo alto do atraso, quero resolver',
            tags: ['Negócios', 'Jurídica'],
            traits: ['empreendedor', 'pratico'],
          },
          {
            label: 'Observo as pessoas, crio historinhas mentais',
            tags: ['Artes', 'Humanas'],
            traits: ['criativo', 'humanista'],
          },
        ],
      },
      {
        text: 'Ao aprender uma coisa nova, você prefere...',
        options: [
          {
            label: 'Ler tudo antes de tentar',
            tags: ['Humanas', 'Tecnologia'],
            traits: ['investigador', 'estruturado'],
          },
          {
            label: 'Ir fazendo e errando',
            tags: ['Engenharia', 'Negócios'],
            traits: ['pratico', 'empreendedor'],
          },
          {
            label: 'Ver alguém fazendo primeiro',
            tags: ['Educação', 'Saúde'],
            traits: ['social', 'estruturado'],
          },
          {
            label: 'Descobrir meu próprio jeito',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'empreendedor'],
          },
        ],
      },
      {
        text: 'Numa apresentação em grupo, você geralmente é...',
        options: [
          {
            label: 'Quem organiza o slide e pesquisa',
            tags: ['Tecnologia', 'Humanas'],
            traits: ['analitico', 'estruturado'],
          },
          {
            label: 'Quem apresenta e prende a atenção',
            tags: ['Comunicação', 'Jurídica'],
            traits: ['social', 'empreendedor'],
          },
          {
            label: 'Quem faz a introdução visual/design',
            tags: ['Artes', 'Arquitetura'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Quem garante que ninguém fique de fora',
            tags: ['Educação', 'Saúde'],
            traits: ['social', 'humanista'],
          },
        ],
      },
      {
        text: 'O que MAIS te desanima num trabalho?',
        options: [
          {
            label: 'Repetir a mesma coisa todo dia',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'empreendedor'],
          },
          {
            label: 'Não entender pra que serve',
            tags: ['Humanas', 'Educação'],
            traits: ['humanista', 'investigador'],
          },
          {
            label: 'Depender da decisão de outros',
            tags: ['Negócios', 'Engenharia'],
            traits: ['empreendedor', 'pratico'],
          },
          {
            label: 'Trabalhar sozinho o tempo todo',
            tags: ['Educação', 'Comunicação'],
            traits: ['social', 'humanista'],
          },
        ],
      },
      {
        text: 'Quando você tá esgotado, como recarrega?',
        options: [
          {
            label: 'Sozinho, no meu canto, sem barulho',
            tags: ['Tecnologia', 'Humanas'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Conversando com amigos',
            tags: ['Educação', 'Comunicação'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Fazendo algo criativo (desenho, música)',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Mudando de ambiente, viajando',
            tags: ['Arquitetura', 'Biológicas'],
            traits: ['pratico', 'empreendedor'],
          },
        ],
      },
    ],
  },

  {
    title: 'Como você pensa',
    desc: 'Como sua cabeça funciona quando bate um problema, uma dúvida, uma discordância.',
    questions: [
      {
        text: 'Um trabalho desses te frustraria MAIS:',
        options: [
          {
            label: 'Confuso, sem lógica clara',
            tags: ['Tecnologia', 'Engenharia'],
            traits: ['analitico', 'estruturado'],
          },
          {
            label: 'Monótono, sem novidade',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'empreendedor'],
          },
          {
            label: 'Solitário, sem colaboração',
            tags: ['Educação', 'Saúde'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Sem propósito claro',
            tags: ['Humanas', 'Educação'],
            traits: ['humanista', 'investigador'],
          },
        ],
      },
      {
        text: 'Você ficaria mais orgulhoso de terminar:',
        options: [
          {
            label: 'Um livro grosso e difícil',
            tags: ['Humanas', 'Biológicas'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Um projeto em grupo bem-sucedido',
            tags: ['Negócios', 'Comunicação'],
            traits: ['social', 'empreendedor'],
          },
          {
            label: 'Uma obra criativa que emocionou alguém',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Uma competição que exigiu muito treino',
            tags: ['Engenharia', 'Saúde'],
            traits: ['pratico', 'estruturado'],
          },
        ],
      },
      {
        text: 'Notícia sobre remédio novo no Brasil. Você fica MAIS curioso sobre:',
        options: [
          {
            label: 'Como a molécula funciona no corpo',
            tags: ['Biológicas', 'Saúde'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Quem paga e quem tem acesso',
            tags: ['Humanas', 'Jurídica'],
            traits: ['humanista', 'empreendedor'],
          },
          {
            label: 'Como aplicar isso em grande escala',
            tags: ['Engenharia', 'Negócios'],
            traits: ['estruturado', 'pratico'],
          },
          {
            label: 'A história dos cientistas por trás',
            tags: ['Humanas', 'Comunicação'],
            traits: ['humanista', 'investigador'],
          },
        ],
      },
      {
        text: 'Quando alguém discorda fortemente de você:',
        options: [
          {
            label: 'Argumento com dados e lógica',
            tags: ['Jurídica', 'Tecnologia'],
            traits: ['analitico', 'estruturado'],
          },
          {
            label: 'Tento entender de onde vem essa opinião',
            tags: ['Humanas', 'Educação'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Busco um meio-termo prático',
            tags: ['Negócios', 'Educação'],
            traits: ['estruturado', 'social'],
          },
          {
            label: 'Reformulo minha ideia se me convencer',
            tags: ['Humanas', 'Biológicas'],
            traits: ['investigador', 'humanista'],
          },
        ],
      },
      {
        text: 'Se pudesse resolver UM problema do Brasil, seria:',
        options: [
          {
            label: 'Educação e acesso ao conhecimento',
            tags: ['Educação', 'Humanas'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Corrupção e sistema jurídico',
            tags: ['Jurídica', 'Humanas'],
            traits: ['humanista', 'estruturado'],
          },
          {
            label: 'Ciência, tecnologia e inovação',
            tags: ['Tecnologia', 'Biológicas'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Desigualdade econômica e emprego',
            tags: ['Humanas', 'Negócios'],
            traits: ['humanista', 'empreendedor'],
          },
        ],
      },
    ],
  },

  {
    title: 'O que te dá energia',
    desc: 'Sinais fracos do que naturalmente te puxa a atenção — muitas vezes você nem percebe.',
    questions: [
      {
        text: 'Você entra num prédio novo. O que chama sua atenção primeiro?',
        options: [
          {
            label: 'Como o espaço foi pensado (fluxo, luz)',
            tags: ['Arquitetura', 'Artes'],
            traits: ['criativo', 'pratico'],
          },
          {
            label: 'As pessoas circulando e o clima',
            tags: ['Humanas', 'Educação'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Sistemas visíveis (elevador, câmeras, ar)',
            tags: ['Engenharia', 'Tecnologia'],
            traits: ['analitico', 'pratico'],
          },
          {
            label: 'O nome/marca da empresa',
            tags: ['Negócios', 'Comunicação'],
            traits: ['empreendedor', 'estruturado'],
          },
        ],
      },
      {
        text: 'Você tem 3 horas livres agora. O que naturalmente escolhe?',
        options: [
          {
            label: 'Aprender uma coisa nova em vídeo/livro',
            tags: ['Humanas', 'Biológicas'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Encontrar amigos ou família',
            tags: ['Educação', 'Comunicação'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Praticar/criar algo (arte, esporte, jogo)',
            tags: ['Artes', 'Saúde'],
            traits: ['criativo', 'pratico'],
          },
          {
            label: 'Organizar minhas coisas ou planos',
            tags: ['Negócios', 'Engenharia'],
            traits: ['estruturado', 'pratico'],
          },
        ],
      },
      {
        text: 'Um documentário sobre o que te prenderia mais?',
        options: [
          {
            label: 'Descobertas científicas',
            tags: ['Biológicas', 'Tecnologia'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'História, sociedade, geopolítica',
            tags: ['Humanas', 'Jurídica'],
            traits: ['humanista', 'investigador'],
          },
          {
            label: 'Grandes empresários ou movimentos',
            tags: ['Negócios', 'Comunicação'],
            traits: ['empreendedor', 'social'],
          },
          {
            label: 'Artistas e processos criativos',
            tags: ['Artes', 'Arquitetura'],
            traits: ['artistico', 'criativo'],
          },
        ],
      },
      {
        text: 'Você acompanha algum criador de conteúdo. Que tipo mais provável?',
        options: [
          {
            label: 'Ensina coisa técnica (código, ciência, engenharia)',
            tags: ['Tecnologia', 'Engenharia'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Comenta política, sociedade, comportamento',
            tags: ['Humanas', 'Jurídica'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Faz arte, humor, entretenimento',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Empreendedorismo, finanças, produtividade',
            tags: ['Negócios', 'Comunicação'],
            traits: ['empreendedor', 'estruturado'],
          },
        ],
      },
      {
        text: 'Trabalho ideal daqui a 10 anos incluiria...',
        options: [
          {
            label: 'Autonomia total pra decidir minhas rotas',
            tags: ['Negócios', 'Artes'],
            traits: ['empreendedor', 'criativo'],
          },
          {
            label: 'Contato constante com pessoas diferentes',
            tags: ['Comunicação', 'Educação'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Aprofundar num único assunto por anos',
            tags: ['Biológicas', 'Humanas'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Criar coisas do zero',
            tags: ['Arquitetura', 'Tecnologia'],
            traits: ['criativo', 'pratico'],
          },
        ],
      },
    ],
  },

  {
    title: 'Suas habilidades',
    desc: 'Não o que você quer ter — o que você já faz melhor que a média sem esforço.',
    questions: [
      {
        text: 'Numa prova, você geralmente vai melhor em questão que exige:',
        options: [
          {
            label: 'Aplicar fórmula com precisão',
            tags: ['Engenharia', 'Tecnologia'],
            traits: ['analitico', 'estruturado'],
          },
          {
            label: 'Interpretar texto e argumentar',
            tags: ['Humanas', 'Jurídica'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Ideia criativa ou solução original',
            tags: ['Artes', 'Arquitetura'],
            traits: ['criativo', 'empreendedor'],
          },
          {
            label: 'Memória bem organizada',
            tags: ['Saúde', 'Biológicas'],
            traits: ['estruturado', 'investigador'],
          },
        ],
      },
      {
        text: 'As pessoas costumam te pedir ajuda quando:',
        options: [
          {
            label: 'Precisam entender algo complicado',
            tags: ['Educação', 'Tecnologia'],
            traits: ['analitico', 'social'],
          },
          {
            label: 'Estão com problema pessoal/emocional',
            tags: ['Saúde', 'Humanas'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Querem melhorar visual/estética',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Precisam organizar/executar algo',
            tags: ['Negócios', 'Engenharia'],
            traits: ['estruturado', 'pratico'],
          },
        ],
      },
      {
        text: 'Numa festa, você é bom em:',
        options: [
          {
            label: 'Escolher a playlist certa pra hora',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'artistico'],
          },
          {
            label: 'Puxar assunto com quem tá sozinho',
            tags: ['Educação', 'Saúde'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Resolver algum problema que aparecer',
            tags: ['Engenharia', 'Negócios'],
            traits: ['pratico', 'empreendedor'],
          },
          {
            label: 'Registrar bem (foto, vídeo, história)',
            tags: ['Comunicação', 'Artes'],
            traits: ['artistico', 'criativo'],
          },
        ],
      },
      {
        text: 'Você lida bem com prazo apertado quando:',
        options: [
          {
            label: 'Consigo me fechar sozinho pra focar',
            tags: ['Tecnologia', 'Humanas'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Tem gente pra pressionar/incentivar',
            tags: ['Comunicação', 'Negócios'],
            traits: ['social', 'empreendedor'],
          },
          {
            label: 'É algo que me desafia intelectualmente',
            tags: ['Biológicas', 'Tecnologia'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Vejo o resultado prático rápido',
            tags: ['Engenharia', 'Saúde'],
            traits: ['pratico', 'empreendedor'],
          },
        ],
      },
      {
        text: 'Sua matéria mais forte na escola normalmente é da área de:',
        options: [
          {
            label: 'Exatas (Matemática, Física, Química)',
            tags: ['Engenharia', 'Tecnologia'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Linguagens (Português, Redação, Literatura)',
            tags: ['Comunicação', 'Humanas'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Ciências da vida (Biologia)',
            tags: ['Biológicas', 'Saúde'],
            traits: ['investigador', 'humanista'],
          },
          {
            label: 'Sociais (História, Geografia, Filosofia)',
            tags: ['Humanas', 'Jurídica'],
            traits: ['humanista', 'investigador'],
          },
        ],
      },
    ],
  },

  {
    title: 'Como você trabalha',
    desc: 'Como você quer que sua rotina profissional funcione — não só o cargo, o clima.',
    questions: [
      {
        text: 'Você prefere que te avaliem por:',
        options: [
          {
            label: 'Resultado final do projeto',
            tags: ['Negócios', 'Engenharia'],
            traits: ['pratico', 'empreendedor'],
          },
          {
            label: 'Processo e colaboração',
            tags: ['Educação', 'Saúde'],
            traits: ['social', 'humanista'],
          },
          {
            label: 'Qualidade técnica',
            tags: ['Tecnologia', 'Biológicas'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Originalidade da ideia',
            tags: ['Artes', 'Arquitetura'],
            traits: ['criativo', 'empreendedor'],
          },
        ],
      },
      {
        text: 'Duas ofertas de emprego. Você tende a escolher:',
        options: [
          {
            label: 'Empresa grande estável, salário alto',
            tags: ['Negócios', 'Engenharia'],
            traits: ['estruturado', 'empreendedor'],
          },
          {
            label: 'Startup pequena, salário menor, potencial',
            tags: ['Tecnologia', 'Comunicação'],
            traits: ['empreendedor', 'criativo'],
          },
          {
            label: 'Órgão público estável, propósito social',
            tags: ['Jurídica', 'Educação'],
            traits: ['humanista', 'estruturado'],
          },
          {
            label: 'Freelance com autonomia total',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'empreendedor'],
          },
        ],
      },
      {
        text: 'Rotina previsível (fazer o mesmo tipo de coisa toda semana):',
        options: [
          {
            label: 'Adoro, me sinto seguro assim',
            tags: ['Jurídica', 'Saúde'],
            traits: ['estruturado', 'analitico'],
          },
          {
            label: 'Odeio, preciso variar sempre',
            tags: ['Artes', 'Comunicação'],
            traits: ['criativo', 'empreendedor'],
          },
          {
            label: 'Tolerável se o assunto for interessante',
            tags: ['Biológicas', 'Tecnologia'],
            traits: ['investigador', 'analitico'],
          },
          {
            label: 'Depende do humor do dia',
            tags: ['Comunicação', 'Educação'],
            traits: ['social', 'criativo'],
          },
        ],
      },
      {
        text: 'Feedback duro (crítica direta) sobre seu trabalho:',
        options: [
          {
            label: 'Prefiro receber, é como aprendo mais rápido',
            tags: ['Tecnologia', 'Biológicas'],
            traits: ['analitico', 'investigador'],
          },
          {
            label: 'Ok se vier com respeito e contexto',
            tags: ['Educação', 'Humanas'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Só aceito de alguém que respeito muito',
            tags: ['Jurídica', 'Negócios'],
            traits: ['estruturado', 'empreendedor'],
          },
          {
            label: 'Prefiro observar e concluir sozinho',
            tags: ['Artes', 'Humanas'],
            traits: ['criativo', 'investigador'],
          },
        ],
      },
      {
        text: 'Sua definição de sucesso profissional é:',
        options: [
          {
            label: 'Ficar entre os melhores da minha área',
            tags: ['Engenharia', 'Saúde'],
            traits: ['analitico', 'empreendedor'],
          },
          {
            label: 'Impactar positivamente a vida de muita gente',
            tags: ['Educação', 'Humanas'],
            traits: ['humanista', 'social'],
          },
          {
            label: 'Ter liberdade e não depender de ninguém',
            tags: ['Negócios', 'Artes'],
            traits: ['empreendedor', 'pratico'],
          },
          {
            label: 'Fazer algo original que ninguém fez antes',
            tags: ['Artes', 'Tecnologia'],
            traits: ['criativo', 'investigador'],
          },
        ],
      },
    ],
  },
]
