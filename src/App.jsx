import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from 'react-bootstrap'
import './App.css'

const selection = {
  title: 'Painel do Candidato',
  notice: 'EDITAL 03/2026 — PROJETO IMPLANTAÇÃO REDE SAÚDE · DIEPS',
  candidateName: 'Francisco José Cardoso da Conceição',
}

const dashboardStages = [
  {
    id: 'profiles',
    title: 'Alterar Perfis',
    description: 'Etapa em andamento: edição e validação disponíveis.',
    status: 'active',
    accent: 'warning',
    actionLabel: 'Pode editar',
  },
  {
    id: 'registration',
    title: 'Dados de Inscrição',
    description: 'Etapa em andamento: edição e validação disponíveis.',
    status: 'active',
    accent: 'warning',
    actionLabel: 'Abrir etapa',
    opensFlow: true,
  },
  {
    id: 'special',
    title: 'Atendimento Especial',
    description: 'Etapa em andamento: não houve alterações.',
    status: 'available',
    accent: 'neutral',
    actionLabel: 'Aberta',
  },
  {
    id: 'social-name',
    title: 'Nome Social',
    description: 'Etapa em andamento: não houve alterações.',
    status: 'available',
    accent: 'neutral',
    actionLabel: 'Aberta',
  },
  {
    id: 'black',
    title: 'Pessoa Negra',
    description: 'Etapa em andamento: não houve alterações.',
    status: 'available',
    accent: 'neutral',
    actionLabel: 'Aberta',
  },
  {
    id: 'pcd',
    title: 'Pessoa com Deficiência',
    description: 'Etapa em andamento: não houve alterações.',
    status: 'available',
    accent: 'neutral',
    actionLabel: 'Aberta',
  },
  {
    id: 'jury',
    title: 'Comp. como Jurado',
    description: 'Etapa em andamento: não houve alterações.',
    status: 'available',
    accent: 'neutral',
    actionLabel: 'Aberta',
  },
  {
    id: 'appeal-registration',
    title: 'Recursos de Inscrição',
    description: 'Etapa concluída: não houve preenchimento.',
    status: 'completed',
    accent: 'dark',
    actionLabel: 'Encerrada',
  },
  {
    id: 'appeal-black',
    title: 'Rec. Pessoa Negra',
    description: 'Etapa concluída: não houve preenchimento.',
    status: 'completed',
    accent: 'dark',
    actionLabel: 'Encerrada',
  },
  {
    id: 'appeal-pcd',
    title: 'Recursos PCD',
    description: 'Etapa concluída: não houve preenchimento.',
    status: 'completed',
    accent: 'dark',
    actionLabel: 'Encerrada',
  },
  {
    id: 'appeal-answer',
    title: 'Rec. Gabarito',
    description: 'Etapa concluída: não houve preenchimento.',
    status: 'completed',
    accent: 'dark',
    actionLabel: 'Encerrada',
  },
  {
    id: 'appeal-stage',
    title: 'Rec. da 1ª Etapa',
    description: 'Etapa concluída: não houve preenchimento.',
    status: 'completed',
    accent: 'dark',
    actionLabel: 'Encerrada',
  },
  {
    id: 'curriculum',
    title: 'Avaliação Curricular',
    description: 'Etapa bloqueada até a abertura do período previsto no edital.',
    status: 'locked',
    accent: 'muted',
    actionLabel: 'Aguardando data',
    centered: true,
  },
]

const flowStages = [
  { id: 1, title: 'Dados Pessoais', status: 'done' },
  { id: 2, title: 'Inscrição', status: 'done' },
  { id: 3, title: 'Aval. Curricular', status: 'current' },
  { id: 4, title: 'Documentos', status: 'pending' },
  { id: 5, title: 'Revisão', status: 'pending' },
]

const stageCards = [
  { id: 1, title: 'Dados Pessoais', icon: '✓', done: true },
  { id: 2, title: 'Inscrição', icon: '◻', done: false },
  { id: 3, title: 'Aval. Curricular', icon: '◻', done: false },
  { id: 4, title: 'Documentos', icon: '◻', done: false },
  { id: 5, title: 'Revisão', icon: '◻', done: false },
]

const progressItems = [
  { title: 'Dados Pessoais', status: 'Concluído', tone: 'success' },
  { title: 'Inscrição', status: 'Concluído', tone: 'success' },
  { title: 'Aval. Curricular', status: 'Em andamento', tone: 'warning' },
  { title: 'Documentos', status: 'Pendente', tone: 'neutral' },
  { title: 'Revisão final', status: 'Pendente', tone: 'neutral' },
]

