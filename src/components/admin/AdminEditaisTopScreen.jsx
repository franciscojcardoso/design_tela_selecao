import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { initialEditalForm, initialEditais, initialSetores } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { AdministradorConfirmModal, AdministradorSuccessModal } from './AdminModals'
import { AdministradorNavbar } from './AdminNavbar'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtIso(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function isDateReached(isoDate) {
  if (!isoDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(isoDate + 'T00:00:00')
  return today >= target
}

// ─── Modal PDF de resultado ───────────────────────────────────────────────────

function ResultadoPdfModal({ edital, tipo, onClose }) {
  const title = tipo === 'preliminar' ? 'Resultado Preliminar' : 'Resultado Final'
  return (
    <div className="Administrador-modal-backdrop doc-viewer-backdrop" onClick={onClose}>
      <section
        className="Administrador-modal-card doc-viewer-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="Administrador-modal-card__header">
          <div className="Administrador-modal-card__headline">
            <i className="bi bi-file-earmark-bar-graph" />
            <div>
              <h3>{title}</h3>
              <span className="doc-viewer-card__type">{edital.descricao}</span>
            </div>
          </div>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose} aria-label="Fechar">
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="doc-viewer-card__body">
          <div className="doc-viewer-placeholder">
            <i className="bi bi-file-earmark-pdf doc-viewer-placeholder__icon" />
            <p className="doc-viewer-placeholder__label">Pré-visualização do documento</p>
            <p className="doc-viewer-placeholder__name">{title}</p>
            <p className="doc-viewer-placeholder__type">{edital.descricao}</p>
          </div>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button type="button" variant="primary" className="action-button">
            <i className="bi bi-download me-2" />
            Baixar documento
          </Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Dropdown Gerenciar edital ────────────────────────────────────────────────

function DropdownItem({ icon, label, onClick, danger, disabled, hint }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        width: '100%', padding: '0.55rem 1rem', background: 'none',
        border: 0, textAlign: 'left', cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        color: disabled ? 'var(--color-text-muted)' : danger ? 'var(--color-danger)' : 'var(--color-text)',
        whiteSpace: 'nowrap',
        opacity: disabled ? 0.55 : 1,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'var(--color-bg)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: '0.9rem', width: '1rem', textAlign: 'center' }} />
      <span style={{ flex: 1 }}>{label}</span>
      {disabled && hint && (
        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>{hint}</span>
      )}
    </button>
  )
}

function GerenciarEditalDropdown({ row, onEditar, onExcluir, onResultadoPreliminar, onResultadoFinal }) {
  const [open, setOpen] = useState(false)
  const preliminarEnabled = isDateReached(row.data_resultado_preliminar)
  const finalEnabled = isDateReached(row.data_resultado_final)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ display: 'flex', gap: 0 }}>
        <Button
          className="Administrador-users-add-button"
          style={{ borderRadius: '0.35rem 0 0 0.35rem', borderRight: '1px solid rgba(255,255,255,0.25)', fontSize: '0.825rem', minWidth: 'auto', padding: '0.4rem 0.85rem' }}
          onClick={() => setOpen((v) => !v)}
        >
          Gerenciar edital
        </Button>
        <Button
          className="Administrador-users-add-button"
          style={{ borderRadius: '0 0.35rem 0.35rem 0', minWidth: 'auto', padding: '0.4rem 0.6rem' }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Opções do edital"
        >
          <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }} />
        </Button>
      </div>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 3px)',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: '0.5rem', boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            zIndex: 100, minWidth: '17rem', overflow: 'hidden',
          }}>
            <DropdownItem icon="bi-calendar-event" label="Eventos do edital" onClick={() => setOpen(false)} />
            <DropdownItem icon="bi-clipboard-data" label="Avaliar projetos" onClick={() => setOpen(false)} />
            <DropdownItem icon="bi-people" label="Avaliadores" onClick={() => setOpen(false)} />
            <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.2rem 0' }} />
            <DropdownItem
              icon="bi-bar-chart-steps"
              label="Resultado Preliminar"
              disabled={!preliminarEnabled}
              hint={!preliminarEnabled ? fmtIso(row.data_resultado_preliminar) : undefined}
              onClick={() => { setOpen(false); onResultadoPreliminar(row) }}
            />
            <DropdownItem
              icon="bi-trophy"
              label="Resultado Final"
              disabled={!finalEnabled}
              hint={!finalEnabled ? fmtIso(row.data_resultado_final) : undefined}
              onClick={() => { setOpen(false); onResultadoFinal(row) }}
            />
            <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.2rem 0' }} />
            <DropdownItem icon="bi-pencil" label="Editar" onClick={() => { setOpen(false); onEditar(row) }} />
            <DropdownItem icon="bi-trash" label="Excluir" danger onClick={() => { setOpen(false); onExcluir(row) }} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Modal criar/editar edital ────────────────────────────────────────────────

