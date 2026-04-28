import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { AppFooter } from '../shared/AppBrand'

export function AuthScreen({ onLogin, onStartRegistration, onSkipToDashboard, authData, setAuthData }) {
  const canLogin = Boolean(authData.email.trim() && authData.password.trim())

  return (
    <div className="candidate-dashboard auth-screen">
      <main className="candidate-content auth-screen__content">
        <Container>
          <Row className="g-4 align-items-stretch justify-content-center">
            <Col lg={5} className="order-2 order-lg-2">
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
            <Col lg={5} className="order-1 order-lg-1">
              <Card className="form-section-card auth-side-card">
                <Card.Body className="auth-card__body">
                  <p className="eyebrow">Primeiro acesso</p>
                  <h1>Cadastrar</h1>
                  <p>O cadastro do proponente é o primeiro passo. Após a conclusão, você será direcionado ao painel principal.</p>
                  <div className="auth-side-card__cta">
                    <div className="auth-side-card__icon">
                      <i className="bi bi-buildings" />
                    </div>
                    <Button type="button" variant="light" className="action-button action-button--secondary auth-side-card__button" onClick={onStartRegistration}>
                      Cadastrar
                    </Button>
                  </div>
                  <button type="button" className="auth-side-card__skip" onClick={onSkipToDashboard}>
                    Pular e ir para a área do proponente
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