function BrandHeader({ onExit, showExit = false }) {
  return (
    <header className="candidate-header">
      <div className="candidate-header__brand">
        <div className="brand-square">
          <span>ESCOLA</span>
          <span>SAUDE</span>
        </div>

        <div>
          <h1 className="candidate-title">{selection.title}</h1>
          <p className="candidate-subtitle">{selection.notice}</p>
        </div>
      </div>

      <div className="candidate-header__actions">
        <span className="candidate-user-name">{selection.candidateName}</span>
        {showExit ? (
          <Button variant="outline-primary" className="exit-button" onClick={onExit}>
            → Sair
          </Button>
        ) : null}
      </div>
    </header>
  )
}

function StageCard({
  title,
  description,
  status,
  accent,
  actionLabel,
  centered = false,
  opensFlow = false,
  onOpen,
}) {
  return (
    <Col
      xl={centered ? { span: 2, offset: 5 } : 2}
      lg={centered ? { span: 4, offset: 4 } : 4}
      md={centered ? { span: 6, offset: 3 } : 6}
      sm={12}
      className="d-flex"
    >
      <Card
        className={`candidate-stage-card stage-${status} accent-${accent} ${opensFlow ? 'is-clickable' : ''}`}
        onClick={opensFlow ? onOpen : undefined}
      >
        <Card.Body className="candidate-stage-body">
          <div className={`stage-icon-circle icon-${accent}`}>
            <span>{status === 'completed' ? '✓' : status === 'locked' ? '⏳' : '•'}</span>
          </div>

          <Card.Title as="h3" className="stage-title">
            {title}
          </Card.Title>

          <Card.Text className="stage-description">
            {description}
          </Card.Text>

          <Badge bg="light" text="dark" className="stage-badge">
            {actionLabel}
          </Badge>
        </Card.Body>
      </Card>
    </Col>
  )
}

function DashboardScreen({ onOpenRegistration }) {
  return (
    <div className="candidate-dashboard">
      <BrandHeader />

      <main className="candidate-content">
        <Container fluid className="px-0">
          <Row className="g-4">
            {dashboardStages.map((stage) => (
              <StageCard
                key={stage.id}
                {...stage}
                onOpen={stage.opensFlow ? onOpenRegistration : undefined}
              />
            ))}
          </Row>
        </Container>
      </main>
    </div>
  )
}

function FlowPill({ title, status, step }) {
  return (
    <div className={`flow-pill flow-pill--${status}`}>
      <div className="flow-pill__index">
        {status === 'done' ? '✓' : step}
      </div>
      <span>{title}</span>
    </div>
  )
}

function StepShortcut({ title, icon, done }) {
  return (
    <Card className={`shortcut-card ${done ? 'shortcut-card--done' : ''}`}>
      <Card.Body className="shortcut-card__body">
        <span className={`shortcut-card__icon ${done ? 'is-done' : ''}`}>{icon}</span>
        <span className="shortcut-card__title">{title}</span>
      </Card.Body>
    </Card>
  )
}

function FormSection({ title, subtitle, children }) {
  return (
    <Card className="form-section-card">
      <Card.Body className="p-0">
        <div className="form-section-card__header">
          <div className="form-section-card__icon" />
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="form-section-card__content">{children}</div>
      </Card.Body>
    </Card>
  )
}

