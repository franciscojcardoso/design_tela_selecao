import { Button } from 'react-bootstrap'

export function TableSearchBar({ value, onChange, placeholder, actionLabel, onAction, searchLabel = 'Pesquisar' }) {
  return (
    <div className="Administrador-users-crud__topbar">
      <div className="Administrador-users-search">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <button type="button" aria-label={searchLabel}>
          <i className="bi bi-search" />
        </button>
      </div>
      {actionLabel && onAction && (
        <Button type="button" className="Administrador-users-add-button" onClick={onAction}>
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  )
}
