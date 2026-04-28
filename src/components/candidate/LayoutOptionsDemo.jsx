import React, { useMemo, useState } from 'react'
import { Row, Col, Button, Nav } from 'react-bootstrap'
import { dashboardStagesBottom, dashboardStagesTop, initialApplicationData } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { DashboardCard } from '../shared/DashboardCard'
import { PainelNavbar } from './PainelNavbar'
import { SidebarStatus } from './SidebarStatus'
import './LayoutOptionsDemo.css'

const candidateStages = dashboardStagesTop
const certameStages = dashboardStagesBottom.filter((stage) => !stage.id.startsWith('//'))
const option3CandidateStages = [
  {
    id: 'company-registration',
    title: 'Cadastro da Instituição',
    icon: 'bi-buildings',
    description: 'Dados cadastrais, endereço e conta bancaria da pessoa jurídica.',
  },
  {
    id: 'legal-contact',
    title: 'Representante Legal',
    icon: 'bi-person-vcard',
    description: 'Informações do representante legal e do contato comercial.',
  },
  {
    id: 'attachments',
    title: 'Documentos',
    icon: 'bi-folder2-open',
    description: 'Anexos institucionais, comprovantes e modelos assinados.',
  },
]
const option3CertameStages = [
  {
    id: 'project',
    title: 'Plano de Trabalho',
    icon: 'bi-kanban',
    description: 'Projeto, plano de trabalho, plano de mídia e valores.',
  },
]

const demoApplicationData = {
  ...initialApplicationData,
  companyName: 'ESCOLA DE SAUDE PUBLICA DO CEARA',
  cnpj: '73.695.868/0001-27',
  email: 'esp@esp.ce.gov.br',
  phone: '8520184810',
  legalRepresentative: 'Maria Oliveira',
  projectTitle: 'Plano de trabalho institucional',
  projectAmount: 'R$ 150.000,00',
}

const demoProgressItems = [
  { title: 'Cadastrar', status: 'Concluído', tone: 'success', done: true, current: false },
  { title: 'Representante legal', status: 'Em andamento', tone: 'warning', done: false, current: true },
  { title: 'Regularidade fiscal', status: 'Pendente', tone: 'neutral', done: false, current: false },
  { title: 'Documentos obrigatórios', status: '2 doc. rejeitados', tone: 'danger', done: false, current: false },
]

function StageGrid({ stages, gridClassName = 'dashboard-cards-grid dashboard-cards-grid--top' }) {
  return (
    <div className={gridClassName}>
      {stages.map((stage) => (
        <div key={stage.id} className="card-col">
          <DashboardCard {...stage} />
        </div>
      ))}
    </div>
  )
}

