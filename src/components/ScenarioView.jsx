import { Row, Col, Button } from 'react-bootstrap'
import SimpleChart from './SimpleChart'

const sectors = [
  { name: 'UTI Adulto', beds: 30, stay: 6.2, occ: 87, color: '#DC3545', trend: '↗', icon: '🫀' },
  { name: 'Enfermaria Clínica', beds: 80, stay: 4.8, occ: 74, color: '#FFC107', trend: '—', icon: '🛏' },
  { name: 'Pronto Socorro', beds: 25, stay: 1.2, occ: 92, color: '#DC3545', trend: '↗', icon: '🚨' },
  { name: 'UTI Pediátrica', beds: 12, stay: 5.5, occ: 58, color: '#198754', trend: '↘', icon: '👶' },
  { name: 'Centro Cirúrgico', beds: 18, stay: 0.8, occ: 65, color: '#6C757D', trend: '—', icon: '⚕' },
]

function occColor(occ) {
  if (occ >= 90) return '#DC3545'
  if (occ >= 80) return '#FFC107'
  return '#198754'
}

export default function ScenarioView() {
  return (
    <>
      {/* Scenario Summary */}
      <div className="scenario-summary mb-4">
        <div className="summary-item">
          <label>🧪 Cenário</label>
          <span>teste_base_2</span>
        </div>
        <div className="summary-item">
          <label>⏱ Duração simulada</label>
          <span>8.760 h</span>
        </div>
        <div className="summary-item">
          <label>⟳ Taxa de chegada</label>
          <span>1/h</span>
        </div>
        <div className="summary-item">
          <label>📁 Arquivos</label>
          <span className="link">setores.csv, matriz.csv</span>
        </div>
        <div className="summary-item">
          <label>⚙ Ajuste fino</label>
          <span>Não aplicado</span>
        </div>
      </div>

      <Row className="g-3 mb-4">
        {/* Metric Card: Atendimentos */}
        <Col md={4}>
          <div className="metric-card-wrapper">
            <div className="metric-card">
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: '#FFC107', display: 'flex', alignItems: 'center', gap: 3 }}>
                ⚠ Estimativa
              </span>
              <div className="card-icon-circle success">👥</div>
              <div className="card-label">Atendimentos estimados no cenário</div>
              <div className="card-value">12.847</div>
              <div className="delta-badge positive">+3,2% Total projetado no período simulado</div>
            </div>
          </div>
        </Col>

        {/* Metric Card: Tempo Crítico */}
        <Col md={4}>
          <div className="metric-card-wrapper">
            <div className="metric-card">
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: '#FFC107', display: 'flex', alignItems: 'center', gap: 3 }}>
                ⚠ Estimativa
              </span>
              <div className="card-icon-circle warning">⏱</div>
              <div className="card-label">Tempo crítico estimado (P95)</div>
              <div className="card-value">4,2h</div>
              <div className="delta-badge negative">-12% Percentil 95 de espera projetada</div>
            </div>
          </div>
        </Col>

        {/* Metric Card: Gargalo */}
        <Col md={4}>
          <div className="metric-card-wrapper">
            <div className="metric-card">
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: '#FFC107', display: 'flex', alignItems: 'center', gap: 3 }}>
                ⚠ Estimativa
              </span>
              <div className="card-icon-circle danger">⚠</div>
              <div className="card-label">Gargalo provável do cenário</div>
              <div className="card-value" style={{ fontSize: 22 }}>UTI Adulto</div>
              <span style={{
                background: '#DC3545', color: '#fff',
                borderRadius: 20, fontSize: 11, fontWeight: 600,
                padding: '2px 10px', marginTop: 6,
              }}>
                87% ocupação — Setor com maior pressão estimada
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-3">
        {/* Chart */}
        <Col lg={7}>
          <div className="chart-placeholder">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#212529' }}>Desempenho Projetado</div>
                <div style={{ fontSize: 12, color: '#6C757D' }}>Evolução semanal estimada dos indicadores do cenário</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['12 sem', '24 sem', '52 sem'].map((l, i) => (
                  <button key={i} style={{
                    padding: '4px 10px', fontSize: 11, border: '1px solid #DEE2E6',
                    borderRadius: 6, background: i === 0 ? '#212529' : '#fff',
                    color: i === 0 ? '#fff' : '#6C757D', cursor: 'pointer', fontWeight: i === 0 ? 600 : 400,
                  }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <SimpleChart />
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 11, color: '#0DCAF0', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 20, height: 2, background: '#0DCAF0', display: 'inline-block' }} />
                Ocupação (%)
              </span>
              <span style={{ fontSize: 11, color: '#6C757D', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 20, height: 2, background: '#6C757D', borderStyle: 'dashed', display: 'inline-block', borderWidth: 1 }} />
                Espera (h)
              </span>
            </div>
          </div>
        </Col>

        {/* Sector outcome cards — card grid like 4th image */}
        <Col lg={5}>
          <div style={{ background: '#fff', border: '1px solid #DEE2E6', borderRadius: 10, padding: 16, height: '100%' }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#212529', marginBottom: 4 }}>Desfechos Projetados</div>
            <div style={{ fontSize: 12, color: '#6C757D', marginBottom: 14 }}>Estimativa de ocupação e permanência por setor</div>
            <Row className="g-2">
              {sectors.map((s) => (
                <Col xs={6} key={s.name}>
                  <div className="sector-card">
                    <div className="card-icon-circle" style={{ background: '#F0F2F5', color: '#212529' }}>
                      {s.icon}
                    </div>
                    <div className="sector-name">{s.name}</div>
                    <div className="sector-detail">{s.beds} leitos · Perm. média {s.stay} dias</div>
                    <div className="occ-bar-wrapper">
                      <div className="occ-bar" style={{ width: `${s.occ}%`, background: occColor(s.occ) }} />
                    </div>
                    <div className="occ-pct" style={{ color: occColor(s.occ), fontSize: 16 }}>
                      {s.occ}% <span style={{ fontSize: 14 }}>{s.trend}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  )
}