function EditalModal({ title, formData, onChange, onClose, onSubmit, submitLabel }) {
  return (
    <div className="Administrador-modal-backdrop">
      <section className="Administrador-modal-card Administrador-modal-card--form">
        <header className="Administrador-modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Descrição *</Form.Label>
                <Form.Control value={formData.descricao} onChange={onChange('descricao')} placeholder="Insira a descrição do edital" />
              </Form.Group>
            </Col>
            <Col md={6}><Form.Group><Form.Label>Data início inscrições *</Form.Label><Form.Control type="date" value={formData.data_inicio_inscricoes} onChange={onChange('data_inicio_inscricoes')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Hora início inscrições</Form.Label><Form.Control type="time" value={formData.hora_inicio_inscricoes} onChange={onChange('hora_inicio_inscricoes')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Data final inscrições *</Form.Label><Form.Control type="date" value={formData.data_final_inscricoes} onChange={onChange('data_final_inscricoes')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Hora final inscrições</Form.Label><Form.Control type="time" value={formData.hora_final_inscricoes} onChange={onChange('hora_final_inscricoes')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Data resultado preliminar</Form.Label><Form.Control type="date" value={formData.data_resultado_preliminar} onChange={onChange('data_resultado_preliminar')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Data início recurso</Form.Label><Form.Control type="date" value={formData.data_inicio_recurso} onChange={onChange('data_inicio_recurso')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Hora início recurso</Form.Label><Form.Control type="time" value={formData.hora_inicio_recurso} onChange={onChange('hora_inicio_recurso')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Data final recurso</Form.Label><Form.Control type="date" value={formData.data_final_recurso} onChange={onChange('data_final_recurso')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Hora final recurso</Form.Label><Form.Control type="time" value={formData.hora_final_recurso} onChange={onChange('hora_final_recurso')} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Data resultado final</Form.Label><Form.Control type="date" value={formData.data_resultado_final} onChange={onChange('data_resultado_final')} /></Form.Group></Col>
            <Col xs={12}>
              <Form.Check type="checkbox" id="edital-top-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="action-button" onClick={onSubmit}>{submitLabel || 'Salvar'}</Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Tela principal de Editais ────────────────────────────────────────────────

export function AdminEditaisTopScreen({ portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [editais, setEditais] = useState(initialEditais)
  const [setores] = useState(initialSetores)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [draftRecord, setDraftRecord] = useState(initialEditalForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [pdfModal, setPdfModal] = useState(null) // { edital, tipo: 'preliminar'|'final' }

  const setorMap = new Map(setores.map((s) => [String(s.id), s.descricao]))
  const navProps = { portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }

  const filteredRows = editais.filter((row) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [row.descricao, row.situacao ? 'em andamento' : 'encerrado'].some((v) => String(v || '').toLowerCase().includes(term))
  })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftRecord((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }))
  }

  const openCreateModal = () => { setEditingRecord(null); setDraftRecord(initialEditalForm); setIsFormOpen(true) }

  const openEditModal = (record) => {
    setEditingRecord(record)
    setDraftRecord({
      id_setor: record.id_setor, descricao: record.descricao,
      data_inicio_inscricoes: record.data_inicio_inscricoes, hora_inicio_inscricoes: record.hora_inicio_inscricoes,
      data_final_inscricoes: record.data_final_inscricoes, hora_final_inscricoes: record.hora_final_inscricoes,
      data_resultado_preliminar: record.data_resultado_preliminar,
      data_inicio_recurso: record.data_inicio_recurso, hora_inicio_recurso: record.hora_inicio_recurso,
      data_final_recurso: record.data_final_recurso, hora_final_recurso: record.hora_final_recurso,
      data_resultado_final: record.data_resultado_final, situacao: record.situacao,
    })
    setIsFormOpen(true)
  }

  const handlePersistRequest = () => {
    if (!draftRecord.descricao.trim() || !draftRecord.data_inicio_inscricoes || !draftRecord.data_final_inscricoes) return
    setConfirmState({ type: editingRecord ? 'edit' : 'create', payload: editingRecord ? { ...editingRecord, ...draftRecord } : draftRecord })
  }

  const handleConfirm = () => {
    if (!confirmState) return
    if (confirmState.type === 'create') {
      setEditais((es) => [...es, { ...confirmState.payload, id: Math.max(0, ...editais.map((e) => e.id)) + 1 }])
      setSuccessMessage('Edital criado com sucesso.')
    }
    if (confirmState.type === 'edit') {
      setEditais((es) => es.map((e) => e.id === confirmState.payload.id ? { ...e, ...confirmState.payload } : e))
      setSuccessMessage('Edital atualizado com sucesso.')
    }
    if (confirmState.type === 'delete') {
      setEditais((es) => es.filter((e) => e.id !== confirmState.payload.id))
      setSuccessMessage('Edital removido com sucesso.')
    }
    setConfirmState(null); setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialEditalForm)
  }

  return (
    <div className="Administrador-page">
      <AdministradorNavbar {...navProps} />
      <main className="Administrador-main">
        <div className="Administrador-detail-header">
          <div>
            <button type="button" className="Administrador-back-link" onClick={() => onNavigate('dashboard')}>
              <i className="bi bi-arrow-left" />
              <span>Voltar ao painel</span>
            </button>
            <h2>Gerenciar Editais</h2>
            <p>Editais de chamamento público, eventos e projetos a serem analisados.</p>
          </div>
        </div>

        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-users-crud__topbar">
            <div className="Administrador-users-search">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por título do Edital"
              />
              <button type="button" aria-label="Pesquisar"><i className="bi bi-search" /></button>
            </div>
            <Button type="button" className="Administrador-users-add-button" onClick={openCreateModal}>
              <i className="bi bi-plus-square" />
              <span>Adicionar registro</span>
            </Button>
          </div>

          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-users-table Administrador-table--cards">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Setor</th>
                  <th>Período do edital</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Título">{row.descricao}</td>
                    <td data-label="Setor">{setorMap.get(String(row.id_setor)) || `Setor ${row.id_setor}`}</td>
                    <td data-label="Período do edital">
                      {fmtIso(row.data_inicio_inscricoes)} a {fmtIso(row.data_final_inscricoes)}
                    </td>
                    <td data-label="Status">
                      {row.situacao
                        ? <span className="status-chip status-chip--success">Em andamento</span>
                        : <span className="status-chip status-chip--neutral">Encerrado</span>}
                    </td>
                    <td data-label="Ações">
                      <GerenciarEditalDropdown
                        row={row}
                        onEditar={openEditModal}
                        onExcluir={(r) => setConfirmState({ type: 'delete', payload: r })}
                        onResultadoPreliminar={(edital) => setPdfModal({ edital, tipo: 'preliminar' })}
                        onResultadoFinal={(edital) => setPdfModal({ edital, tipo: 'final' })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="Administrador-users-crud__footer">
            <div className="Administrador-users-pagination">
              <button type="button" disabled>Anterior</button>
              <button type="button" className="is-active">1</button>
              <button type="button" disabled>Próximo</button>
            </div>
            <span>Mostrando de 1 até {filteredRows.length} de {editais.length} registros</span>
            <div className="Administrador-users-per-page">
              <strong>Exibir</strong>
              <div className="Administrador-users-per-page__value">10</div>
              <i className="bi bi-chevron-down" style={{ fontSize: '0.7rem' }} />
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {pdfModal && (
        <ResultadoPdfModal
          edital={pdfModal.edital}
          tipo={pdfModal.tipo}
          onClose={() => setPdfModal(null)}
        />
      )}
      {isFormOpen && (
        <EditalModal
          title={editingRecord ? 'Editar edital' : 'Adicionar edital'}
          formData={draftRecord}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialEditalForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingRecord ? 'Salvar alterações' : 'Salvar'}
        />
      )}
      {confirmState && (
        <AdministradorConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do edital' : 'Confirmar modificação do edital'}
          message={confirmState.type === 'delete' ? 'Esse edital será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}
