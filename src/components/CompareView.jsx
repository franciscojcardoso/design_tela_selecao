import { Row, Col } from 'react-bootstrap'

const scenarios = [
  {
    name: 'teste_base_2',
    icon: '🧪',
    duration: '8.760 h',
    rate: '1/h',
    atendimentos: '12.847',
    tempo: '4,2h',
    gargalo: 'UTI Adulto',
    status: 'Concluída',
    statusColor: '#198754',
  },
  {
    name: 'cenario_alta_demanda',
    icon: '📈',
    duration: '8.760 h',
    rate: '2/h',
    atendimentos: '24.103',
    tempo: '7,8h',
    gargalo: 'Pronto Socorro',
    status: 'Concluída',
    statusColor: '#198754',
  },
  {
    name: 'cenario_reduzido',
    icon: '📉',
    duration: '4.380 h',
    rate: '0,5/h',
    atendimentos: '3.204',
    tempo: '2,1h',
    gargalo: 'Nenhum',
    status: 'Concluída',
    statusColor: '#198754',
  },
  {
    name: 'novo_cenário',
    icon: '➕',
    duration: '—',
    rate: '—',
    atendimentos: '—',
    tempo: '—',
    gargalo: '—',
    status: 'Não executado',
    statusColor: '#ADB5BD',
  },
]

export default function CompareView() {
  return (
    <>
      <p style={{ fontSize: 13, color: '#6C757D', marginBottom: 20 }}>
        Compare múltiplos cenários de simulação lado a lado. Cada card representa um cenário distinto.
      </p>
      <Row className="g-3">
        {scenarios.map((s) => (
          <Col sm={6} xl={3} key={s.name}>
            <div className="metric-card" style={{ alignItems: 'flex-start', textAlign: 'left', gap: 8, height: '100%' }}>
              <div className="card-icon-circle" style={{ background: '#F0F2F5', color: '#212529', fontSize: 24 }}>
                {s.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#212529' }}>{s.name}</div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: s.statusColor,
                background: s.statusColor + '18', borderRadius: 20,
                padding: '2px 8px',
              }}>{s.status}</span>

              <div style={{ width: '100%', borderTop: '1px solid #F0F2F5', paddingTop: 8, marginTop: 4 }}>
                {[
                  ['Duração', s.duration],
                  ['Taxa chegada', s.rate],
                  ['Atendimentos', s.atendimentos],
                  ['Tempo P95', s.tempo],
                  ['Gargalo', s.gargalo],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#6C757D' }}>{label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#212529' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}
