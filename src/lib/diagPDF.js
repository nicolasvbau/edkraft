import { pdf, Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'
import { createElement } from 'react'

const HEX_AREAS = {
  Tecnologia: '#3b82f6',
  Saúde: '#22c55e',
  Jurídica: '#a855f7',
  Negócios: '#f59e0b',
  Engenharia: '#64748b',
  Arquitetura: '#ec4899',
  Comunicação: '#06b6d4',
  Artes: '#f43f5e',
  Educação: '#10b981',
  Humanas: '#8b5cf6',
  Biológicas: '#14b8a6',
}

const s = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#0a0b0f',
    paddingBottom: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 22,
    height: 22,
    marginRight: 8,
    backgroundColor: '#3b82f6',
  },
  brandName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: '#0a0b0f',
  },
  headerMeta: {
    textAlign: 'right',
    fontSize: 9,
    color: '#6b7280',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#0a0b0f',
  },
  subtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 24,
  },
  studentBox: {
    padding: 14,
    backgroundColor: '#f8fafc',
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    marginBottom: 20,
  },
  studentName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
    color: '#0a0b0f',
  },
  studentMeta: {
    fontSize: 10,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0a0b0f',
    marginTop: 6,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  areaRow: {
    marginBottom: 14,
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  areaRank: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#6b7280',
    width: 24,
  },
  areaName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0a0b0f',
    flex: 1,
  },
  areaPercent: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  barTrack: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },
  areaProfList: {
    marginTop: 6,
    paddingLeft: 24,
  },
  areaProfItem: {
    fontSize: 9.5,
    color: '#374151',
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interpretBox: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    marginBottom: 20,
    marginTop: 8,
  },
  interpretTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0a0b0f',
    marginBottom: 6,
  },
  interpretConf: {
    fontSize: 8.5,
    color: '#6b7280',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interpretText: {
    fontSize: 10.5,
    lineHeight: 1.5,
    color: '#1f2937',
  },
  passosList: {
    marginTop: 8,
  },
  passoItem: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1f2937',
    marginBottom: 6,
    flexDirection: 'row',
  },
  passoNum: {
    width: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#3b82f6',
  },
  passoText: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    fontSize: 8,
    color: '#9ca3af',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

function formatarData(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  } catch {
    return ''
  }
}

function DocumentoPDF({ aluno, top, interpretacao, totalQuestions }) {
  const hoje = formatarData(new Date().toISOString())

  return createElement(Document, {},
    createElement(Page, { size: 'A4', style: s.page },
      // HEADER
      createElement(View, { style: s.header },
        createElement(View, { style: s.brandBlock },
          createElement(View, { style: s.brandLogo }),
          createElement(Text, { style: s.brandName }, 'EDKRAFT'),
        ),
        createElement(View, { style: s.headerMeta },
          createElement(Text, {}, `Diagnóstico Vocacional`),
          createElement(Text, {}, `Emitido em ${hoje}`),
        ),
      ),

      // TITLE
      createElement(Text, { style: s.title }, 'Seu perfil vocacional'),
      createElement(Text, { style: s.subtitle },
        `Análise baseada em ${totalQuestions} respostas — personalidade, interesses, habilidades e valores.`
      ),

      // STUDENT
      aluno && createElement(View, { style: s.studentBox },
        createElement(Text, { style: s.studentName }, aluno.nome || 'Aluno(a)'),
        createElement(Text, { style: s.studentMeta },
          [aluno.turmaEscola, aluno.turmaNome, aluno.codigoTurma ? `Turma ${aluno.codigoTurma}` : null]
            .filter(Boolean).join(' · ')
        ),
      ),

      // AREAS
      createElement(Text, { style: s.sectionTitle }, 'Áreas de maior afinidade'),
      ...top.map((r, i) => {
        const cor = HEX_AREAS[r.area] || '#3b82f6'
        return createElement(View, { style: s.areaRow, key: r.area, wrap: false },
          createElement(View, { style: s.areaHeader },
            createElement(Text, { style: s.areaRank }, `${i + 1}º`),
            createElement(Text, { style: s.areaName }, r.area),
            createElement(Text, { style: [s.areaPercent, { color: cor }] }, `${r.percent}%`),
          ),
          createElement(View, { style: s.barTrack },
            createElement(View, { style: [s.barFill, { width: `${r.percent}%`, backgroundColor: cor }] }),
          ),
          r.profissoes && r.profissoes.length > 0 && createElement(View, { style: s.areaProfList },
            ...r.profissoes.map(p =>
              createElement(View, { style: s.areaProfItem, key: p.nome },
                createElement(Text, {}, `• ${p.nome}`),
                createElement(Text, { style: { color: '#059669' } }, p.salario || ''),
              )
            ),
          ),
        )
      }),

      // INTERPRETATION
      interpretacao && createElement(View, { style: s.interpretBox, wrap: false },
        createElement(Text, { style: s.interpretTitle }, interpretacao.titulo),
        createElement(Text, { style: s.interpretConf }, `Confiança do diagnóstico: ${interpretacao.confianca}`),
        createElement(Text, { style: s.interpretText }, interpretacao.descricao),
      ),

      // NEXT STEPS
      interpretacao && createElement(View, { wrap: false },
        createElement(Text, { style: s.sectionTitle }, 'Próximos passos concretos'),
        createElement(View, { style: s.passosList },
          ...interpretacao.proximos_passos.map((passo, i) =>
            createElement(View, { style: s.passoItem, key: i },
              createElement(Text, { style: s.passoNum }, `${i + 1}.`),
              createElement(Text, { style: s.passoText }, passo),
            )
          ),
        ),
      ),

      // FOOTER
      createElement(View, { style: s.footer, fixed: true },
        createElement(Text, {}, 'EDKRAFT — Diagnóstico vocacional baseado em dados'),
        createElement(Text, {},
          'Não substitui acompanhamento profissional. CVV: 188 (24h)'
        ),
      ),
    ),
  )
}

export async function baixarPDF({ aluno, top, interpretacao, totalQuestions }) {
  try {
    const blob = await pdf(
      createElement(DocumentoPDF, { aluno, top, interpretacao, totalQuestions })
    ).toBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const nomeArq = (aluno?.nome || 'diagnostico')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    a.download = `edkraft-diagnostico-${nomeArq || 'aluno'}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch (err) {
    console.error('Erro ao gerar PDF:', err)
    alert('Não foi possível gerar o PDF. Tenta de novo em alguns segundos.')
  }
}