function SidebarStatus() {
  return (
    <Card className="sidebar-status-card">
      <Card.Body>
        <h3 className="sidebar-status-card__title">Situação da Inscrição</h3>

        <div className="status-line">
          <span>Status</span>
          <strong className="text-warning-emphasis">⌛ Em andamento</strong>
        </div>
        <div className="status-line">
          <span>Nº Inscrição</span>
          <strong className="text-primary">#2026-04821</strong>
        </div>
        <div className="status-line">
          <span>Etapa atual</span>
          <strong>Aval. Curricular</strong>
        </div>
        <div className="status-line">
          <span>Prazo final</span>
          <strong className="text-danger">15/04/2026</strong>
        </div>

        <div className="sidebar-progress">
          <div className="sidebar-progress__header">
            <h4>Progresso das Etapas</h4>
            <span>3/5 concluídas</span>
          </div>
          <ProgressBar now={60} variant="success" className="sidebar-progress__bar" />

          <div className="progress-list">
            {progressItems.map((item) => (
              <div key={item.title} className="progress-list__item">
                <span>{item.title}</span>
                <Badge className={`status-chip status-chip--${item.tone}`}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

function RegistrationFlowScreen({ onBack }) {
  return (
    <div className="candidate-dashboard registration-flow">
      <BrandHeader onExit={onBack} showExit />

      <main className="candidate-content registration-flow__content">
        <Container fluid className="px-0">
          <section className="flow-pills">
            {flowStages.map((stage) => (
              <FlowPill
                key={stage.id}
                title={stage.title}
                status={stage.status}
                step={stage.id}
              />
            ))}
          </section>

          <section className="page-intro">
            <div>
              <p className="eyebrow">Preenchimento guiado</p>
              <h2>Etapas</h2>
              <p>
                Dividimos o formulário em blocos menores para reduzir esforço cognitivo,
                facilitar revisão e evitar páginas extensas com rolagem.
              </p>
            </div>
          </section>

          <section className="shortcut-grid">
            <Row className="g-4">
              {stageCards.map((item) => (
                <Col xl={3} md={6} key={item.id}>
                  <StepShortcut {...item} />
                </Col>
              ))}
            </Row>
          </section>

          <Row className="g-4 align-items-start">
            <Col xl={9}>
              <div className="form-stack">
                <FormSection
                  title="Formação Acadêmica"
                  subtitle="Informe seu nível de escolaridade e a área de formação."
                >
                  <div className="section-block-title">Escolaridade</div>
                  <Row className="g-3">
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Nível de Escolaridade *</Form.Label>
                        <Form.Select defaultValue="Superior Completo">
                          <option>Superior Completo</option>
                          <option>Pós-graduação</option>
                          <option>Mestrado</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Área de Formação *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione a área...</option>
                          <option>Saúde Coletiva</option>
                          <option>Enfermagem</option>
                          <option>Gestão Pública</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Curso / Habilitação *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione o curso...</option>
                          <option>Administração Hospitalar</option>
                          <option>Enfermagem</option>
                          <option>Fisioterapia</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Instituição de Ensino *</Form.Label>
                        <Form.Control placeholder="Ex.: Universidade Federal..." />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="section-block-title mt-4">Localização da IES</div>
                  <Row className="g-3">
                    <Col lg={2} md={6}>
                      <Form.Group>
                        <Form.Label>País *</Form.Label>
                        <Form.Select defaultValue="Brasil">
                          <option>Brasil</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={2} md={6}>
                      <Form.Group>
                        <Form.Label>Estado *</Form.Label>
                        <Form.Select defaultValue="Ceará">
                          <option>Ceará</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={2} md={6}>
                      <Form.Group>
                        <Form.Label>Município *</Form.Label>
                        <Form.Select defaultValue="Fortaleza">
                          <option>Fortaleza</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Ano de Conclusão *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>2024</option>
                          <option>2023</option>
                          <option>2022</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Situação do Diploma</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>Emitido</option>
                          <option>Em emissão</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </FormSection>

                <FormSection
                  title="Experiência Profissional"
                  subtitle="Tempo de atuação na área de saúde pública."
                >
                  <Row className="g-3">
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Setor de Atuação *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>Atenção Primária</option>
                          <option>Gestão</option>
                          <option>Vigilância</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Cargo / Função *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>Analista</option>
                          <option>Coordenador</option>
                          <option>Técnico</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Vínculo Empregatício</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>CLT</option>
                          <option>Contrato temporário</option>
                          <option>Servidor público</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Âmbito de Atuação</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione...</option>
                          <option>Municipal</option>
                          <option>Estadual</option>
                          <option>Federal</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                      <Form.Group>
                        <Form.Label>Tempo de Experiência *</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="" disabled>Selecione o intervalo...</option>
                          <option>1 a 2 anos</option>
                          <option>3 a 5 anos</option>
                          <option>Mais de 5 anos</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={3} md={6}>
                      <Form.Group>
                        <Form.Label>Pontuação Prevista (meses)</Form.Label>
                        <Form.Control value="Calculado automaticamente" readOnly />
                      </Form.Group>
                    </Col>
                  </Row>
                </FormSection>
              </div>
            </Col>

            <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus />
              </div>
            </Col>
          </Row>

          <div className="form-actions">
            <Button variant="light" className="action-button action-button--secondary">
              ← Etapa anterior
            </Button>
            <Button variant="outline-primary" className="action-button">
              Salvar rascunho
            </Button>
            <Button variant="primary" className="action-button action-button--primary">
              Avançar →
            </Button>
          </div>
        </Container>
      </main>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('dashboard')

  return screen === 'dashboard' ? (
    <DashboardScreen onOpenRegistration={() => setScreen('registration-flow')} />
  ) : (
    <RegistrationFlowScreen onBack={() => setScreen('dashboard')} />
  )
}

export default App
