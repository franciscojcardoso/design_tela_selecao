// --- Dados gerais -------------------------------------------------------------

export const selection = {
  title: 'EDITAL PJ',
  candidateName: 'Nome Sobrenome',
}

export const institutionInfo = {
  fullName: 'Escola de Saude Publica do Ceara Paulo Marcelo Martins Rodrigues - ESP/CE',
  address: 'Antonio Justa, 3161, Meireles, Fortaleza - CE, CEP 60165-090',
  email: 'chamamentopublico@esp.ce.gov.br',
  government: 'Governo do Estado do Ceara',
}

// --- Etapas do painel candidato -----------------------------------------------

export const dashboardStagesTop = [
  { id: 'company-registration', title: 'Cadastrar', icon: 'bi-buildings', description: 'Dados cadastrais, endereço e conta bancária do proponente.', statusColor: '#5C646B', startDate: '', endDate: '', navigateTo: 'company-registration' },
  { id: 'legal-contact', title: 'Representante legal', icon: 'bi-person-vcard', description: 'Informações do representante legal e do contato comercial.', statusColor: '#5C646B', startDate: '', endDate: '', navigateTo: 'legal-contact' },
  { id: 'fiscal', title: 'Regularidade fiscal', icon: 'bi-shield-check', description: 'Certidões e comprovantes de regularidade fiscal do proponente.', statusColor: '#5C646B', startDate: '', endDate: '', navigateTo: 'fiscal' },
  { id: 'attachments', title: 'Documentos obrigatorios', icon: 'bi-folder2-open', description: 'Anexos institucionais, comprovantes, declaracoes e modelos assinados.', statusColor: '#5C646B', startDate: '', endDate: '', navigateTo: 'attachments' },
]

export const dashboardStagesBottom = [
  { id: 'project', title: 'Plano de trabalho', icon: 'bi-kanban', description: 'Projeto, plano de trabalho, plano de mídia e valores.', statusColor: '#5C646B', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'project' },
  { id: 'appeal', title: 'Recurso do resultado', icon: 'bi-chat-left-text', description: 'Etapa futura: exibida somente se o edital abrir recurso.', statusColor: '#5C646B', startDate: '--', endDate: '--', navigateTo: 'appeal' },
]

// --- Opções de formulários ----------------------------------------------------

export const documentosDisponiveis = ['Edital completo', 'Anexo III', 'Anexo IV', 'Anexo V', 'Anexo VI', 'Anexo VII', 'Modelo de declaracao trabalhista e social']

export const noticeOptions = [
  'Edital 03/2026 - Implantacao e implementacao da rede saude',
  'Edital 04/2026 - Fortalecimento da atencao territorial',
  'Edital 05/2026 - Inovacao em educacao permanente',
]

export const bankOptions = [
  'Banco do Brasil',
  'Caixa Economica Federal',
  'Bradesco',
  'Itau',
  'Santander',
  'Banco do Nordeste',
]

export const cnaeOptions = [
  '6201-5/01 - Desenvolvimento de programas de computador sob encomenda',
  '6311-9/00 - Tratamento de dados, provedores de servicos de aplicacao e servicos de hospedagem na internet',
  '7020-4/00 - Atividades de consultoria em gestao empresarial',
  '8599-6/04 - Treinamento em desenvolvimento profissional e gerencial',
  '8610-1/01 - Atividades de atendimento hospitalar',
  '8650-0/99 - Atividades de profissionais da area de saude',
]

