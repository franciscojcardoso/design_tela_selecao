import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { AppFooter } from '../shared/AppBrand'
import { AdministradorSuccessModal } from './AdminModals'
import { AdministradorNavbar } from './AdminNavbar'

// ─── Sample data ──────────────────────────────────────────────────────────────

const sampleResultados = [
  { id: 1, instituicao: 'Instituto Vida', projeto: 'Fortalecimento da atenção territorial', pontuacao_preliminar: 85.5, resultado_preliminar: 'classificado', recurso: null, pontuacao_final: null, resultado_final: null },
  { id: 2, instituicao: 'Clínica Horizonte', projeto: 'Inovação em educação permanente', pontuacao_preliminar: 72.0, resultado_preliminar: 'classificado', recurso: 'interposto', pontuacao_final: null, resultado_final: null },
  { id: 3, instituicao: 'Associação Soma', projeto: 'Implantação e implementação da rede saúde', pontuacao_preliminar: 68.5, resultado_preliminar: 'desclassificado', recurso: 'interposto', pontuacao_final: null, resultado_final: null },
  { id: 4, instituicao: 'Rede Saúde Popular', projeto: 'Programa de atenção primária', pontuacao_preliminar: 55.0, resultado_preliminar: 'desclassificado', recurso: null, pontuacao_final: null, resultado_final: null },
  { id: 5, instituicao: 'Projeto Sanar', projeto: 'Expansão da cobertura territorial', pontuacao_preliminar: null, resultado_preliminar: null, recurso: null, pontuacao_final: null, resultado_final: null },
]

const sampleEventos = [
  { id: 1, tipo: 'resultado_preliminar', titulo: 'Publicação do resultado preliminar', data: '2026-04-22', hora: '18:00', publicado: true },
  { id: 2, tipo: 'abertura_recurso', titulo: 'Abertura do período de recursos', data: '2026-04-23', hora: '08:00', publicado: true },
  { id: 3, tipo: 'encerramento_recurso', titulo: 'Encerramento do período de recursos', data: '2026-04-25', hora: '23:59', publicado: true },
  { id: 4, tipo: 'resultado_final', titulo: 'Publicação do resultado final', data: '2026-04-30', hora: '18:00', publicado: false },
]

const tipoEventoOptions = [
  { value: 'resultado_preliminar', label: 'Resultado preliminar' },
  { value: 'abertura_recurso', label: 'Abertura do período de recursos' },
  { value: 'encerramento_recurso', label: 'Encerramento do período de recursos' },
  { value: 'resultado_final', label: 'Resultado final' },
]

// ─── Shared helpers ───────────────────────────────────────────────────────────

function fmtDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function ResultadoBadge({ valor }) {
  if (!valor) return <span className="status-chip status-chip--neutral">Pendente</span>
  if (valor === 'classificado') {
    return <span className="status-chip" style={{ background: 'var(--color-success)', color: '#fff', border: 0 }}>Classificado</span>
  }
  return <span className="status-chip" style={{ background: 'var(--color-danger)', color: '#fff', border: 0 }}>Desclassificado</span>
}

function RecursoBadge({ recurso }) {
  if (!recurso) return <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>—</span>
  const map = {
    interposto: { label: 'Interposto', bg: '#8e6a02' },
    deferido: { label: 'Deferido', bg: 'var(--color-success)' },
    indeferido: { label: 'Indeferido', bg: 'var(--color-danger)' },
  }
  const { label, bg } = map[recurso] || { label: recurso, bg: 'var(--color-secondary)' }
  return <span className="status-chip" style={{ background: bg, color: '#fff', border: 0 }}>{label}</span>
}

