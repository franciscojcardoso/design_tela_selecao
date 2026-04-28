import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

// ─── Dados mock de documentos por instituição ──────────────────────────────────

const BASE_DOCUMENTS = [
  { id: 1, title: 'Certidão Negativa de Débitos Federais', type: 'Certidão' },
  { id: 2, title: 'Comprovante de Regularidade do FGTS', type: 'Comprovante' },
  { id: 3, title: 'Contrato Social atualizado', type: 'Contrato' },
  { id: 4, title: 'Declaração de não impedimento', type: 'Declaração' },
  { id: 5, title: 'Certidão Negativa de Débitos Trabalhistas', type: 'Certidão' },
  { id: 6, title: 'Comprovante de Endereço da Sede', type: 'Comprovante' },
  { id: 7, title: 'Documento do Representante Legal', type: 'Identificação' },
  { id: 8, title: 'Ofício de Solicitação de Patrocínio', type: 'Formulário' },
]

function buildInitialDocStatuses() {
  return Object.fromEntries(BASE_DOCUMENTS.map((doc) => [doc.id, { status: 'pending', rejectionReason: '' }]))
}

// ─── Modal de visualização do documento ───────────────────────────────────────

function DocumentViewerModal({ doc, onClose }) {
  return (
    <div className="Administrador-modal-backdrop doc-viewer-backdrop" onClick={onClose}>
      <section
        className="Administrador-modal-card doc-viewer-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Visualizando: ${doc.title}`}
      >
        <header className="Administrador-modal-card__header">
          <div className="Administrador-modal-card__headline">
            <i className="bi bi-file-earmark-text" />
            <div>
              <h3>{doc.title}</h3>
              <span className="doc-viewer-card__type">{doc.type}</span>
            </div>
          </div>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose} aria-label="Fechar visualização">
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="doc-viewer-card__body">
          <div className="doc-viewer-placeholder">
            <i className="bi bi-file-earmark-pdf doc-viewer-placeholder__icon" />
            <p className="doc-viewer-placeholder__label">Pré-visualização do documento</p>
            <p className="doc-viewer-placeholder__name">{doc.title}</p>
            <p className="doc-viewer-placeholder__type">{doc.type}</p>
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

// ─── Modal de rejeição ─────────────────────────────────────────────────────────

function RejectionModal({ doc, onClose, onConfirm, isEdit = false }) {
  const [reason, setReason] = useState('')
  const [touched, setTouched] = useState(false)
  const isValid = reason.trim().length > 0

  const handleConfirm = () => {
    setTouched(true)
    if (!isValid) return
    onConfirm(reason.trim())
  }

  return (
    <div className="Administrador-modal-backdrop">
      <section
        className="Administrador-modal-card Administrador-modal-card--confirm"
        role="dialog"
        aria-modal="true"
        aria-label="Rejeitar documento"
      >
        <header className="Administrador-modal-card__header">
          <div className="Administrador-modal-card__headline">
            <i className="bi bi-x-circle-fill" style={{ color: 'var(--color-danger)' }} />
            <h3>{isEdit ? 'Alterar para rejeitado' : 'Rejeitar documento'}</h3>
          </div>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose} aria-label="Cancelar rejeição">
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          {isEdit && (
            <div className="rejection-modal__edit-notice">
              <i className="bi bi-info-circle me-2" />
              Esta alteração substituirá a decisão anterior e será registrada na auditoria.
            </div>
          )}
          <p className="rejection-modal__doc-name">
            <i className="bi bi-file-earmark-text me-2" />
            {doc.title}
          </p>
          <Form.Group className="mt-3">
            <Form.Label>
              Motivo da rejeição <span aria-hidden="true">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Descreva o motivo pelo qual este documento está sendo rejeitado..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              isInvalid={touched && !isValid}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              O motivo da rejeição é obrigatório para prosseguir.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" variant="danger" className="action-button" onClick={handleConfirm}>
            Confirmar rejeição
          </Button>
        </footer>
      </section>
    </div>
  )
}

// ─── Linha de documento na tabela ─────────────────────────────────────────────