export const uploadChecklist = [
  { key: 'sponsorshipRequest', label: 'Oficio de solicitacao de patrocinio', info: 'Documento formal de solicitacao de patrocinio para o evento ou projeto, com assinatura eletronica GOV.BR.', reviewStatus: 'approved' },
  { key: 'nationalTax', label: 'Regularidade com Fazenda Nacional', info: 'Certidao conjunta expedida pela Receita Federal do Brasil e pela Procuradoria-Geral da Fazenda Nacional, comprovando regularidade fiscal federal.', reviewStatus: 'under-review' },
  { key: 'stateTax', label: 'Regularidade com Fazenda Estadual', info: 'Certidao emitida pela Secretaria da Fazenda do Estado do domicilio ou sede do proponente.', reviewStatus: 'rejected' },
  { key: 'municipalTax', label: 'Regularidade com Fazenda Municipal', info: 'Certidao de regularidade fiscal municipal do domicilio ou sede do proponente.', reviewStatus: 'not-sent' },
  { key: 'fgts', label: 'FGTS', info: 'Certificado de regularidade relativa ao Fundo de Garantia por Tempo de Servico.', reviewStatus: 'expired' },
  { key: 'cndt', label: 'CNDT', info: 'Certidao Negativa de Debitos Trabalhistas, usada para demonstrar regularidade em obrigacoes trabalhistas.', reviewStatus: 'approved' },
  { key: 'correctionalCertificate', label: 'Certidao negativa correcional', info: 'Consulta negativa de entes privados em bases como ePAD, CGU-PJ, CEIS, CNEP e CEPIM.', reviewStatus: 'under-review' },
  { key: 'tcuCertificate', label: 'Certidao negativa de licitantes inidoneos', info: 'Certidao emitida no ambito do TCU para comprovar ausencia de impedimentos relacionados a licitacoes.', reviewStatus: 'not-sent' },
  { key: 'constitutiveAct', label: 'Ato constitutivo ou contrato social', info: 'Documento societario que comprova a constituicao formal do proponente e seus representantes.', reviewStatus: 'approved' },
  { key: 'legalRepresentativeDocument', label: 'Documento do representante legal', info: 'Documento de identificacao do representante legal, como RG, CPF ou CNH.', reviewStatus: 'rejected' },
  { key: 'representativeAddress', label: 'Comprovante de endereco do representante', info: 'Comprovante atualizado de residencia do representante legal do proponente.', reviewStatus: 'expired' },
]

export const documentReviewStatusMap = {
  'not-sent': { label: 'Não enviado', icon: 'bi-dash-circle', tone: 'neutral' },
  'under-review': { label: 'Aguardando análise', icon: 'bi-clock', tone: 'warning' },
  rejected: { label: 'Rejeitado', icon: 'bi-x-lg', tone: 'danger' },
  approved: { label: 'Aprovado', icon: 'bi-check-lg', tone: 'success' },
  expired: { label: 'Expirado', icon: 'bi-calendar2-x', tone: 'muted' },
}

// --- Dados iniciais da inscrição ----------------------------------------------