function EventoPill({ ev, onEdit }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: ev.publicado ? 'color-mix(in srgb, var(--color-success) 10%, white)' : 'color-mix(in srgb, var(--color-warning) 8%, white)',
      border: `1px solid ${ev.publicado ? 'color-mix(in srgb, var(--color-success) 28%, white)' : 'color-mix(in srgb, var(--color-warning) 30%, white)'}`,
      borderRadius: '999px', padding: '0.2rem 0.7rem', fontSize: '0.8rem',
    }}>
      <i
        className={`bi ${ev.publicado ? 'bi-check-circle-fill' : 'bi-clock'}`}
        style={{ color: ev.publicado ? 'var(--color-success)' : '#b45309', fontSize: '0.78rem' }}
      />
      <span style={{ fontWeight: 'var(--weight-medium)' }}>{ev.titulo}</span>
      <span style={{ color: 'var(--color-text-muted)' }}>{fmtDate(ev.data)}{ev.hora ? `, ${ev.hora}` : ''}</span>
      <button
        type="button"
        style={{ background: 'none', border: 0, cursor: 'pointer', padding: '0 0.1rem', lineHeight: 1 }}
        onClick={() => onEdit(ev)}
      >
        <i className="bi bi-pencil" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }} />
      </button>
    </div>
  )
}

// ─── Shared modals ────────────────────────────────────────────────────────────

