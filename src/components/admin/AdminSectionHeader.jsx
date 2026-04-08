export function AdminSectionHeader({ title, subtitle, onBack }) {
  return (
    <div className="admin-detail-header">
      <div>
        <button type="button" className="admin-back-link" onClick={onBack}>
          <i className="bi bi-arrow-left" />
          <span>Voltar ao painel</span>
        </button>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
