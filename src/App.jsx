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

const dashboardStages = [
  { id: 'company-registration', title: 'Cadastro da Empresa', icon: 'bi-buildings', description: 'Dados cadastrais, endereco e conta bancaria da pessoa juridica.', progress: 40, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'company-registration' },
  { id: 'legal-contact', title: 'Representante Legal', icon: 'bi-person-vcard', description: 'Informacoes do representante legal e do contato comercial.', progress: 15, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'legal-contact' },
  { id: 'fiscal', title: 'Regularidade Fiscal', icon: 'bi-shield-check', description: 'Certidoes e comprovantes de regularidade fiscal da empresa.', progress: 0, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'fiscal' },
  { id: 'attachments', title: 'Documentos obrigatorios', icon: 'bi-folder2-open', description: 'Anexos institucionais, comprovantes e modelos assinados.', progress: 0, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'attachments' },
  { id: 'declarations', title: 'Declaracoes', icon: 'bi-file-earmark-check', description: 'Termos obrigatorios e confirmacoes de ciencia do edital.', progress: 0, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'declarations' },
  { id: 'settings', title: 'Configuracoes', icon: 'bi-sliders', description: 'Tema visual, modo claro ou escuro e paletas acessiveis.', progress: 100, statusColor: '#282828', startDate: 'Disponivel', endDate: 'Sempre', navigateTo: 'settings' },
  { id: 'project', title: 'Plano de trabalho', icon: 'bi-kanban', description: 'Projeto, plano de trabalho, plano de midia e valores.', progress: 0, statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'project' },
  { id: 'appeal', title: 'Recurso do Resultado', icon: 'bi-chat-left-text', description: 'Etapa futura: exibida somente se o edital abrir recurso.', progress: 0, statusColor: '#5C646B', startDate: '--', endDate: '--', navigateTo: 'appeal' },
  { id: 'evaluation', title: 'Avaliacao final', icon: 'bi-clipboard-data', description: 'Acompanhamento da analise da comissao avaliadora', progress: 0, statusColor: '#5C646B', startDate: '16/04/2026', endDate: '30/04/2026', navigateTo: 'evaluation' },
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
  companyType: '', cnpj: '', companyName: '', tradeName: '', email: '', phone: '', website: '',
  phoneSecondary: '', street: '', streetNumber: '', zipCode: '', geoFields: '', landmark: '', neighborhood: '',
  addressComplement: '', city: '', state: '',
  foundationDate: '', shareCapital: '', primaryCnae: '', secondaryCnaes: '', address: '',
  bank: '', agency: '', account: '', legalRepresentative: '', legalRepresentativeCpf: '',
  legalRepresentativeRole: '', commercialContact: '', commercialContactCpf: '', commercialContactPhone: '',
  selectedNotice: '', projectTitle: '', projectAmount: '', projectCounterpart: '', alignmentLevel: '', workPlan: '', mediaPlan: '',
  declarations: { socialRegularity: false, articleSeven: false, noticeAgreement: false },
  uploads: {},
}