function EventoModal({ formData, onChange, onClose, onSubmit, isEditing }) {
  return (
    <div className="Administrador-modal-backdrop">
      <section className="Administrador-modal-card Administrador-modal-card--form">
        <header className="Administrador-modal-card__header">
          <h3>{isEditing ? 'Editar evento' : 'Adicionar evento'}</h3>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Tipo de evento *</Form.Label>
                <Form.Select value={formData.tipo} onChange={onChange('tipo')}>
                  <option value="">Selecione um tipo</option>
                  {tipoEventoOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Título do evento *</Form.Label>
                <Form.Control
                  value={formData.titulo}
                  onChange={onChange('titulo')}
                  placeholder="Ex: Publicação do resultado preliminar"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Data *</Form.Label>
                <Form.Control type="date" value={formData.data} onChange={onChange('data')} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hora</Form.Label>
                <Form.Control type="time" value={formData.hora} onChange={onChange('hora')} />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="action-button" onClick={onSubmit}>
            {isEditing ? 'Salvar alterações' : 'Adicionar evento'}
          </Button>
        </footer>
      </section>
    </div>
  )
}

function ResultadoProjetoModal({ row, fase, onClose, onSubmit }) {
  const [pontuacao, setPontuacao] = useState(
    fase === 'preliminar' ? String(row.pontuacao_preliminar ?? '') : String(row.pontuacao_final ?? ''),
  )
  const [resultado, setResultado] = useState(
    fase === 'preliminar' ? (row.resultado_preliminar ?? '') : (row.resultado_final ?? ''),
  )
  const [recurso, setRecurso] = useState(row.recurso ?? '')

  return (
    <div className="Administrador-modal-backdrop">
      <section className="Administrador-modal-card Administrador-modal-card--form">
        <header className="Administrador-modal-card__header">
          <h3>{fase === 'preliminar' ? 'Resultado preliminar' : 'Resultado final'} — {row.instituicao}</h3>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>{row.projeto}</p>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Pontuação</Form.Label>
                <Form.Control
                  type="number" min="0" max="100" step="0.1"
                  value={pontuacao}
                  onChange={(e) => setPontuacao(e.target.value)}
                  placeholder="0.0 – 100.0"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Resultado</Form.Label>
                <Form.Select value={resultado} onChange={(e) => setResultado(e.target.value)}>
                  <option value="">Pendente</option>
                  <option value="classificado">Classificado</option>
                  <option value="desclassificado">Desclassificado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {fase === 'final' && (
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Situação do recurso</Form.Label>
                  <Form.Select value={recurso} onChange={(e) => setRecurso(e.target.value)}>
                    <option value="">Nenhum</option>
                    <option value="interposto">Interposto</option>
                    <option value="deferido">Deferido</option>
                    <option value="indeferido">Indeferido</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button
            variant="primary"
            className="action-button"
            onClick={() => onSubmit({ pontuacao: pontuacao ? Number(pontuacao) : null, resultado: resultado || null, recurso: recurso || null })}
          >
            Salvar resultado
          </Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Section top bar (shared between A sections) ──────────────────────────────

function SectionTopBar({ title, icon, iconColor, eventList, onAddEvento, onEditEvento }) {
  return (
    <>
      <div className="Administrador-management-card__topline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className={`bi ${icon}`} style={{ fontSize: '1.1rem', color: iconColor }} />
          <strong style={{ fontSize: '1rem' }}>{title}</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button type="button" className="Administrador-inline-action" onClick={onAddEvento}>
            <i className="bi bi-calendar-plus" style={{ marginRight: '0.3rem' }} />
            Adicionar evento
          </button>
          <button
            type="button"
            className="Administrador-inline-action"
            style={{ background: 'var(--color-primary)', color: '#fff', border: 0 }}
          >
            <i className="bi bi-eye" style={{ marginRight: '0.3rem' }} />
            Pré-visualizar
          </button>
          <button
            type="button"
            className="Administrador-inline-action"
            style={{ background: iconColor, color: '#fff', border: 0 }}
          >
            <i className="bi bi-send" style={{ marginRight: '0.3rem' }} />
            Emitir resultado
          </button>
        </div>
      </div>
      {eventList.length > 0 && (
        <div style={{ padding: '0.25rem 1.25rem 0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {eventList.map((ev) => <EventoPill key={ev.id} ev={ev} onEdit={onEditEvento} />)}
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT A — Seções empilhadas (segue padrão do sistema)
// ═══════════════════════════════════════════════════════════════════════════════

export function AdminResultadosScreen({ edital, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar, onBack }) {
  const editalName = edital?.descricao ?? 'Edital'

  const [resultados, setResultados] = useState(sampleResultados)
  const [eventos, setEventos] = useState(sampleEventos)
  const [eventoForm, setEventoForm] = useState(null)
  const [editandoEvento, setEditandoEvento] = useState(null)
  const [editandoResultado, setEditandoResultado] = useState(null)
  const [editandoFase, setEditandoFase] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const updateEventoField = (field) => (e) => setEventoForm((f) => ({ ...f, [field]: e.target.value }))
  const openAddEvento = () => { setEditandoEvento(null); setEventoForm({ tipo: '', titulo: '', data: '', hora: '' }) }
  const openEditEvento = (ev) => { setEditandoEvento(ev); setEventoForm({ tipo: ev.tipo, titulo: ev.titulo, data: ev.data, hora: ev.hora }) }

  const saveEvento = () => {
    if (!eventoForm.tipo || !eventoForm.titulo || !eventoForm.data) return
    if (editandoEvento) {
      setEventos((es) => es.map((e) => e.id === editandoEvento.id ? { ...e, ...eventoForm } : e))
      setSuccessMessage('Evento atualizado com sucesso.')
    } else {
      const newId = Math.max(0, ...eventos.map((e) => e.id)) + 1
      setEventos((es) => [...es, { id: newId, ...eventoForm, publicado: false }])
      setSuccessMessage('Evento adicionado com sucesso.')
    }
    setEventoForm(null); setEditandoEvento(null)
  }

  const saveResultado = ({ pontuacao, resultado, recurso }) => {
    setResultados((rs) => rs.map((r) => {
      if (r.id !== editandoResultado.id) return r
      if (editandoFase === 'preliminar') return { ...r, pontuacao_preliminar: pontuacao, resultado_preliminar: resultado }
      return { ...r, pontuacao_final: pontuacao, resultado_final: resultado, recurso }
    }))
    setSuccessMessage('Resultado salvo com sucesso.')
    setEditandoResultado(null); setEditandoFase(null)
  }

  const eventosPreliminares = eventos.filter((e) => ['resultado_preliminar', 'abertura_recurso', 'encerramento_recurso'].includes(e.tipo))
  const eventosFinal = eventos.filter((e) => e.tipo === 'resultado_final')

  return (
    <div className="Administrador-page">
      <AdministradorNavbar
        portalView={portalView} onSelectPortal={onSelectPortal}
        AdministradorScreen={AdministradorScreen} onNavigate={onNavigate}
        onExit={onExit} onOpenSidebar={onOpenSidebar}
      />
      <main className="Administrador-main">
        <div className="Administrador-detail-header">
          <div>
            <button type="button" className="Administrador-back-link" onClick={onBack}>
              <i className="bi bi-arrow-left" />
              <span>Voltar à lista de editais</span>
            </button>
            <h2>Resultados — {editalName}</h2>
            <p>Gerencie os resultados preliminar e final dos projetos inscritos neste edital.</p>
          </div>
        </div>

        {/* ── Resultado Preliminar ── */}
        <section className="Administrador-management-card Administrador-users-crud" style={{ marginBottom: '1.5rem' }}>
          <SectionTopBar
            title="Resultado Preliminar"
            icon="bi-bar-chart-steps"
            iconColor="var(--color-primary)"
            eventList={eventosPreliminares}
            onAddEvento={openAddEvento}
            onEditEvento={openEditEvento}
          />
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-table--cards">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Instituição</th>
                  <th>Projeto</th>
                  <th>Pontuação</th>
                  <th>Resultado</th>
                  <th>Recurso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((row, idx) => (
                  <tr key={row.id}>
                    <td data-label="#">{row.resultado_preliminar === 'classificado' ? idx + 1 : '—'}</td>
                    <td data-label="Instituição">{row.instituicao}</td>
                    <td data-label="Projeto">{row.projeto}</td>
                    <td data-label="Pontuação">
                      {row.pontuacao_preliminar != null ? row.pontuacao_preliminar.toFixed(1) : '—'}
                    </td>
                    <td data-label="Resultado"><ResultadoBadge valor={row.resultado_preliminar} /></td>
                    <td data-label="Recurso"><RecursoBadge recurso={row.recurso} /></td>
                    <td data-label="Ações">
                      <button
                        type="button"
                        className="Administrador-inline-action"
                        onClick={() => { setEditandoResultado(row); setEditandoFase('preliminar') }}
                      >
                        Editar resultado
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Administrador-users-crud__footer" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
            <span>Mostrando {resultados.length} projeto(s)</span>
          </div>
        </section>

        {/* ── Resultado Final ── */}
        <section className="Administrador-management-card Administrador-users-crud">
          <SectionTopBar
            title="Resultado Final"
            icon="bi-trophy"
            iconColor="var(--color-success)"
            eventList={eventosFinal}
            onAddEvento={openAddEvento}
            onEditEvento={openEditEvento}
          />
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-table--cards">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Instituição</th>
                  <th>Projeto</th>
                  <th>Resultado preliminar</th>
                  <th>Recurso</th>
                  <th>Pontuação final</th>
                  <th>Resultado final</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((row, idx) => (
                  <tr key={row.id}>
                    <td data-label="#">{row.resultado_final === 'classificado' ? idx + 1 : '—'}</td>
                    <td data-label="Instituição">{row.instituicao}</td>
                    <td data-label="Projeto">{row.projeto}</td>
                    <td data-label="Resultado preliminar"><ResultadoBadge valor={row.resultado_preliminar} /></td>
                    <td data-label="Recurso"><RecursoBadge recurso={row.recurso} /></td>
                    <td data-label="Pontuação final">
                      {row.pontuacao_final != null ? row.pontuacao_final.toFixed(1) : '—'}
                    </td>
                    <td data-label="Resultado final"><ResultadoBadge valor={row.resultado_final} /></td>
                    <td data-label="Ações">
                      <button
                        type="button"
                        className="Administrador-inline-action"
                        onClick={() => { setEditandoResultado(row); setEditandoFase('final') }}
                      >
                        Editar resultado
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Administrador-users-crud__footer" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
            <span>Mostrando {resultados.length} projeto(s)</span>
          </div>
        </section>
      </main>
      <AppFooter />

      {eventoForm !== null && (
        <EventoModal
          formData={eventoForm}
          onChange={updateEventoField}
          onClose={() => { setEventoForm(null); setEditandoEvento(null) }}
          onSubmit={saveEvento}
          isEditing={!!editandoEvento}
        />
      )}
      {editandoResultado && (
        <ResultadoProjetoModal
          row={editandoResultado}
          fase={editandoFase}
          onClose={() => { setEditandoResultado(null); setEditandoFase(null) }}
          onSubmit={saveResultado}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT B — Stepper de fases com tabela dinâmica (layout alternativo)
// ═══════════════════════════════════════════════════════════════════════════════

const fasesConfig = [
  { key: 'preliminar', label: 'Resultado Preliminar', icon: 'bi-bar-chart-steps', color: 'var(--color-primary)', colorHex: '#005fc9' },
  { key: 'recurso', label: 'Período de Recursos', icon: 'bi-chat-left-text', color: '#8e6a02', colorHex: '#8e6a02' },
  { key: 'final', label: 'Resultado Final', icon: 'bi-trophy', color: 'var(--color-success)', colorHex: '#18722d' },
]

function PhaseStep({ fase, index, active, count, total, onClick }) {
  const isActive = active === fase.key
  return (
    <button
      type="button"
      onClick={() => onClick(fase.key)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
        background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 1.5rem', flex: 1,
      }}
    >
      <div style={{
        width: '2.75rem', height: '2.75rem', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isActive ? fase.color : 'var(--color-bg)',
        border: `2px solid ${isActive ? fase.color : 'var(--color-border)'}`,
        color: isActive ? '#fff' : 'var(--color-text-muted)',
        fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.15s',
      }}>
        <i className={`bi ${fase.icon}`} style={{ fontSize: '1.05rem' }} />
      </div>
      <span style={{
        fontWeight: isActive ? 'var(--weight-bold)' : 'var(--weight-regular)',
        color: isActive ? fase.color : 'var(--color-text)',
        fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.3,
      }}>
        {fase.label}
      </span>
      <span style={{
        fontSize: '0.72rem', color: 'var(--color-text-muted)',
        background: isActive ? `color-mix(in srgb, ${fase.color} 12%, white)` : 'var(--color-bg)',
        border: `1px solid ${isActive ? `color-mix(in srgb, ${fase.color} 25%, white)` : 'var(--color-border)'}`,
        borderRadius: '999px', padding: '0.05rem 0.5rem',
      }}>
        {count}/{total}
      </span>
    </button>
  )
}

export function AdminResultadosScreenAlt({ edital, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar, onBack }) {
  const editalName = edital?.descricao ?? 'Edital'

  const [activeFase, setActiveFase] = useState('preliminar')
  const [resultados, setResultados] = useState(sampleResultados)
  const [eventos, setEventos] = useState(sampleEventos)
  const [eventoForm, setEventoForm] = useState(null)
  const [editandoEvento, setEditandoEvento] = useState(null)
  const [editandoResultado, setEditandoResultado] = useState(null)
  const [editandoFase, setEditandoFase] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const updateEventoField = (field) => (e) => setEventoForm((f) => ({ ...f, [field]: e.target.value }))
  const openAddEvento = () => { setEditandoEvento(null); setEventoForm({ tipo: '', titulo: '', data: '', hora: '' }) }
  const openEditEvento = (ev) => { setEditandoEvento(ev); setEventoForm({ tipo: ev.tipo, titulo: ev.titulo, data: ev.data, hora: ev.hora }) }

  const saveEvento = () => {
    if (!eventoForm.tipo || !eventoForm.titulo || !eventoForm.data) return
    if (editandoEvento) {
      setEventos((es) => es.map((e) => e.id === editandoEvento.id ? { ...e, ...eventoForm } : e))
      setSuccessMessage('Evento atualizado com sucesso.')
    } else {
      const newId = Math.max(0, ...eventos.map((e) => e.id)) + 1
      setEventos((es) => [...es, { id: newId, ...eventoForm, publicado: false }])
      setSuccessMessage('Evento adicionado com sucesso.')
    }
    setEventoForm(null); setEditandoEvento(null)
  }

  const saveResultado = ({ pontuacao, resultado, recurso }) => {
    setResultados((rs) => rs.map((r) => {
      if (r.id !== editandoResultado.id) return r
      if (editandoFase === 'preliminar') return { ...r, pontuacao_preliminar: pontuacao, resultado_preliminar: resultado }
      return { ...r, pontuacao_final: pontuacao, resultado_final: resultado, recurso }
    }))
    setSuccessMessage('Resultado salvo com sucesso.')
    setEditandoResultado(null); setEditandoFase(null)
  }

  const phaseCounts = {
    preliminar: resultados.filter((r) => r.resultado_preliminar).length,
    recurso: resultados.filter((r) => r.recurso).length,
    final: resultados.filter((r) => r.resultado_final).length,
  }

  const faseEventos = {
    preliminar: eventos.filter((e) => ['resultado_preliminar', 'abertura_recurso', 'encerramento_recurso'].includes(e.tipo)),
    recurso: eventos.filter((e) => ['abertura_recurso', 'encerramento_recurso'].includes(e.tipo)),
    final: eventos.filter((e) => e.tipo === 'resultado_final'),
  }

  const faseAtual = fasesConfig.find((f) => f.key === activeFase)

  return (
    <div className="Administrador-page">
      <AdministradorNavbar
        portalView={portalView} onSelectPortal={onSelectPortal}
        AdministradorScreen={AdministradorScreen} onNavigate={onNavigate}
        onExit={onExit} onOpenSidebar={onOpenSidebar}
      />
      <main className="Administrador-main">
        {/* Header */}
        <div className="Administrador-detail-header">
          <div>
            <button type="button" className="Administrador-back-link" onClick={onBack}>
              <i className="bi bi-arrow-left" />
              <span>Voltar à lista de editais</span>
            </button>
            <h2>Resultados — {editalName}</h2>
            <p>Gerencie os resultados preliminar e final dos projetos inscritos neste edital.</p>
          </div>
        </div>

        {/* Stepper de fases */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          padding: '1.25rem 0.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 1px 3px var(--shadow-color)',
          display: 'flex',
          alignItems: 'center',
        }}>
          {fasesConfig.map((fase, i) => (
            <div key={fase.key} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <PhaseStep
                fase={fase}
                index={i}
                active={activeFase}
                count={phaseCounts[fase.key]}
                total={resultados.length}
                onClick={setActiveFase}
              />
              {i < fasesConfig.length - 1 && (
                <div style={{ width: '2px', height: '2.75rem', background: 'var(--color-border)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* Content card */}
        <section className="Administrador-management-card Administrador-users-crud">
          {/* Top bar */}
          <div className="Administrador-management-card__topline">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <i className={`bi ${faseAtual.icon}`} style={{ fontSize: '1.1rem', color: faseAtual.color }} />
              <strong style={{ fontSize: '1rem' }}>{faseAtual.label}</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button type="button" className="Administrador-inline-action" onClick={openAddEvento}>
                <i className="bi bi-calendar-plus" style={{ marginRight: '0.3rem' }} />
                Adicionar evento
              </button>
              <button
                type="button"
                className="Administrador-inline-action"
                style={{ background: 'var(--color-primary)', color: '#fff', border: 0 }}
              >
                <i className="bi bi-eye" style={{ marginRight: '0.3rem' }} />
                Preview Results
              </button>
              <button
                type="button"
                className="Administrador-inline-action"
                style={{ background: faseAtual.color, color: '#fff', border: 0 }}
              >
                <i className="bi bi-send" style={{ marginRight: '0.3rem' }} />
                Emitir resultado
              </button>
            </div>
          </div>

          {/* Eventos da fase */}
          {faseEventos[activeFase].length > 0 && (
            <div style={{ padding: '0 1.25rem 0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 'var(--weight-medium)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Eventos desta fase
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {faseEventos[activeFase].map((ev) => (
                  <EventoPill key={ev.id} ev={ev} onEdit={openEditEvento} />
                ))}
              </div>
            </div>
          )}

          {/* Tabela dinâmica por fase */}
          <div className="Administrador-users-table-wrap">
            {activeFase === 'preliminar' && (
              <table className="Administrador-table Administrador-table--cards">
                <thead>
                  <tr><th>#</th><th>Instituição</th><th>Projeto</th><th>Pontuação</th><th>Resultado</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {resultados.map((row, idx) => (
                    <tr key={row.id}>
                      <td data-label="#">{row.resultado_preliminar === 'classificado' ? idx + 1 : '—'}</td>
                      <td data-label="Instituição">{row.instituicao}</td>
                      <td data-label="Projeto">{row.projeto}</td>
                      <td data-label="Pontuação">{row.pontuacao_preliminar != null ? row.pontuacao_preliminar.toFixed(1) : '—'}</td>
                      <td data-label="Resultado"><ResultadoBadge valor={row.resultado_preliminar} /></td>
                      <td data-label="Ações">
                        <button type="button" className="Administrador-inline-action" onClick={() => { setEditandoResultado(row); setEditandoFase('preliminar') }}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeFase === 'recurso' && (
              <table className="Administrador-table Administrador-table--cards">
                <thead>
                  <tr><th>Instituição</th><th>Projeto</th><th>Resultado preliminar</th><th>Situação do recurso</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {resultados.map((row) => (
                    <tr key={row.id}>
                      <td data-label="Instituição">{row.instituicao}</td>
                      <td data-label="Projeto">{row.projeto}</td>
                      <td data-label="Resultado preliminar"><ResultadoBadge valor={row.resultado_preliminar} /></td>
                      <td data-label="Situação do recurso"><RecursoBadge recurso={row.recurso} /></td>
                      <td data-label="Ações">
                        <button type="button" className="Administrador-inline-action" onClick={() => { setEditandoResultado(row); setEditandoFase('final') }}>
                          Editar recurso
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeFase === 'final' && (
              <table className="Administrador-table Administrador-table--cards">
                <thead>
                  <tr><th>#</th><th>Instituição</th><th>Projeto</th><th>Resultado preliminar</th><th>Recurso</th><th>Pontuação final</th><th>Resultado final</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {resultados.map((row, idx) => (
                    <tr key={row.id}>
                      <td data-label="#">{row.resultado_final === 'classificado' ? idx + 1 : '—'}</td>
                      <td data-label="Instituição">{row.instituicao}</td>
                      <td data-label="Projeto">{row.projeto}</td>
                      <td data-label="Resultado preliminar"><ResultadoBadge valor={row.resultado_preliminar} /></td>
                      <td data-label="Recurso"><RecursoBadge recurso={row.recurso} /></td>
                      <td data-label="Pontuação final">{row.pontuacao_final != null ? row.pontuacao_final.toFixed(1) : '—'}</td>
                      <td data-label="Resultado final"><ResultadoBadge valor={row.resultado_final} /></td>
                      <td data-label="Ações">
                        <button type="button" className="Administrador-inline-action" onClick={() => { setEditandoResultado(row); setEditandoFase('final') }}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="Administrador-users-crud__footer" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
            <span>Mostrando {resultados.length} projeto(s)</span>
          </div>
        </section>
      </main>
      <AppFooter />

      {eventoForm !== null && (
        <EventoModal
          formData={eventoForm}
          onChange={updateEventoField}
          onClose={() => { setEventoForm(null); setEditandoEvento(null) }}
          onSubmit={saveEvento}
          isEditing={!!editandoEvento}
        />
      )}
      {editandoResultado && (
        <ResultadoProjetoModal
          row={editandoResultado}
          fase={editandoFase}
          onClose={() => { setEditandoResultado(null); setEditandoFase(null) }}
          onSubmit={saveResultado}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}
