import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'
import './App.css'

const selection = {
  title: 'Painel do Proponente',
  notice: 'EDITAL 03/2026 - CHAMAMENTO PARA EVENTOS E PROJETOS EM SAUDE PUBLICA',
  candidateName: 'INSTITUTO SAUDE E CIDADANIA LTDA',
}

const dashboardStages = [
  { id: 'company-registration', title: 'Cadastro da Empresa', icon: 'bi-buildings', description: 'Dados cadastrais, endereco e conta bancaria da pessoa juridica.', progress: 40, statusColor: '#ffc107', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'company-registration' },
  { id: 'legal-contact', title: 'Representante Legal', icon: 'bi-person-vcard', description: 'Informacoes do representante legal e do contato comercial.', progress: 15, statusColor: '#ffc107', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'legal-contact' },
  { id: 'fiscal', title: 'Regularidade Fiscal', icon: 'bi-shield-check', description: 'Certidoes e comprovacoes fiscais exigidas no edital.', progress: 0, statusColor: '#adb5bd', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'fiscal' },
  { id: 'attachments', title: 'Documentos Obrigatorios', icon: 'bi-folder2-open', description: 'Anexos institucionais, comprovantes e modelos assinados.', progress: 0, statusColor: '#adb5bd', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'attachments' },
  { id: 'project', title: 'Plano de Trabalho', icon: 'bi-kanban', description: 'Projeto, plano de trabalho, plano de midia e valores.', progress: 0, statusColor: '#adb5bd', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'project' },
  { id: 'declarations', title: 'Declaracoes', icon: 'bi-file-earmark-check', description: 'Termos obrigatorios e confirmacoes de ciencia do edital.', progress: 0, statusColor: '#adb5bd', startDate: '30/03/2026', endDate: '15/04/2026', navigateTo: 'declarations' },
  { id: 'appeal', title: 'Recurso do Resultado', icon: 'bi-chat-left-text', description: 'Etapa futura: exibida somente se o edital abrir recurso.', progress: 0, statusColor: '#adb5bd', startDate: '--', endDate: '--', navigateTo: 'appeal' },
  { id: 'evaluation', title: 'Avaliacao Final', icon: 'bi-clipboard-data', description: 'Acompanhamento da analise da comissao avaliadora.', progress: 0, statusColor: '#0d6efd', startDate: '16/04/2026', endDate: '30/04/2026', navigateTo: 'evaluation' },
  { id: 'settings', title: 'Configuracoes', icon: 'bi-sliders', description: 'Tema visual, modo claro ou escuro e paletas acessiveis.', progress: 100, statusColor: '#0f7a8c', startDate: 'Disponivel', endDate: 'Sempre', navigateTo: 'settings' },
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
  foundationDate: '', shareCapital: '', primaryCnae: '', secondaryCnaes: '', address: '',
  bank: 'BRADESCO', agency: '', account: '', legalRepresentative: '', legalRepresentativeCpf: '',
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
        <div className="d-flex align-items-center gap-3">
          <div className="brand-square">
            <span>ESP</span>
            <span>CE</span>
          </div>
          <div>
            <div className="fw-bold text-primary mb-0 navbar-titulo">{selection.title}</div>
            <small className="text-muted">{selection.notice}</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto">
          <span className="text-muted small d-none d-md-inline">{selection.candidateName}</span>
          <button className="btn btn-outline-primary btn-sm" onClick={onExit}>
            <i className="bi bi-box-arrow-right me-1" />
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}

function DashboardCard({ title, icon, description, progress, statusColor, startDate, endDate, onCardClick }) {
  return (
    <div className={`card-hover${onCardClick ? ' card-hover--clickable' : ''}`} onClick={onCardClick}>
      <div className="card-mini">
        <a href="#" className="card-link" onClick={(event) => event.preventDefault()}>
          <i className={`bi ${icon}`} style={{ color: '#0d6efd' }} />
          <p className="card-text mb-0">{title}<br /><br /><small style={{ color: '#282828' }}>{description}</small></p>
        </a>
      </div>
      <div className="card-expanded">
        <a href="#" className="card-link-expanded" onClick={(event) => event.preventDefault()}>
          <i className={`bi ${icon}`} style={{ color: '#0d6efd' }} />
          <p className="card-title-expanded mb-0">{title}<br /><br /><small style={{ color: '#282828' }}>{description}</small></p>
        </a>
        <div className="progress-wrap d-flex align-items-center gap-2">
          <div className="progress flex-grow-1"><div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} /></div>
          <span className="card-status-inline">{progress}%</span>
        </div>
        <div className="card-periodo periodo-linha">
          <div><strong>Inicio:</strong><br />{startDate}</div>
          <div><strong>Fim:</strong><br />{endDate}</div>
        </div>
        <div className="status-line-expanded" style={{ backgroundColor: statusColor }} />
      </div>
      <div className="card-status-bar" style={{ backgroundColor: statusColor }} />
    </div>
  )
}

