import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {
  basicRegistrationCards,
  basicRegistrationTitleMap,
  initialAdministradorUsers,
  initialBancos,
  initialCnaes,
  initialCriteriosAvaliacao,
  initialEditalForm,
  initialEditais,
  initialProjectEvaluatorForm,
  initialProjectEvaluators,
  initialSetores,
  initialTiposDocumentos,
  initialTiposInstituicao,
} from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { DashboardCard } from '../shared/DashboardCard'
import { AdministradorConfirmModal, AdministradorSuccessModal } from './AdminModals'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

// ─── Modal genérico para tabelas simples (id, descrição, situação) ─────────────

const initialSimpleRecordForm = { descricao: '', situacao: true }

function AdministradorSimpleRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
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
                <Form.Control value={formData.descricao} onChange={onChange('descricao')} placeholder="Insira a descrição" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Check type="checkbox" id="modal-simple-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Tela CRUD genérica para tabelas simples ───────────────────────────────────

function AdministradorSimpleCrudScreen({ title, subtitle, rows, onCreateRecord, onUpdateRecord, onDeleteRecord, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
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
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title={title} subtitle={subtitle} onBack={onBack} />
        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-users-crud__topbar">
            <div className="Administrador-users-search">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira uma palavra para pesquisar" />
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
                <tr><th>ID</th><th>Descrição</th><th>Situação</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="ID">{row.id}</td>
                    <td data-label="Descrição">{row.descricao}</td>
                    <td data-label="Situação">{row.situacao ? 'Ativo' : 'Inativo'}</td>
                    <td data-label="Ações">
                      <div className="Administrador-users-actions">
                        <button type="button" className="Administrador-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button type="button" className="Administrador-inline-action Administrador-inline-action--danger" onClick={() => setConfirmState({ type: 'delete', payload: row })}>Excluir</button>
                      </div>
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
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="Administrador-users-per-page">
              <strong>Exibir</strong>
              <div className="Administrador-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdministradorSimpleRecordModal
          title={editingRecord ? 'Editar registro' : 'Adicionar registro'}
          formData={draftRecord}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialSimpleRecordForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingRecord ? 'Salvar alterações' : 'Salvar'}
        />
      )}
      {confirmState && (
        <AdministradorConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do registro' : 'Confirmar modificação do registro'}
          message={confirmState.type === 'delete' ? 'Esse registro será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

// ─── Modal de Editais ─────────────────────────────────────────────────────────

function AdministradorEditalRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
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
              <Form.Check type="checkbox" id="modal-edital-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Tela CRUD de Editais ─────────────────────────────────────────────────────

function AdministradorEditaisScreen({ rows, onCreateRecord, onUpdateRecord, onDeleteRecord, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
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
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title="Gerenciar editais" subtitle="Cadastro e gerenciamento dos editais de chamamento público." onBack={onBack} />
        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-users-crud__topbar">
            <div className="Administrador-users-search">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira uma palavra para pesquisar" />
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
                      <div className="Administrador-users-actions">
                        <button type="button" className="Administrador-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button type="button" className="Administrador-inline-action Administrador-inline-action--danger" onClick={() => setConfirmState({ type: 'delete', payload: row })}>Excluir</button>
                      </div>
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
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="Administrador-users-per-page">
              <strong>Exibir</strong>
              <div className="Administrador-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdministradorEditalRecordModal
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
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do registro' : 'Confirmar modificação do registro'}
          message={confirmState.type === 'delete' ? 'Esse registro será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

// ─── Tela de cards — Cadastros Básicos ────────────────────────────────────────

function AdministradorProjectEvaluatorModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar', editalOptions, evaluatorOptions }) {
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
            <Col md={6}>
              <Form.Group>
                <Form.Label>Edital *</Form.Label>
                <Form.Select value={formData.id_edital} onChange={onChange('id_edital')}>
                  <option value="">Selecione um edital</option>
                  {editalOptions.map((edital) => (
                    <option key={edital.id} value={edital.id}>{edital.descricao}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Avaliador *</Form.Label>
                <Form.Select value={formData.id_avaliador} onChange={onChange('id_avaliador')}>
                  <option value="">Selecione um avaliador</option>
                  {evaluatorOptions.map((user) => (
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Check type="checkbox" id="modal-project-evaluator-situacao" label="Ativo" checked={formData.situacao} onChange={onChange('situacao')} />
            </Col>
          </Row>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

function AdministradorProjectEvaluatorsScreen({ rows, editais, users, onCreateRecord, onUpdateRecord, onDeleteRecord, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [draftRecord, setDraftRecord] = useState(initialProjectEvaluatorForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const evaluatorOptions = users.filter((user) => user.isEvaluator)
  const editalMap = new Map(editais.map((edital) => [String(edital.id), edital.descricao]))
  const evaluatorMap = new Map(evaluatorOptions.map((user) => [String(user.id), user.fullName]))

  const filteredRows = rows
    .map((row) => ({
      ...row,
      editalNome: editalMap.get(String(row.id_edital)) || `Edital ${row.id_edital}`,
      avaliadorNome: evaluatorMap.get(String(row.id_avaliador)) || `Usuário ${row.id_avaliador}`,
    }))
    .filter((row) => {
      const term = searchTerm.trim().toLowerCase()
      if (!term) return true
      return [String(row.id), row.editalNome, row.avaliadorNome, row.situacao ? 'ativo' : 'inativo']
        .some((value) => String(value || '').toLowerCase().includes(term))
    })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftRecord((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }))
  }

  const openCreateModal = () => { setEditingRecord(null); setDraftRecord(initialProjectEvaluatorForm); setIsFormOpen(true) }

  const openEditModal = (record) => {
    setEditingRecord(record)
    setDraftRecord({ id_edital: String(record.id_edital), id_avaliador: String(record.id_avaliador), situacao: record.situacao })
    setIsFormOpen(true)
  }

  const handlePersistRequest = () => {
    if (!draftRecord.id_edital || !draftRecord.id_avaliador) return
    const hasDuplicate = rows.some((row) => (
      String(row.id_edital) === String(draftRecord.id_edital)
      && String(row.id_avaliador) === String(draftRecord.id_avaliador)
      && row.id !== editingRecord?.id
    ))
    if (hasDuplicate) return
    const payload = { ...draftRecord, id_edital: Number(draftRecord.id_edital), id_avaliador: Number(draftRecord.id_avaliador) }
    setConfirmState({ type: editingRecord ? 'edit' : 'create', payload: editingRecord ? { ...editingRecord, ...payload } : payload })
  }

  const handleConfirm = () => {
    if (!confirmState) return
    if (confirmState.type === 'create') { onCreateRecord(confirmState.payload); setSuccessMessage('Vinculo salvo com sucesso.') }
    if (confirmState.type === 'edit') { onUpdateRecord(confirmState.payload); setSuccessMessage('Vinculo atualizado com sucesso.') }
    if (confirmState.type === 'delete') { onDeleteRecord(confirmState.payload.id); setSuccessMessage('Vinculo removido com sucesso.') }
    setConfirmState(null); setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialProjectEvaluatorForm)
  }

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title={basicRegistrationTitleMap.avaliadoresProjetos?.title || 'Gerenciar avaliadores dos projetos'} subtitle={basicRegistrationTitleMap.avaliadoresProjetos?.subtitle || 'Defina quais avaliadores podem atuar em cada edital cadastrado.'} onBack={onBack} />
        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-users-crud__topbar">
            <div className="Administrador-users-search">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira uma palavra para pesquisar" />
              <button type="button" aria-label="Pesquisar"><i className="bi bi-search" /></button>
            </div>
            <Button type="button" className="Administrador-users-add-button" onClick={openCreateModal}>
              <i className="bi bi-plus-square" />
              <span>Adicionar vínculo</span>
            </Button>
          </div>
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-users-table Administrador-table--cards">
              <thead>
                <tr><th>ID</th><th>Edital</th><th>Avaliador</th><th>Situação</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="ID">{row.id}</td>
                    <td data-label="Edital">{row.editalNome}</td>
                    <td data-label="Avaliador">{row.avaliadorNome}</td>
                    <td data-label="Situação">{row.situacao ? 'Ativo' : 'Inativo'}</td>
                    <td data-label="Ações">
                      <div className="Administrador-users-actions">
                        <button type="button" className="Administrador-inline-action" onClick={() => openEditModal(row)}>Editar</button>
                        <button type="button" className="Administrador-inline-action Administrador-inline-action--danger" onClick={() => setConfirmState({ type: 'delete', payload: row })}>Excluir</button>
                      </div>
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
            <span>Mostrando de 1 até {filteredRows.length} de {rows.length} registros</span>
            <div className="Administrador-users-per-page">
              <strong>Exibir</strong>
              <div className="Administrador-users-per-page__value">50</div>
              <strong>resultados por página</strong>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />

      {isFormOpen && (
        <AdministradorProjectEvaluatorModal
          title={editingRecord ? 'Editar vínculo' : 'Adicionar vínculo'}
          formData={draftRecord}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingRecord(null); setDraftRecord(initialProjectEvaluatorForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingRecord ? 'Salvar alterações' : 'Salvar'}
          editalOptions={editais}
          evaluatorOptions={evaluatorOptions}
        />
      )}
      {confirmState && (
        <AdministradorConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusão do vínculo' : 'Confirmar modificação do vínculo'}
          message={confirmState.type === 'delete' ? 'Esse vínculo será removido da listagem, deseja prosseguir?' : 'Os dados a seguir serão salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}
      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}

export function AdministradorBasicRegistrationsScreen({ portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar, users = initialAdministradorUsers }) {
  const [activeSubScreen, setActiveSubScreen] = useState(null)
  const [cnaes, setCnaes] = useState(initialCnaes)
  const [tiposInstituicao, setTiposInstituicao] = useState(initialTiposInstituicao)
  const [bancos, setBancos] = useState(initialBancos)
  const [setores, setSetores] = useState(initialSetores)
  const [tiposDocumentos, setTiposDocumentos] = useState(initialTiposDocumentos)
  const [criteriosAvaliacao, setCriteriosAvaliacao] = useState(initialCriteriosAvaliacao)
  const [editais, setEditais] = useState(initialEditais)
  const [avaliadoresProjetos, setAvaliadoresProjetos] = useState(initialProjectEvaluators)

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
    avaliadoresProjetos: { rows: avaliadoresProjetos, ...makeCrud(setAvaliadoresProjetos) },
  }

  const navProps = { portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }

  if (activeSubScreen === 'editais') {
    const { rows, onCreate, onUpdate, onDelete } = crudMap.editais
    return <AdministradorEditaisScreen rows={rows} onCreateRecord={onCreate} onUpdateRecord={onUpdate} onDeleteRecord={onDelete} onBack={() => setActiveSubScreen(null)} {...navProps} />
  }

  if (activeSubScreen === 'avaliadoresProjetos') {
    const { rows, onCreate, onUpdate, onDelete } = crudMap.avaliadoresProjetos
    return <AdministradorProjectEvaluatorsScreen rows={rows} editais={editais} users={users} onCreateRecord={onCreate} onUpdateRecord={onUpdate} onDeleteRecord={onDelete} onBack={() => setActiveSubScreen(null)} {...navProps} />
  }

  if (activeSubScreen && basicRegistrationTitleMap[activeSubScreen]) {
    const { title, subtitle } = basicRegistrationTitleMap[activeSubScreen]
    const { rows, onCreate, onUpdate, onDelete } = crudMap[activeSubScreen]
    return <AdministradorSimpleCrudScreen title={title} subtitle={subtitle} rows={rows} onCreateRecord={onCreate} onUpdateRecord={onUpdate} onDeleteRecord={onDelete} onBack={() => setActiveSubScreen(null)} {...navProps} />
  }

  return (
    <div className="Administrador-page">
      <AdministradorNavbar {...navProps} />
      <main className="Administrador-main">
        <AdministradorSectionHeader
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
