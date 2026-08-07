/**
 * Universidades brasileiras por categoria e região.
 * Cobertura Norte, Nordeste, Centro-Oeste, Sudeste e Sul.
 * Foco em públicas (referência de qualidade) + privadas de destaque.
 */

// { nome, tipo: 'Pública' | 'Privada', regiao, uf }
export const faculdadesPorCategoria = {
  Tecnologia: [
    // Sudeste
    { nome: 'USP — IME / ICMC', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — IC', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFMG — DCC', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'UFRJ — DCC', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFSCar', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'PUC-Rio', tipo: 'Privada', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'FIAP', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — Informática', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — INE', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — DInf', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CIn', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — DCC', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — DC', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    { nome: 'UFRN — DIMAp', tipo: 'Pública', regiao: 'Nordeste', uf: 'RN' },
    // Centro-Oeste
    { nome: 'UnB — CIC', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — INF', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — Computação', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
    { nome: 'UFAM — ICOMP', tipo: 'Pública', regiao: 'Norte', uf: 'AM' },
  ],

  Saúde: [
    // Sudeste
    { nome: 'USP — FMUSP', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — FCM', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFMG — Medicina', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'UFRJ — FM', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFES — CCS', tipo: 'Pública', regiao: 'Sudeste', uf: 'ES' },
    { nome: 'Einstein — Faculdade', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'PUC-SP — FCMS', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — Medicina', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — Medicina', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — SCS', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CCS', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FMB', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — Medicina', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    { nome: 'UFRN — CCS', tipo: 'Pública', regiao: 'Nordeste', uf: 'RN' },
    // Centro-Oeste
    { nome: 'UnB — FS', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FM', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — ICS', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
    { nome: 'UFAM — Medicina', tipo: 'Pública', regiao: 'Norte', uf: 'AM' },
  ],

  Jurídica: [
    // Sudeste
    { nome: 'USP — Largo São Francisco', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UERJ — Direito', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — Direito', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'FGV Direito SP / Rio', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'PUC-SP — Direito', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'Mackenzie — Direito', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — Direito', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFPR — Direito', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    { nome: 'UFSC — Direito', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    // Nordeste
    { nome: 'UFPE — Direito', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — Direito', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — Direito', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — Direito', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — Direito', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — ICJ', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
    { nome: 'UFAM — Direito', tipo: 'Pública', regiao: 'Norte', uf: 'AM' },
  ],

  Negócios: [
    // Sudeste
    { nome: 'FGV — EAESP / EBAPE', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'Insper', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'USP — FEA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — IE', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFRJ — Coppead', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — FACE', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'IBMEC', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — Escola Adm', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CSE', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — SCSA', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CCSA', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FCE', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — FEAAC', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — FACE', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FACE', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — FAAD', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Engenharia: [
    // Sudeste
    { nome: 'ITA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'USP — Poli / São Carlos', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — FEC / FEQ / FEM', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'IME — Rio', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFRJ — Escola Politécnica', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — Escola de Eng', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    // Sul
    { nome: 'UFSC — CTC', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFRGS — Escola de Eng', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFPR — Setor Tecnologia', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    { nome: 'UTFPR', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CTG', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — Escola Politécnica', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — CT', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    { nome: 'UFRN — CT', tipo: 'Pública', regiao: 'Nordeste', uf: 'RN' },
    // Centro-Oeste
    { nome: 'UnB — FT', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — EEEC', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — ITEC', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Arquitetura: [
    // Sudeste
    { nome: 'USP — FAU', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — FEC', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'Mackenzie — Arquitetura', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFRJ — FAU', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — EA', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    // Sul
    { nome: 'UFRGS — FA', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — ARQ', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — Arquitetura', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — DAU', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FAUFBA', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — DAU', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — FAU', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FAV', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — FAU', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Comunicação: [
    // Sudeste
    { nome: 'USP — ECA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'PUC-SP — Comunicação', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'ESPM', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFRJ — ECO', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — FAFICH', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'Cásper Líbero', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — FABICO', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CCE', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — Comunicação', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CAC', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FACOM', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — ICA', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — FAC', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FIC', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — FACOM', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Artes: [
    // Sudeste
    { nome: 'USP — ECA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — IA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFRJ — Belas Artes', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UNESP — IA', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'Santa Marcelina', tipo: 'Privada', regiao: 'Sudeste', uf: 'SP' },
    // Sul
    { nome: 'UFRGS — Artes', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CCE Artes', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UDESC — CEART', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    // Nordeste
    { nome: 'UFPE — CAC Artes', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — EBA', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    // Centro-Oeste
    { nome: 'UnB — IdA', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FAV', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — ICA', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Educação: [
    // Sudeste
    { nome: 'USP — FE', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — FE', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UERJ — Educação', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UNESP — Pedagogia', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFMG — FaE', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    // Sul
    { nome: 'UFRGS — Faced', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CED', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — Setor Educação', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    { nome: 'PUC-RS — Educação', tipo: 'Privada', regiao: 'Sul', uf: 'RS' },
    // Nordeste
    { nome: 'UFPE — CE', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FACED', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — FACED', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — FE', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    // Norte
    { nome: 'UFPA — ICED', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Humanas: [
    // Sudeste
    { nome: 'USP — FFLCH', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — IFCH', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFRJ — IFCS', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    { nome: 'UFMG — FAFICH', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'PUC-Rio — CSS', tipo: 'Privada', regiao: 'Sudeste', uf: 'RJ' },
    // Sul
    { nome: 'UFRGS — IFCH', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CFH', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — Humanas', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CFCH', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — FFCH', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — CH', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — Humanas', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — FCS', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte
    { nome: 'UFPA — IFCH', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
  ],

  Biológicas: [
    // Sudeste
    { nome: 'USP — IB', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNICAMP — IB', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UNESP — Rio Claro', tipo: 'Pública', regiao: 'Sudeste', uf: 'SP' },
    { nome: 'UFMG — ICB', tipo: 'Pública', regiao: 'Sudeste', uf: 'MG' },
    { nome: 'UFRJ — IB / CCS', tipo: 'Pública', regiao: 'Sudeste', uf: 'RJ' },
    // Sul
    { nome: 'UFRGS — IB', tipo: 'Pública', regiao: 'Sul', uf: 'RS' },
    { nome: 'UFSC — CCB', tipo: 'Pública', regiao: 'Sul', uf: 'SC' },
    { nome: 'UFPR — Biologia', tipo: 'Pública', regiao: 'Sul', uf: 'PR' },
    // Nordeste
    { nome: 'UFPE — CB', tipo: 'Pública', regiao: 'Nordeste', uf: 'PE' },
    { nome: 'UFBA — IB', tipo: 'Pública', regiao: 'Nordeste', uf: 'BA' },
    { nome: 'UFCE — Biologia', tipo: 'Pública', regiao: 'Nordeste', uf: 'CE' },
    // Centro-Oeste
    { nome: 'UnB — IB', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'DF' },
    { nome: 'UFG — ICB', tipo: 'Pública', regiao: 'Centro-Oeste', uf: 'GO' },
    // Norte (importantíssimo por Amazônia)
    { nome: 'INPA', tipo: 'Pública', regiao: 'Norte', uf: 'AM' },
    { nome: 'UFPA — ICB', tipo: 'Pública', regiao: 'Norte', uf: 'PA' },
    { nome: 'UFAM — ICB', tipo: 'Pública', regiao: 'Norte', uf: 'AM' },
  ],
}

export const REGIOES = ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul']

export function filtrarFaculdades(categoria, regiao) {
  const lista = faculdadesPorCategoria[categoria] || []
  if (regiao === 'Todas' || !regiao) return lista
  return lista.filter(f => f.regiao === regiao)
}
