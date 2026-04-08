export function DashboardCard({ title, icon, description, startDate, endDate, onCardClick }) {
  const showDates = Boolean(startDate && endDate)

  return (
    <div className={`card-hover${onCardClick ? ' card-hover--clickable' : ''}`} onClick={onCardClick}>
      <a href="#" className="card-link card-link--stage" onClick={(event) => event.preventDefault()}>
        <span className="card-icon-wrap">
          <i className={`bi ${icon}`} style={{ color: '#005FC9' }} />
        </span>
        <p className="card-text mb-0">{title}</p>
        <small className="card-description">{description}</small>
      </a>
      {showDates && (
        <div className="card-meta card-meta--hover">
          <div className="card-periodo periodo-linha">
            <div><strong>Inicio:</strong><br />{startDate}</div>
            <div><strong>Fim:</strong><br />{endDate}</div>
          </div>
        </div>
      )}
    </div>
  )
}