function DashboardFrame({ controls, content }) {
  return (
    <div className="painel-page layout-demo-page">
      <PainelNavbar onExit={() => {}} onGoToSettings={() => {}} portalView="candidate" onSelectPortal={() => {}} onOpenSidebar={() => {}} />
      <main className="main-wrapper">
        <div className="dashboard-shell">
          <div className="dashboard-hero">
            <div>
              <h1>Área exclusiva do proponente</h1>
              <p>Preencha as informações dos cards. O experimento abaixo muda apenas a organização entre área do candidato e área do certame.</p>
            </div>
          </div>

          <div className="layout-demo-toolbar">
            {controls}
          </div>

          <Row className="g-4 align-items-start">
            <Col xl={9}>
              {content}
            </Col>
            <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus
                  applicationData={demoApplicationData}
                  progressItems={demoProgressItems}
                  completedSteps={1}
                  activeStep="Representante legal"
                  isEditing={false}
                />
              </div>
            </Col>
          </Row>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

function LayoutOption1() {
  const [activeArea, setActiveArea] = useState('candidate')
  const stages = activeArea === 'candidate' ? candidateStages : certameStages
  const gridClassName = activeArea === 'candidate'
    ? 'dashboard-cards-grid dashboard-cards-grid--top'
    : 'dashboard-cards-grid dashboard-cards-grid--bottom layout-demo-grid--wide'

  return (
    <DashboardFrame
      controls={(
        <Nav variant="tabs" className="layout-demo-nav">
          <Nav.Item>
            <Nav.Link active={activeArea === 'candidate'} onClick={() => setActiveArea('candidate')}>
              Área do candidato
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeArea === 'certame'} onClick={() => setActiveArea('certame')}>
              Área do certame
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
      content={<StageGrid stages={stages} gridClassName={gridClassName} />}
    />
  )
}

function LayoutOption2() {
  const [activeArea, setActiveArea] = useState('candidate')
  const stages = activeArea === 'candidate' ? candidateStages : certameStages
  const title = activeArea === 'candidate' ? 'Área do candidato' : 'Área do certame'
  const description = activeArea === 'candidate'
    ? 'Visualização focada nos dados da instituição, dos responsáveis e dos documentos.'
    : 'Visualização focada na proposta vinculada ao edital e nas etapas posteriores.'
  const gridClassName = activeArea === 'candidate'
    ? 'dashboard-cards-grid dashboard-cards-grid--top'
    : 'dashboard-cards-grid dashboard-cards-grid--bottom layout-demo-grid--wide'

  return (
    <DashboardFrame
      controls={(
        <div className="layout-demo-segmented">
          <Button variant={activeArea === 'candidate' ? 'primary' : 'light'} onClick={() => setActiveArea('candidate')}>
            Área do candidato
          </Button>
          <Button variant={activeArea === 'certame' ? 'primary' : 'light'} onClick={() => setActiveArea('certame')}>
            Área do certame
          </Button>
        </div>
      )}
      content={(
        <>
          <div className="layout-demo-inline-header">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <StageGrid stages={stages} gridClassName={gridClassName} />
        </>
      )}
    />
  )
}

function LayoutOption3() {
  return (
    <DashboardFrame
      controls={<div className="layout-demo-label">Seções explícitas no mesmo fluxo</div>}
      content={(
        <div className="layout-demo-stacked">
          <section className="layout-demo-section">
            <div className="layout-demo-section__header">
              <span>Área do candidato</span>
              <h2>Dados cadastrais e documentos</h2>
              <p>Os cards mantêm a posição da dashboard atual, com um cabeçalho que deixa claro o contexto da etapa.</p>
            </div>
            <StageGrid stages={option3CandidateStages} gridClassName="dashboard-cards-grid dashboard-cards-grid--top layout-demo-grid--three" />
          </section>

          <section className="layout-demo-section">
            <div className="layout-demo-section__header">
              <span>Área do certame</span>
              <h2>Plano de trabalho e próximos passos</h2>
              <p>Os cards do certame continuam no mesmo fluxo visual, mas passam a ter agrupamento semântico explícito.</p>
            </div>
            <StageGrid stages={option3CertameStages} gridClassName="dashboard-cards-grid dashboard-cards-grid--bottom layout-demo-grid--single" />
          </section>
        </div>
      )}
    />
  )
}

export default function LayoutOptionsDemo() {
  const [activeLayout, setActiveLayout] = useState('option1')
  const activeTitle = useMemo(() => {
    if (activeLayout === 'option1') return 'Opção 1: Abas'
    if (activeLayout === 'option2') return 'Opção 2: Alternador'
    return 'Opção 3: Seções'
  }, [activeLayout])

  return (
    <div className="layout-demo-container">
      <div className="layout-selector">
        <div className="selector-content">
          <label className="selector-label">Testar organização no layout atual:</label>
          <div className="selector-buttons">
            <Button
              variant={activeLayout === 'option1' ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => setActiveLayout('option1')}
            >
              Opção 1: Abas
            </Button>
            <Button
              variant={activeLayout === 'option2' ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => setActiveLayout('option2')}
            >
              Opção 2: Alternador
            </Button>
            <Button
              variant={activeLayout === 'option3' ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => setActiveLayout('option3')}
            >
              Opção 3: Seções
            </Button>
          </div>
          <p className="layout-selector__caption">{activeTitle}</p>
        </div>
      </div>

      <div className="layout-viewport">
        {activeLayout === 'option1' && <LayoutOption1 />}
        {activeLayout === 'option2' && <LayoutOption2 />}
        {activeLayout === 'option3' && <LayoutOption3 />}
      </div>
    </div>
  )
}
