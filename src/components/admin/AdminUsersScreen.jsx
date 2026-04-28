import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getAdministradorUserRoles, initialAdministradorUserForm } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { AdministradorConfirmModal, AdministradorSuccessModal } from './AdminModals'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

function AdministradorUserRecordModal({ title, formData, onChange, onClose, onSubmit, submitLabel = 'Salvar' }) {
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
                <Form.Label>Nome completo *</Form.Label>
                <Form.Control value={formData.fullName} onChange={onChange('fullName')} placeholder="Insira aqui o nome" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control type="email" value={formData.email} onChange={onChange('email')} placeholder="email@instituicao.org.br" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Confirmar e-mail *</Form.Label>
                <Form.Control type="email" value={formData.emailConfirm} onChange={onChange('emailConfirm')} placeholder="Repita o e-mail" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>CPF *</Form.Label>
                <Form.Control value={formData.cpf} onChange={onChange('cpf')} placeholder="000.000.000-00" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Perfis de acesso *</Form.Label>
                <div className="Administrador-user-form__checks">
                  <Form.Check type="checkbox" id="modal-Administrador-role" label="Administrador" checked={formData.isAdministrador} onChange={onChange('isAdministrador')} className="Administrador-user-form__check" />
                  <Form.Check type="checkbox" id="modal-evaluator-role" label="Avaliador" checked={formData.isEvaluator} onChange={onChange('isEvaluator')} className="Administrador-user-form__check" />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefone principal *</Form.Label>
                <Form.Control value={formData.phone} onChange={onChange('phone')} placeholder="(85) 99999-9999" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefone secundário</Form.Label>
                <Form.Control value={formData.phoneSecondary} onChange={onChange('phoneSecondary')} placeholder="(85) 99999-9999" />
              </Form.Group>
            </Col>
          </Row>
          <p className="Administrador-user-form__helper">A senha inicial será enviada por e-mail para a pessoa cadastrada.</p>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onSubmit}>{submitLabel}</Button>
        </footer>
      </section>
    </div>
  )
}

export function AdministradorUsersScreen({ rows, onBack, onCreateUser, onUpdateUser, onDeleteUser, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [draftUser, setDraftUser] = useState(initialAdministradorUserForm)
  const [confirmState, setConfirmState] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [String(row.id), row.fullName, row.email, row.cpf, row.phone, getAdministradorUserRoles(row), row.status]
      .some((value) => String(value || '').toLowerCase().includes(term))
  })

  const updateDraftField = (field) => (event) => {
    const { type, checked, value } = event.target
    setDraftUser((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }))
  }

  const openCreateModal = () => { setEditingUser(null); setDraftUser(initialAdministradorUserForm); setIsFormOpen(true) }

  const openEditModal = (user) => {
    setEditingUser(user)
    setDraftUser({ fullName: user.fullName, email: user.email, emailConfirm: user.emailConfirm || user.email, cpf: user.cpf, phone: user.phone, phoneSecondary: user.phoneSecondary || '', isAdministrador: user.isAdministrador, isEvaluator: user.isEvaluator })
    setIsFormOpen(true)
  }

  const handlePersistRequest = () => {
    if (!draftUser.fullName.trim() || !draftUser.email.trim() || !draftUser.emailConfirm.trim() || draftUser.email.trim() !== draftUser.emailConfirm.trim() || !draftUser.phone.trim() || !draftUser.cpf.trim() || (!draftUser.isAdministrador && !draftUser.isEvaluator)) return
    setConfirmState({ type: editingUser ? 'edit' : 'create', payload: editingUser ? { ...editingUser, ...draftUser } : draftUser })
  }

  const handleConfirm = () => {
    if (!confirmState) return
    if (confirmState.type === 'create') { onCreateUser(confirmState.payload); setSuccessMessage('Registro salvo com sucesso.') }
    if (confirmState.type === 'edit') { onUpdateUser(confirmState.payload); setSuccessMessage('Registro atualizado com sucesso.') }
    if (confirmState.type === 'delete') { onDeleteUser(confirmState.payload.id); setSuccessMessage('Registro removido com sucesso.') }
    setConfirmState(null); setIsFormOpen(false); setEditingUser(null); setDraftUser(initialAdministradorUserForm)
  }

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title="Gerenciar usuários" subtitle="CRUD administrativo para cadastro, edição e exclusão de perfis de acesso do sistema." onBack={onBack} />

        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-users-crud__topbar">
            <div className="Administrador-users-search">
              <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Insira uma palavra para pesquisar" />
              <button type="button" aria-label="Pesquisar usuários"><i className="bi bi-search" /></button>
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
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfis</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="ID">{row.id}</td>
                    <td data-label="Nome">{row.fullName}</td>
                    <td data-label="E-mail">{row.email}</td>
                    <td data-label="Perfis">{getAdministradorUserRoles(row)}</td>
                    <td data-label="Status">{row.status}</td>
                    <td data-label="Acoes">
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
        <AdministradorUserRecordModal
          title={editingUser ? 'Editar registro' : 'Adicionar registro'}
          formData={draftUser}
          onChange={updateDraftField}
          onClose={() => { setIsFormOpen(false); setEditingUser(null); setDraftUser(initialAdministradorUserForm) }}
          onSubmit={handlePersistRequest}
          submitLabel={editingUser ? 'Salvar alterações' : 'Salvar'}
        />
      )}

      {confirmState && (
        <AdministradorConfirmModal
          title={confirmState.type === 'delete' ? 'Confirmar exclusao do registro' : 'Confirmar modificacao do registro'}
          message={confirmState.type === 'delete' ? 'Esse usuario sera removido da listagem, deseja prosseguir?' : 'Os dados a seguir serao salvos, deseja prosseguir?'}
          onCancel={() => setConfirmState(null)}
          onConfirm={handleConfirm}
        />
      )}

      {successMessage && <AdministradorSuccessModal message={successMessage} onClose={() => setSuccessMessage('')} />}
    </div>
  )
}
