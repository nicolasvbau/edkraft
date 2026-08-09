import { useNavigate } from 'react-router-dom'
import './Privacidade.css'

export default function Privacidade() {
  const navigate = useNavigate()

  return (
    <main className="legal-page">
      <div className="legal-container">
        <button className="legal-back" onClick={() => navigate(-1)}>← Voltar</button>

        <header className="legal-header">
          <span className="section-tag">Documentos legais</span>
          <h1 className="legal-title">Privacidade e Termos de Uso</h1>
          <p className="legal-updated">Última atualização: agosto de 2026</p>
        </header>

        <section className="legal-section">
          <h2>1. Quem somos</h2>
          <p>
            O EDKRAFT é uma plataforma educacional de descoberta de carreira voltada a estudantes
            do Ensino Médio brasileiro. Oferecemos um diagnóstico de perfil, informações sobre
            carreiras e um painel para acompanhamento por professores e coordenadores.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Quais dados coletamos</h2>
          <p>Coletamos o mínimo necessário para o funcionamento da plataforma.</p>

          <h3>Do aluno</h3>
          <ul>
            <li><strong>Nome e sobrenome</strong> — para o professor identificar o aluno na turma.</li>
            <li><strong>Código da turma</strong> — para vincular o resultado à turma correta.</li>
            <li><strong>Respostas do diagnóstico</strong> — armazenamos apenas o resultado agregado (3 áreas de maior afinidade e o percentual), não as respostas individuais.</li>
            <li><strong>Dados opcionais de perfil</strong> — cidade, estado, data de nascimento e telefone, se o aluno preencher. Ficam apenas no navegador do aluno e não são enviados aos nossos servidores.</li>
          </ul>

          <h3>Do professor</h3>
          <ul>
            <li><strong>Nome, e-mail e escola</strong> — para autenticação e organização das turmas.</li>
            <li><strong>Senha</strong> — armazenada de forma criptografada pelo nosso provedor de autenticação. Nunca temos acesso à senha em texto.</li>
          </ul>

          <h3>O que NÃO coletamos</h3>
          <ul>
            <li>CPF, RG ou qualquer documento de identificação.</li>
            <li>Endereço residencial completo.</li>
            <li>Dados de pagamento.</li>
            <li>Conteúdo das conversas com o assistente Ed além da sessão atual do navegador.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Menores de idade</h2>
          <p>
            A plataforma é utilizada por adolescentes, majoritariamente menores de 18 anos.
            Conforme o Art. 14 da LGPD (Lei 13.709/2018), o tratamento de dados de crianças e
            adolescentes deve ocorrer no melhor interesse do titular.
          </p>
          <p>
            <strong>O acesso do aluno depende de um código de turma fornecido pela escola.</strong>{' '}
            Ao distribuir esse código, a instituição de ensino declara ter obtido o consentimento
            dos responsáveis legais, conforme sua própria política de tratamento de dados e o
            contrato educacional firmado com as famílias.
          </p>
          <p>
            Se um responsável quiser que os dados do seu filho sejam removidos, basta solicitar
            diretamente ao professor responsável pela turma ou pelo e-mail de contato abaixo.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Como usamos os dados</h2>
          <ul>
            <li>Gerar o diagnóstico de perfil e o plano de desenvolvimento do aluno.</li>
            <li>Permitir que o professor acompanhe o panorama da turma.</li>
            <li>Gerar o relatório em PDF que o aluno pode baixar.</li>
          </ul>
          <p>
            <strong>Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros
            para fins comerciais ou publicitários.</strong>
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Onde os dados ficam</h2>
          <p>
            Os dados de turmas e resultados ficam armazenados no Supabase, provedor de
            infraestrutura com servidores em data centers certificados. O acesso é protegido por
            políticas de segurança em nível de linha (Row Level Security), o que garante que um
            professor só consegue ver e alterar as turmas que ele mesmo criou.
          </p>
          <p>
            Dados de perfil opcionais (cidade, telefone, texto livre) e metas pessoais ficam
            somente no navegador do aluno (localStorage) e nunca são enviados aos nossos servidores.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Seus direitos (LGPD)</h2>
          <p>Como titular dos dados, você pode a qualquer momento:</p>
          <ul>
            <li>Confirmar se tratamos seus dados e acessá-los.</li>
            <li>Corrigir dados incompletos ou desatualizados.</li>
            <li>Solicitar a eliminação dos dados.</li>
            <li>Revogar o consentimento.</li>
            <li>Pedir informação sobre com quem compartilhamos dados.</li>
          </ul>
          <p>
            Na prática: o aluno pode apagar tudo saindo da conta e limpando os dados do navegador.
            O professor pode excluir uma turma inteira, o que apaga todos os resultados vinculados
            a ela em definitivo.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Limites do diagnóstico</h2>
          <p>
            O diagnóstico do EDKRAFT é uma <strong>ferramenta de autoconhecimento</strong>, não um
            teste psicológico validado. Ele não substitui orientação profissional individualizada
            com psicólogo, orientador educacional ou orientador de carreira.
          </p>
          <p>
            Os dados de mercado apresentados (salários, crescimento, demanda) são estimativas
            baseadas em fontes públicas e análise própria, sujeitas a variação regional e temporal.
            Não constituem garantia de empregabilidade ou remuneração.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Assistente Ed</h2>
          <p>
            O Ed é um assistente automatizado. <strong>Não é psicólogo, terapeuta ou profissional
            de saúde mental</strong> e não substitui acompanhamento humano.
          </p>
          <p>
            Se você ou alguém que você conhece estiver passando por sofrimento emocional intenso,
            procure ajuda: <strong>CVV — 188</strong> (ligação gratuita, 24 horas) ou{' '}
            <a href="https://cvv.org.br" target="_blank" rel="noopener noreferrer">cvv.org.br</a>.
            Em emergências, procure o CAPS mais próximo ou ligue 192 (SAMU).
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Contato</h2>
          <p>
            Dúvidas sobre privacidade, solicitações de exclusão de dados ou qualquer questão
            relacionada a este documento podem ser enviadas para o e-mail de contato da
            instituição de ensino responsável pela turma, ou diretamente ao EDKRAFT.
          </p>
        </section>

        <div className="legal-footer">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Voltar ao início
          </button>
        </div>
      </div>
    </main>
  )
}
