export function AdministradorSectionHeader({ title, subtitle, onBack }) {
  return (
    <div className="Administrador-detail-header">
      <div>
        <button type="button" className="Administrador-back-link" onClick={onBack}>
          <i className="bi bi-arrow-left" />
          <span>Voltar ao painel</span>
        </button>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
