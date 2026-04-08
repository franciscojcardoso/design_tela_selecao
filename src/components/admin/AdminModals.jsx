import { Button } from 'react-bootstrap'

export function AdminConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--confirm">
        <header className="admin-modal-card__header">
          <div className="admin-modal-card__headline">
            <i className="bi bi-exclamation-triangle-fill" />
            <h3>{title}</h3>
          </div>
          <button type="button" className="admin-modal-card__close" onClick={onCancel}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <p>{message}</p>
        </div>
        <footer className="admin-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onCancel}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onConfirm}>Confirmar</Button>
        </footer>
      </section>
    </div>
  )
}

export function AdminSuccessModal({ message, onClose }) {
  return (
    <div className="admin-modal-backdrop">
      <section className="admin-modal-card admin-modal-card--success">
        <header className="admin-modal-card__header">
          <div className="admin-modal-card__headline admin-modal-card__headline--success">
            <i className="bi bi-check-circle" />
            <h3>Sucesso</h3>
          </div>
          <button type="button" className="admin-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="admin-modal-card__body">
          <p>{message}</p>
        </div>
      </section>
    </div>
  )
}