function DocumentTableRow({ doc, statusInfo, isEditing, onView, onApprove, onReject, onEdit, onCancelEdit }) {
  const { status, rejectionReason } = statusInfo
  const isDecided = status !== 'pending'

  // Quando em modo de edição, mostra os botões de ação independente do status
  const showActionButtons = !isDecided || isEditing

  const rowClass = [
    !isEditing && status === 'approved' ? 'doc-row--approved' : '',
    !isEditing && status === 'rejected' ? 'doc-row--rejected' : '',
    isEditing ? 'doc-row--editing' : '',
  ].filter(Boolean).join(' ')

  return (
    <tr className={rowClass}>
      <td data-label="Título">
        <span className={isEditing ? 'doc-title--editing' : ''}>{doc.title}</span>
        {isEditing && (
          <span className="doc-editing-label">
            <i className="bi bi-pencil-fill" />
            Editando decisão
          </span>
        )}
      </td>
      <td data-label="Tipo">
        <span className="doc-type-badge">{doc.type}</span>
      </td>
      <td data-label="Exibir" className="doc-table__col-view">
        <button
          type="button"
          className="doc-view-button"
          onClick={() => onView(doc)}
          title={`Visualizar: ${doc.title}`}
          aria-label={`Visualizar documento: ${doc.title}`}
        >
          <i className="bi bi-eye" />
        </button>
      </td>
      <td data-label="Análise" className="doc-table__col-analysis">
        {showActionButtons ? (
          <div className="doc-analysis-actions">
            <button
              type="button"
              className={`doc-action-button doc-action-button--approve${status === 'approved' && isEditing ? ' is-current' : ''}`}
              onClick={() => onApprove(doc.id)}
              title="Aprovar documento"
              aria-label={`Aprovar: ${doc.title}`}
            >
              <i className="bi bi-check-lg" />
              <span>Aprovar</span>
            </button>
            <button
              type="button"
              className={`doc-action-button doc-action-button--reject${status === 'rejected' && isEditing ? ' is-current' : ''}`}
              onClick={() => onReject(doc)}
              title="Rejeitar documento"
              aria-label={`Rejeitar: ${doc.title}`}
            >
              <i className="bi bi-x-lg" />
              <span>Rejeitar</span>
            </button>
            {isEditing && (
              <button
                type="button"
                className="doc-action-button doc-action-button--cancel"
                onClick={onCancelEdit}
                title="Cancelar edição"
                aria-label="Cancelar edição da decisão"
              >
                <i className="bi bi-x" />
                <span>Cancelar</span>
              </button>
            )}
          </div>
        ) : (
          <div className="doc-analysis-actions doc-analysis-actions--decided">
            {status === 'approved' && (
              <span className="doc-status-badge doc-status-badge--approved" role="status">
                <i className="bi bi-check-circle-fill" />
                Aprovado
              </span>
            )}
            {status === 'rejected' && (
              <span
                className="doc-status-badge doc-status-badge--rejected"
                role="status"
              >
                <i className="bi bi-x-circle-fill" />
                Rejeitado
                {rejectionReason && (
                  <button
                    type="button"
                    className="doc-status-badge__reason-trigger"
                    title={`Motivo: ${rejectionReason}`}
                    aria-label={`Ver motivo da rejeição: ${rejectionReason}`}
                  >
                    <i className="bi bi-info-circle" />
                  </button>
                )}
              </span>
            )}
            <button
              type="button"
              className="doc-action-button doc-action-button--edit"
              onClick={onEdit}
              title="Editar decisão"
              aria-label={`Editar decisão do documento: ${doc.title}`}
            >
              <i className="bi bi-pencil" />
              <span>Editar</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

// ─── Modal de documentos da instituição ───────────────────────────────────────

function DocumentsModal({ institution, onClose, onAudit }) {
  const [docStatuses, setDocStatuses] = useState(buildInitialDocStatuses)
  const [viewingDoc, setViewingDoc] = useState(null)
  const [rejectingDoc, setRejectingDoc] = useState(null)
  const [editingDocId, setEditingDocId] = useState(null)

  const handleApprove = (docId) => {
    const prev = docStatuses[docId]
    const isEdit = prev.status !== 'pending'

    setDocStatuses((current) => ({
      ...current,
      [docId]: { status: 'approved', rejectionReason: '' },
    }))
    setEditingDocId(null)

    const doc = BASE_DOCUMENTS.find((d) => d.id === docId)
    if (isEdit) {
      onAudit?.('Decisão alterada para Aprovado', `${doc?.title} — ${institution.companyName}`)
    } else {
      onAudit?.('Documento aprovado', `${doc?.title} — ${institution.companyName}`)
    }
  }

  const handleStartReject = (doc) => {
    setRejectingDoc(doc)
  }

  const handleConfirmRejection = (reason) => {
    if (!rejectingDoc) return
    const prev = docStatuses[rejectingDoc.id]
    const isEdit = prev.status !== 'pending'

    setDocStatuses((current) => ({
      ...current,
      [rejectingDoc.id]: { status: 'rejected', rejectionReason: reason },
    }))
    setEditingDocId(null)
    setRejectingDoc(null)

    if (isEdit) {
      onAudit?.('Decisão alterada para Rejeitado', `${rejectingDoc.title} — ${institution.companyName} — Motivo: ${reason}`)
    } else {
      onAudit?.('Documento rejeitado', `${rejectingDoc.title} — ${institution.companyName} — Motivo: ${reason}`)
    }
  }

  const handleEdit = (docId) => {
    const doc = BASE_DOCUMENTS.find((d) => d.id === docId)
    setEditingDocId(docId)
    onAudit?.('Decisão aberta para revisão', `${doc?.title} — ${institution.companyName}`)
  }

  const handleCancelEdit = () => {
    setEditingDocId(null)
  }

  const approvedCount = Object.values(docStatuses).filter((s) => s.status === 'approved').length
  const rejectedCount = Object.values(docStatuses).filter((s) => s.status === 'rejected').length
  const pendingCount = Object.values(docStatuses).filter((s) => s.status === 'pending').length
  const isRejectionEdit = rejectingDoc && docStatuses[rejectingDoc.id]?.status !== 'pending'

  return (
    <>
      <div className="Administrador-modal-backdrop docs-modal-backdrop">
        <section
          className="Administrador-modal-card Administrador-modal-card--docs"
          role="dialog"
          aria-modal="true"
          aria-label={`Documentos de ${institution.companyName}`}
        >
          <header className="Administrador-modal-card__header">
            <div className="Administrador-modal-card__headline">
              <i className="bi bi-folder2-open" />
              <div>
                <h3>Documentos — {institution.companyName}</h3>
                <span className="docs-modal-subtitle">{institution.city}</span>
              </div>
            </div>
            <button type="button" className="Administrador-modal-card__close" onClick={onClose} aria-label="Fechar documentos">
              <i className="bi bi-x-lg" />
            </button>
          </header>

          <div className="docs-modal-status-bar">
            <span className="docs-modal-status-bar__item docs-modal-status-bar__item--pending">
              <i className="bi bi-clock" />
              {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
            </span>
            <span className="docs-modal-status-bar__item docs-modal-status-bar__item--approved">
              <i className="bi bi-check-circle-fill" />
              {approvedCount} aprovado{approvedCount !== 1 ? 's' : ''}
            </span>
            <span className="docs-modal-status-bar__item docs-modal-status-bar__item--rejected">
              <i className="bi bi-x-circle-fill" />
              {rejectedCount} rejeitado{rejectedCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="Administrador-modal-card__body docs-modal-body">
            <div className="Administrador-users-table-wrap">
              <table className="Administrador-table Administrador-table--cards docs-table">
                <thead>
                  <tr>
                    <th>Título do documento</th>
                    <th>Tipo</th>
                    <th className="docs-table__th-center">Exibir</th>
                    <th className="docs-table__th-center">Análise</th>
                  </tr>
                </thead>
                <tbody>
                  {BASE_DOCUMENTS.map((doc) => (
                    <DocumentTableRow
                      key={doc.id}
                      doc={doc}
                      statusInfo={docStatuses[doc.id]}
                      isEditing={editingDocId === doc.id}
                      onView={setViewingDoc}
                      onApprove={handleApprove}
                      onReject={handleStartReject}
                      onEdit={() => handleEdit(doc.id)}
                      onCancelEdit={handleCancelEdit}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="Administrador-modal-card__footer">
            <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onClose}>
              Fechar
            </Button>
          </footer>
        </section>
      </div>

      {viewingDoc && (
        <DocumentViewerModal doc={viewingDoc} onClose={() => setViewingDoc(null)} />
      )}

      {rejectingDoc && (
        <RejectionModal
          doc={rejectingDoc}
          isEdit={isRejectionEdit}
          onClose={() => setRejectingDoc(null)}
          onConfirm={handleConfirmRejection}
        />
      )}
    </>
  )
}

// ─── Tabela principal de instituições ─────────────────────────────────────────

export function AdministradorApplicantsTable({ title, subtitle, rows, onBack, onAudit, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [docsInstitution, setDocsInstitution] = useState(null)

  const filteredRows = rows.filter((row) =>
    [row.companyName, row.city, row.currentStageLabel, row.status, row.documents]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title={title} subtitle={subtitle} onBack={onBack} />
        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-management-card__topline">
            <strong>{filteredRows.length} instituição(ões)</strong>
          </div>
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por instituição, cidade, etapa ou status"
            searchLabel="Pesquisar instituições"
          />
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-table--cards">
              <thead>
                <tr>
                  <th>Instituição</th>
                  <th>Cidade</th>
                  <th>Etapa atual</th>
                  <th>Status</th>
                  <th>Documentos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Instituição">{row.companyName}</td>
                    <td data-label="Cidade">{row.city}</td>
                    <td data-label="Etapa atual">{row.currentStageLabel}</td>
                    <td data-label="Status">{row.status}</td>
                    <td data-label="Documentos">{row.documents}</td>
                    <td data-label="Ações">
                      <div className="Administrador-users-actions">
                        <button
                          type="button"
                          className="Administrador-inline-action"
                          onClick={() => setDocsInstitution(row)}
                        >
                          Documentos
                        </button>
                        <button type="button" className="Administrador-inline-action">Gerenciar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <AppFooter />

      {docsInstitution && (
        <DocumentsModal
          institution={docsInstitution}
          onClose={() => setDocsInstitution(null)}
          onAudit={onAudit}
        />
      )}
    </div>
  )
}
