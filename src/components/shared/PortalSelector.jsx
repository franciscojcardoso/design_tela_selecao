export function PortalSelector({ portalView, onSelectPortal }) {
  return (
    <div className="portal-selector" role="tablist" aria-label="Alternar entre visões">
      <button type="button" className={`portal-selector__button${portalView === 'candidate' ? ' is-active' : ''}`} onClick={() => onSelectPortal('candidate')}>Instituicao</button>
      <button type="button" className={`portal-selector__button${portalView === 'admin' ? ' is-active' : ''}`} onClick={() => onSelectPortal('admin')}>Admin</button>
      <button type="button" className={`portal-selector__button${portalView === 'evaluator' ? ' is-active' : ''}`} onClick={() => onSelectPortal('evaluator')}>Avaliador</button>
    </div>
  )
}