function DashboardScreen({ onNavigate }) {
  return (
    <div className="painel-page">
      <PainelNavbar onExit={() => {}} />
      <main className="main-wrapper">
        <div className="container-xl">
          <div className="dashboard-hero">
            <div>
              <h1>Inscricao para pessoa juridica</h1>
              <p>O edital anexado pede dados de empresa, representante legal, certidoes, anexos institucionais e informacoes do projeto. As etapas abaixo foram reorganizadas para refletir esse processo.</p>
            </div>
          </div>
          <div className="row g-3 mt-2 justify-content-center">
            {dashboardStages.map((stage) => (
              <div key={stage.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 card-col">
                <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="footer-painel">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="brand-square brand-square--sm"><span>ESP</span><span>CE</span></div>
              <div className="footer-info">
                <strong>Escola de Saude Publica do Ceara Paulo Marcelo Martins Rodrigues - ESP/CE</strong>
                <div><i className="bi bi-geo-alt-fill me-1" />Antonio Justa, 3161, Meireles, Fortaleza - CE, CEP 60165-090</div>
                <div><i className="bi bi-envelope me-1" />selecoes@esp.ce.gov.br</div>
              </div>
            </div>
            <div className="text-end footer-rights"><strong>Governo do Estado do Ceara</strong><div>Todos os direitos reservados</div></div>
          </div>
        </div>
      </footer>
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
    { label: 'CNPJ', value: applicationData.cnpj, tone: 'text-primary' },
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
        <div className="status-line"><span>Status</span><strong className="text-warning-emphasis">{isEditing ? 'Edicao em andamento' : 'Em andamento'}</strong></div>
        <div className="status-line"><span>Resumo</span><strong>{summaryItems.length} informacoes</strong></div>
        <div className="status-line"><span>Etapa atual</span><strong>{activeStep}</strong></div>
        <div className="status-line"><span>Prazo final</span><strong className="text-danger">15/04/2026</strong></div>
        <div className="summary-panel">
          <div className="summary-panel__header"><h4>Resumo do cadastro</h4><span>{isEditing ? 'Modo edicao' : 'Preenchimento automatico'}</span></div>
          {summaryItems.length > 0 ? (
            <div className="summary-list">
              {summaryItems.map((item) => <div key={item.label} className="summary-list__item"><span>{item.label}</span><strong className={item.tone}>{item.value}</strong></div>)}
            </div>
          ) : <p className="summary-empty">O resumo sera preenchido conforme a empresa informar os dados principais do cadastro.</p>}
        </div>
        <div className="sidebar-progress">
          <div className="sidebar-progress__header"><h4>Progresso das Etapas</h4><span>{completedSteps}/{progressItems.length} concluidas</span></div>
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
function CompanyRegistrationForm({ applicationData, updateField }) {
  return (
    <FormSection title="Identificacao da empresa" subtitle="Campos basicos pedidos no edital para cadastro da pessoa juridica.">
      <div className="section-block-title">Dados cadastrais</div>
      <Row className="g-3">
        <Col lg={3} md={6}><Form.Group><Form.Label>Tipo de empresa *</Form.Label><Form.Select value={applicationData.companyType} onChange={updateField('companyType')}><option value="" disabled>Selecione...</option><option>LTDA</option><option>SLU</option><option>S/A</option><option>EIRELI</option><option>OSCIP</option><option>Outro</option></Form.Select></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>CNPJ *</Form.Label><Form.Control placeholder="00.000.000/0000-00" value={applicationData.cnpj} onChange={updateField('cnpj')} /></Form.Group></Col>
        <Col lg={6} md={12}><Form.Group><Form.Label>Razao social *</Form.Label><Form.Control placeholder="Nome juridico da empresa" value={applicationData.companyName} onChange={updateField('companyName')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Nome fantasia</Form.Label><Form.Control placeholder="Opcional" value={applicationData.tradeName} onChange={updateField('tradeName')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Email institucional *</Form.Label><Form.Control type="email" placeholder="contato@empresa.com.br" value={applicationData.email} onChange={updateField('email')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Telefone *</Form.Label><Form.Control placeholder="(85) 99999-9999" value={applicationData.phone} onChange={updateField('phone')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Website</Form.Label><Form.Control placeholder="https://..." value={applicationData.website} onChange={updateField('website')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Data de criacao *</Form.Label><Form.Control type="date" value={applicationData.foundationDate} onChange={updateField('foundationDate')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Capital declarado</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.shareCapital} onChange={updateField('shareCapital')} /></Form.Group></Col>
        <Col lg={6} md={6}><Form.Group><Form.Label>CNAE principal</Form.Label><Form.Control placeholder="Descricao ou codigo" value={applicationData.primaryCnae} onChange={updateField('primaryCnae')} /></Form.Group></Col>
        <Col lg={6} md={6}><Form.Group><Form.Label>CNAEs secundarios</Form.Label><Form.Control placeholder="Informe os CNAEs secundarios" value={applicationData.secondaryCnaes} onChange={updateField('secondaryCnaes')} /></Form.Group></Col>
      </Row>
      <div className="section-block-title mt-4">Endereco e dados bancarios</div>
      <Row className="g-3">
        <Col lg={8}><Form.Group><Form.Label>Endereco completo *</Form.Label><Form.Control placeholder="Rua, numero, bairro, municipio, UF e CEP" value={applicationData.address} onChange={updateField('address')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Banco *</Form.Label><Form.Select value={applicationData.bank} onChange={updateField('bank')}><option>BRADESCO</option><option>Outro</option></Form.Select></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>Agencia *</Form.Label><Form.Control placeholder="0000" value={applicationData.agency} onChange={updateField('agency')} /></Form.Group></Col>
        <Col lg={5} md={6}><Form.Group><Form.Label>Conta *</Form.Label><Form.Control placeholder="000000-0" value={applicationData.account} onChange={updateField('account')} /></Form.Group></Col>
      </Row>
    </FormSection>
  )
}

function LegalContactForm({ applicationData, updateField }) {
  return (
    <FormSection title="Representante legal e contato comercial" subtitle="Substitui campos de pessoa fisica por informacoes do responsavel da empresa.">
      <Row className="g-3">
        <Col lg={6} md={6}><Form.Group><Form.Label>Nome do representante legal *</Form.Label><Form.Control placeholder="Nome completo" value={applicationData.legalRepresentative} onChange={updateField('legalRepresentative')} /></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>CPF do representante *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.legalRepresentativeCpf} onChange={updateField('legalRepresentativeCpf')} /></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>Cargo *</Form.Label><Form.Control placeholder="Diretor, socio, procurador..." value={applicationData.legalRepresentativeRole} onChange={updateField('legalRepresentativeRole')} /></Form.Group></Col>
        <Col lg={6} md={6}><Form.Group><Form.Label>Contato comercial *</Form.Label><Form.Control placeholder="Nome do responsavel pelo contato" value={applicationData.commercialContact} onChange={updateField('commercialContact')} /></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>CPF do contato *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.commercialContactCpf} onChange={updateField('commercialContactCpf')} /></Form.Group></Col>
        <Col lg={3} md={6}><Form.Group><Form.Label>Telefone do contato *</Form.Label><Form.Control placeholder="(85) 99999-9999" value={applicationData.commercialContactPhone} onChange={updateField('commercialContactPhone')} /></Form.Group></Col>
      </Row>
      <div className="info-banner mt-4"><i className="bi bi-info-circle" /><span>Esta etapa concentra apenas os dados dos responsaveis da empresa. O restante do cadastro continua nas outras opcoes da pagina inicial.</span></div>
    </FormSection>
  )
}

function FiscalForm({ applicationData, setUploadStatus }) {
  const fiscalUploads = uploadChecklist.slice(0, 8)
  return (
    <FormSection title="Regularidade fiscal e trabalhista" subtitle="Certidoes fiscais e comprovacoes de regularidade exigidas na fase de inscricao.">
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
    </FormSection>
  )
}

function AttachmentsForm({ applicationData, setUploadStatus }) {
  const attachmentUploads = uploadChecklist.slice(8)
  return (
    <FormSection title="Documentos institucionais e anexos" subtitle="Uploads complementares, modelos assinados e comprovantes da empresa.">
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

function ProjectForm({ applicationData, updateField }) {
  return (
    <FormSection title="Projeto, plano de trabalho e midia" subtitle="Campos ligados ao evento ou projeto que sera analisado pela comissao.">
      <Row className="g-3">
        <Col lg={8}><Form.Group><Form.Label>Titulo do projeto *</Form.Label><Form.Control placeholder="Nome do evento ou projeto" value={applicationData.projectTitle} onChange={updateField('projectTitle')} /></Form.Group></Col>
        <Col lg={4}><Form.Group><Form.Label>PDF do projeto *</Form.Label><Form.Control type="file" /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Valor solicitado *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectAmount} onChange={updateField('projectAmount')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Contrapartida proposta *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectCounterpart} onChange={updateField('projectCounterpart')} /></Form.Group></Col>
        <Col lg={4} md={6}><Form.Group><Form.Label>Alinhamento com politicas da ESP/CE *</Form.Label><Form.Select value={applicationData.alignmentLevel} onChange={updateField('alignmentLevel')}><option value="" disabled>Selecione...</option><option>Alto</option><option>Medio</option><option>Baixo</option></Form.Select></Form.Group></Col>
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
    </FormSection>
  )
}

function DeclarationsForm({ applicationData, setDeclarationValue }) {
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
      <div className="declaration-list">
        <Form.Check type="checkbox" id="social-regularity" checked={applicationData.declarations.socialRegularity} onChange={(event) => setDeclarationValue('socialRegularity', event.target.checked)} label="Declaro que a empresa atende aos requisitos de regularidade trabalhista e social previstos no edital." />
        <Form.Check type="checkbox" id="art-7" checked={applicationData.declarations.articleSeven} onChange={(event) => setDeclarationValue('articleSeven', event.target.checked)} label="Declaro cumprimento do inciso XXXIII do art. 7o da Constituicao Federal." />
        <Form.Check type="checkbox" id="notice-agreement" checked={applicationData.declarations.noticeAgreement} onChange={(event) => setDeclarationValue('noticeAgreement', event.target.checked)} label="Declaro que li o edital, os anexos e concordo com as condicoes da selecao." />
      </div>

      <div className="declaration-preview">
        <div className="section-block-title">Declaracao gerada</div>

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
    </FormSection>
  )
}

function SettingsForm({ preferences, setPreferences }) {
  const updatePreference = (field) => (event) => {
    setPreferences((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  return (
    <FormSection title="Configuracoes visuais" subtitle="Aplicacao da tipografia Kanit, tema claro ou escuro e paletas acessiveis.">
      <div className="settings-stack">
        <div className="settings-block">
          <div className="section-block-title">Modo de aparencia</div>
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

        <div className="settings-block">
          <div className="section-block-title">Paleta acessivel</div>
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
    </FormSection>
  )
}

export default App
function PlaceholderStage({ title, body }) {
  return (
    <FormSection title={title} subtitle="Tela preparada para a fase seguinte do processo.">
      <p className="summary-empty">{body}</p>
    </FormSection>
  )
}

function StageFormScreen({ currentStage, applicationData, setApplicationData, progressItems, completedSteps, activeStep, preferences, setPreferences, onBack }) {
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
        return <CompanyRegistrationForm applicationData={applicationData} updateField={updateField} />
      case 'legal-contact':
        return <LegalContactForm applicationData={applicationData} updateField={updateField} />
      case 'fiscal':
        return <FiscalForm applicationData={applicationData} setUploadStatus={setUploadStatus} />
      case 'attachments':
        return <AttachmentsForm applicationData={applicationData} setUploadStatus={setUploadStatus} />
      case 'project':
        return <ProjectForm applicationData={applicationData} updateField={updateField} />
      case 'declarations':
        return <DeclarationsForm applicationData={applicationData} setDeclarationValue={setDeclarationValue} />
      case 'appeal':
        return <PlaceholderStage title="Recurso do resultado" body="Quando o edital abrir fase de recurso, este card pode receber o formulario especifico para fundamentacao e anexos." />
      case 'evaluation':
        return <PlaceholderStage title="Avaliacao final" body="Esta area pode exibir resultado, criterios de desempate, parecer da comissao e historico da proposta." />
      case 'settings':
        return <SettingsForm preferences={preferences} setPreferences={setPreferences} />
      default:
        return null
    }
  }

  return (
    <div className="candidate-dashboard registration-flow">
      <PainelNavbar onExit={onBack} />
      <main className="candidate-content registration-flow__content">
        <Container fluid className="px-0">
          <section className="page-intro">
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
          <div className="form-actions">
            <Button variant="light" className="action-button action-button--secondary" onClick={onBack}>Voltar ao painel</Button>
            <Button variant="outline-primary" className="action-button">Salvar rascunho</Button>
            <Button variant="primary" className="action-button action-button--primary">Avancar etapa</Button>
          </div>
        </Container>
      </main>
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
    { title: 'Cadastro da empresa', fields: ['companyType', 'cnpj', 'companyName', 'email', 'phone', 'address', 'bank', 'agency', 'account'] },
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

  if (screen !== 'dashboard') {
    return <StageFormScreen currentStage={screen} applicationData={applicationData} setApplicationData={setApplicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} preferences={preferences} setPreferences={setPreferences} onBack={() => setScreen('dashboard')} />
  }

  return <DashboardScreen onNavigate={setScreen} />
}
