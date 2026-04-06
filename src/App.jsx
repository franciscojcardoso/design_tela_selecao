import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'
import logoJangada from './assets/logo-jangada.svg'
import logoEstadoCeara from './assets/logo-estado-ceara.svg'
import './App.css'

const selection = {
  title: 'EDITAL PJ',
  candidateName: 'Nome Sobrenome',
}

const institutionInfo = {
  fullName: 'Escola de Saude Publica do Ceara Paulo Marcelo Martins Rodrigues - ESP/CE',
  address: 'Antonio Justa, 3161, Meireles, Fortaleza - CE, CEP 60165-090',
  email: 'chamamentopublico@esp.ce.gov.br',
  government: 'Governo do Estado do Ceara',
}

const dashboardStagesTop = [
  { id: 'company-registration', title: 'Cadastro da empresa', icon: 'bi-buildings', description: 'Dados cadastrais, endereço e conta bancária da pessoa jurídica.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'company-registration' },
  { id: 'legal-contact', title: 'Representante legal', icon: 'bi-person-vcard', description: 'Informações do representante legal e do contato comercial.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'legal-contact' },
  { id: 'fiscal', title: 'Regularidade fiscal', icon: 'bi-shield-check', description: 'Certidões e comprovantes de regularidade fiscal da empresa.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'fiscal' },
  { id: 'attachments', title: 'Documentos obrigatórios', icon: 'bi-folder2-open', description: 'Anexos institucionais, comprovantes e modelos assinados.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'attachments' },
  { id: 'declarations', title: 'Declarações', icon: 'bi-file-earmark-check', description: 'Termos obrigatórios e confirmações de ciência do edital.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'declarations' },
]

const dashboardStagesBottom = [
  { id: 'project', title: 'Plano de trabalho', icon: 'bi-kanban', description: 'Projeto, plano de trabalho, plano de mídia e valores.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'project' },
  { id: 'appeal', title: 'Recurso do resultado', icon: 'bi-chat-left-text', description: 'Etapa futura: exibida somente se o edital abrir recurso.', statusColor: '#5C646B', startDate: '--', endDate: '--', navigateTo: 'appeal' },
  // { id: 'evaluation', title: 'Avaliação final', icon: 'bi-clipboard-data', description: 'Acompanhamento da análise da comissão avaliadora', statusColor: '#5C646B', startDate: '16/04/2026', endDate: '30/04/2026', navigateTo: 'evaluation' },
]

const documentosDisponiveis = ['Edital completo', 'Anexo III', 'Anexo IV', 'Anexo V', 'Anexo VI', 'Anexo VII', 'Modelo de declaracao trabalhista e social']

const noticeOptions = [
  'Edital 03/2026 - Implantacao e implementacao da rede saude',
  'Edital 04/2026 - Fortalecimento da atencao territorial',
  'Edital 05/2026 - Inovacao em educacao permanente',
]

const bankOptions = [
  'Banco do Brasil',
  'Caixa Economica Federal',
  'Bradesco',
  'Itau',
  'Santander',
  'Banco do Nordeste',
]

const cnaeOptions = [
  '6201-5/01 - Desenvolvimento de programas de computador sob encomenda',
  '6311-9/00 - Tratamento de dados, provedores de servicos de aplicacao e servicos de hospedagem na internet',
  '7020-4/00 - Atividades de consultoria em gestao empresarial',
  '8599-6/04 - Treinamento em desenvolvimento profissional e gerencial',
  '8610-1/01 - Atividades de atendimento hospitalar',
  '8650-0/99 - Atividades de profissionais da area de saude',
]

const uploadChecklist = [
  { key: 'sponsorshipRequest', label: 'Oficio de solicitacao de patrocinio', info: 'Documento formal de solicitacao de patrocinio para o evento ou projeto, com assinatura eletronica GOV.BR.' },
  { key: 'nationalTax', label: 'Regularidade com Fazenda Nacional', info: 'Certidao conjunta expedida pela Receita Federal do Brasil e pela Procuradoria-Geral da Fazenda Nacional, comprovando regularidade fiscal federal.' },
  { key: 'stateTax', label: 'Regularidade com Fazenda Estadual', info: 'Certidao emitida pela Secretaria da Fazenda do Estado do domicilio ou sede da proponente.' },
  { key: 'municipalTax', label: 'Regularidade com Fazenda Municipal', info: 'Certidao de regularidade fiscal municipal do domicilio ou sede da empresa.' },
  { key: 'fgts', label: 'FGTS', info: 'Certificado de regularidade relativa ao Fundo de Garantia por Tempo de Servico.' },
  { key: 'cndt', label: 'CNDT', info: 'Certidao Negativa de Debitos Trabalhistas, usada para demonstrar regularidade em obrigacoes trabalhistas.' },
  { key: 'correctionalCertificate', label: 'Certidao negativa correcional', info: 'Consulta negativa de entes privados em bases como ePAD, CGU-PJ, CEIS, CNEP e CEPIM.' },
  { key: 'tcuCertificate', label: 'Certidao negativa de licitantes inidoneos', info: 'Certidao emitida no ambito do TCU para comprovar ausencia de impedimentos relacionados a licitacoes.' },
  { key: 'constitutiveAct', label: 'Ato constitutivo ou contrato social', info: 'Documento societario que comprova a constituicao formal da empresa e seus representantes.' },
  { key: 'legalRepresentativeDocument', label: 'Documento do representante legal', info: 'Documento de identificacao do representante legal, como RG, CPF ou CNH.' },
  { key: 'representativeAddress', label: 'Comprovante de endereco do representante', info: 'Comprovante atualizado de residencia do representante legal da empresa.' },
]

const initialApplicationData = {
  companyType: '', cnpj: '', companyName: '', tradeName: '', email: '', emailConfirm: '', phone: '', website: '',
  phoneSecondary: '', street: '', streetNumber: '', zipCode: '', geoFields: '', landmark: '', neighborhood: '',
  addressComplement: '', city: '', state: '',
  foundationDate: '', shareCapital: '', primaryCnae: '', secondaryCnaes: '', address: '',
  bank: '', agency: '', account: '',
  password: '', passwordConfirm: '',
  legalRepresentative: '', legalRepresentativeCpf: '',
  legalRepresentativeRole: '', commercialContact: '', commercialContactCpf: '', commercialContactPhone: '',
  selectedNotice: '', projectTitle: '', projectAmount: '', projectCounterpart: '', alignmentLevel: '', workPlan: '', mediaPlan: '',
  declarations: { socialRegularity: false, articleSeven: false, noticeAgreement: false },
  uploads: {},
}

const initialAdminUserForm = {
  fullName: '',
  email: '',
  emailConfirm: '',
  cpf: '',
  phone: '',
  phoneSecondary: '',
  isAdmin: false,
  isEvaluator: true,
}

const initialAdminUsers = [
  { id: 1, fullName: 'Maria Fernanda Alves', email: 'maria.alves@esp.ce.gov.br', emailConfirm: 'maria.alves@esp.ce.gov.br', cpf: '123.456.789-00', phone: '(85) 98888-1111', phoneSecondary: '(85) 3222-1111', isAdmin: true, isEvaluator: true, status: 'Convite enviado' },
  { id: 2, fullName: 'Joao Pedro Lima', email: 'joao.lima@esp.ce.gov.br', emailConfirm: 'joao.lima@esp.ce.gov.br', cpf: '234.567.890-11', phone: '(85) 97777-2222', phoneSecondary: '', isAdmin: false, isEvaluator: true, status: 'Ativo' },
  { id: 3, fullName: 'Ana Carolina Sousa', email: 'ana.sousa@esp.ce.gov.br', emailConfirm: 'ana.sousa@esp.ce.gov.br', cpf: '345.678.901-22', phone: '(85) 96666-3333', phoneSecondary: '(85) 3111-0000', isAdmin: true, isEvaluator: false, status: 'Convite pendente' },
]

function getAdminUserRoles(user) {
  return [
    user.isAdmin ? 'Admin' : null,
    user.isEvaluator ? 'Avaliador' : null,
  ].filter(Boolean).join(' / ')
}

const stageContent = {
  'company-registration': { eyebrow: 'Etapa 1', title: 'Identificação da empresa', description: 'Dados institucionais da pessoa jurídica, endereço e conta bancária do proponente.' },
  'legal-contact': { eyebrow: 'Etapa 2', title: 'Representante legal e contato comercial', description: 'Dados do representante legal e do contato comercial responsável pela proposta.' },
  fiscal: { eyebrow: 'Etapa 3', title: 'Regularidade fiscal e trabalhista', description: 'Certidões fiscais e trabalhistas usadas para comprovar regularidade da empresa.' },
  attachments: { eyebrow: 'Etapa 4', title: 'Documentos institucionais e anexos', description: 'Uploads institucionais e comprovantes formais exigidos pelo edital.' },
  project: { eyebrow: 'Etapa 5', title: 'Projeto, plano de trabalho e mídia', description: 'Projeto, valores, contrapartida, plano de trabalho e plano de mídia.' },
  declarations: { eyebrow: 'Etapa 6', title: 'Declarações', description: 'Confirmações obrigatórias antes do envio final da inscrição.' },
  appeal: { eyebrow: 'Pós-inscrição', title: 'Recurso do resultado', description: 'Esta tela fica preparada para eventual abertura de recurso após a avaliação.' },
  // evaluation: { eyebrow: 'Acompanhamento', title: 'Avaliação final', description: 'Resumo da fase de análise e critérios observados pela comissão avaliadora.' },
  settings: { eyebrow: 'Preferências', title: 'Configurações', description: 'Escolha o modo claro ou escuro e a variação de cores acessíveis para a interface.' },
}

const fieldLabels = {
  companyType: 'Tipo de empresa',
  cnpj: 'CNPJ',
  companyName: 'Razao social',
  tradeName: 'Nome fantasia',
  email: 'Email institucional',
  phone: 'Telefone principal',
  website: 'Website',
  zipCode: 'CEP',
  street: 'Logradouro',
  streetNumber: 'Numero',
  neighborhood: 'Bairro',
  city: 'Cidade',
  state: 'Estado',
  bank: 'Banco',
  agency: 'Agencia',
  account: 'Conta',
  legalRepresentative: 'Representante legal',
  legalRepresentativeCpf: 'CPF do representante',
  legalRepresentativeRole: 'Cargo do representante',
  commercialContact: 'Contato comercial',
  commercialContactCpf: 'CPF do contato comercial',
  commercialContactPhone: 'Telefone do contato comercial',
  projectTitle: 'Titulo do projeto',
  projectAmount: 'Valor solicitado',
  projectCounterpart: 'Contrapartida',
  alignmentLevel: 'Nivel de alinhamento',
  workPlan: 'Plano de trabalho',
  mediaPlan: 'Plano de midia',
  socialRegularity: 'Regularidade social',
  articleSeven: 'Artigo 7',
  noticeAgreement: 'Ciencia do edital',
}

const adminMenu = [
  { label: 'Início', icon: 'bi-house', target: 'dashboard' },
  { label: 'Instituições', icon: 'bi-people-fill', target: 'institutions' },
  { label: 'Projetos', icon: 'bi-kanban', target: 'projects' },
  { label: 'Recursos', icon: 'bi-file-earmark-text', target: 'resources' },
  { label: 'Auditorias', icon: 'bi-clipboard-check', target: 'audits' },
  { label: 'Relatórios', icon: 'bi-bar-chart-line', target: 'reports' },
  { label: 'Gerenciar usu\u00E1rios', icon: 'bi-person-gear', target: 'users' },
]

const evaluatorMenu = [
  { label: 'Início', icon: 'bi-house', target: 'eval-dashboard' },
  { label: 'Projetos', icon: 'bi-kanban', target: 'eval-projects' },
  { label: 'Documentos', icon: 'bi-folder-check', target: 'eval-documents' },
]

const evaluatorProjects = [
  { id: 'eval-01', institution: 'Instituto Vida', project: 'Fortalecimento da atenção territorial', notice: 'Edital 03/2026', amount: 'R$ 45.000,00', status: 'Aguardando avaliação' },
  { id: 'eval-02', institution: 'Clínica Horizonte', project: 'Inovação em educação permanente', notice: 'Edital 03/2026', amount: 'R$ 30.000,00', status: 'Em avaliação' },
  { id: 'eval-03', institution: 'Associação Soma', project: 'Implantação da rede saúde', notice: 'Edital 03/2026', amount: 'R$ 60.000,00', status: 'Avaliado' },
]

const evaluationCriteria = [
  { id: 1, description: 'Alinhamento com os objetivos do edital' },
  { id: 2, description: 'Capacidade técnica da instituição' },
  { id: 3, description: 'Viabilidade financeira do projeto' },
  { id: 4, description: 'Impacto social esperado' },
  { id: 5, description: 'Cobertura territorial' },
]

const evaluatorDocuments = [
  { id: 1, institution: 'Instituto Vida', document: 'Ato constitutivo', avaliacao: null, justificativa: '' },
  { id: 2, institution: 'Clínica Horizonte', document: 'Comprovante de endereço', avaliacao: 1, justificativa: '' },
  { id: 3, institution: 'Associação Soma', document: 'Documento do representante', avaliacao: 0, justificativa: 'Documento vencido' },
]

const adminBaseApplicants = [
  { id: 'esp-01', companyName: 'Instituto Vida', city: 'FORTALEZA', status: 'Concluido', documents: 8, progress: 5, resources: 2 },
  { id: 'esp-02', companyName: 'Clinica Horizonte', city: 'ARAPIRACA', status: 'Em analise', documents: 6, progress: 3, resources: 1 },
  { id: 'esp-03', companyName: 'Associacao Soma', city: 'PONTA GROSSA', status: 'Concluido', documents: 7, progress: 5, resources: 1 },
  { id: 'esp-04', companyName: 'Rede Saude Popular', city: 'FORTALEZA', status: 'Em analise', documents: 5, progress: 4, resources: 0 },
  { id: 'esp-05', companyName: 'Projeto Sanar', city: 'FORTALEZA', status: 'Pendente', documents: 2, progress: 1, resources: 0 },
]

const adminSchedule = [
  { date: '2026-03-18', title: 'Inicio das inscricoes' },
  { date: '2026-03-23', title: 'Abertura dos recursos' },
  { date: '2026-03-27', title: 'Resultado preliminar' },
  { date: '2026-03-31', title: 'Resultado definitivo' },
  { date: '2026-04-07', title: 'Analise curricular' },
  { date: '2026-04-15', title: 'Encerramento da fase documental' },
]

const adminGraphSeries = [
  { label: 'Instituicoes', value: 6, color: 'var(--color-success)' },
  { label: 'Projetos', value: 4, color: 'var(--color-info)' },
  { label: 'Documentos', value: 5, color: 'var(--color-primary)' },
  { label: 'Recursos', value: 2, color: 'var(--color-info)' },
]

const adminAuditRows = [
  { id: 1, location: 'public.pacientes', recordId: 215, action: 'Cadastro', datetime: '2025-08-07 09:02:11', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Cadastro de instituição ID 215 – inclusao de novo registro na tabela public.pacientes.' },
  { id: 2, location: 'public.pacientes', recordId: 215, action: 'Atualizacao', datetime: '2025-08-07 09:07:34', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Atualizacao de instituição ID 215 – ajuste de dados cadastrais na tabela public.instituicoes.' },
  { id: 3, location: 'public.profissionais', recordId: 312, action: 'Desativacao', datetime: '2025-08-07 10:15:27', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Desativacao de profissional ID 312 – alteracao de status para inativo.' },
  { id: 4, location: 'public.usuarios', recordId: 315, action: 'Consulta', datetime: '2025-08-07 10:18:09', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Consulta de usuario ID 315 na tabela public.usuarios.' },
  { id: 5, location: 'public.login', recordId: 250, action: 'Login', datetime: '2025-08-07 08:58:41', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Login realizado com sucesso no sistema administrativo.' },
]

const fixedToday = new Date('2026-04-01T12:00:00')

function formatAuditTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function parseIsoDate(value) {
  return new Date(`${value}T00:00:00`)
}

const stageValidationRules = {
  'company-registration': [
    'companyType', 'cnpj', 'companyName', 'email', 'phone',
    'zipCode', 'streetNumber', 'street', 'neighborhood',
    'city', 'state', 'primaryCnae',
  ],
  'legal-contact': [
    'legalRepresentative', 'legalRepresentativeCpf', 'legalRepresentativeRole',
    'commercialContact', 'commercialContactCpf', 'commercialContactPhone',
  ],
  fiscal: uploadChecklist.slice(0, 8).map((item) => item.key),
  attachments: uploadChecklist.slice(8).map((item) => item.key),
  project: ['selectedNotice', 'projectTitle', 'projectAmount', 'projectCounterpart', 'projectPdf'],
  declarations: ['socialRegularity', 'articleSeven', 'noticeAgreement'],
  settings: ['themeMode', 'visionMode'],
}

function isFieldFilled(source, value) {
  if (source === 'uploads') {
    return Boolean(value)
  }

  if (source === 'declarations') {
    return Boolean(value)
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return Boolean(String(value || '').trim())
}

function isStageValid(stage, applicationData, preferences) {
  const requiredFields = stageValidationRules[stage] || []

  return requiredFields.every((field) => {
    if (stage === 'project' && field !== 'selectedNotice' && !applicationData.selectedNotice) {
      return false
    }

    if (stage === 'settings') {
      return isFieldFilled('field', preferences[field])
    }

    if (stage === 'declarations') {
      return isFieldFilled('declarations', applicationData.declarations[field])
    }

    if (stage === 'fiscal' || stage === 'attachments' || field === 'projectPdf') {
      return isFieldFilled('uploads', applicationData.uploads[field])
    }

    return isFieldFilled('field', applicationData[field])
  })
}

function buildAdminContext(applicationData, progressItems, completedSteps, auditTrail) {
  const hasCurrentRegistration = Boolean(
    applicationData.companyName ||
    applicationData.cnpj ||
    applicationData.email ||
    applicationData.legalRepresentative,
  )
  const uploadedDocuments = Object.values(applicationData.uploads).filter(Boolean).length
  const activeDeclarations = Object.values(applicationData.declarations).filter(Boolean).length
  const currentApplicant = hasCurrentRegistration
    ? {
        id: 'rascunho-atual',
        companyName: applicationData.companyName || 'Inscricao em preenchimento',
        city: (applicationData.city || 'Sem cidade').toUpperCase(),
        status: completedSteps === progressItems.length ? 'Concluido' : completedSteps > 0 ? 'Em analise' : 'Pendente',
        documents: uploadedDocuments,
        progress: completedSteps,
        resources: Math.max(progressItems.filter((item) => item.current).length, activeDeclarations > 0 ? 1 : 0),
      }
    : null

  const applicants = currentApplicant ? [...adminBaseApplicants, currentApplicant] : adminBaseApplicants
  const applicantsWithStatus = applicants.map((applicant) => {
    const hasPending = applicant.status !== 'Concluido' || applicant.documents < 5 || applicant.progress < 4
    const currentStageLabel = applicant.progress >= 5
      ? 'Declarações'
      : applicant.progress >= 4
        ? 'Documentos obrigatórios'
        : applicant.progress >= 3
          ? 'Regularidade fiscal'
          : applicant.progress >= 2
            ? 'Representante legal'
            : 'Cadastro da empresa'

    return {
      ...applicant,
      currentStageLabel,
      hasPending,
    }
  })
  const cityMap = applicants.reduce((accumulator, applicant) => {
    accumulator[applicant.city] = (accumulator[applicant.city] || 0) + 1
    return accumulator
  }, {})
  const cityRows = Object.entries(cityMap)
    .map(([city, total]) => ({ city, total }))
    .sort((first, second) => second.total - first.total || first.city.localeCompare(second.city))

  const pendingStages = progressItems.filter((item) => !item.done).length
  const inProgressStages = progressItems.filter((item) => item.current).length
  const totals = {
    inscritos: applicants.length,
    recursos: applicants.reduce((sum, applicant) => sum + applicant.resources, 0),
    documentos: applicants.reduce((sum, applicant) => sum + applicant.documents, 0),
    concluidos: applicants.reduce((sum, applicant) => sum + applicant.progress, 0),
    pendencias: applicants.filter((applicant) => applicant.status !== 'Concluido').length + pendingStages,
  }

  const attendanceGroups = [
    {
      label: 'Concluidos',
      tone: 'success',
      count: progressItems.filter((item) => item.done).length,
      items: progressItems.filter((item) => item.done).map((item) => ({
        title: item.title,
        status: item.status,
        detail: 'Etapa liberada para conferência administrativa.',
      })),
    },
    {
      label: 'Em andamento',
      tone: 'warning',
      count: inProgressStages,
      items: progressItems.filter((item) => item.current).map((item) => ({
        title: item.title,
        status: item.status,
        detail: 'Recebendo novos dados do formulário do usuário.',
      })),
    },
    {
      label: 'Pendentes',
      tone: 'neutral',
      count: pendingStages - inProgressStages,
      items: progressItems.filter((item) => !item.done && !item.current).map((item) => ({
        title: item.title,
        status: item.status,
        detail: 'Aguardando preenchimento ou envio de anexos.',
      })),
    },
  ].filter((group) => group.items.length > 0)

  const defaultAudits = [
    applicationData.companyName && { title: 'Razao social atualizada', time: formatAuditTimestamp(fixedToday), detail: applicationData.companyName },
    applicationData.city && { title: 'Cidade vinculada ao cadastro', time: formatAuditTimestamp(fixedToday), detail: applicationData.city.toUpperCase() },
    applicationData.legalRepresentative && { title: 'Representante legal informado', time: formatAuditTimestamp(fixedToday), detail: applicationData.legalRepresentative },
    uploadedDocuments > 0 && { title: 'Documentos anexados ao processo', time: formatAuditTimestamp(fixedToday), detail: `${uploadedDocuments} arquivo(s)` },
  ].filter(Boolean)

  return {
    totals,
    cityRows,
    attendanceGroups,
    audits: [...auditTrail, ...defaultAudits].slice(0, 5),
    uploadedDocuments,
    activeDeclarations,
    currentApplicant,
    applicants: applicantsWithStatus,
    pendingApplicants: applicantsWithStatus.filter((applicant) => applicant.hasPending),
    resourcesRows: applicantsWithStatus
      .filter((applicant) => applicant.resources > 0)
      .map((applicant) => ({
        id: applicant.id,
        companyName: applicant.companyName,
        city: applicant.city,
        volume: applicant.resources,
        status: applicant.hasPending ? 'Em analise' : 'Resolvido',
      })),
    projectsRows: applicantsWithStatus.map((applicant, index) => ({
      id: applicant.id,
      institution: applicant.companyName,
      notice: index === applicantsWithStatus.length - 1 && applicationData.selectedNotice ? applicationData.selectedNotice : noticeOptions[index % noticeOptions.length],
      project: index === applicantsWithStatus.length - 1 && applicationData.projectTitle ? applicationData.projectTitle : `Projeto ${index + 1} de fortalecimento institucional`,
      amount: index === applicantsWithStatus.length - 1 && applicationData.projectAmount ? applicationData.projectAmount : `R$ ${(index + 2) * 15000},00`,
      status: applicant.status === 'Concluido' ? 'Apto' : applicant.status === 'Em analise' ? 'Em analise' : 'Rascunho',
    })),
    stageTimeline: progressItems.map((item, index) => ({
      id: item.title,
      title: item.title,
      status: item.status,
      tone: item.tone,
      period: index === 0 ? '18/03 a 22/03' : index === 1 ? '23/03 a 27/03' : index === 2 ? '28/03 a 03/04' : index === 3 ? '04/04 a 10/04' : '11/04 a 15/04',
      summary: item.done
        ? 'Etapa entregue e pronta para validacao administrativa.'
        : item.current
          ? 'Etapa ativa, recebendo atualizacoes do formulario.'
          : 'Etapa aguardando liberacao ou preenchimento.',
    })),
    auditRows: adminAuditRows,
  }
}

function PortalSelector({ portalView, onSelectPortal }) {
  return (
    <div className="portal-selector" role="tablist" aria-label="Alternar entre visões">
      <button type="button" className={`portal-selector__button${portalView === 'candidate' ? ' is-active' : ''}`} onClick={() => onSelectPortal('candidate')}>
        Candidato
      </button>
      <button type="button" className={`portal-selector__button${portalView === 'admin' ? ' is-active' : ''}`} onClick={() => onSelectPortal('admin')}>
        Admin
      </button>
      <button type="button" className={`portal-selector__button${portalView === 'evaluator' ? ' is-active' : ''}`} onClick={() => onSelectPortal('evaluator')}>
        Avaliador
      </button>
    </div>
  )
}

function PainelNavbar({ onExit, onGoToSettings, portalView, onSelectPortal }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <AppBrand />
          <div className="mb-0 navbar-titulo">{selection.title}</div>
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <div className="navbar-user-wrap">
            <button
              type="button"
              className="navbar-user"
              onClick={() => setShowDropdown((v) => !v)}
              aria-expanded={showDropdown}
            >
              <div className="navbar-avatar">
                <i className="bi bi-person" />
              </div>
              <span>{selection.candidateName}</span>
              <i className="bi bi-chevron-down navbar-user__chevron" />
            </button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <button
                  type="button"
                  className="navbar-dropdown__item"
                  onClick={() => { setShowDropdown(false); onGoToSettings?.() }}
                >
                  <i className="bi bi-sliders" />
                  Minhas preferências
                </button>
                <button
                  type="button"
                  className="navbar-dropdown__item navbar-dropdown__item--danger"
                  onClick={() => { setShowDropdown(false); onExit() }}
                >
                  <i className="bi bi-box-arrow-right" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function AdminNavbar({ portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <AppBrand />
          <div className="mb-0 navbar-titulo">Painel do admin</div>
        </div>
        <div className="d-flex align-items-center gap-2 navbar-painel__menu">
          {adminMenu.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`navbar-menu-item${adminScreen === item.target ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.target)}
            >
              {item.icon && <i className={`bi ${item.icon}`} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <div className="navbar-user-wrap">
            <button
              type="button"
              className="navbar-user"
              onClick={() => setShowDropdown((v) => !v)}
              aria-expanded={showDropdown}
            >
              <div className="navbar-avatar">
                <i className="bi bi-person-gear" />
              </div>
              <span>Admin</span>
              <i className="bi bi-chevron-down navbar-user__chevron" />
            </button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <button
                  type="button"
                  className="navbar-dropdown__item navbar-dropdown__item--danger"
                  onClick={() => { setShowDropdown(false); onExit?.() }}
                >
                  <i className="bi bi-box-arrow-right" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function EvaluatorNavbar({ portalView, onSelectPortal, evaluatorScreen, onNavigate, onExit }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <AppBrand />
          <div className="mb-0 navbar-titulo">Painel do avaliador</div>
        </div>
        <div className="d-flex align-items-center gap-2 navbar-painel__menu">
          {evaluatorMenu.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`navbar-menu-item${evaluatorScreen === item.target ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.target)}
            >
              {item.icon && <i className={`bi ${item.icon}`} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <div className="navbar-user-wrap">
            <button
              type="button"
              className="navbar-user"
              onClick={() => setShowDropdown((v) => !v)}
              aria-expanded={showDropdown}
            >
              <div className="navbar-avatar">
                <i className="bi bi-person-check" />
              </div>
              <span>Avaliador</span>
              <i className="bi bi-chevron-down navbar-user__chevron" />
            </button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <button
                  type="button"
                  className="navbar-dropdown__item navbar-dropdown__item--danger"
                  onClick={() => { setShowDropdown(false); onExit?.() }}
                >
                  <i className="bi bi-box-arrow-right" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function AppBrand({ footer = false }) {
  return (
    <div className={`app-brand${footer ? ' app-brand--footer' : ''}`}>
      <img src={logoJangada} alt="Logo Jangada" className="app-brand__image" />
    </div>
  )
}

function AppFooter() {
  return (
    <footer className="footer-painel">
      <div className="footer-painel__stripe" aria-hidden="true">
        <span className="footer-painel__stripe-part footer-painel__stripe-part--green" />
        <span className="footer-painel__stripe-part footer-painel__stripe-part--blue" />
        <span className="footer-painel__stripe-part footer-painel__stripe-part--red" />
      </div>
      <div className="footer-painel__content">
        <div className="container-fluid px-4">
          <div className="footer-painel__inner">
            <div className="footer-painel__identity">
              <AppBrand footer />
              <div className="footer-info">
                <strong>{institutionInfo.fullName}</strong>
                <div><i className="bi bi-geo-alt-fill me-2" />{institutionInfo.address}</div>
                <div><i className="bi bi-envelope-fill me-2" />{institutionInfo.email}</div>
              </div>
            </div>
            <div className="footer-rights">
              <img src={logoEstadoCeara} alt={institutionInfo.government} className="footer-rights__logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function DashboardCard({ title, icon, description, startDate, endDate, onCardClick }) {
  return (
    <div className={`card-hover${onCardClick ? ' card-hover--clickable' : ''}`} onClick={onCardClick}>
      <a href="#" className="card-link card-link--stage" onClick={(event) => event.preventDefault()}>
        <span className="card-icon-wrap">
          <i className={`bi ${icon}`} style={{ color: '#005FC9' }} />
        </span>
        <p className="card-text mb-0">{title}</p>
        <small className="card-description">{description}</small>
      </a>
      <div className="card-meta card-meta--hover">
        <div className="card-periodo periodo-linha">
          <div><strong>Inicio:</strong><br />{startDate}</div>
          <div><strong>Fim:</strong><br />{endDate}</div>
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ onNavigate, onExit, portalView, onSelectPortal, applicationData, progressItems, completedSteps, activeStep }) {
  return (
    <div className="painel-page">
      <PainelNavbar onExit={onExit} onGoToSettings={() => onNavigate('settings')} portalView={portalView} onSelectPortal={onSelectPortal} />
      <main className="main-wrapper">
        <div className="dashboard-shell">
          <div className="dashboard-hero">
            <div>
              <h1>Inscrição para pessoa jurídica</h1>
              <p>Preencha as informações dos cards. O card de cadastro da empresa abre os dados já preenchidos para consulta e ajuste conforme a LGPD.</p>
            </div>
          </div>

          <Row className="g-4 align-items-start">
            <Col xl={9}>
              <div className="dashboard-cards-grid dashboard-cards-grid--top">
                {dashboardStagesTop.map((stage) => (
                  <div key={stage.id} className="card-col">
                    <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
                  </div>
                ))}
              </div>
              <div className="dashboard-cards-grid dashboard-cards-grid--bottom">
                {dashboardStagesBottom.filter((s) => !s.id.startsWith('//')).map((stage) => (
                  <div key={stage.id} className="card-col">
                    <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
                  </div>
                ))}
              </div>
            </Col>
            <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} isEditing={false} />
              </div>
            </Col>
          </Row>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

function AdminKpiCard({ title, value, icon, detail, onClick, disabled = false }) {
  return (
    <button type="button" className={`admin-kpi-card${disabled ? ' is-disabled' : ' is-clickable'}`} onClick={onClick} disabled={disabled}>
      <div className="admin-kpi-card__icon">
        <i className={`bi ${icon}`} />
      </div>
      <div className="admin-kpi-card__content">
        <span className="admin-kpi-card__title">{title}</span>
        <strong className="admin-kpi-card__value">{value}</strong>
        <small className="admin-kpi-card__detail">{detail}</small>
      </div>
    </button>
  )
}

function AdminCalendarCard() {
  const [activeTab, setActiveTab] = useState('calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-04-01T00:00:00'))
  const monthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(currentMonth)
  const progressStart = parseIsoDate('2026-03-18')
  const progressEnd = parseIsoDate('2026-04-15')
  const totalDays = Math.max(1, Math.round((progressEnd - progressStart) / 86400000))
  const elapsedDays = Math.min(totalDays, Math.max(0, Math.round((fixedToday - progressStart) / 86400000)))
  const progressPercent = Math.round((elapsedDays / totalDays) * 100)

  const renderCalendarCells = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []

    for (let index = 0; index < firstDay; index += 1) {
      cells.push(<div key={`empty-${index}`} className="admin-calendar__cell admin-calendar__cell--empty" />)
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const events = adminSchedule.filter((event) => event.date === isoDate)
      const isToday = isoDate === '2026-04-01'

      cells.push(
        <div key={isoDate} className={`admin-calendar__cell${events.length ? ' has-event' : ''}${isToday ? ' is-today' : ''}`}>
          <span className="admin-calendar__day-number">{day}</span>
          {events.slice(0, 2).map((event) => (
            <span key={event.title} className="admin-calendar__event">{event.title}</span>
          ))}
        </div>,
      )
    }

    return cells
  }

  return (
    <section className="admin-panel-card admin-panel-card--calendar">
      <header className="admin-panel-card__header">
        <div className="admin-panel-card__title">
          <i className="bi bi-calendar3" />
          <span>Cronograma</span>
        </div>
        <div className="admin-tabs">
          <button type="button" className={`admin-tabs__button${activeTab === 'calendar' ? ' is-active' : ''}`} onClick={() => setActiveTab('calendar')}>
            Calendario
          </button>
          <button type="button" className={`admin-tabs__button${activeTab === 'graph' ? ' is-active' : ''}`} onClick={() => setActiveTab('graph')}>
            Grafico
          </button>
        </div>
      </header>

      <div className="admin-schedule-progress">
        <div className="admin-schedule-progress__meta">
          <span><strong>Inicio:</strong> 18/03/2026</span>
          <span>Progresso do cronograma</span>
          <span><strong>Fim:</strong> 15/04/2026</span>
        </div>
        <div className="admin-schedule-progress__bar">
          <div className="admin-schedule-progress__fill" style={{ width: `${progressPercent}%` }} />
          <span className="admin-schedule-progress__value">{progressPercent}%</span>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="admin-calendar">
          <div className="admin-calendar__toolbar">
            <h3>EDITAL 03/2026 - IMPLANTACAO E IMPLEMENTACAO DA REDE SAUDE</h3>
            <div className="admin-calendar__month-nav">
              <button type="button" onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}>
                <i className="bi bi-chevron-left" />
              </button>
              <span>{monthLabel}</span>
              <button type="button" onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}>
                <i className="bi bi-chevron-right" />
              </button>
            </div>
            <div className="admin-calendar__legend">
              <span><i className="bi bi-circle-fill admin-dot admin-dot--success" /> Concluidas</span>
              <span><i className="bi bi-circle-fill admin-dot admin-dot--warning" /> Hoje</span>
              <span><i className="bi bi-circle-fill admin-dot admin-dot--info" /> Futuras</span>
            </div>
          </div>
          <div className="admin-calendar__weekdays">
            {['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'].map((day) => (
              <div key={day} className="admin-calendar__weekday">{day}</div>
            ))}
          </div>
          <div className="admin-calendar__grid">
            {renderCalendarCells()}
          </div>
        </div>
      ) : (
        <div className="admin-chart">
          <div className="admin-chart__header">
            <div>
              <h3>Evolucao dos registros</h3>
              <p>Leitura consolidada das informacoes que chegam do formulario do usuario.</p>
            </div>
          </div>
          <div className="admin-chart__bars">
            {adminGraphSeries.map((item) => (
              <div key={item.label} className="admin-chart__row">
                <span>{item.label}</span>
                <div className="admin-chart__track">
                  <div className="admin-chart__bar" style={{ width: `${Math.min(item.value * 16, 100)}%`, background: item.color }} />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function AdminInsightsCard({ adminContext }) {
  const [activeTab, setActiveTab] = useState('indicators')

  return (
    <section className="admin-panel-card admin-panel-card--side">
      <header className="admin-panel-card__header">
        <div className="admin-panel-card__title">
          <i className="bi bi-app-indicator" />
          <span>Indicadores</span>
        </div>
        <div className="admin-tabs">
          <button type="button" className={`admin-tabs__button${activeTab === 'indicators' ? ' is-active' : ''}`} onClick={() => setActiveTab('indicators')}>
            Indicadores
          </button>
          <button type="button" className={`admin-tabs__button${activeTab === 'attendance' ? ' is-active' : ''}`} onClick={() => setActiveTab('attendance')}>
            Atendimentos
          </button>
        </div>
      </header>

      {activeTab === 'indicators' ? (
        <div className="admin-insights">
          <article className="admin-table-card">
            <div className="admin-table-card__header">
              <div><i className="bi bi-geo-alt" /> Instituições por cidade</div>
              <span className="admin-table-card__badge">{adminContext.cityRows.length} cidades</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {adminContext.cityRows.map((row) => (
                  <tr key={row.city}>
                    <td>{row.city}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="admin-table-card">
            <div className="admin-table-card__header">
              <div><i className="bi bi-kanban" /> Projetos em análise</div>
              <span className="admin-table-card__badge">{adminContext.projectsRows.length} projetos</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Instituicao</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminContext.projectsRows.slice(0, 5).map((project) => (
                  <tr key={project.id}>
                    <td>{project.institution}</td>
                    <td>{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      ) : (
        <div className="admin-attendance">
          {adminContext.attendanceGroups.map((group) => (
            <article key={group.label} className={`admin-attendance-group admin-attendance-group--${group.tone}`}>
              <header>
                <strong>{group.label}</strong>
                <span>{group.count}</span>
              </header>
              <div className="admin-attendance-group__list">
                {group.items.map((item) => (
                  <div key={item.title} className="admin-attendance-item">
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </div>
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function AdminUserCreationCard({ onRegister }) {
  const [formData, setFormData] = useState(initialAdminUserForm)
  const [feedback, setFeedback] = useState('')

  const updateField = (field) => (event) => {
    const { type, checked, value } = event.target
    setFormData((current) => ({
      ...current,
      [field]: type === 'checkbox' ? checked : value,
    }))
    setFeedback('')
  }

  const hasRoleSelected = formData.isAdmin || formData.isEvaluator
  const isValid = Boolean(formData.fullName.trim() && formData.email.trim() && formData.cpf.trim() && hasRoleSelected)
  const roleSummary = [
    formData.isAdmin && 'admin',
    formData.isEvaluator && 'avaliador',
  ].filter(Boolean).join(' e ')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!hasRoleSelected) {
      setFeedback('Selecione pelo menos um perfil para o usuário.')
      return
    }

    onRegister?.(formData, roleSummary)
    setFeedback(`Convite preparado para ${formData.email} com perfil de ${roleSummary}.`)
    setFormData(initialAdminUserForm)
  }

  return (
    <section className="admin-panel-card admin-user-card">
      <header className="admin-panel-card__header">
        <div className="admin-panel-card__title">
          <i className="bi bi-person-plus" />
          <span>Criar usuário</span>
        </div>
      </header>

      <Form className="admin-user-form" onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Nome completo *</Form.Label>
              <Form.Control value={formData.fullName} onChange={updateField('fullName')} placeholder="Nome da pessoa usuária" />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>E-mail *</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={updateField('email')} placeholder="email@instituicao.org.br" />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group>
              <Form.Label>CPF *</Form.Label>
              <Form.Control value={formData.cpf} onChange={updateField('cpf')} placeholder="000.000.000-00" />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control value={formData.phone} onChange={updateField('phone')} placeholder="(85) 99999-9999" />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <div className="admin-user-form__roles">
              <span className="admin-user-form__roles-label">Perfis de acesso *</span>
              <Form.Check type="checkbox" id="admin-role" label="Admin" checked={formData.isAdmin} onChange={updateField('isAdmin')} />
              <Form.Check type="checkbox" id="evaluator-role" label="Avaliador" checked={formData.isEvaluator} onChange={updateField('isEvaluator')} />
            </div>
          </Col>
        </Row>

        <div className="admin-user-form__footer">
          <p className="admin-user-form__helper">A senha inicial será enviada por e-mail para a pessoa cadastrada.</p>
          <Button type="submit" variant="success" className="action-button action-button--success" disabled={!isValid}>
            Enviar convite
          </Button>
        </div>

        {feedback && <p className="admin-user-form__feedback">{feedback}</p>}
      </Form>
    </section>
  )
}

function AdminSectionHeader({ title, subtitle, onBack }) {
  return (
    <div className="admin-detail-header">
      <div>
        <button type="button" className="admin-back-link" onClick={onBack}>
          <i className="bi bi-arrow-left" />
          <span>Voltar ao painel</span>
        </button>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

function AdminApplicantsTable({ title, subtitle, rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title={title}  onBack={onBack} />
        <section className="admin-management-card">
          <div className="admin-management-card__topline">
            <strong>{rows.length} instituicao(oes)</strong>
            <span>Visao completa das instituicoes cadastradas</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Instituicao</th>
                <th>Cidade</th>
                <th>Etapa atual</th>
                <th>Status</th>
                <th>Documentos</th>
                <th>Acao</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.companyName}</td>
                  <td>{row.city}</td>
                  <td>{row.currentStageLabel}</td>
                  <td>{row.status}</td>
                  <td>{row.documents}</td>
                  <td>
                    <button type="button" className="admin-inline-action">Gerenciar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}

function AdminResourcesScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title="Gerenciar recursos" subtitle="Lista consolidada dos recursos vinculados aos inscritos e prontos para tratamento administrativo." onBack={onBack} />
        <section className="admin-management-card">
          <div className="admin-management-card__topline">
            <strong>{rows.length} recurso(s)</strong>
            <span>Controle de entrada, analise e resposta</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Inscrito</th>
                <th>Cidade</th>
                <th>Volume</th>
                <th>Status</th>
                <th>Acao</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.companyName}</td>
                  <td>{row.city}</td>
                  <td>{row.volume}</td>
                  <td>{row.status}</td>
                  <td>
                    <button type="button" className="admin-inline-action">Abrir recurso</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}

function AdminProjectsScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title="Projetos" subtitle="Lista dos projetos vinculados as instituicoes cadastradas, com edital, valor e situacao atual." onBack={onBack} />
        <section className="admin-management-card">
          <div className="admin-management-card__topline">
            <strong>{rows.length} projeto(s)</strong>
            <span>Controle central dos projetos enviados</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Instituicao</th>
                <th>Edital</th>
                <th>Projeto</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.institution}</td>
                  <td>{row.notice}</td>
                  <td>{row.project}</td>
                  <td>{row.amount}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}

function AdminAuditsScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  const selectedAudit = rows[0]
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title="Auditoria" subtitle="Acompanhe e registre as acoes realizadas no sistema para garantir integridade, rastreabilidade e seguranca dos dados." onBack={onBack} />
        <section className="admin-management-card admin-audit-card">
          <div className="admin-audit-intro">
            Cada operação feita por um usuário é registrada automaticamente com data, horário, IP de origem e detalhes da alteração. Use essas informações para verificação técnica, auditorias internas e análises administrativas.
          </div>

          <div className="admin-audit-block">
            <h3>Registro de usuário</h3>
            <Form.Control value={selectedAudit.user} readOnly />
          </div>

          <div className="admin-audit-block">
            <h3>Acoes</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Localizacao</th>
                  <th>ID Registro</th>
                  <th>Acao</th>
                  <th>Data/Hora</th>
                  <th>Ver em detalhes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.location}</td>
                    <td>{row.recordId}</td>
                    <td>{row.action}</td>
                    <td>{row.datetime}</td>
                    <td><button type="button" className="admin-eye-button"><i className="bi bi-eye-fill" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-audit-detail-grid">
            <section className="admin-audit-detail-card">
              <h3>Detalhes das acoes de auditoria</h3>
              <div className="admin-audit-detail-lines">
                <div><strong>Nome do usuario:</strong> {selectedAudit.userName}</div>
                <div><strong>Login do usuario:</strong> {selectedAudit.user}</div>
                <div><strong>Ações realizadas:</strong> {rows.map((row) => row.action).join(', ')}</div>
                <div><strong>Quantidade total de ações:</strong> {rows.length}</div>
                <div><strong>Período das ações:</strong> {rows[rows.length - 1].datetime} a {rows[0].datetime}</div>
              </div>
            </section>

            <section className="admin-audit-detail-card">
              <h3>Detalhes da acao registrada</h3>
              <div className="admin-audit-detail-lines">
                <div><strong>Tipo de ação:</strong> {selectedAudit.action}</div>
                <div><strong>ID da auditoria:</strong> {selectedAudit.recordId}</div>
                <div><strong>Data e hora da ação:</strong> {selectedAudit.datetime}</div>
                <div><strong>Nome do usuario:</strong> {selectedAudit.userName}</div>
                <div><strong>Login do usuario:</strong> {selectedAudit.user}</div>
                <div><strong>IP de origem:</strong> {selectedAudit.ip}</div>
                <div><strong>Localizacao:</strong> {selectedAudit.location}</div>
                <div><strong>Detalhes da operacao:</strong> {selectedAudit.detail}</div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}

function AdminChatWidget({ adminContext }) {
  const [isOpen, setIsOpen] = useState(false)
  const pendingCount = adminContext.attendanceGroups
    .filter((group) => group.label !== 'Concluidos')
    .reduce((sum, group) => sum + group.count, 0)

  return (
    <>
      <button type="button" className="admin-chat-toggle" onClick={() => setIsOpen((current) => !current)} aria-label="Abrir assistente">
        <i className="bi bi-chat-dots" />
      </button>

      {isOpen && (
        <section className="admin-chat-window">
          <header className="admin-chat-window__header">
            <span>SeleBot</span>
            <button type="button" onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg" />
            </button>
          </header>
          <div className="admin-chat-window__body">
            <div className="admin-chat-window__avatar">
              <i className="bi bi-robot" />
            </div>
            <p>Ola! Estes sao os atendimentos em aberto no momento.</p>
            <strong>{pendingCount} item(ns) aguardando acao</strong>
            <ul>
              {adminContext.attendanceGroups
                .filter((group) => group.label !== 'Concluidos')
                .flatMap((group) => group.items.slice(0, 2))
                .map((item) => <li key={item.title}>{item.title}</li>)}
            </ul>
          </div>
          <footer className="admin-chat-window__footer">
            <input type="text" placeholder="Digite sua mensagem" />
            <button type="button">Enviar</button>
          </footer>
        </section>
      )}
    </>
  )
}

function AdminDashboardScreen({ portalView, onSelectPortal, adminContext, adminScreen, onNavigate, onExit }) {
  const kpis = [
    { title: 'Instituições', value: adminContext.totals.inscritos, icon: 'bi-people-fill', detail: 'Instituições localizadas no contexto atual.', target: 'institutions' },
    { title: 'Projetos', value: adminContext.projectsRows.length, icon: 'bi-kanban', detail: 'Projetos vinculados aos editais ativos.', target: 'projects' },
    { title: 'Recursos', value: adminContext.totals.recursos, icon: 'bi-file-earmark-text', detail: 'Demandas em revisão ou acompanhamento.', target: 'resources' },
    { title: 'Documentos', value: adminContext.totals.documentos, icon: 'bi-folder-check', detail: 'Arquivos enviados e prontos para análise.', disabled: true },
    { title: 'Auditorias', value: adminContext.auditRows.length, icon: 'bi-clipboard-check', detail: 'Histórico rastreável de operações do sistema.', target: 'audits' },
    { title: 'Relatórios', value: '—', icon: 'bi-bar-chart-line', detail: 'Relatórios consolidados do processo seletivo.', target: 'reports' },
  ]

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <section className="admin-kpi-grid">
          {kpis.map((kpi) => (
            <AdminKpiCard
              key={kpi.title}
              {...kpi}
              onClick={kpi.target ? () => onNavigate(kpi.target) : undefined}
            />
          ))}
        </section>

        <section className="admin-content-grid">
          {/* Calendário suprimido — melhoria futura */}
          {/* <AdminCalendarCard /> */}
          <AdminInsightsCard adminContext={adminContext} />
        </section>
      </main>
      <AppFooter />
      <AdminChatWidget adminContext={adminContext} />
    </div>
  )
}

function FormSection({ title, children }) {
  return (
    <Card className="form-section-card">
      <Card.Body className="p-0">
        <div className="form-section-card__header">
        </div>
        <div className="form-section-card__content">{children}</div>
      </Card.Body>
    </Card>
  )
}

function SidebarStatus({ applicationData, progressItems, completedSteps, activeStep, isEditing }) {
  const summaryItems = [
    { label: 'Razao social', value: applicationData.companyName },
    { label: 'CNPJ', value: applicationData.cnpj },
    { label: 'Email', value: applicationData.email },
    { label: 'Telefone', value: applicationData.phone },
    { label: 'Representante', value: applicationData.legalRepresentative },
    { label: 'Projeto', value: applicationData.projectTitle },
    { label: 'Valor solicitado', value: applicationData.projectAmount },
  ].filter((item) => Boolean(item.value))
  const progressPercent = Math.round((completedSteps / progressItems.length) * 100)

  return (
    <Card className="sidebar-status-card">
      <Card.Body>
        <h3 className="sidebar-status-card__title">Situação da inscrição</h3>
        <div className="status-line"><span>Status:</span><strong>{isEditing ? 'Edição em andamento' : 'Em andamento'}</strong></div>
        <div className="status-line"><span>Etapa atual:</span><strong>{activeStep}</strong></div>
        <div className="status-line"><span>Prazo final:</span><strong className="status-line__deadline">15/04/2026</strong></div>
        <div className="summary-panel">
          <div className="summary-panel__header"><h4>Resumo do cadastro:</h4></div>
          {summaryItems.length > 0 ? (
            <div className="summary-list">
              {summaryItems.map((item) => <div key={item.label} className="summary-list__item"><span>{item.label}</span><strong className={item.tone}>{item.value}</strong></div>)}
            </div>
          ) : <p className="summary-empty">O resumo será preenchido conforme a empresa informar os dados principais do cadastro.</p>}
        </div>
        <div className="sidebar-progress">
          <div className="sidebar-progress__header"><h4>Progresso das etapas</h4></div>
          <ProgressBar now={progressPercent} variant="success" className="sidebar-progress__bar" />
          <div className="progress-list">
            {progressItems.map((item) => <div key={item.title} className="progress-list__item"><span>{item.title}</span><Badge className={`status-chip status-chip--${item.tone}`}>{item.status}</Badge></div>)}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

function UploadItemCard({ item, uploadedFileName, onChange }) {
  const [showInfo, setShowInfo] = useState(false)
  const isUploaded = Boolean(uploadedFileName)

  return (
    <div className="upload-item">
      <div className="upload-item__head">
        <div className="upload-item__title-wrap">
          <strong>{item.label}</strong>
          <button
            type="button"
            className="upload-info-button"
            onClick={() => setShowInfo((current) => !current)}
            aria-label={`Explicar o item ${item.label}`}
          >
            <i className="bi bi-info-circle" />
          </button>
        </div>
        <span>{isUploaded ? 'Anexado' : 'Pendente'}</span>
      </div>

      {showInfo && <div className="upload-item__info">{item.info}</div>}

      <Form.Control key={uploadedFileName || `${item.key}-empty`} type="file" onChange={(event) => onChange(event.target.files?.[0]?.name || '')} />
      {isUploaded && (
        <div className="upload-item__footer">
          <small>{uploadedFileName}</small>
          <button type="button" className="upload-remove-button" onClick={() => onChange('')}>
            Remover anexo
          </button>
        </div>
      )}
    </div>
  )
}

function StageFooterActions({ onBack, onSave, saveDisabled, backLabel = 'Cancelar', saveLabel = 'Salvar' }) {
  return (
    <div className="form-actions form-actions--footer">
      <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onBack}>{backLabel}</Button>
      <Button type="button" variant="success" className="action-button action-button--success" onClick={onSave} disabled={saveDisabled}>{saveLabel}</Button>
    </div>
  )
}

function CompanyRegistrationForm({ applicationData, updateField, onBack, onSave, saveDisabled, saveLabel = 'Salvar' }) {
  return (
    <FormSection title="Identificação da empresa" subtitle="Campos básicos pedidos no edital para cadastro da pessoa jurídica.">
      <div className="company-form-group">
        <div className="company-form-group__title">Dados cadastrais</div>
        <Row className="g-3">
          <Col md={6}><Form.Group><Form.Label>Tipo de empresa *</Form.Label><Form.Select value={applicationData.companyType} onChange={updateField('companyType')}><option value="" disabled>Selecionar</option><option>LTDA</option><option>SLU</option><option>S/A</option><option>EIRELI</option><option>OSCIP</option><option>Outro</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>CNPJ *</Form.Label><Form.Control placeholder="00.000.000/0001-00" value={applicationData.cnpj} onChange={updateField('cnpj')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Razão social *</Form.Label><Form.Control placeholder="Nome completo da empresa" value={applicationData.companyName} onChange={updateField('companyName')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Nome fantasia</Form.Label><Form.Control placeholder="Nome de uso comercial" value={applicationData.tradeName} onChange={updateField('tradeName')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>E-mail institucional *</Form.Label><Form.Control type="email" placeholder="email@empresa.com.br" value={applicationData.email} onChange={updateField('email')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Confirmação de e-mail *</Form.Label><Form.Control type="email" placeholder="Repita o e-mail" value={applicationData.emailConfirm} onChange={updateField('emailConfirm')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone principal *</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phone} onChange={updateField('phone')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone secundário</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phoneSecondary} onChange={updateField('phoneSecondary')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Website</Form.Label><Form.Control placeholder="https://www.empresa.com.br" value={applicationData.website} onChange={updateField('website')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Data de criação</Form.Label><Form.Control type="date" value={applicationData.foundationDate} onChange={updateField('foundationDate')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Capital declarado</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.shareCapital} onChange={updateField('shareCapital')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAE principal *</Form.Label><Form.Select value={applicationData.primaryCnae} onChange={updateField('primaryCnae')}><option value="" disabled>Selecionar CNAE principal</option>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAEs secundários</Form.Label><Form.Select multiple value={applicationData.secondaryCnaes ? applicationData.secondaryCnaes.split(' | ') : []} onChange={(event) => updateField('secondaryCnaes')({ target: { value: Array.from(event.target.selectedOptions).map((option) => option.value).join(' | ') } })}>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Senha de acesso</div>
        <Row className="g-3">
          <Col md={6}><Form.Group><Form.Label>Senha *</Form.Label><Form.Control type="password" placeholder="Mínimo 8 caracteres" value={applicationData.password} onChange={updateField('password')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Confirmação de senha *</Form.Label><Form.Control type="password" placeholder="Repita a senha" value={applicationData.passwordConfirm} onChange={updateField('passwordConfirm')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Endereço</div>
        <Row className="g-3">
          <Col md={4}><Form.Group><Form.Label>CEP *</Form.Label><Form.Control placeholder="00.000-000" value={applicationData.zipCode} onChange={updateField('zipCode')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Número *</Form.Label><Form.Control placeholder="Número" value={applicationData.streetNumber} onChange={updateField('streetNumber')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Geolocalização (Lat. e Long.)</Form.Label><Form.Control placeholder="Latitude e Longitude" value={applicationData.geoFields} onChange={updateField('geoFields')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Logradouro *</Form.Label><Form.Control placeholder="Av., Rua, etc." value={applicationData.street} onChange={updateField('street')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Ponto de referência</Form.Label><Form.Control placeholder="Ponto de referência próximo" value={applicationData.landmark} onChange={updateField('landmark')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Bairro *</Form.Label><Form.Control placeholder="Nome do bairro" value={applicationData.neighborhood} onChange={updateField('neighborhood')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Complemento</Form.Label><Form.Control placeholder="Sala, bloco, apto..." value={applicationData.addressComplement} onChange={updateField('addressComplement')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Cidade *</Form.Label><Form.Select value={applicationData.city} onChange={updateField('city')}><option value="" disabled>Selecionar</option><option>Fortaleza</option><option>Caucaia</option><option>Maracanaú</option><option>Outro município</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>UF *</Form.Label><Form.Select value={applicationData.state} onChange={updateField('state')}><option value="" disabled>Selecionar</option><option>CE</option><option>PI</option><option>RN</option><option>PE</option></Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Dados bancários</div>
        <Row className="g-3">
          <Col xs={12}><Form.Group><Form.Label>Banco</Form.Label><Form.Select value={applicationData.bank} onChange={updateField('bank')}><option value="" disabled>Selecione um banco</option>{bankOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Agência</Form.Label><Form.Control placeholder="Número da agência" value={applicationData.agency} onChange={updateField('agency')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Conta</Form.Label><Form.Control placeholder="Número da conta" value={applicationData.account} onChange={updateField('account')} /></Form.Group></Col>
        </Row>
      </div>

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} saveLabel={saveLabel} />
    </FormSection>
  )
}

function LegalContactForm({ applicationData, updateField, onBack, onSave, saveDisabled }) {
  return (
    <FormSection title="Representante legal e contato comercial">
      <div className="company-form-group">
        <div className="company-form-group__title">Responsável legal</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Nome do representante legal *</Form.Label><Form.Control placeholder="Nome completo" value={applicationData.legalRepresentative} onChange={updateField('legalRepresentative')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do representante *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.legalRepresentativeCpf} onChange={updateField('legalRepresentativeCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Cargo *</Form.Label><Form.Control placeholder="Diretor, sócio, procurador..." value={applicationData.legalRepresentativeRole} onChange={updateField('legalRepresentativeRole')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Contato comercial</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Nome do contato comercial *</Form.Label><Form.Control placeholder="Nome do responsável pelo contato" value={applicationData.commercialContact} onChange={updateField('commercialContact')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do contato *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.commercialContactCpf} onChange={updateField('commercialContactCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Telefone do contato *</Form.Label><Form.Control placeholder="(85) 99999-9999" value={applicationData.commercialContactPhone} onChange={updateField('commercialContactPhone')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="info-banner mt-4"><i className="bi bi-info-circle" /><span>Esta etapa concentra apenas os dados dos responsáveis da empresa. O restante do cadastro continua nas outras opções da página inicial.</span></div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function FiscalForm({ applicationData, setUploadStatus, onBack, onSave, saveDisabled }) {
  const fiscalUploads = uploadChecklist.slice(0, 8)
  return (
    <FormSection title="Regularidade fiscal e trabalhista" subtitle="Certidões fiscais e comprovações de regularidade exigidas na fase de inscrição.">
      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Certidões e comprovações</div>
        <div className="upload-grid">
          {fiscalUploads.map((item) => (
            <UploadItemCard
              key={item.key}
              item={item}
              uploadedFileName={applicationData.uploads[item.key]}
              onChange={(fileName) => setUploadStatus(item.key, fileName)}
            />
          ))}
        </div>
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function AttachmentsForm({ applicationData, setUploadStatus, onBack, onSave, saveDisabled }) {
  const attachmentUploads = uploadChecklist.slice(8)
  const declaracaoItem = { key: 'declaracaoAssinada', label: 'Declarações assinadas', info: 'Arquivo PDF contendo as declarações obrigatórias assinadas pelo representante legal da empresa.' }

  return (
    <FormSection title="Documentos institucionais e anexos" subtitle="Uploads complementares, modelos assinados e comprovantes da empresa.">
      <div className="company-form-group">
        <div className="company-form-group__title">Documentos complementares</div>
        <div className="upload-grid">
          {attachmentUploads.map((item) => (
            <UploadItemCard
              key={item.key}
              item={item}
              uploadedFileName={applicationData.uploads[item.key]}
              onChange={(fileName) => setUploadStatus(item.key, fileName)}
            />
          ))}
        </div>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Declarações</div>
        <div className="upload-grid">
          <UploadItemCard
            key={declaracaoItem.key}
            item={declaracaoItem}
            uploadedFileName={applicationData.uploads[declaracaoItem.key]}
            onChange={(fileName) => setUploadStatus(declaracaoItem.key, fileName)}
          />
        </div>
      </div>

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function MarkdownField({ label, field, placeholder, value, updateField }) {
  const textareaRef = useRef(null)

  const setFieldValue = (nextValue) => {
    updateField(field)({
      target: {
        value: nextValue,
      },
    })
  }

  const applyWrap = (prefix, suffix = '', fallback = '') => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${prefix}${fallback}${suffix}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const selectedText = currentValue.slice(start, end) || fallback
    const replacement = `${prefix}${selectedText}${suffix}`
    const nextValue = `${currentValue.slice(0, start)}${replacement}${currentValue.slice(end)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length)
    })
  }

  const applyLinePrefix = (prefix, fallback = '') => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${prefix}${fallback}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const blockStart = currentValue.lastIndexOf('\n', Math.max(0, start - 1)) + 1
    const blockEndIndex = currentValue.indexOf('\n', end)
    const blockEnd = blockEndIndex === -1 ? currentValue.length : blockEndIndex
    const selectedBlock = currentValue.slice(blockStart, blockEnd) || fallback
    const replacement = selectedBlock
      .split('\n')
      .map((line) => `${prefix}${line || fallback}`)
      .join('\n')
    const nextValue = `${currentValue.slice(0, blockStart)}${replacement}${currentValue.slice(blockEnd)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(blockStart, blockStart + replacement.length)
    })
  }

  const insertBlock = (text) => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${text}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const nextValue = `${currentValue.slice(0, start)}${text}${currentValue.slice(end)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const caret = start + text.length
      textarea.setSelectionRange(caret, caret)
    })
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div className="editor-shell">
        <div className="editor-toolbar">
          <button type="button" className="editor-tool editor-tool--icon" aria-label="Desfazer">
            <i className="bi bi-arrow-counterclockwise" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" aria-label="Refazer">
            <i className="bi bi-arrow-clockwise" />
          </button>

          <select className="editor-select" defaultValue="Kanit" aria-label="Selecione uma fonte">
            <option>Kanit</option>
          </select>

          <select className="editor-select editor-select--size" defaultValue="16" aria-label="Tamanho da fonte">
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="22">22</option>
            <option value="28">28</option>
          </select>

          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('**', '**', 'texto')} aria-label="Negrito">
            <i className="bi bi-type-bold" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('*', '*', 'texto')} aria-label="Italico">
            <i className="bi bi-type-italic" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('<u>', '</u>', 'texto')} aria-label="Sublinhado">
            <i className="bi bi-type-underline" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('~~', '~~', 'texto')} aria-label="Tachado">
            <i className="bi bi-type-strikethrough" />
          </button>

          <button type="button" className="editor-tool editor-tool--color" aria-label="Cor do texto">
            <span className="editor-color-swatch" />
            <i className="bi bi-caret-down-fill" />
          </button>

          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('- ', 'item')} aria-label="Lista">
            <i className="bi bi-list-ul" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('1. ', 'item')} aria-label="Lista numerada">
            <i className="bi bi-list-ol" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('## ', 'Subtitulo')} aria-label="Titulo">
            <i className="bi bi-text-paragraph" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('> ', 'citacao')} aria-label="Citacao">
            <i className="bi bi-text-indent-left" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => insertBlock('\n---\n')} aria-label="Separador">
            <i className="bi bi-layout-text-sidebar-reverse" />
          </button>
        </div>

        <Form.Control
          ref={textareaRef}
          as="textarea"
          rows={9}
          className="editor-textarea"
          placeholder={placeholder}
          value={value}
          onChange={updateField(field)}
        />
      </div>
      <small className="markdown-helper">
        Campo com edicao assistida e suporte a Markdown.
      </small>
    </Form.Group>
  )
}

function ProjectForm({ applicationData, updateField, setUploadStatus, onBack, onSave, saveDisabled }) {
  return (
    <FormSection title="Projeto, plano de trabalho e mídia" subtitle="Campos ligados ao evento ou projeto que será analisado pela comissão.">
      <div className="company-form-group">
        <div className="company-form-group__title">Selecione um edital</div>
        <Row className="g-3">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Edital *</Form.Label>
              <Form.Select value={applicationData.selectedNotice} onChange={updateField('selectedNotice')}>
                <option value="" disabled>Selecione um edital</option>
                {noticeOptions.map((option) => <option key={option}>{option}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {applicationData.selectedNotice && (
        <div className="company-form-group company-form-group--last">
          <div className="company-form-group__title">Dados do projeto</div>
          <Row className="g-3">
            <Col lg={8}><Form.Group><Form.Label>Titulo do projeto *</Form.Label><Form.Control placeholder="Nome do evento ou projeto" value={applicationData.projectTitle} onChange={updateField('projectTitle')} /></Form.Group></Col>
            <Col lg={4}><Form.Group><Form.Label>PDF do projeto *</Form.Label><Form.Control key={applicationData.uploads.projectPdf || 'project-pdf-empty'} type="file" onChange={(event) => setUploadStatus('projectPdf', event.target.files?.[0]?.name || '')} /></Form.Group></Col>
            {applicationData.uploads.projectPdf && (
              <Col xs={12}>
                <div className="project-upload-info">
                  <small>{applicationData.uploads.projectPdf}</small>
                  <button type="button" className="upload-remove-button" onClick={() => setUploadStatus('projectPdf', '')}>Remover anexo</button>
                </div>
              </Col>
            )}
            <Col lg={6} md={6}><Form.Group><Form.Label>Valor solicitado *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectAmount} onChange={updateField('projectAmount')} /></Form.Group></Col>
            <Col lg={6} md={6}><Form.Group><Form.Label>Contrapartida proposta *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectCounterpart} onChange={updateField('projectCounterpart')} /></Form.Group></Col>
          </Row>
        </div>
      )}

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function DeclarationsForm({ applicationData, setDeclarationValue, onBack, onSave, saveDisabled }) {
  const companyName = applicationData.companyName || '[RAZÃO SOCIAL]'
  const cnpj = applicationData.cnpj || '[●]'
  const representativeName = applicationData.legalRepresentative || '[NOME]'
  const representativeCpf = applicationData.legalRepresentativeCpf || '[●]'
  const declarationItems = []

  if (applicationData.declarations.socialRegularity) {
    declarationItems.push('A empresa atende aos requisitos de regularidade trabalhista e social previstos no edital;')
  }

  if (applicationData.declarations.articleSeven) {
    declarationItems.push('Não emprega menor de 18 (dezoito) anos em trabalho noturno, perigoso ou insalubre;')
    declarationItems.push('Não emprega menor de 16 (dezesseis) anos;')
    declarationItems.push('Emprega menor, a partir de 14 (quatorze) anos, apenas na condição de aprendiz, quando aplicável;')
  }

  if (applicationData.declarations.noticeAgreement) {
    declarationItems.push('Leu o edital, os anexos e concorda com as condições de participação no presente processo seletivo;')
  }

  return (
    <FormSection title="Declarações obrigatórias e revisão" subtitle="Termos de ciência e declarações necessárias para a conclusão da inscrição.">
      <div className="company-form-group">
        <div className="company-form-group__title">Confirmações obrigatórias</div>
        <div className="declaration-list">
          <Form.Check type="checkbox" id="social-regularity" checked={applicationData.declarations.socialRegularity} onChange={(event) => setDeclarationValue('socialRegularity', event.target.checked)} label="Declaro que a empresa atende aos requisitos de regularidade trabalhista e social previstos no edital." />
          <Form.Check type="checkbox" id="art-7" checked={applicationData.declarations.articleSeven} onChange={(event) => setDeclarationValue('articleSeven', event.target.checked)} label="Declaro cumprimento do inciso XXXIII do art. 7º da Constituição Federal." />
          <Form.Check type="checkbox" id="notice-agreement" checked={applicationData.declarations.noticeAgreement} onChange={(event) => setDeclarationValue('noticeAgreement', event.target.checked)} label="Declaro que li o edital, os anexos e concordo com as condições da seleção." />
        </div>
      </div>

      <div className="company-form-group company-form-group--last declaration-preview">
        <div className="company-form-group__title">Declaração gerada</div>

        {declarationItems.length > 0 ? (
          <div className="declaration-document">
            <p className="declaration-document__title">
              DECLARAÇÃO DE CUMPRIMENTO DO INCISO XXXIII DO ART. 7º DA CONSTITUIÇÃO FEDERAL
            </p>
            <p>
              A empresa <strong>{companyName}</strong>, inscrita no CNPJ no <strong>{cnpj}</strong>, por
              intermedio de seu representante legal, Sr.(a) <strong>{representativeName}</strong>,
              portador(a) da Carteira de Identidade no <strong>[●]</strong> e do CPF no{' '}
              <strong>{representativeCpf}</strong>, DECLARA, para fins de participacao no presente
              processo seletivo, que:
            </p>

            <div className="declaration-document__items">
              {declarationItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <p>
              Declara, ainda, estar ciente de que a falsidade da presente declaração sujeitará
              a empresa às sanções previstas em lei, inclusive quanto à inabilitação no processo
              seletivo e demais penalidades cabíveis.
            </p>

            <p>Local e data. Nome e assinatura do representante legal.</p>
          </div>
        ) : (
          <p className="summary-empty">
            Marque as declarações obrigatórias para montar automaticamente o texto final com os
            dados da empresa e do representante legal.
          </p>
        )}
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function SettingsForm({ preferences, setPreferences, onBack, onSave, saveDisabled }) {
  const updatePreference = (field) => (event) => {
    setPreferences((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  return (
    <FormSection title="Configurações visuais" subtitle="Aplicação da tipografia Kanit, tema claro ou escuro e paletas acessíveis.">
      <div className="settings-stack">
        <div className="company-form-group">
          <div className="company-form-group__title">Modo de aparência</div>
          <div className="settings-options">
            <label className={`settings-option${preferences.themeMode === 'light' ? ' is-selected' : ''}`}>
              <input type="radio" name="themeMode" value="light" checked={preferences.themeMode === 'light'} onChange={updatePreference('themeMode')} />
              <div>
                <strong>Modo claro</strong>
                <span>Usa a paleta clara do arquivo de tokens.</span>
              </div>
            </label>
            <label className={`settings-option${preferences.themeMode === 'dark' ? ' is-selected' : ''}`}>
              <input type="radio" name="themeMode" value="dark" checked={preferences.themeMode === 'dark'} onChange={updatePreference('themeMode')} />
              <div>
                <strong>Modo escuro</strong>
                <span>Usa a paleta escura com contraste reforçado.</span>
              </div>
            </label>
          </div>
        </div>

        <div className="company-form-group company-form-group--last">
          <div className="company-form-group__title">Paleta acessível</div>
          <Form.Select value={preferences.visionMode} onChange={updatePreference('visionMode')}>
            <option value="default">Padrão</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="protanopia">Protanopia</option>
            <option value="tritanopia">Tritanopia</option>
          </Form.Select>
          <p className="settings-helper">
            As cores principais, de status e de destaque seguem as variações acessíveis presentes nos tokens.
          </p>
        </div>
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

export default App

function AdminReportsScreen({ adminContext, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  const reportSections = [
    {
      title: 'Instituições por cidade',
      icon: 'bi-geo-alt',
      rows: adminContext.cityRows,
      headers: ['Cidade', 'Total'],
      cells: (row) => [row.city, row.total],
    },
    {
      title: 'Situação dos projetos',
      icon: 'bi-kanban',
      rows: adminContext.projectsRows,
      headers: ['Instituição', 'Edital', 'Valor', 'Status'],
      cells: (row) => [row.institution, row.notice.split(' - ')[0], row.amount, row.status],
    },
    {
      title: 'Recursos e demandas',
      icon: 'bi-file-earmark-text',
      rows: adminContext.resourcesRows,
      headers: ['Inscrito', 'Cidade', 'Volume', 'Status'],
      cells: (row) => [row.companyName, row.city, row.volume, row.status],
    },
  ]

  const summaryKpis = [
    { label: 'Total de instituições', value: adminContext.totals.inscritos },
    { label: 'Total de projetos', value: adminContext.projectsRows.length },
    { label: 'Total de recursos', value: adminContext.totals.recursos },
    { label: 'Documentos recebidos', value: adminContext.totals.documentos },
    { label: 'Etapas concluídas', value: adminContext.totals.concluidos },
    { label: 'Pendências', value: adminContext.totals.pendencias },
  ]

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title="Relatórios" subtitle="Visão consolidada dos dados do processo seletivo para análise e acompanhamento." onBack={onBack} />

        <div className="reports-summary-grid">
          {summaryKpis.map((kpi) => (
            <div key={kpi.label} className="reports-kpi-card">
              <span className="reports-kpi-card__label">{kpi.label}</span>
              <strong className="reports-kpi-card__value">{kpi.value}</strong>
            </div>
          ))}
        </div>

        {reportSections.map((section) => (
          <section key={section.title} className="admin-management-card" style={{ marginBottom: '1rem' }}>
            <div className="admin-management-card__topline">
              <strong><i className={`bi ${section.icon} me-2`} />{section.title}</strong>
              <span>{section.rows.length} registro(s)</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>{section.headers.map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {section.rows.map((row, index) => (
                  <tr key={index}>
                    {section.cells(row).map((cell, ci) => <td key={ci}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </main>
      <AppFooter />
    </div>
  )
}

function AdminUserRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--form">
        <header className="admin-modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="admin-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Nome completo *</Form.Label>
                <Form.Control value={formData.fullName} onChange={onChange('fullName')} placeholder="Insira aqui o nome" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control type="email" value={formData.email} onChange={onChange('email')} placeholder="email@instituicao.org.br" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Confirmar e-mail *</Form.Label>
                <Form.Control type="email" value={formData.emailConfirm} onChange={onChange('emailConfirm')} placeholder="Repita o e-mail" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefone principal *</Form.Label>
                <Form.Control value={formData.phone} onChange={onChange('phone')} placeholder="(85) 99999-9999" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefone secundário</Form.Label>
                <Form.Control value={formData.phoneSecondary} onChange={onChange('phoneSecondary')} placeholder="(85) 99999-9999" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>CPF *</Form.Label>
                <Form.Control value={formData.cpf} onChange={onChange('cpf')} placeholder="000.000.000-00" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <div className="admin-user-form__roles">
                <span className="admin-user-form__roles-label">Perfis de acesso *</span>
                <Form.Check type="checkbox" id="modal-admin-role" label="Admin" checked={formData.isAdmin} onChange={onChange('isAdmin')} />
                <Form.Check type="checkbox" id="modal-evaluator-role" label="Avaliador" checked={formData.isEvaluator} onChange={onChange('isEvaluator')} />
              </div>
            </Col>
          </Row>
          <p className="admin-user-form__helper">A senha inicial será enviada por e-mail para a pessoa cadastrada.</p>
        </div>
        <footer className="admin-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{
            submitLabel
          }</Button>
        </footer>
      </section>
    </div>
  )
}

function AdminConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--confirm">
        <header className="admin-modal-card__header">
          <div className="admin-modal-card__headline">
            <i className="bi bi-exclamation-triangle-fill" />
            <h3>{title}</h3>
          </div>
          <button type="button" className="admin-modal-card__close" onClick={onCancel}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <p>{message}</p>
        </div>
        <footer className="admin-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onCancel}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onConfirm}>Confirmar</Button>
        </footer>
      </section>
    </div>
  )
}

function AdminSuccessModal({ message, onClose }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--success">
        <header className="admin-modal-card__header">
          <div className="admin-modal-card__headline admin-modal-card__headline--success">
            <i className="bi bi-check-circle" />
            <h3>Sucesso</h3>
          </div>
          <button type="button" className="admin-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <p>{message}</p>
        </div>
      </section>
    </div>
  )
}

function AdminUsersScreen({ rows, onBack, onCreateUser, onUpdateUser, onDeleteUser, portalView, onSelectPortal, adminScreen, onNavigate, onExit }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [draftUser, setDraftUser] = useState(initialAdminUserForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true

    return [
      String(row.id),
      row.fullName,
      row.email,
      row.cpf,
      row.phone,
      getAdminUserRoles(row),
      row.status,
    ].some((value) => String(value || '').toLowerCase().includes(term))
  })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftUser((current) => ({
      ...current,
      [field]: type === 'checkbox' ? checked : value,
    }))
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setDraftUser(initialAdminUserForm)
    setIsFormOpen(true)
  }

  const openEditModal = (user) => {
    setEditingUser(user)
    setDraftUser({
      fullName: user.fullName,
      email: user.email,
      emailConfirm: user.emailConfirm || user.email,
      cpf: user.cpf,
      phone: user.phone,
      phoneSecondary: user.phoneSecondary || '',
      isAdmin: user.isAdmin,
      isEvaluator: user.isEvaluator,
    })
    setIsFormOpen(true)
  }

  const handlePersistRequest = () => {
    if (
      !draftUser.fullName.trim()
      || !draftUser.email.trim()
      || !draftUser.emailConfirm.trim()
      || draftUser.email.trim() !== draftUser.emailConfirm.trim()
      || !draftUser.phone.trim()
      || !draftUser.cpf.trim()
      || (!draftUser.isAdmin && !draftUser.isEvaluator)
    ) {
      return
    }

    setConfirmState({
      type: editingUser ? 'edit' : 'create',
      payload: editingUser ? { ...editingUser, ...draftUser } : draftUser,
    })
  }

  const handleConfirm = () => {
    if (!confirmState) return

    if (confirmState.type === 'create') {
      onCreateUser(confirmState.payload)
      setSuccessMessage('Registro salvo com sucesso.')
    }

    if (confirmState.type === 'edit') {
      onUpdateUser(confirmState.payload)
      setSuccessMessage('Registro atualizado com sucesso.')
    }

    if (confirmState.type === 'delete') {
      onDeleteUser(confirmState.payload.id)
      setSuccessMessage('Registro removido com sucesso.')
    }

    setConfirmState(null)
    setIsFormOpen(false)
    setEditingUser(null)
    setDraftUser(initialAdminUserForm)
  }

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        <AdminSectionHeader title="Gerenciar usuários" subtitle="CRUD administrativo para cadastro, edição e exclusão de perfis de acesso do sistema." onBack={onBack} />

        <section className="admin-management-card admin-users-crud">
          <div className="admin-users-crud__topbar">
            <div className="admin-users-search">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Insira uma palavra para pesquisar"
              />
              <button type="button" aria-label="Pesquisar usuários">
                <i className="bi bi-search" />
              </button>
            </div>
            <Button type="button" className="admin-users-add-button" onClick={openCreateModal}>
              <i className="bi bi-plus-square" />
              <span>Adicionar registro</span>
            </Button>
          </div>

          <div className="admin-users-table-wrap">
            <table className="admin-table admin-users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfis</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.fullName}</td>
                    <td>{row.email}</td>
                    <td>{getAdminUserRoles(row)}</td>
                    <td>{row.status}</td>
                    <td>
                      <div className="admin-users-actions">
                        <button type="button" className="admin-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button
                          type="button"
                          className="admin-inline-action admin-inline-action--danger"
                          onClick={() => setConfirmState({ type: 'delete', payload: row })}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-users-crud__footer">
            <div className="admin-users-pagination">
              <button type="button" disabled>Anterior</button>
              <button type="button" className="is-active">1</button>
              <button type="button" disabled>Próximo</button>
            </div>
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="admin-users-per-page">
              <strong>Exibir</strong>
              <div className="admin-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdminUserRecordModal
          title={editingUser ? 'Editar registro' : 'Adicionar registro'}
          formData={draftUser}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingUser(null); setDraftUser(initialAdminUserForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingUser ? 'Salvar alterações' : 'Salvar'}
        />
      )}

      {confirmState && (
        <AdminConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do registro' : 'Confirmar modificação do registro'}
          message={confirmState.type === 'delete' ? 'Esse usuário será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}

      {successMessage && <AdminSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

function EvaluatorDashboardScreen({ evaluatorScreen, portalView, onSelectPortal, onNavigate, onExit, selectedProjectId, onSelectProject }) {
  const statusBadge = (status) => {
    if (status === 'Avaliado') return 'success'
    if (status === 'Em avaliação') return 'warning'
    return 'neutral'
  }

  const docBadge = (avaliacao) => {
    if (avaliacao === 1) return { label: 'Aceito', tone: 'success' }
    if (avaliacao === 0) return { label: 'Recusado', tone: 'danger' }
    return { label: 'Pendente', tone: 'neutral' }
  }

  const recentProjects = evaluatorProjects.slice(0, 3)

  return (
    <div className="admin-page">
      <EvaluatorNavbar portalView={portalView} onSelectPortal={onSelectPortal} evaluatorScreen={evaluatorScreen} onNavigate={onNavigate} onExit={onExit} />
      <main className="admin-main">
        {(!evaluatorScreen || evaluatorScreen === 'eval-dashboard') && (
          <>
            <div className="admin-detail-header">
              <div>
                <h2>Painel do avaliador</h2>
                <p>Gerencie as avaliações de projetos e documentos atribuídas ao seu perfil.</p>
              </div>
            </div>

            <div className="reports-summary-grid" style={{ marginBottom: '1rem' }}>
              <div className="reports-kpi-card">
                <span className="reports-kpi-card__label">Projetos atribuídos</span>
                <strong className="reports-kpi-card__value">{evaluatorProjects.length}</strong>
              </div>
              <div className="reports-kpi-card">
                <span className="reports-kpi-card__label">Avaliados</span>
                <strong className="reports-kpi-card__value">{evaluatorProjects.filter((p) => p.status === 'Avaliado').length}</strong>
              </div>
              <div className="reports-kpi-card">
                <span className="reports-kpi-card__label">Pendentes</span>
                <strong className="reports-kpi-card__value">{evaluatorProjects.filter((p) => p.status !== 'Avaliado').length}</strong>
              </div>
              <div className="reports-kpi-card">
                <span className="reports-kpi-card__label">Critérios ativos</span>
                <strong className="reports-kpi-card__value">{evaluationCriteria.length}</strong>
              </div>
            </div>

            <section className="admin-management-card evaluator-recent-projects" style={{ marginBottom: '1rem' }}>
              <div className="admin-management-card__topline">
                <strong>Projetos para avaliação</strong>
                <span>{recentProjects.length} projeto(s)</span>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Instituição</th>
                    <th>Projeto</th>
                    <th>Edital</th>
                    <th>Valor solicitado</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((proj) => (
                    <tr key={proj.id}>
                      <td>{proj.institution}</td>
                      <td>
                        <button type="button" className="admin-table-link" onClick={() => { onSelectProject?.(proj.id); onNavigate('eval-projects') }}>
                          {proj.project}
                        </button>
                      </td>
                      <td>{proj.notice}</td>
                      <td>{proj.amount}</td>
                      <td><Badge className={`status-chip status-chip--${statusBadge(proj.status)}`}>{proj.status}</Badge></td>
                      <td><button type="button" className="admin-inline-action">Avaliar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="admin-management-card">
              <div className="admin-management-card__topline">
                <strong>Critérios de avaliação</strong>
                <span>{evaluationCriteria.length} critério(s)</span>
              </div>
              <table className="admin-table">
                <thead>
                  <tr><th>Nº</th><th>Descrição do critério</th></tr>
                </thead>
                <tbody>
                  {evaluationCriteria.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {evaluatorScreen === 'eval-projects' && (
          <>
            <div className="admin-detail-header">
              <div>
                <button type="button" className="admin-back-link" onClick={() => onNavigate('eval-dashboard')}>
                  <i className="bi bi-arrow-left" /><span>Voltar ao painel</span>
                </button>
                <h2>Projetos atribuídos</h2>
                <p>O projeto escolhido no painel fica destacado aqui, mas a lista completa continua disponível.</p>
              </div>
            </div>
            <section className="admin-management-card">
              <div className="admin-management-card__topline">
                <strong>Fila completa de projetos</strong>
                <span>{evaluatorProjects.length} projeto(s)</span>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Instituição</th>
                    <th>Projeto</th>
                    <th>Edital</th>
                    <th>Valor solicitado</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluatorProjects.map((proj) => (
                    <tr key={proj.id} className={selectedProjectId === proj.id ? 'admin-table__row--highlight' : ''}>
                      <td>{proj.institution}</td>
                      <td>
                        <button type="button" className="admin-table-link" onClick={() => onSelectProject?.(proj.id)}>
                          {proj.project}
                        </button>
                      </td>
                      <td>{proj.notice}</td>
                      <td>{proj.amount}</td>
                      <td><Badge className={`status-chip status-chip--${statusBadge(proj.status)}`}>{proj.status}</Badge></td>
                      <td><button type="button" className="admin-inline-action">Abrir avaliação</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {evaluatorScreen === 'eval-documents' && (
          <>
            <div className="admin-detail-header">
              <div>
                <button type="button" className="admin-back-link" onClick={() => onNavigate('eval-dashboard')}>
                  <i className="bi bi-arrow-left" /><span>Voltar ao painel</span>
                </button>
                <h2>Avaliação de documentos</h2>
                <p>Documentos institucionais aguardando parecer do avaliador.</p>
              </div>
            </div>
            <section className="admin-management-card">
              <div className="admin-management-card__topline">
                <strong>Documentos recebidos</strong>
                <span>{evaluatorDocuments.length} documento(s)</span>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Instituição</th>
                    <th>Documento</th>
                    <th>Status</th>
                    <th>Justificativa</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluatorDocuments.map((doc) => {
                    const badge = docBadge(doc.avaliacao)
                    return (
                      <tr key={doc.id}>
                        <td>{doc.institution}</td>
                        <td>{doc.document}</td>
                        <td><Badge className={`status-chip status-chip--${badge.tone}`}>{badge.label}</Badge></td>
                        <td>{doc.justificativa || '—'}</td>
                        <td><button type="button" className="admin-inline-action">Analisar</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
      <AppFooter />
    </div>
  )
}

function PlaceholderStage({ title, body, onBack }) {
  return (
    <FormSection title={title} subtitle="Tela preparada para a fase seguinte do processo.">
      <div className="company-form-group company-form-group--last">
        <p className="summary-empty">{body}</p>
      </div>
      <StageFooterActions onBack={onBack} saveDisabled />
    </FormSection>
  )
}

function LoggedOutScreen({ portalView, onSelectPortal }) {
  return (
    <div className="candidate-dashboard logout-screen">
      <PainelNavbar onExit={() => {}} portalView={portalView} onSelectPortal={onSelectPortal} />
      <main className="candidate-content">
        <Container className="logout-screen__container">
          <Card className="form-section-card logout-card">
            <Card.Body className="logout-card__body">
              <p className="eyebrow">Sessão encerrada</p>
              <h1>Você saiu do sistema</h1>
              <p>Feche esta aba ou faça um novo acesso para continuar utilizando a aplicação.</p>
            </Card.Body>
          </Card>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function AuthScreen({ onLogin, onStartRegistration, onSkipToDashboard, authData, setAuthData }) {
  const canLogin = Boolean(authData.email.trim() && authData.password.trim())

  return (
    <div className="candidate-dashboard auth-screen">
      <main className="candidate-content auth-screen__content">
        <Container>
          <Row className="g-4 align-items-stretch justify-content-center">
            <Col lg={5}>
              <Card className="form-section-card auth-card">
                <Card.Body className="auth-card__body">
                  <p className="eyebrow">Acesso ao sistema</p>
                  <h1>Entrar</h1>
                  <p>Faça login para continuar.</p>
                  <Form className="auth-form">
                    <Form.Group>
                      <Form.Label>CNPJ</Form.Label>
                      <Form.Control type="text" value={authData.email} onChange={(event) => setAuthData((current) => ({ ...current, email: event.target.value }))} placeholder="00.000.000/0001-00" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Senha</Form.Label>
                      <Form.Control type="password" value={authData.password} onChange={(event) => setAuthData((current) => ({ ...current, password: event.target.value }))} placeholder="Digite sua senha" />
                    </Form.Group>
                    <div className="form-actions form-actions--footer auth-form__actions">
                      <Button type="button" variant="success" className="action-button action-button--success" disabled={!canLogin} onClick={onLogin}>Entrar</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="form-section-card auth-side-card">
                <Card.Body className="auth-card__body">
                  <p className="eyebrow">Primeiro acesso</p>
                  <h2>Cadastre sua empresa</h2>
                  <p>O cadastro da empresa é o primeiro passo. Após a conclusão, você será direcionado ao painel principal.</p>
                  <div className="auth-side-card__cta">
                    <div className="auth-side-card__icon">
                      <i className="bi bi-buildings" />
                    </div>
                    <Button type="button" variant="light" className="action-button action-button--secondary auth-side-card__button" onClick={onStartRegistration}>
                      Iniciar cadastro
                    </Button>
                  </div>
                  <button type="button" className="auth-side-card__skip" onClick={onSkipToDashboard}>
                    Pular e ir para a tela do usuário
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function StageFormScreen({ currentStage, applicationData, setApplicationData, progressItems, completedSteps, activeStep, preferences, setPreferences, onBack, onSaveStage, onExit, onGoToSettings, portalView, onSelectPortal, registerAudit, isOnboarding = false }) {
  const isEditing = false
  const content = stageContent[currentStage]
  const saveDisabled = !isStageValid(currentStage, applicationData, preferences)

  const updateField = (field) => (event) => {
    const nextValue = event.target.value

    setApplicationData((current) => {
      const previousValue = current[field]
      if (previousValue === nextValue) {
        return current
      }

      if ((!previousValue && nextValue) || (field === 'city' && previousValue !== nextValue) || (field === 'companyName' && previousValue !== nextValue)) {
        registerAudit(`${fieldLabels[field] || field} atualizado`, nextValue)
      }

      return { ...current, [field]: nextValue }
    })
  }

  const setUploadStatus = (field, fileName) => {
    setApplicationData((current) => {
      const previousValue = current.uploads[field] || ''
      if (previousValue !== fileName) {
        const item = uploadChecklist.find((entry) => entry.key === field)
        registerAudit(fileName ? 'Documento anexado' : 'Documento removido', item?.label || field)
      }

      return { ...current, uploads: { ...current.uploads, [field]: fileName } }
    })
  }

  const setDeclarationValue = (field, value) => {
    setApplicationData((current) => {
      if (current.declarations[field] !== value) {
        registerAudit(value ? 'Declaração marcada' : 'Declaração desmarcada', fieldLabels[field] || field)
      }

      return { ...current, declarations: { ...current.declarations, [field]: value } }
    })
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'company-registration':
        return <CompanyRegistrationForm applicationData={applicationData} updateField={updateField} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} saveLabel={isOnboarding ? 'Concluir cadastro' : 'Salvar'} />
      case 'legal-contact':
        return <LegalContactForm applicationData={applicationData} updateField={updateField} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      case 'fiscal':
        return <FiscalForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      case 'attachments':
        return <AttachmentsForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      case 'project':
        return <ProjectForm applicationData={applicationData} updateField={updateField} setUploadStatus={setUploadStatus} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      case 'declarations':
        return <DeclarationsForm applicationData={applicationData} setDeclarationValue={setDeclarationValue} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      case 'appeal':
        return <PlaceholderStage title="Recurso do resultado" body="Quando o edital abrir fase de recurso, este card pode receber o formulário específico para fundamentação e anexos." onBack={onBack} />
      // case 'evaluation':
      //   return <PlaceholderStage title="Avaliação final" body="Esta área pode exibir resultado, critérios de desempate, parecer da comissão e histórico da proposta." onBack={onBack} />
      case 'settings':
        return <SettingsForm preferences={preferences} setPreferences={setPreferences} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      default:
        return null
    }
  }

  const showSidebar = !isOnboarding || currentStage === 'company-registration'

  return (
    <div className="candidate-dashboard registration-flow">
      <PainelNavbar onExit={onExit} onGoToSettings={() => onGoToSettings?.()} portalView={portalView} onSelectPortal={onSelectPortal} />
      <main className="candidate-content registration-flow__content">
        <Container fluid className="px-0">
          <section className="page-intro page-intro--company">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </div>
          </section>
          <Row className="g-4 align-items-start">
            <Col xl={9}><div className="form-stack">{renderStage()}</div></Col>
            {showSidebar && <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} isEditing={isEditing} />
              </div>
            </Col>}
          </Row>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('auth')
  const [portalView, setPortalView] = useState('candidate')
  const [adminScreen, setAdminScreen] = useState('dashboard')
  const [evaluatorScreen, setEvaluatorScreen] = useState('eval-dashboard')
  const [selectedEvaluatorProjectId, setSelectedEvaluatorProjectId] = useState(evaluatorProjects[0]?.id || null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [authData, setAuthData] = useState({ email: '', password: '' })
  const [applicationData, setApplicationData] = useState(initialApplicationData)
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers)
  const [auditTrail, setAuditTrail] = useState([
    { title: 'Painel administrativo carregado', time: '01/04/2026 08:00', detail: 'Visao inicial pronta para acompanhamento.' },
  ])
  const [preferences, setPreferences] = useState({
    themeMode: 'light',
    visionMode: 'default',
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', preferences.themeMode)
    document.documentElement.setAttribute('data-vision', preferences.visionMode)
  }, [preferences])

  const sectionRules = [
    { title: 'Cadastro da empresa', fields: ['companyType', 'cnpj', 'companyName', 'email', 'phone', 'street', 'zipCode', 'city', 'state'] },
    { title: 'Representante legal', fields: ['legalRepresentative', 'legalRepresentativeCpf', 'legalRepresentativeRole', 'commercialContact', 'commercialContactCpf', 'commercialContactPhone'] },
    { title: 'Regularidade fiscal', fields: ['sponsorshipRequest', 'nationalTax', 'stateTax', 'municipalTax', 'fgts', 'cndt', 'correctionalCertificate', 'tcuCertificate'], source: 'uploads' },
    { title: 'Documentos obrigatórios', fields: ['constitutiveAct', 'legalRepresentativeDocument', 'representativeAddress'], source: 'uploads' },
    { title: 'Declarações', fields: ['socialRegularity', 'articleSeven', 'noticeAgreement'], source: 'declarations' },
  ]

  const progressItems = sectionRules.map((section) => {
    const values = section.source === 'uploads'
      ? section.fields.map((field) => Boolean(applicationData.uploads[field]))
      : section.source === 'declarations'
        ? section.fields.map((field) => Boolean(applicationData.declarations[field]))
        : section.fields.map((field) => Boolean(applicationData[field]))

    const filled = values.filter(Boolean).length
    const isDone = filled > 0 && filled === values.length
    const isCurrent = !isDone && filled > 0

    return { title: section.title, status: isDone ? 'Concluído' : isCurrent ? 'Em andamento' : 'Pendente', tone: isDone ? 'success' : isCurrent ? 'warning' : 'neutral', done: isDone, current: isCurrent }
  })

  const completedSteps = progressItems.filter((item) => item.done).length
  const activeItem = progressItems.find((item) => item.current) || progressItems.find((item) => !item.done)
  const activeStep = activeItem?.title || 'Cadastro concluído'
  const adminContext = buildAdminContext(applicationData, progressItems, completedSteps, auditTrail)

  const handleExit = () => {
    setPortalView('candidate')
    setAdminScreen('dashboard')
    setEvaluatorScreen('eval-dashboard')
    setSelectedEvaluatorProjectId(evaluatorProjects[0]?.id || null)
    setAuthData({ email: '', password: '' })
    setScreen('auth')
  }
  const registerAudit = (title, detail) => {
    setAuditTrail((current) => [
      { title, detail, time: formatAuditTimestamp(new Date()) },
      ...current,
    ].slice(0, 12))
  }

  const createAdminUser = (userData) => {
    const nextId = Math.max(0, ...adminUsers.map((user) => user.id)) + 1
    setAdminUsers((current) => [...current, { ...userData, id: nextId, status: 'Convite enviado' }])
    registerAudit('Convite de usuario preparado', `${userData.fullName} (${getAdminUserRoles(userData)}) - ${userData.email}`)
  }

  const updateAdminUser = (userData) => {
    setAdminUsers((current) => current.map((user) => (user.id === userData.id ? { ...user, ...userData } : user)))
    registerAudit('Usuario atualizado', `${userData.fullName} (${getAdminUserRoles(userData)})`)
  }

  const deleteAdminUser = (userId) => {
    const targetUser = adminUsers.find((user) => user.id === userId)
    setAdminUsers((current) => current.filter((user) => user.id !== userId))
    if (targetUser) {
      registerAudit('Usuario removido', `${targetUser.fullName} - ${targetUser.email}`)
    }
  }

  if (screen === 'auth') {
    return (
      <AuthScreen
        authData={authData}
        setAuthData={setAuthData}
        onLogin={() => setScreen(hasCompletedOnboarding ? 'dashboard' : 'company-registration')}
        onStartRegistration={() => setScreen('company-registration')}
        onSkipToDashboard={() => setScreen('dashboard')}
      />
    )
  }

  if (screen === 'logged-out') {
    return <LoggedOutScreen portalView={portalView} onSelectPortal={setPortalView} />
  }

  if (portalView === 'evaluator') {
    return <EvaluatorDashboardScreen evaluatorScreen={evaluatorScreen} portalView={portalView} onSelectPortal={setPortalView} onNavigate={setEvaluatorScreen} onExit={handleExit} selectedProjectId={selectedEvaluatorProjectId} onSelectProject={setSelectedEvaluatorProjectId} />
  }

  if (portalView === 'admin') {
    if (adminScreen === 'institutions') {
      return <AdminApplicantsTable title="Instituições" subtitle="Tabela principal com as instituições e acesso rápido para acompanhamento e gestão." rows={adminContext.applicants} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    if (adminScreen === 'projects') {
      return <AdminProjectsScreen rows={adminContext.projectsRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    if (adminScreen === 'resources') {
      return <AdminResourcesScreen rows={adminContext.resourcesRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    if (adminScreen === 'audits') {
      return <AdminAuditsScreen rows={adminContext.auditRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    if (adminScreen === 'reports') {
      return <AdminReportsScreen adminContext={adminContext} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    if (adminScreen === 'users') {
      return <AdminUsersScreen rows={adminUsers} onBack={() => setAdminScreen('dashboard')} onCreateUser={createAdminUser} onUpdateUser={updateAdminUser} onDeleteUser={deleteAdminUser} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
    }

    return <AdminDashboardScreen portalView={portalView} onSelectPortal={setPortalView} adminContext={adminContext} adminScreen={adminScreen} onNavigate={setAdminScreen} onExit={handleExit} />
  }

  if (screen !== 'dashboard') {
    const isOnboarding = !hasCompletedOnboarding && screen === 'company-registration'
    return <StageFormScreen currentStage={screen} applicationData={applicationData} setApplicationData={setApplicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} preferences={preferences} setPreferences={setPreferences} onBack={() => setScreen(isOnboarding ? 'auth' : 'dashboard')} onSaveStage={() => { if (isOnboarding) { setHasCompletedOnboarding(true) } setScreen('dashboard') }} onExit={handleExit} onGoToSettings={() => setScreen('settings')} portalView={portalView} onSelectPortal={setPortalView} registerAudit={registerAudit} isOnboarding={isOnboarding} />
  }

  return <DashboardScreen onNavigate={setScreen} onExit={handleExit} portalView={portalView} onSelectPortal={setPortalView} applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} />
}
