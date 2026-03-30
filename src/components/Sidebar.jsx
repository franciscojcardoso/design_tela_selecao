import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const steps = [
  { label: 'Arquivos', active: true, done: true },
  { label: 'Parâmetros', active: true, done: true },
  { label: 'Ajuste', active: false, done: false },
  { label: 'Executar', active: false, done: false },
]

export default function Sidebar() {
  const [duration, setDuration] = useState('8760')
  const [arrivalRate, setArrivalRate] = useState('1')
  const [scenarioName, setScenarioName] = useState('teste_base_2')
  const [openFine, setOpenFine] = useState(false)

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="brand-icon">PF</div>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#212529' }}>PROJETO FILAS</span>
      </div>

      {/* Stepper */}
      <div className="stepper">
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: s.done ? '#0D6EFD' : '#E9ECEF',
                  color: s.done ? '#fff' : '#6C757D',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>
                  {s.done ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 10, color: s.done ? '#0D6EFD' : '#6C757D', marginTop: 2, textAlign: 'center' }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: 1, background: i < 1 ? '#0D6EFD' : '#DEE2E6', width: 12, marginBottom: 14 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 1: Arquivos de Entrada */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px' }}>
          <span className="section-title" style={{ padding: 0 }}>1 Arquivos de Entrada</span>
          <span style={{ fontSize: 16, color: '#6C757D', cursor: 'pointer' }}>⌃</span>
        </div>
        <div className="section-block">
          <FileCard name="setores.csv" />
          <FileCard name="matriz.csv" />
        </div>
      </div>

      {/* Section 2: Parâmetros Globais */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px' }}>
          <span className="section-title" style={{ padding: 0 }}>2 Parâmetros Globais</span>
          <span style={{ fontSize: 16, color: '#6C757D', cursor: 'pointer' }}>⌃</span>
        </div>
        <div className="section-block">
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: '#6C757D', marginBottom: 4, display: 'block' }}>
                Duração (h)
              </label>
              <Form.Control
                size="sm"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                style={{ fontSize: 13 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: '#6C757D', marginBottom: 4, display: 'block' }}>
                Taxa chegada/h <span style={{ color: '#0D6EFD' }}>ⓘ</span>
              </label>
              <Form.Control
                size="sm"
                value={arrivalRate}
                onChange={e => setArrivalRate(e.target.value)}
                style={{ fontSize: 13 }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#6C757D', marginBottom: 4, display: 'block' }}>
              Nome do cenário <span style={{ color: '#0D6EFD' }}>ⓘ</span>
            </label>
            <Form.Control
              size="sm"
              value={scenarioName}
              onChange={e => setScenarioName(e.target.value)}
              style={{ fontSize: 13 }}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Ajuste Fino */}
      <div>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px', cursor: 'pointer' }}
          onClick={() => setOpenFine(!openFine)}
        >
          <span className="section-title" style={{ padding: 0 }}>3 Ajuste Fino</span>
          <span style={{ fontSize: 16, color: '#6C757D' }}>{openFine ? '⌃' : '⌄'}</span>
        </div>
        {openFine && (
          <div className="section-block" style={{ fontSize: 12, color: '#6C757D' }}>
            Nenhum ajuste fino configurado.
          </div>
        )}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ padding: 16, borderTop: '1px solid #DEE2E6', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" size="sm" style={{ fontWeight: 600, fontSize: 13 }}>
          ▷ Executar simulação
        </Button>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline-secondary" size="sm" style={{ flex: 1, fontSize: 12 }}>
            🗑 Limpar
          </Button>
          <Button variant="outline-secondary" size="sm" style={{ flex: 1, fontSize: 12 }}>
            ↺ Restaurar
          </Button>
        </div>
      </div>
    </div>
  )
}

function FileCard({ name }) {
  return (
    <div className="file-card">
      <span className="file-icon">📄</span>
      <div>
        <div className="file-name">{name}</div>
        <div className="file-status">Carregado com sucesso</div>
      </div>
      <span className="check-icon">✓</span>
    </div>
  )
}
