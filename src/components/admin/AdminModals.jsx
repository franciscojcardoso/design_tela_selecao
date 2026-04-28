import { Button } from 'react-bootstrap'

export function AdministradorConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="Administrador-modal-backdrop">
      <section className="Administrador-modal-card Administrador-modal-card--confirm">
        <header className="Administrador-modal-card__header">
          <div className="Administrador-modal-card__headline">
            <i className="bi bi-exclamation-triangle-fill" />
            <h3>{title}</h3>
          </div>
          <button type="button" className="Administrador-modal-card__close" onClick={onCancel}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          <p>{message}</p>
        </div>
        <footer className="Administrador-modal-card__footer">
          <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onCancel}>Cancelar</Button>
          <Button type="button" variant="primary" className="action-button" onClick={onConfirm}>Confirmar</Button>
        </footer>
      </section>
    </div>
  )
}

export function AdministradorSuccessModal({ message, onClose }) {
  return (
    <div className="Administrador-modal-backdrop">
      <section className="Administrador-modal-card Administrador-modal-card--success">
        <header className="Administrador-modal-card__header">
          <div className="Administrador-modal-card__headline Administrador-modal-card__headline--success">
            <i className="bi bi-check-circle" />
            <h3>Sucesso</h3>
          </div>
          <button type="button" className="Administrador-modal-card__close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="Administrador-modal-card__body">
          <p>{message}</p>
        </div>
      </section>
    </div>
  )
}
