import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {
  basicRegistrationCards,
  basicRegistrationTitleMap,
  initialBancos,
  initialCnaes,
  initialCriteriosAvaliacao,
  initialEditalForm,
  initialEditais,
  initialSetores,
  initialTiposDocumentos,
  initialTiposInstituicao,
} from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { DashboardCard } from '../shared/DashboardCard'
import { AdminConfirmModal, AdminSuccessModal } from './AdminModals'
import { AdminNavbar } from './AdminNavbar'
import { AdminSectionHeader } from './AdminSectionHeader'

// ─── Modal genérico para tabelas simples (id, descrição, situação) ─────────────

const initialSimpleRecordForm = { descricao: '', situacao: true }

function AdminSimpleRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--form">
        <header className="admin-modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="admin-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Descrição *</Form.Label>
                <Form.Control value={formData.descricao} onChange={onChange('descricao')} placeholder="Insira a descrição" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Check type="checkbox" id="modal-simple-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="admin-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Tela CRUD genérica para tabelas simples ───────────────────────────────────

function AdminSimpleCrudScreen({ title, subtitle, rows, onCreateRecord, onUpdateRecord, onDeleteRecord, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [draftRecord, setDraftRecord] = useState(initialSimpleRecordForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [String(row.id), row.descricao, row.situacao ? 'ativo' : 'inativo'].some((v) => String(v || '').toLowerCase().includes(term))
  })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftRecord((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }))
  }

  const openCreateModal = () => { setEditingRecord(null); setDraftRecord(initialSimpleRecordForm); setIsFormOpen(true) }
  const openEditModal = (record) => { setEditingRecord(record); setDraftRecord({ descricao: record.descricao, situacao: record.situacao }); setIsFormOpen(true) }

  const handlePersistRequest = () => {
    if (!draftRecord.descricao.trim()) return
    setConfirmState({ type: editingRecord ? 'edit' : 'create', payload: editingRecord ? { ...editingRecord, ...draftRecord } : draftRecord })
  }

  const handleConfirm = () => {
    if (!confirmState) return
    if (confirmState.type === 'create') { onCreateRecord(confirmState.payload); setSuccessMessage('Registro salvo com sucesso.') }
    if (confirmState.type === 'edit') { onUpdateRecord(confirmState.payload); setSuccessMessage('Registro atualizado com sucesso.') }
    if (confirmState.type === 'delete') { onDeleteRecord(confirmState.payload.id); setSuccessMessage('Registro removido com sucesso.') }
    setConfirmState(null); setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialSimpleRecordForm)
  }

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <AdminSectionHeader title={title} subtitle={subtitle} onBack={onBack} />
        <section className="admin-management-card admin-users-crud">
          <div className="admin-users-crud__topbar">
            <div className="admin-users-search">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira uma palavra para pesquisar" />
              <button type="button" aria-label="Pesquisar"><i className="bi bi-search" /></button>
            </div>
            <Button type="button" className="admin-users-add-button" onClick={openCreateModal}>
              <i className="bi bi-plus-square" />
              <span>Adicionar registro</span>
            </Button>
          </div>
          <div className="admin-users-table-wrap">
            <table className="admin-table admin-users-table admin-table--cards">
              <thead>
                <tr><th>ID</th><th>Descrição</th><th>Situação</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="ID">{row.id}</td>
                    <td data-label="Descrição">{row.descricao}</td>
                    <td data-label="Situação">{row.situacao ? 'Ativo' : 'Inativo'}</td>
                    <td data-label="Ações">
                      <div className="admin-users-actions">
                        <button type="button" className="admin-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button type="button" className="admin-inline-action admin-inline-action--danger" onClick={() => setConfirmState({ type: 'delete', payload: row })}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-users-crud__footer">
            <div className="admin-users-pagination">
              <button type="button" disabled>Anterior</button>
              <button type="button" className="is-active">1</button>
              <button type="button" disabled>Próximo</button>
            </div>
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="admin-users-per-page">
              <strong>Exibir</strong>
              <div className="admin-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdminSimpleRecordModal
          title={editingRecord ? 'Editar registro' : 'Adicionar registro'}
          formData={draftRecord}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialSimpleRecordForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingRecord ? 'Salvar alterações' : 'Salvar'}
        />
      )}
      {confirmState && (
        <AdminConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do registro' : 'Confirmar modificação do registro'}
          message={confirmState.type === 'delete' ? 'Esse registro será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdminSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

// ─── Modal de Editais ─────────────────────────────────────────────────────────

function AdminEditalRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--form">
        <header className="admin-modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="admin-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
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
              <Form.Check type="checkbox" id="modal-edital-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="admin-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Tela CRUD de Editais ─────────────────────────────────────────────────────

function AdminEditaisScreen({ rows, onCreateRecord, onUpdateRecord, onDeleteRecord, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [draftRecord, setDraftRecord] = useState(initialEditalForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [String(row.id), row.descricao, row.situacao ? 'ativo' : 'inativo'].some((v) => String(v || '').toLowerCase().includes(term))
  })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftRecord((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }))
  }

  const openCreateModal = () => { setEditingRecord(null); setDraftRecord(initialEditalForm); setIsFormOpen(true) }

  const openEditModal = (record) => {
    setEditingRecord(record)
    setDraftRecord({ id_setor: record.id_setor, descricao: record.descricao, data_inicio_inscricoes: record.data_inicio_inscricoes, hora_inicio_inscricoes: record.hora_inicio_inscricoes, data_final_inscricoes: record.data_final_inscricoes, hora_final_inscricoes: record.hora_final_inscricoes, data_resultado_preliminar: record.data_resultado_preliminar, data_inicio_recurso: record.data_inicio_recurso, hora_inicio_recurso: record.hora_inicio_recurso, data_final_recurso: record.data_final_recurso, hora_final_recurso: record.hora_final_recurso, data_resultado_final: record.data_resultado_final, situacao: record.situacao })
    setIsFormOpen(true)
  }

  const handlePersistRequest = () => {
    if (!draftRecord.descricao.trim() || !draftRecord.data_inicio_inscricoes || !draftRecord.data_final_inscricoes) return
    setConfirmState({ type: editingRecord ? 'edit' : 'create', payload: editingRecord ? { ...editingRecord, ...draftRecord } : draftRecord })
  }

  const handleConfirm = () => {
    if (!confirmState) return
    if (confirmState.type === 'create') { onCreateRecord(confirmState.payload); setSuccessMessage('Registro salvo com sucesso.') }
    if (confirmState.type === 'edit') { onUpdateRecord(confirmState.payload); setSuccessMessage('Registro atualizado com sucesso.') }
    if (confirmState.type === 'delete') { onDeleteRecord(confirmState.payload.id); setSuccessMessage('Registro removido com sucesso.') }
    setConfirmState(null); setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialEditalForm)
  }

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <AdminSectionHeader title="Gerenciar editais" subtitle="Cadastro e gerenciamento dos editais de chamamento público." onBack={onBack} />
        <section className="admin-management-card admin-users-crud">
          <div className="admin-users-crud__topbar">
            <div className="admin-users-search">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira uma palavra para pesquisar" />
              <button type="button" aria-label="Pesquisar"><i className="bi bi-search" /></button>
            </div>
            <Button type="button" className="admin-users-add-button" onClick={openCreateModal}>
              <i className="bi bi-plus-square" />
              <span>Adicionar registro</span>
            </Button>
          </div>
          <div className="admin-users-table-wrap">
            <table className="admin-table admin-users-table admin-table--cards">
              <thead>
                <tr><th>ID</th><th>Descrição</th><th>Início inscrições</th><th>Final inscrições</th><th>Resultado final</th><th>Situação</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="ID">{row.id}</td>
                    <td data-label="Descrição">{row.descricao}</td>
                    <td data-label="Início inscrições">{row.data_inicio_inscricoes}</td>
                    <td data-label="Final inscrições">{row.data_final_inscricoes}</td>
                    <td data-label="Resultado final">{row.data_resultado_final}</td>
                    <td data-label="Situação">{row.situacao ? 'Ativo' : 'Inativo'}</td>
                    <td data-label="Ações">
                      <div className="admin-users-actions">
                        <button type="button" className="admin-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button type="button" className="admin-inline-action admin-inline-action--danger" onClick={() => setConfirmState({ type: 'delete', payload: row })}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-users-crud__footer">
            <div className="admin-users-pagination">
              <button type="button" disabled>Anterior</button>
              <button type="button" className="is-active">1</button>
              <button type="button" disabled>Próximo</button>
            </div>
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="admin-users-per-page">
              <strong>Exibir</strong>
              <div className="admin-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdminEditalRecordModal
          title={editingRecord ? 'Editar edital' : 'Adicionar edital'}
          formData={draftRecord}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialEditalForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingRecord ? 'Salvar alterações' : 'Salvar'}
        />
      )}
      {confirmState && (
        <AdminConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do registro' : 'Confirmar modificação do registro'}
          message={confirmState.type === 'delete' ? 'Esse registro será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdminSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

// ─── Tela de cards — Cadastros Básicos ────────────────────────────────────────

export function AdminBasicRegistrationsScreen({ portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [activeSubScreen, setActiveSubScreen] = useState(null)
  const [cnaes, setCnaes] = useState(initialCnaes)
  const [tiposInstituicao, setTiposInstituicao] = useState(initialTiposInstituicao)
  const [bancos, setBancos] = useState(initialBancos)
  const [setores, setSetores] = useState(initialSetores)
  const [tiposDocumentos, setTiposDocumentos] = useState(initialTiposDocumentos)
  const [criteriosAvaliacao, setCriteriosAvaliacao] = useState(initialCriteriosAvaliacao)
  const [editais, setEditais] = useState(initialEditais)

  const makeCrud = (setter) => ({
    onCreate: (data) => setter((current) => [...current, { ...data, id: Math.max(0, ...current.map((r) => r.id)) + 1 }]),
    onUpdate: (data) => setter((current) => current.map((r) => (r.id === data.id ? { ...r, ...data } : r))),
    onDelete: (id) => setter((current) => current.filter((r) => r.id !== id)),
  })

  const crudMap = {
    cnaes: { rows: cnaes, ...makeCrud(setCnaes) },
    tiposInstituicao: { rows: tiposInstituicao, ...makeCrud(setTiposInstituicao) },
    bancos: { rows: bancos, ...makeCrud(setBancos) },
    setores: { rows: setores, ...makeCrud(setSetores) },
    tiposDocumentos: { rows: tiposDocumentos, ...makeCrud(setTiposDocumentos) },
    criteriosAvaliacao: { rows: criteriosAvaliacao, ...makeCrud(setCriteriosAvaliacao) },
    editais: { rows: editais, ...makeCrud(setEditais) },
  }

  const navProps = { portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }

  if (activeSubScreen === 'editais') {
    const { rows, onCreate, onUpdate, onDelete } = crudMap.editais
    return <AdminEditaisScreen rows={rows} onCreateRecord={onCreate} onUpdateRecord={onUpdate} onDeleteRecord={onDelete} onBack={() => setActiveSubScreen(null)} {...navProps} />
  }

  if (activeSubScreen && basicRegistrationTitleMap[activeSubScreen]) {
    const { title, subtitle } = basicRegistrationTitleMap[activeSubScreen]
    const { rows, onCreate, onUpdate, onDelete } = crudMap[activeSubScreen]
    return <AdminSimpleCrudScreen title={title} subtitle={subtitle} rows={rows} onCreateRecord={onCreate} onUpdateRecord={onUpdate} onDeleteRecord={onDelete} onBack={() => setActiveSubScreen(null)} {...navProps} />
  }

  return (
    <div className="admin-page">
      <AdminNavbar {...navProps} />
      <main className="admin-main">
        <AdminSectionHeader
          title="Cadastros básicos"
          subtitle="Gerencie as tabelas de referência utilizadas em todo o sistema."
          onBack={() => onNavigate('dashboard')}
        />
        <div className="dashboard-shell">
          <div className="dashboard-cards-grid dashboard-cards-grid--top">
            {basicRegistrationCards.map((card) => (
              <div key={card.key} className="card-col">
                <DashboardCard
                  title={card.title}
                  icon={card.icon}
                  description={card.description}
                  onCardClick={() => setActiveSubScreen(card.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
