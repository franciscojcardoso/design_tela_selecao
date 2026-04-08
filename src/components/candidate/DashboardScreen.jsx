import { Col, Row } from 'react-bootstrap'
import { dashboardStagesBottom, dashboardStagesTop } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { DashboardCard } from '../shared/DashboardCard'
import { PainelNavbar } from './PainelNavbar'
import { SidebarStatus } from './SidebarStatus'

export function DashboardScreen({ onNavigate, onExit, portalView, onSelectPortal, applicationData, progressItems, completedSteps, activeStep, onOpenSidebar }) {
  return (
    <div className="painel-page">
      <PainelNavbar onExit={onExit} onGoToSettings={() => onNavigate('settings')} portalView={portalView} onSelectPortal={onSelectPortal} onOpenSidebar={onOpenSidebar} />
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
