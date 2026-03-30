import { Row, Col } from 'react-bootstrap'

const metrics = [
  { icon: '📥', label: 'Total de Chegadas', value: '8.760', sub: 'Pacientes simulados no período', color: '#0D6EFD' },
  { icon: '✅', label: 'Atendimentos Concluídos', value: '12.847', sub: '97,4% taxa de conclusão', color: '#198754' },
  { icon: '⏳', label: 'Tempo Médio de Espera', value: '1,8h', sub: 'Média geral por setor', color: '#FFC107' },
  { icon: '🔄', label: 'Giro de Leito', value: '4,3x', sub: 'Rotatividade média semanal', color: '#6610F2' },
  { icon: '📈', label: 'Pico de Ocupação', value: '94%', sub: 'Semana 7 — UTI Adulto', color: '#DC3545' },
  { icon: '🛑', label: 'Eventos Críticos', value: '23', sub: 'Superlotações projetadas', color: '#FD7E14' },
]

export default function DetailView() {
  return (
    <>
      <p style={{ fontSize: 13, color: '#6C757D', marginBottom: 20 }}>
        Indicadores detalhados calculados a partir da simulação. Cada card representa uma métrica consolidada do cenário.
      </p>
      <Row className="g-3">
        {metrics.map((m) => (
          <Col sm={6} lg={4} key={m.label}>
            <div className="metric-card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
              <div className="card-icon-circle" style={{ background: m.color + '20', color: m.color }}>
                {m.icon}
              </div>
              <div className="card-label" style={{ textAlign: 'left' }}>{m.label}</div>
              <div className="card-value" style={{ fontSize: 28, color: m.color }}>{m.value}</div>
              <div className="card-subvalue">{m.sub}</div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}
