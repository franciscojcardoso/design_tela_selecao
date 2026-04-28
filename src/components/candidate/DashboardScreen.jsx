import { Col, Row, Button } from 'react-bootstrap'
import { dashboardStagesBottom, dashboardStagesTop } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { DashboardCard } from '../shared/DashboardCard'
import { PainelNavbar } from './PainelNavbar'
import { SidebarStatus } from './SidebarStatus'

export function DashboardScreen({ onNavigate, onExit, portalView, onSelectPortal, applicationData, progressItems, completedSteps, activeStep, onOpenSidebar, onShowLayoutDemo }) {
  const candidateStages = [
    {
      ...dashboardStagesTop.find((stage) => stage.id === 'company-registration'),
      title: 'Cadastro da Instituição',
      description: 'Dados cadastrais, endereço e conta bancaria da pessoa jurídica.',
    },
    {
      ...dashboardStagesTop.find((stage) => stage.id === 'legal-contact'),
      title: 'Representante Legal',
      description: 'Informações do representante legal e do contato comercial.',
    },
    {
      ...dashboardStagesTop.find((stage) => stage.id === 'attachments'),
      title: 'Documentos',
      description: 'Anexos institucionais, comprovantes e modelos assinados.',
    },
  ]

  const certameStages = [
    {
      ...dashboardStagesBottom.find((stage) => stage.id === 'project'),
      title: 'Plano de Trabalho',
      description: 'Projeto, plano de trabalho, plano de mídia e valores.',
      startDate: '',
      endDate: '',
    },
  ]

  return (
    <div className="painel-page">
      <PainelNavbar onExit={onExit} onGoToSettings={() => onNavigate('settings')} portalView={portalView} onSelectPortal={onSelectPortal} onOpenSidebar={onOpenSidebar} />
      <main className="main-wrapper">
        <div className="dashboard-shell">
          <div className="dashboard-hero">
            <div>
              <h1>Área exclusiva do proponente</h1>
              <p>Preencha as informações dos cards. O plano de trabalho fica separado para destacar o que pertence ao certame.</p>
            </div>
          </div>

          <Row className="g-4 align-items-start">
            <Col xl={9}>
              <section className="dashboard-stage-section">
                <div className="dashboard-stage-section__header">
                  <span className="dashboard-stage-section__eyebrow">Área do Candidato</span>
                  <h2>Dados cadastrais e documentos</h2>
                  <p>Concentre aqui o cadastro da instituição, os responsáveis e os documentos exigidos para participação.</p>
                </div>
                <div className="dashboard-cards-grid dashboard-cards-grid--top dashboard-cards-grid--candidate">
                  {candidateStages.map((stage) => (
                    <div key={stage.id} className="card-col">
                      <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
                    </div>
                  ))}
                </div>
              </section>
              <section className="dashboard-stage-section dashboard-stage-section--certame">
                <div className="dashboard-stage-section__header">
                  <span className="dashboard-stage-section__eyebrow">Área do Certame</span>
                  <h2>Plano de trabalho</h2>
                  <p>Esta área reúne o conteúdo da proposta vinculado ao edital, separado do cadastro institucional.</p>
                </div>
                <div className="dashboard-cards-grid dashboard-cards-grid--bottom dashboard-cards-grid--certame">
                  {certameStages.map((stage) => (
                    <div key={stage.id} className="card-col">
                      <DashboardCard {...stage} onCardClick={() => onNavigate(stage.navigateTo)} />
                    </div>
                  ))}
                </div>
              </section>
            </Col>
            <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} isEditing={false} />
              </div>
            </Col>
          </Row>

          {/* Botão flutuante para acessar demo de layouts */}
          {onShowLayoutDemo && (
            <Button 
              onClick={onShowLayoutDemo}
              variant="light"
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '2px solid #0d6efd',
                color: '#0d6efd',
                fontSize: '1.5rem',
                zIndex: 999,
                cursor: 'pointer'
              }}
              title="Testar layouts (Ctrl+Shift+L)"
            >
              <i className="bi bi-layout-split" style={{ fontSize: '1.5rem' }} />
            </Button>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
