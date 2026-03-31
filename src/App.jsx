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
  phoneSecondary: '', street: '', streetNumber: '', zipCode: '', landmark: '', neighborhood: '',
  addressComplement: '', city: '', state: '',
  foundationDate: '', shareCapital: '', primaryCnae: '', secondaryCnaes: '', address: '',
  bank: '', agency: '', account: '', legalRepresentative: '', legalRepresentativeCpf: '',
  legalRepresentativeRole: '', commercialContact: '', commercialContactCpf: '', commercialContactPhone: '',
  projectTitle: '', projectAmount: '', projectCounterpart: '', alignmentLevel: '', workPlan: '', mediaPlan: '',
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

function PainelNavbar({ onExit }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <AppBrand />
          <div className="fw-bold mb-0 navbar-titulo">{selection.title}</div>
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
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
      <div className="card-mini">
        <a href="#" className="card-link" onClick={(event) => event.preventDefault()}>
          <span className="card-icon-wrap">
            <i className={`bi ${icon}`} style={{ color: '#005FC9' }} />
          </span>
          <p className="card-text mb-0">{title}</p>
          <small className="card-description">{description}</small>
        </a>
      </div>
      <div className="card-expanded">
        <a href="#" className="card-link card-link--expanded" onClick={(event) => event.preventDefault()}>
          <span className="card-icon-wrap">
            <i className={`bi ${icon}`} style={{ color: '#005FC9' }} />
          </span>
          <p className="card-text mb-0">{title}</p>
          <small className="card-description">{description}</small>
        </a>
        <div className="card-meta">
          <div className="card-periodo periodo-linha">
            <div><strong>Inicio:</strong><br />{startDate}</div>
            <div><strong>Fim:</strong><br />{endDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ onNavigate, onExit }) {
  return (
    <div className="painel-page">
      <PainelNavbar onExit={onExit} />
      <main className="main-wrapper">
        <div className="dashboard-shell">
          <div className="dashboard-hero">
            <div>
              <h1>Inscricao para pessoa juridica</h1>
              <p>Preencha as informações dos cards.</p>
            </div>
          </div>
          <div className="dashboard-cards-grid dashboard-cards-grid--six">
            {dashboardStages.slice(0, 6).map((stage) => (
              <div key={stage.id} className="card-col">
                <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
              </div>
            ))}
          </div>
          <div className="dashboard-cards-grid">
            {dashboardStages.slice(6).map((stage) => (
              <div key={stage.id} className="card-col">
                <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
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

function UploadItemCard({ item, isUploaded, onChange }) {
  const [showInfo, setShowInfo] = useState(false)

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

      <Form.Control type="file" onChange={(event) => onChange(event.target.files?.length > 0)} />
    </div>
  )
}

function StageFooterActions({ onBack }) {
  return (
    <div className="form-actions form-actions--footer">
      <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onBack}>Cancelar</Button>
      <Button type="button" variant="success" className="action-button action-button--success">Salvar</Button>
    </div>
  )
}

function CompanyRegistrationForm({ applicationData, updateField, onBack }) {
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
          <Col xs={12}><Form.Group><Form.Label>CNAE principal</Form.Label><Form.Control placeholder="Insira aqui a descricao do CNAE principal" value={applicationData.primaryCnae} onChange={updateField('primaryCnae')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAEs secundarios</Form.Label><Form.Control placeholder="Insira aqui a descricao do CNAE secundario" value={applicationData.secondaryCnaes} onChange={updateField('secondaryCnaes')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Endereco</div>
        <Row className="g-3">
          <Col lg={8}><Form.Group><Form.Label>Logradouro</Form.Label><Form.Control placeholder="Insira o logradouro (Av, Rua, Bairro, etc..)" value={applicationData.street} onChange={updateField('street')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Numero</Form.Label><Form.Control placeholder="Numero da casa" value={applicationData.streetNumber} onChange={updateField('streetNumber')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>CEP</Form.Label><Form.Control placeholder="00.000-000" value={applicationData.zipCode} onChange={updateField('zipCode')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Ponto de referencia</Form.Label><Form.Control placeholder="Digite um ponto de referencia" value={applicationData.landmark} onChange={updateField('landmark')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Bairro</Form.Label><Form.Control placeholder="Insira o nome do Bairro" value={applicationData.neighborhood} onChange={updateField('neighborhood')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Complemento</Form.Label><Form.Control placeholder="Digite aqui o complemento se houver" value={applicationData.addressComplement} onChange={updateField('addressComplement')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Cidade</Form.Label><Form.Select value={applicationData.city} onChange={updateField('city')}><option value="" disabled>Selecionar</option><option>Fortaleza</option><option>Caucaia</option><option>Maracanau</option><option>Outro municipio</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>UF</Form.Label><Form.Select value={applicationData.state} onChange={updateField('state')}><option value="" disabled>Selecionar</option><option>CE</option><option>PI</option><option>RN</option><option>PE</option></Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Dados bancarios</div>
        <Row className="g-3">
          <Col xs={12}><Form.Group><Form.Label>Banco</Form.Label><Form.Control placeholder="Insira o nome do banco" value={applicationData.bank} onChange={updateField('bank')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Agencia *</Form.Label><Form.Control placeholder="Insira o nome da agencia" value={applicationData.agency} onChange={updateField('agency')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Conta *</Form.Label><Form.Control placeholder="Digite aqui a conta" value={applicationData.account} onChange={updateField('account')} /></Form.Group></Col>
        </Row>
      </div>

      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function LegalContactForm({ applicationData, updateField, onBack }) {
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
      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function FiscalForm({ applicationData, setUploadStatus, onBack }) {
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
              isUploaded={applicationData.uploads[item.key]}
              onChange={(hasFile) => setUploadStatus(item.key, hasFile)}
            />
          ))}
        </div>
      </div>
      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function AttachmentsForm({ applicationData, setUploadStatus, onBack }) {
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
              isUploaded={applicationData.uploads[item.key]}
              onChange={(hasFile) => setUploadStatus(item.key, hasFile)}
            />
          ))}
        </div>
      </div>
      <StageFooterActions onBack={onBack} />
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

function ProjectForm({ applicationData, updateField, onBack }) {
  return (
    <FormSection title="Projeto, plano de trabalho e midia" subtitle="Campos ligados ao evento ou projeto que sera analisado pela comissao.">
      <div className="company-form-group">
        <div className="company-form-group__title">Dados do projeto</div>
        <Row className="g-3">
          <Col lg={8}><Form.Group><Form.Label>Titulo do projeto *</Form.Label><Form.Control placeholder="Nome do evento ou projeto" value={applicationData.projectTitle} onChange={updateField('projectTitle')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>PDF do projeto *</Form.Label><Form.Control type="file" /></Form.Group></Col>
          <Col lg={6} md={6}><Form.Group><Form.Label>Valor solicitado *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectAmount} onChange={updateField('projectAmount')} /></Form.Group></Col>
          <Col lg={6} md={6}><Form.Group><Form.Label>Contrapartida proposta *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectCounterpart} onChange={updateField('projectCounterpart')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Plano de trabalho e midia</div>
        <Row className="g-3">
          <Col lg={12}>
            <MarkdownField
              label="Plano de trabalho *"
              field="workPlan"
              placeholder="Descreva escopo, entregas, cronograma e publico."
              value={applicationData.workPlan}
              updateField={updateField}
            />
          </Col>
          <Col lg={12}>
            <MarkdownField
              label="Plano de midia *"
              field="mediaPlan"
              placeholder="Explique visibilidade, divulgacao e exposicao institucional."
              value={applicationData.mediaPlan}
              updateField={updateField}
            />
          </Col>
        </Row>
      </div>
      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function DeclarationsForm({ applicationData, setDeclarationValue, onBack }) {
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
      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function SettingsForm({ preferences, setPreferences, onBack }) {
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
      <StageFooterActions onBack={onBack} />
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
      <StageFooterActions onBack={onBack} />
    </FormSection>
  )
}

function LoggedOutScreen() {
  return (
    <div className="candidate-dashboard logout-screen">
      <PainelNavbar onExit={() => {}} />
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

function StageFormScreen({ currentStage, applicationData, setApplicationData, progressItems, completedSteps, activeStep, preferences, setPreferences, onBack, onExit }) {
  const isEditing = false
  const content = stageContent[currentStage]

  const updateField = (field) => (event) => {
    setApplicationData((current) => ({ ...current, [field]: event.target.value }))
  }

  const setUploadStatus = (field, hasFile) => {
    setApplicationData((current) => ({ ...current, uploads: { ...current.uploads, [field]: hasFile } }))
  }

  const setDeclarationValue = (field, value) => {
    setApplicationData((current) => ({ ...current, declarations: { ...current.declarations, [field]: value } }))
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'company-registration':
        return <CompanyRegistrationForm applicationData={applicationData} updateField={updateField} onBack={onBack} />
      case 'legal-contact':
        return <LegalContactForm applicationData={applicationData} updateField={updateField} onBack={onBack} />
      case 'fiscal':
        return <FiscalForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} />
      case 'attachments':
        return <AttachmentsForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} />
      case 'project':
        return <ProjectForm applicationData={applicationData} updateField={updateField} onBack={onBack} />
      case 'declarations':
        return <DeclarationsForm applicationData={applicationData} setDeclarationValue={setDeclarationValue} onBack={onBack} />
      case 'appeal':
        return <PlaceholderStage title="Recurso do resultado" body="Quando o edital abrir fase de recurso, este card pode receber o formulario especifico para fundamentacao e anexos." onBack={onBack} />
      case 'evaluation':
        return <PlaceholderStage title="Avaliacao final" body="Esta area pode exibir resultado, criterios de desempate, parecer da comissao e historico da proposta." onBack={onBack} />
      case 'settings':
        return <SettingsForm preferences={preferences} setPreferences={setPreferences} onBack={onBack} />
      default:
        return null
    }
  }

  return (
    <div className="candidate-dashboard registration-flow">
      <PainelNavbar onExit={onExit} />
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
            <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} isEditing={isEditing} />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('dashboard')
  const [applicationData, setApplicationData] = useState(initialApplicationData)
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
    { title: 'Projeto e plano de midia', fields: ['projectTitle', 'projectAmount', 'projectCounterpart', 'alignmentLevel', 'workPlan', 'mediaPlan'] },
    { title: 'Revisao final', fields: ['socialRegularity', 'articleSeven', 'noticeAgreement'], source: 'declarations' },
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

    return { title: section.title, status: isDone ? 'Concluido' : isCurrent ? 'Em andamento' : 'Pendente', tone: isDone ? 'success' : isCurrent ? 'warning' : 'neutral', done: isDone, current: isCurrent }
  })

  const completedSteps = progressItems.filter((item) => item.done).length
  const activeItem = progressItems.find((item) => item.current) || progressItems.find((item) => !item.done)
  const activeStep = activeItem?.title || 'Cadastro concluido'

  const handleExit = () => setScreen('logged-out')

  if (screen === 'logged-out') {
    return <LoggedOutScreen />
  }

  if (screen !== 'dashboard') {
    return <StageFormScreen currentStage={screen} applicationData={applicationData} setApplicationData={setApplicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} preferences={preferences} setPreferences={setPreferences} onBack={() => setScreen('dashboard')} onExit={handleExit} />
  }

  return <DashboardScreen onNavigate={setScreen} onExit={handleExit} />
}
