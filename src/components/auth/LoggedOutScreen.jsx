import { Card, Container } from 'react-bootstrap'
import { AppFooter } from '../shared/AppBrand'
import { PainelNavbar } from '../candidate/PainelNavbar'

export function LoggedOutScreen({ portalView, onSelectPortal, onOpenSidebar }) {
  return (
    <div className="candidate-dashboard logout-screen">
      <PainelNavbar onExit={() => {}} portalView={portalView} onSelectPortal={onSelectPortal} onOpenSidebar={onOpenSidebar} />
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