export const initialApplicationData = {
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

export const stageContent = {
  'company-registration': { eyebrow: 'Etapa 1', title: 'Cadastrar proponente', description: 'Dados institucionais, endereço e conta bancária do proponente.' },
  'legal-contact': { eyebrow: 'Etapa 2', title: 'Representante legal e contato comercial', description: 'Dados do representante legal e do contato comercial responsável pela proposta.' },
  fiscal: { eyebrow: 'Etapa 3', title: 'Regularidade fiscal e trabalhista', description: 'Certidões fiscais e trabalhistas usadas para comprovar regularidade do proponente.' },
  attachments: { eyebrow: 'Etapa 4', title: 'Documentos institucionais e anexos', description: 'Uploads institucionais e comprovantes formais exigidos pelo edital.' },
  project: { eyebrow: 'Etapa 5', title: 'Projeto, plano de trabalho e mídia', description: 'Projeto, valores, contrapartida, plano de trabalho e plano de mídia.' },
  declarations: { eyebrow: 'Etapa 6', title: 'Declarações', description: 'Confirmações obrigatórias antes do envio final da inscrição.' },
  appeal: { eyebrow: 'Pós-inscrição', title: 'Recurso do resultado', description: 'Esta tela fica preparada para eventual abertura de recurso após a avaliação.' },
  settings: { eyebrow: 'Preferências', title: 'Configurações', description: 'Escolha o modo claro ou escuro e a variação de cores acessíveis para a interface.' },
}

export const fieldLabels = {
  companyType: 'Tipo de proponente',
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

// --- Administrador --------------------------------------------------------------------

export const AdministradorMenu = [
  { label: 'Início', icon: 'bi-house', target: 'dashboard' },
  { label: 'Instituições', icon: 'bi-people-fill', target: 'institutions' },
  { label: 'Projetos', icon: 'bi-kanban', target: 'projects' },
  { label: 'Recursos', icon: 'bi-file-earmark-text', target: 'resources' },
  { label: 'Auditorias', icon: 'bi-clipboard-check', target: 'audits' },
  { label: 'Relatórios', icon: 'bi-bar-chart-line', target: 'reports' },
  { label: 'Gerenciar usuários', icon: 'bi-person-gear', target: 'users' },
  { label: 'Cadastros básicos', icon: 'bi-database', target: 'basic-registrations' },
]

export const initialAdministradorUserForm = {
  fullName: '',
  email: '',
  emailConfirm: '',
  cpf: '',
  phone: '',
  phoneSecondary: '',
  isAdministrador: false,
  isEvaluator: true,
}

export const initialAdministradorUsers = [
  { id: 1, fullName: 'Maria Fernanda Alves', email: 'maria.alves@esp.ce.gov.br', emailConfirm: 'maria.alves@esp.ce.gov.br', cpf: '123.456.789-00', phone: '(85) 98888-1111', phoneSecondary: '(85) 3222-1111', isAdministrador: true, isEvaluator: true, status: 'Convite enviado' },
  { id: 2, fullName: 'Joao Pedro Lima', email: 'joao.lima@esp.ce.gov.br', emailConfirm: 'joao.lima@esp.ce.gov.br', cpf: '234.567.890-11', phone: '(85) 97777-2222', phoneSecondary: '', isAdministrador: false, isEvaluator: true, status: 'Ativo' },
  { id: 3, fullName: 'Ana Carolina Sousa', email: 'ana.sousa@esp.ce.gov.br', emailConfirm: 'ana.sousa@esp.ce.gov.br', cpf: '345.678.901-22', phone: '(85) 96666-3333', phoneSecondary: '(85) 3111-0000', isAdministrador: true, isEvaluator: false, status: 'Convite pendente' },
]

export function getAdministradorUserRoles(user) {
  return [
    user.isAdministrador ? 'Administrador' : null,
    user.isEvaluator ? 'Avaliador' : null,
  ].filter(Boolean).join(' / ')
}

// --- Administrador - cadastros básicos ------------------------------------------------

export const initialCnaes = [
  { id: 1, descricao: '6201-5/01 - Desenvolvimento de programas de computador sob encomenda', situacao: true },
  { id: 2, descricao: '6311-9/00 - Tratamento de dados e hospedagem na internet', situacao: true },
  { id: 3, descricao: '7020-4/00 - Consultoria em gestão empresarial', situacao: true },
  { id: 4, descricao: '8599-6/04 - Treinamento em desenvolvimento profissional', situacao: false },
]

export const initialTiposInstituicao = [
  { id: 1, descricao: 'Fundação', situacao: true },
  { id: 2, descricao: 'Associação', situacao: true },
  { id: 3, descricao: 'Organização Social', situacao: true },
  { id: 4, descricao: 'OSCIP', situacao: true },
  { id: 5, descricao: 'Cooperativa', situacao: false },
]

export const initialBancos = [
  { id: 1, descricao: 'Banco do Brasil', situacao: true },
  { id: 2, descricao: 'Caixa Econômica Federal', situacao: true },
  { id: 3, descricao: 'Bradesco', situacao: true },
  { id: 4, descricao: 'Itaú', situacao: true },
  { id: 5, descricao: 'Santander', situacao: true },
  { id: 6, descricao: 'Banco do Nordeste', situacao: true },
]

export const initialSetores = [
  { id: 1, descricao: 'Saúde Pública', situacao: true },
  { id: 2, descricao: 'Educação Permanente', situacao: true },
  { id: 3, descricao: 'Vigilância Sanitária', situacao: true },
  { id: 4, descricao: 'Atenção Primária', situacao: false },
]

export const initialTiposDocumentos = [
  { id: 1, descricao: 'Ato constitutivo ou contrato social', situacao: true },
  { id: 2, descricao: 'Certidão negativa de débitos federais', situacao: true },
  { id: 3, descricao: 'Comprovante de endereço', situacao: true },
  { id: 4, descricao: 'Documento do representante legal', situacao: true },
  { id: 5, descricao: 'Certidão negativa trabalhista', situacao: true },
]

export const initialCriteriosAvaliacao = [
  { id: 1, descricao: 'Alinhamento com os objetivos do edital', situacao: true },
  { id: 2, descricao: 'Capacidade técnica da equipe proponente', situacao: true },
  { id: 3, descricao: 'Viabilidade financeira do projeto', situacao: true },
  { id: 4, descricao: 'Impacto social esperado', situacao: true },
  { id: 5, descricao: 'Sustentabilidade e continuidade', situacao: false },
]

export const initialEditalForm = {
  id_setor: '',
  descricao: '',
  data_inicio_inscricoes: '',
  hora_inicio_inscricoes: '',
  data_final_inscricoes: '',
  hora_final_inscricoes: '',
  data_resultado_preliminar: '',
  data_inicio_recurso: '',
  hora_inicio_recurso: '',
  data_final_recurso: '',
  hora_final_recurso: '',
  data_resultado_final: '',
  situacao: true,
}

export const initialEditais = [
  { id: 1, id_setor: 1, descricao: 'Edital 03/2026 - Implantação e implementação da rede saúde', data_inicio_inscricoes: '2026-03-18', hora_inicio_inscricoes: '08:00', data_final_inscricoes: '2026-04-15', hora_final_inscricoes: '23:59', data_resultado_preliminar: '2026-04-22', data_inicio_recurso: '2026-04-23', hora_inicio_recurso: '08:00', data_final_recurso: '2026-04-25', hora_final_recurso: '23:59', data_resultado_final: '2026-04-30', situacao: true },
  { id: 2, id_setor: 2, descricao: 'Edital 04/2026 - Fortalecimento da atenção territorial', data_inicio_inscricoes: '2026-05-01', hora_inicio_inscricoes: '08:00', data_final_inscricoes: '2026-05-30', hora_final_inscricoes: '23:59', data_resultado_preliminar: '2026-06-07', data_inicio_recurso: '2026-06-08', hora_inicio_recurso: '08:00', data_final_recurso: '2026-06-10', hora_final_recurso: '23:59', data_resultado_final: '2026-06-15', situacao: true },
]

export const initialProjectEvaluatorForm = {
  id_edital: '',
  id_avaliador: '',
  situacao: true,
}

export const initialProjectEvaluators = [
  { id: 1, id_edital: 1, id_avaliador: 1, situacao: true },
  { id: 2, id_edital: 1, id_avaliador: 2, situacao: true },
  { id: 3, id_edital: 2, id_avaliador: 1, situacao: false },
]

export const basicRegistrationCards = [
  { key: 'cnaes', title: 'CNAE', icon: 'bi-buildings', description: 'Códigos CNAE utilizados no cadastro das instituições proponentes.' },
  { key: 'tiposInstituicao', title: 'Tipos de instituição', icon: 'bi-diagram-3', description: 'Tipos de entidade disponíveis para cadastro e seleção no sistema.' },
  { key: 'bancos', title: 'Bancos', icon: 'bi-bank', description: 'Instituições bancárias disponíveis para informação de conta.' },
  { key: 'setores', title: 'Setores', icon: 'bi-grid-3x3', description: 'Setores organizacionais vinculados às áreas de atuação dos editais.' },
  { key: 'tiposDocumentos', title: 'Tipos de documentos', icon: 'bi-file-earmark-text', description: 'Categorias de documentos exigidos nos processos seletivos.' },
  { key: 'criteriosAvaliacao', title: 'Critérios de avaliação', icon: 'bi-clipboard-check', description: 'Critérios utilizados pelos avaliadores na análise dos projetos.' },
  { key: 'editais', title: 'Editais', icon: 'bi-journal-text', description: 'Editais de chamamento público abertos e encerrados.' },
]

export const basicRegistrationTitleMap = {
  cnaes: { title: 'Gerenciar CNAE', subtitle: 'Cadastro dos códigos CNAE utilizados pelas instituições proponentes.' },
  tiposInstituicao: { title: 'Gerenciar tipos de instituição', subtitle: 'Tipos de entidade disponíveis para cadastro e seleção no sistema.' },
  bancos: { title: 'Gerenciar bancos', subtitle: 'Instituições bancárias disponíveis para informação de conta do proponente.' },
  setores: { title: 'Gerenciar setores', subtitle: 'Setores organizacionais disponíveis para vinculação nos editais.' },
  tiposDocumentos: { title: 'Gerenciar tipos de documentos', subtitle: 'Categorias de documentos exigidos nos processos seletivos.' },
  criteriosAvaliacao: { title: 'Gerenciar critérios de avaliação', subtitle: 'Critérios utilizados pelos avaliadores na análise dos projetos.' },
}

// --- Avaliador ----------------------------------------------------------------

export const evaluatorMenu = []

export const evaluatorProjects = [
  { id: 'eval-01', institution: 'Instituto Vida', project: 'Fortalecimento da atenção territorial', notice: 'Edital 03/2026', amount: 'R$ 45.000,00', status: 'Aguardando avaliação' },
  { id: 'eval-02', institution: 'Clínica Horizonte', project: 'Inovação em educação permanente', notice: 'Edital 03/2026', amount: 'R$ 30.000,00', status: 'Em avaliação' },
  { id: 'eval-03', institution: 'Associação Soma', project: 'Implantação da rede saúde', notice: 'Edital 03/2026', amount: 'R$ 60.000,00', status: 'Avaliado' },
]

export const evaluatorDocuments = [
  { id: 1, institution: 'Instituto Vida', document: 'Ato constitutivo', avaliacao: null, justificativa: '' },
  { id: 2, institution: 'Clínica Horizonte', document: 'Comprovante de endereço', avaliacao: 1, justificativa: '' },
  { id: 3, institution: 'Associação Soma', document: 'Documento do representante', avaliacao: 0, justificativa: 'Documento vencido' },
]

// --- Administrador - dados de contexto ------------------------------------------------

export const AdministradorBaseApplicants = [
  { id: 'esp-01', companyName: 'Instituto Vida', city: 'FORTALEZA', status: 'Concluido', documents: 8, progress: 5, resources: 2 },
  { id: 'esp-02', companyName: 'Clinica Horizonte', city: 'ARAPIRACA', status: 'Em analise', documents: 6, progress: 3, resources: 1 },
  { id: 'esp-03', companyName: 'Associacao Soma', city: 'PONTA GROSSA', status: 'Concluido', documents: 7, progress: 5, resources: 1 },
  { id: 'esp-04', companyName: 'Rede Saude Popular', city: 'FORTALEZA', status: 'Em analise', documents: 5, progress: 4, resources: 0 },
  { id: 'esp-05', companyName: 'Projeto Sanar', city: 'FORTALEZA', status: 'Pendente', documents: 2, progress: 1, resources: 0 },
]

export const AdministradorSchedule = [
  { date: '2026-03-18', title: 'Inicio das inscricoes' },
  { date: '2026-03-23', title: 'Abertura dos recursos' },
  { date: '2026-03-27', title: 'Resultado preliminar' },
  { date: '2026-03-31', title: 'Resultado definitivo' },
  { date: '2026-04-07', title: 'Analise curricular' },
  { date: '2026-04-15', title: 'Encerramento da fase documental' },
]

export const AdministradorGraphSeries = [
  { label: 'Instituicoes', value: 6, color: 'var(--color-success)' },
  { label: 'Projetos', value: 4, color: 'var(--color-info)' },
  { label: 'Documentos', value: 5, color: 'var(--color-primary)' },
  { label: 'Recursos', value: 2, color: 'var(--color-info)' },
]

export const AdministradorAuditRows = [
  { id: 1, location: 'public.pacientes', recordId: 215, action: 'Cadastro', datetime: '2025-08-07 09:02:11', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Cadastro de instituição ID 215 - inclusao de novo registro na tabela public.pacientes.' },
  { id: 2, location: 'public.pacientes', recordId: 215, action: 'Atualizacao', datetime: '2025-08-07 09:07:34', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Atualizacao de instituição ID 215 - ajuste de dados cadastrais na tabela public.instituicoes.' },
  { id: 3, location: 'public.profissionais', recordId: 312, action: 'Desativacao', datetime: '2025-08-07 10:15:27', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Desativacao de profissional ID 312 - alteração de status para inativo.' },
  { id: 4, location: 'public.usuarios', recordId: 315, action: 'Consulta', datetime: '2025-08-07 10:18:09', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Consulta de usuario ID 315 na tabela public.usuarios.' },
  { id: 5, location: 'public.login', recordId: 250, action: 'Login', datetime: '2025-08-07 08:58:41', user: 'joao.silva', userName: 'Joao da Silva', ip: '192.168.1.10', detail: 'Login realizado com sucesso no sistema administrativo.' },
]

// --- Helpers ------------------------------------------------------------------

export const fixedToday = new Date('2026-04-01T12:00:00')

export function formatAuditTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function parseIsoDate(value) {
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

export function isFieldFilled(source, value) {
  if (source === 'uploads') return Boolean(value)
  if (source === 'declarations') return Boolean(value)
  if (Array.isArray(value)) return value.length > 0
  return Boolean(String(value || '').trim())
}

export function isStageValid(stage, applicationData, preferences) {
  const requiredFields = stageValidationRules[stage] || []

  return requiredFields.every((field) => {
    if (stage === 'project' && field !== 'selectedNotice' && !applicationData.selectedNotice) return false
    if (stage === 'settings') return isFieldFilled('field', preferences[field])
    if (stage === 'declarations') return isFieldFilled('declarations', applicationData.declarations[field])
    if (stage === 'fiscal' || stage === 'attachments' || field === 'projectPdf') return isFieldFilled('uploads', applicationData.uploads[field])
    return isFieldFilled('field', applicationData[field])
  })
}

export function buildAdministradorContext(applicationData, progressItems, completedSteps, auditTrail) {
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

  const applicants = currentApplicant ? [...AdministradorBaseApplicants, currentApplicant] : AdministradorBaseApplicants
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
            : 'Cadastrar'
    return { ...applicant, currentStageLabel, hasPending }
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
      items: progressItems.filter((item) => item.done).map((item) => ({ title: item.title, status: item.status, detail: 'Etapa liberada para conferência administrativa.' })),
    },
    {
      label: 'Em andamento',
      tone: 'warning',
      count: inProgressStages,
      items: progressItems.filter((item) => item.current).map((item) => ({ title: item.title, status: item.status, detail: 'Recebendo novos dados do formulário do usuário.' })),
    },
    {
      label: 'Pendentes',
      tone: 'neutral',
      count: pendingStages - inProgressStages,
      items: progressItems.filter((item) => !item.done && !item.current).map((item) => ({ title: item.title, status: item.status, detail: 'Aguardando preenchimento ou envio de anexos.' })),
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
      email: index === applicantsWithStatus.length - 1 && applicationData.email ? applicationData.email : `contato${index + 1}@instituicao.org.br`,
      phone: index === applicantsWithStatus.length - 1 && applicationData.phone ? applicationData.phone : `(85) 9${index + 1}${index + 2}${index + 3}${index + 4}-${index + 5}${index + 6}${index + 7}${index + 8}`,
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
    auditRows: AdministradorAuditRows,
  }
}