const stageContent = {
  'company-registration': { eyebrow: 'Etapa 1', title: 'Cadastro da Empresa', description: 'Dados institucionais da pessoa juridica, endereco e conta bancaria do proponente.' },
  'legal-contact': { eyebrow: 'Etapa 2', title: 'Representante Legal', description: 'Dados do representante legal e do contato comercial responsavel pela proposta.' },
  fiscal: { eyebrow: 'Etapa 3', title: 'Regularidade Fiscal', description: 'Certidoes fiscais e trabalhistas usadas para comprovar regularidade da empresa.' },
  attachments: { eyebrow: 'Etapa 4', title: 'Documentos Obrigatorios', description: 'Uploads institucionais e comprovantes formais exigidos pelo edital.' },
  project: { eyebrow: 'Etapa 5', title: 'Plano de Trabalho', description: 'Projeto, valores, contrapartida, plano de trabalho e plano de midia.' },
  declarations: { eyebrow: 'Etapa 6', title: 'Declaracoes', description: 'Confirmacoes obrigatorias antes do envio final da inscricao.' },
  appeal: { eyebrow: 'Pos-inscricao', title: 'Recurso do Resultado', description: 'Esta tela fica preparada para eventual abertura de recurso apos a avaliacao.' },
  evaluation: { eyebrow: 'Acompanhamento', title: 'Avaliacao Final', description: 'Resumo da fase de analise e criterios observados pela comissao avaliadora.' },
  settings: { eyebrow: 'Preferencias', title: 'Configuracoes', description: 'Escolha o modo claro ou escuro e a variacao de cores acessiveis para a interface.' },
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
  { label: 'Inicio', icon: 'bi-house', target: 'dashboard' },
  { label: 'Instituicoes', icon: 'bi-people-fill', target: 'institutions' },
  { label: 'Projetos', icon: 'bi-kanban', target: 'projects' },
  { label: 'Recursos', icon: 'bi-file-earmark-text', target: 'resources' },
  { label: 'Auditorias', icon: 'bi-clipboard-check', target: 'audits' },
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
  { id: 1, location: 'public.pacientes', recordId: 215, action: 'Cadastro', datetime: '2025-08-07 09:02:11', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Cadastro de paciente ID 215 – inclusao de novo registro na tabela public.pacientes.' },
  { id: 2, location: 'public.pacientes', recordId: 215, action: 'Atualizacao', datetime: '2025-08-07 09:07:34', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Atualizacao de paciente ID 215 – ajuste de dados cadastrais na tabela public.pacientes.' },
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
    'companyType', 'cnpj', 'companyName', 'email', 'phone', 'website',
    'foundationDate', 'zipCode', 'streetNumber', 'street', 'neighborhood',
    'city', 'state', 'bank', 'agency', 'account', 'primaryCnae',
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
      ? 'Revisao final'
      : applicant.progress >= 4
        ? 'Projeto e plano de midia'
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
        detail: 'Etapa liberada para conferencia administrativa.',
      })),
    },
    {
      label: 'Em andamento',
      tone: 'warning',
      count: inProgressStages,
      items: progressItems.filter((item) => item.current).map((item) => ({
        title: item.title,
        status: item.status,
        detail: 'Recebendo novos dados do formulario do usuario.',
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
    <div className="portal-selector" role="tablist" aria-label="Alternar entre visoes">
      <button type="button" className={`portal-selector__button${portalView === 'candidate' ? ' is-active' : ''}`} onClick={() => onSelectPortal('candidate')}>
        Tela do usuario
      </button>
      <button type="button" className={`portal-selector__button${portalView === 'admin' ? ' is-active' : ''}`} onClick={() => onSelectPortal('admin')}>
        Tela do admin
      </button>
    </div>
  )
}

function PainelNavbar({ onExit, portalView, onSelectPortal }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <AppBrand />
          <div className="fw-bold mb-0 navbar-titulo">{selection.title}</div>
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <div className="navbar-user">
            <div className="navbar-avatar">
              <i className="bi bi-people" />
            </div>
            <span>{selection.candidateName}</span>
            <i className="bi bi-chevron-down navbar-user__chevron" />
          </div>
          <button className="btn btn-outline-secondary btn-sm navbar-exit-button" onClick={onExit}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}

function AdminNavbar({ portalView, onSelectPortal, adminScreen, onNavigate }) {
  return (
    <header className="admin-navbar">
      <div className="admin-navbar__inner">
        <div className="admin-navbar__brand" onClick={() => onNavigate('dashboard')}>
          <AppBrand />
          <img src={logoEstadoCeara} alt={institutionInfo.government} className="admin-navbar__brand-gov" />
        </div>
        <div className="admin-navbar__menu">
          {adminMenu.map((item) => (
            <div key={item.label} className="admin-menu-item">
              <button type="button" className={`admin-menu-item__button${adminScreen === item.target ? ' is-active' : ''}`} onClick={() => onNavigate(item.target)}>
                {item.icon && <i className={`bi ${item.icon}`} />}
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="admin-navbar__actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <button type="button" className="admin-navbar__profile">
            <span>ADMIN</span>
            <i className="bi bi-chevron-down" />
          </button>
        </div>
      </div>
    </header>
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
      <PainelNavbar onExit={onExit} portalView={portalView} onSelectPortal={onSelectPortal} />
      <main className="main-wrapper">
        <div className="dashboard-shell">
          <div className="dashboard-hero">
            <div>
              <h1>Inscricao para pessoa juridica</h1>
              <p>Preencha as informacoes dos cards. O card de cadastro da empresa abre os dados ja preenchidos para consulta e ajuste conforme a LGPD.</p>
            </div>
          </div>

          <Row className="g-4 align-items-start">
            <Col xl={9}>
              <div className="dashboard-cards-grid dashboard-cards-grid--six dashboard-cards-grid--home">
                {dashboardStages.map((stage) => (
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
              <div><i className="bi bi-geo-alt" /> Instituicoes por cidade</div>
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
              <div><i className="bi bi-kanban" /> Projetos em analise</div>
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

function AdminApplicantsTable({ title, subtitle, rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} />
      <main className="admin-main">
        <AdminSectionHeader title={title} subtitle={subtitle} onBack={onBack} />
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

function AdminResourcesScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} />
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

function AdminProjectsScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate }) {
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} />
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

function AdminAuditsScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate }) {
  const selectedAudit = rows[0]
  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} />
      <main className="admin-main">
        <AdminSectionHeader title="Auditoria" subtitle="Acompanhe e registre as acoes realizadas no sistema para garantir integridade, rastreabilidade e seguranca dos dados." onBack={onBack} />
        <section className="admin-management-card admin-audit-card">
          <div className="admin-audit-intro">
            Cada operacao feita por um usuario e registrada automaticamente com data, horario, IP de origem e detalhes da alteracao. Use essas informacoes para verificacao tecnica, auditorias internas e analises administrativas.
          </div>

          <div className="admin-audit-block">
            <h3>Registro de usuario</h3>
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
                <div><strong>Acoes realizadas:</strong> {rows.map((row) => row.action).join(', ')}</div>
                <div><strong>Quantidade total de acoes:</strong> {rows.length}</div>
                <div><strong>Periodo das acoes:</strong> {rows[rows.length - 1].datetime} a {rows[0].datetime}</div>
              </div>
            </section>

            <section className="admin-audit-detail-card">
              <h3>Detalhes da acao registrada</h3>
              <div className="admin-audit-detail-lines">
                <div><strong>Tipo de acao:</strong> {selectedAudit.action}</div>
                <div><strong>ID da auditoria:</strong> {selectedAudit.recordId}</div>
                <div><strong>Data e hora da acao:</strong> {selectedAudit.datetime}</div>
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

function AdminDashboardScreen({ portalView, onSelectPortal, adminContext, adminScreen, onNavigate }) {
  const kpis = [
    { title: 'Instituicoes', value: adminContext.totals.inscritos, icon: 'bi-people-fill', detail: 'Instituicoes localizadas no contexto atual.', target: 'institutions' },
    { title: 'Projetos', value: adminContext.projectsRows.length, icon: 'bi-kanban', detail: 'Projetos vinculados aos editais ativos.', target: 'projects' },
    { title: 'Recursos', value: adminContext.totals.recursos, icon: 'bi-file-earmark-text', detail: 'Demandas em revisao ou acompanhamento.', target: 'resources' },
    { title: 'Documentos', value: adminContext.totals.documentos, icon: 'bi-folder-check', detail: 'Arquivos enviados e prontos para analise.', disabled: true },
    { title: 'Auditorias', value: adminContext.auditRows.length, icon: 'bi-clipboard-check', detail: 'Historico rastreavel de operacoes do sistema.', target: 'audits' },
  ]

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} />
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
          <AdminCalendarCard />
          <AdminInsightsCard adminContext={adminContext} />
        </section>
      </main>
      <AppFooter />
      <AdminChatWidget adminContext={adminContext} />
    </div>
  )
}

function FormSection({ title, subtitle, children }) {
  return (
    <Card className="form-section-card">
      <Card.Body className="p-0">
        <div className="form-section-card__header">
          <div><h3>{title}</h3><p>{subtitle}</p></div>
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
        <h3 className="sidebar-status-card__title">Situacao da Inscricao</h3>
        <div className="status-line"><span>Status:</span><strong>{isEditing ? 'Edicao em andamento' : 'Em andamento'}</strong></div>
        <div className="status-line"><span>Etapa atual:</span><strong>{activeStep}</strong></div>
        <div className="status-line"><span>Prazo final:</span><strong className="status-line__deadline">15/04/2026</strong></div>
        <div className="summary-panel">
          <div className="summary-panel__header"><h4>Resumo do cadastro:</h4></div>
          {summaryItems.length > 0 ? (
            <div className="summary-list">
              {summaryItems.map((item) => <div key={item.label} className="summary-list__item"><span>{item.label}</span><strong className={item.tone}>{item.value}</strong></div>)}
            </div>
          ) : <p className="summary-empty">O resumo sera preenchido conforme a empresa informar os dados principais do cadastro.</p>}
        </div>
        <div className="sidebar-progress">
          <div className="sidebar-progress__header"><h4>Progresso das Etapas</h4></div>
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
    <FormSection title="Identificacao da empresa" subtitle="Campos basicos pedidos no edital para cadastro da pessoa juridica.">
      <div className="company-form-group">
        <div className="company-form-group__title">Dados cadastrais</div>
        <Row className="g-3">
          <Col md={6}><Form.Group><Form.Label>Tipo de empresa *</Form.Label><Form.Select value={applicationData.companyType} onChange={updateField('companyType')}><option value="" disabled>Selecionar</option><option>LTDA</option><option>SLU</option><option>S/A</option><option>EIRELI</option><option>OSCIP</option><option>Outro</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>CNPJ *</Form.Label><Form.Control placeholder="Insira o codigo" value={applicationData.cnpj} onChange={updateField('cnpj')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Razao social *</Form.Label><Form.Control placeholder="Digite aqui o seu nome" value={applicationData.companyName} onChange={updateField('companyName')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Nome fantasia</Form.Label><Form.Control placeholder="Digite aqui o seu nome" value={applicationData.tradeName} onChange={updateField('tradeName')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Email institucional *</Form.Label><Form.Control type="email" placeholder="Insira aqui seu email" value={applicationData.email} onChange={updateField('email')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone principal *</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phone} onChange={updateField('phone')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone secundario</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phoneSecondary} onChange={updateField('phoneSecondary')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Website *</Form.Label><Form.Control placeholder="Insira aqui seu email" value={applicationData.website} onChange={updateField('website')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Data de criacao *</Form.Label><Form.Control type="date" value={applicationData.foundationDate} onChange={updateField('foundationDate')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Capital declarado</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.shareCapital} onChange={updateField('shareCapital')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAE principal *</Form.Label><Form.Select value={applicationData.primaryCnae} onChange={updateField('primaryCnae')}><option value="" disabled>Selecionar CNAE principal</option>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAEs secundarios</Form.Label><Form.Select multiple value={applicationData.secondaryCnaes ? applicationData.secondaryCnaes.split(' | ') : []} onChange={(event) => updateField('secondaryCnaes')({ target: { value: Array.from(event.target.selectedOptions).map((option) => option.value).join(' | ') } })}>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Endereco</div>
        <Row className="g-3">
          <Col md={4}><Form.Group><Form.Label>CEP</Form.Label><Form.Control placeholder="00.000-000" value={applicationData.zipCode} onChange={updateField('zipCode')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Numero</Form.Label><Form.Control placeholder="Numero da casa" value={applicationData.streetNumber} onChange={updateField('streetNumber')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Geo campos (Lat. e Long.)</Form.Label><Form.Control placeholder="Latitude e Longitude" value={applicationData.geoFields} onChange={updateField('geoFields')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Logradouro</Form.Label><Form.Control placeholder="Insira o logradouro (Av, Rua, Bairro, etc..)" value={applicationData.street} onChange={updateField('street')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Ponto de referencia</Form.Label><Form.Control placeholder="Digite um ponto de referencia" value={applicationData.landmark} onChange={updateField('landmark')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Bairro</Form.Label><Form.Control placeholder="Insira o nome do Bairro" value={applicationData.neighborhood} onChange={updateField('neighborhood')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Complemento</Form.Label><Form.Control placeholder="Digite aqui o complemento se houver" value={applicationData.addressComplement} onChange={updateField('addressComplement')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Cidade</Form.Label><Form.Select value={applicationData.city} onChange={updateField('city')}><option value="" disabled>Selecionar</option><option>Fortaleza</option><option>Caucaia</option><option>Maracanau</option><option>Outro municipio</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>UF</Form.Label><Form.Select value={applicationData.state} onChange={updateField('state')}><option value="" disabled>Selecionar</option><option>CE</option><option>PI</option><option>RN</option><option>PE</option></Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Dados bancarios</div>
        <Row className="g-3">
          <Col xs={12}><Form.Group><Form.Label>Banco *</Form.Label><Form.Select value={applicationData.bank} onChange={updateField('bank')}><option value="" disabled>Selecione um banco</option>{bankOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Agencia *</Form.Label><Form.Control placeholder="Insira o nome da agencia" value={applicationData.agency} onChange={updateField('agency')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Conta *</Form.Label><Form.Control placeholder="Digite aqui a conta" value={applicationData.account} onChange={updateField('account')} /></Form.Group></Col>
        </Row>
      </div>

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} saveLabel={saveLabel} />
    </FormSection>
  )
}

function LegalContactForm({ applicationData, updateField, onBack, onSave, saveDisabled }) {
  return (
    <FormSection title="Representante legal e contato comercial" subtitle="Substitui campos de pessoa fisica por informacoes do responsavel da empresa.">
      <div className="company-form-group">
        <div className="company-form-group__title">Responsavel legal</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Nome do representante legal *</Form.Label><Form.Control placeholder="Nome completo" value={applicationData.legalRepresentative} onChange={updateField('legalRepresentative')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do representante *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.legalRepresentativeCpf} onChange={updateField('legalRepresentativeCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Cargo *</Form.Label><Form.Control placeholder="Diretor, socio, procurador..." value={applicationData.legalRepresentativeRole} onChange={updateField('legalRepresentativeRole')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Contato comercial</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Contato comercial *</Form.Label><Form.Control placeholder="Nome do responsavel pelo contato" value={applicationData.commercialContact} onChange={updateField('commercialContact')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do contato *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.commercialContactCpf} onChange={updateField('commercialContactCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Telefone do contato *</Form.Label><Form.Control placeholder="(85) 99999-9999" value={applicationData.commercialContactPhone} onChange={updateField('commercialContactPhone')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="info-banner mt-4"><i className="bi bi-info-circle" /><span>Esta etapa concentra apenas os dados dos responsaveis da empresa. O restante do cadastro continua nas outras opcoes da pagina inicial.</span></div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function FiscalForm({ applicationData, setUploadStatus, onBack, onSave, saveDisabled }) {
  const fiscalUploads = uploadChecklist.slice(0, 8)
  return (
    <FormSection title="Regularidade fiscal e trabalhista" subtitle="Certidoes fiscais e comprovacoes de regularidade exigidas na fase de inscricao.">
      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Certidoes e comprovacoes</div>
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
  return (
    <FormSection title="Documentos institucionais e anexos" subtitle="Uploads complementares, modelos assinados e comprovantes da empresa.">
      <div className="company-form-group company-form-group--last">
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
    <FormSection title="Projeto, plano de trabalho e midia" subtitle="Campos ligados ao evento ou projeto que sera analisado pela comissao.">
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
  const companyName = applicationData.companyName || '[RAZAO SOCIAL]'
  const cnpj = applicationData.cnpj || '[●]'
  const representativeName = applicationData.legalRepresentative || '[NOME]'
  const representativeCpf = applicationData.legalRepresentativeCpf || '[●]'
  const declarationItems = []

  if (applicationData.declarations.socialRegularity) {
    declarationItems.push('A empresa atende aos requisitos de regularidade trabalhista e social previstos no edital;')
  }

  if (applicationData.declarations.articleSeven) {
    declarationItems.push('Nao emprega menor de 18 (dezoito) anos em trabalho noturno, perigoso ou insalubre;')
    declarationItems.push('Nao emprega menor de 16 (dezesseis) anos;')
    declarationItems.push('Emprega menor, a partir de 14 (quatorze) anos, apenas na condicao de aprendiz, quando aplicavel;')
  }

  if (applicationData.declarations.noticeAgreement) {
    declarationItems.push('Leu o edital, os anexos e concorda com as condicoes de participacao no presente processo seletivo;')
  }

  return (
    <FormSection title="Declaracoes obrigatorias e revisao" subtitle="Espaco para substituir declaracoes de pessoa fisica por termos da empresa.">
      <div className="company-form-group">
        <div className="company-form-group__title">Confirmacoes obrigatorias</div>
        <div className="declaration-list">
          <Form.Check type="checkbox" id="social-regularity" checked={applicationData.declarations.socialRegularity} onChange={(event) => setDeclarationValue('socialRegularity', event.target.checked)} label="Declaro que a empresa atende aos requisitos de regularidade trabalhista e social previstos no edital." />
          <Form.Check type="checkbox" id="art-7" checked={applicationData.declarations.articleSeven} onChange={(event) => setDeclarationValue('articleSeven', event.target.checked)} label="Declaro cumprimento do inciso XXXIII do art. 7o da Constituicao Federal." />
          <Form.Check type="checkbox" id="notice-agreement" checked={applicationData.declarations.noticeAgreement} onChange={(event) => setDeclarationValue('noticeAgreement', event.target.checked)} label="Declaro que li o edital, os anexos e concordo com as condicoes da selecao." />
        </div>
      </div>

      <div className="company-form-group company-form-group--last declaration-preview">
        <div className="company-form-group__title">Declaracao gerada</div>

        {declarationItems.length > 0 ? (
          <div className="declaration-document">
            <p className="declaration-document__title">
              DECLARACAO DE CUMPRIMENTO DO INCISO XXXIII DO ART. 7o DA CONSTITUICAO FEDERAL
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
              Declara, ainda, estar ciente de que a falsidade da presente declaracao sujeitara
              a empresa as sancoes previstas em lei, inclusive quanto a inabilitacao no processo
              seletivo e demais penalidades cabiveis.
            </p>

            <p>Local e data. Nome e assinatura do representante legal.</p>
          </div>
        ) : (
          <p className="summary-empty">
            Marque as declaracoes obrigatorias para montar automaticamente o texto final com os
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
    <FormSection title="Configuracoes visuais" subtitle="Aplicacao da tipografia Kanit, tema claro ou escuro e paletas acessiveis.">
      <div className="settings-stack">
        <div className="company-form-group">
          <div className="company-form-group__title">Modo de aparencia</div>
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
                <span>Usa a paleta escura com contraste reforcado.</span>
              </div>
            </label>
          </div>
        </div>

        <div className="company-form-group company-form-group--last">
          <div className="company-form-group__title">Paleta acessivel</div>
          <Form.Select value={preferences.visionMode} onChange={updatePreference('visionMode')}>
            <option value="default">Padrao</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="protanopia">Protanopia</option>
            <option value="tritanopia">Tritanopia</option>
          </Form.Select>
          <p className="settings-helper">
            As cores principais, de status e de destaque seguem as variacoes acessiveis presentes nos tokens.
          </p>
        </div>
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

export default App
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
              <p className="eyebrow">Sessao encerrada</p>
              <h1>Voce saiu do sistema</h1>
              <p>Feche esta aba ou faca um novo acesso para continuar utilizando a aplicacao.</p>
            </Card.Body>
          </Card>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function AuthScreen({ onLogin, onStartRegistration, authData, setAuthData }) {
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
                  <p>Faça login para continuar. Se for o primeiro acesso, você seguirá para o cadastro da empresa antes de entrar no painel.</p>
                  <Form className="auth-form">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={authData.email} onChange={(event) => setAuthData((current) => ({ ...current, email: event.target.value }))} placeholder="seuemail@empresa.com" />
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
                  <p>O onboarding começa com o cadastro da empresa. Depois disso você será direcionado para a tela inicial e poderá completar as demais etapas.</p>
                  <div className="auth-side-card__icon">
                    <i className="bi bi-buildings" />
                  </div>
                  <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onStartRegistration}>
                    Iniciar cadastro
                  </Button>
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

function StageFormScreen({ currentStage, applicationData, setApplicationData, progressItems, completedSteps, activeStep, preferences, setPreferences, onBack, onSaveStage, onExit, portalView, onSelectPortal, registerAudit, isOnboarding = false }) {
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
        registerAudit(value ? 'Declaracao marcada' : 'Declaracao desmarcada', fieldLabels[field] || field)
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
        return <PlaceholderStage title="Recurso do resultado" body="Quando o edital abrir fase de recurso, este card pode receber o formulario especifico para fundamentacao e anexos." onBack={onBack} />
      case 'evaluation':
        return <PlaceholderStage title="Avaliacao final" body="Esta area pode exibir resultado, criterios de desempate, parecer da comissao e historico da proposta." onBack={onBack} />
      case 'settings':
        return <SettingsForm preferences={preferences} setPreferences={setPreferences} onBack={onBack} onSave={onSaveStage} saveDisabled={saveDisabled} />
      default:
        return null
    }
  }

  return (
    <div className="candidate-dashboard registration-flow">
      <PainelNavbar onExit={onExit} portalView={portalView} onSelectPortal={onSelectPortal} />
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
            {!isOnboarding && <Col xl={3}>
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
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [authData, setAuthData] = useState({ email: '', password: '' })
  const [applicationData, setApplicationData] = useState(initialApplicationData)
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
    { title: 'Cadastro da empresa', fields: ['companyType', 'cnpj', 'companyName', 'email', 'phone', 'street', 'zipCode', 'city', 'state', 'bank', 'agency', 'account'] },
    { title: 'Representante legal', fields: ['legalRepresentative', 'legalRepresentativeCpf', 'legalRepresentativeRole', 'commercialContact', 'commercialContactCpf', 'commercialContactPhone'] },
    { title: 'Regularidade fiscal', fields: ['sponsorshipRequest', 'nationalTax', 'stateTax', 'municipalTax', 'fgts', 'cndt', 'correctionalCertificate', 'tcuCertificate'], source: 'uploads' },
    { title: 'Projeto e plano de midia', fields: ['selectedNotice', 'projectTitle', 'projectAmount', 'projectCounterpart', 'projectPdf'], source: 'project-mixed' },
    { title: 'Revisao final', fields: ['socialRegularity', 'articleSeven', 'noticeAgreement'], source: 'declarations' },
  ]

  const progressItems = sectionRules.map((section) => {
    const values = section.source === 'uploads'
      ? section.fields.map((field) => Boolean(applicationData.uploads[field]))
      : section.source === 'project-mixed'
        ? section.fields.map((field) => (field === 'projectPdf' ? Boolean(applicationData.uploads[field]) : Boolean(applicationData[field])))
      : section.source === 'declarations'
        ? section.fields.map((field) => Boolean(applicationData.declarations[field]))
        : section.fields.map((field) => Boolean(applicationData[field]))

    const filled = values.filter(Boolean).length
    const isDone = filled > 0 && filled === values.length
    const isCurrent = !isDone && filled > 0

    return { title: section.title, status: isDone ? 'Concluido' : isCurrent ? 'Em andamento' : 'Pendente', tone: isDone ? 'success' : isCurrent ? 'warning' : 'neutral', done: isDone, current: isCurrent }
  })

  const completedSteps = progressItems.filter((item) => item.done).length
  const activeItem = progressItems.find((item) => item.current) || progressItems.find((item) => !item.done)
  const activeStep = activeItem?.title || 'Cadastro concluido'
  const adminContext = buildAdminContext(applicationData, progressItems, completedSteps, auditTrail)

  const handleExit = () => setScreen('logged-out')
  const registerAudit = (title, detail) => {
    setAuditTrail((current) => [
      { title, detail, time: formatAuditTimestamp(new Date()) },
      ...current,
    ].slice(0, 12))
  }

  if (screen === 'auth') {
    return (
      <AuthScreen
        authData={authData}
        setAuthData={setAuthData}
        onLogin={() => setScreen(hasCompletedOnboarding ? 'dashboard' : 'company-registration')}
        onStartRegistration={() => setScreen('company-registration')}
      />
    )
  }

  if (screen === 'logged-out') {
    return <LoggedOutScreen portalView={portalView} onSelectPortal={setPortalView} />
  }

  if (portalView === 'admin') {
    if (adminScreen === 'institutions') {
      return <AdminApplicantsTable title="Instituicoes" subtitle="Tabela principal com as instituicoes e acesso rapido para acompanhamento e gestao." rows={adminContext.applicants} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} />
    }

    if (adminScreen === 'projects') {
      return <AdminProjectsScreen rows={adminContext.projectsRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} />
    }

    if (adminScreen === 'resources') {
      return <AdminResourcesScreen rows={adminContext.resourcesRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} />
    }

    if (adminScreen === 'audits') {
      return <AdminAuditsScreen rows={adminContext.auditRows} onBack={() => setAdminScreen('dashboard')} portalView={portalView} onSelectPortal={setPortalView} adminScreen={adminScreen} onNavigate={setAdminScreen} />
    }

    return <AdminDashboardScreen portalView={portalView} onSelectPortal={setPortalView} adminContext={adminContext} adminScreen={adminScreen} onNavigate={setAdminScreen} />
  }

  if (screen !== 'dashboard') {
    const isOnboarding = !hasCompletedOnboarding && screen === 'company-registration'
    return <StageFormScreen currentStage={screen} applicationData={applicationData} setApplicationData={setApplicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} preferences={preferences} setPreferences={setPreferences} onBack={() => setScreen(isOnboarding ? 'auth' : 'dashboard')} onSaveStage={() => { if (isOnboarding) { setHasCompletedOnboarding(true) } setScreen('dashboard') }} onExit={handleExit} portalView={portalView} onSelectPortal={setPortalView} registerAudit={registerAudit} isOnboarding={isOnboarding} />
  }

  return <DashboardScreen onNavigate={setScreen} onExit={handleExit} portalView={portalView} onSelectPortal={setPortalView} applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} />
}
