import { AdministradorMenu, dashboardStagesTop, dashboardStagesBottom } from '../../data/constants'
import { PortalSelector } from './PortalSelector'

export function ResponsiveSidebar({
  isOpen,
  onClose,
  portalView,
  onSelectPortal,
  screen,
  onNavigateCandidate,
  AdministradorScreen,
  onNavigateAdministrador,
  evaluatorScreen,
  onNavigateEvaluator,
  onGoToSettings,
  onExit,
}) {
  if (!isOpen) return null

  const candidateItems = [
    { key: 'dashboard', label: 'Painel', action: () => onNavigateCandidate?.('dashboard'), active: screen === 'dashboard' },
    ...dashboardStagesTop.map((item) => ({ key: item.navigateTo, label: item.title, action: () => onNavigateCandidate?.(item.navigateTo), active: screen === item.navigateTo })),
    ...dashboardStagesBottom.map((item) => ({ key: item.navigateTo, label: item.title, action: () => onNavigateCandidate?.(item.navigateTo), active: screen === item.navigateTo })),
    { key: 'settings', label: 'Minhas preferencias', action: () => onGoToSettings?.(), active: screen === 'settings' },
  ]

  const sidebarItems = portalView === 'Administrador'
    ? AdministradorMenu.map((item) => ({ key: item.target, label: item.label, action: () => onNavigateAdministrador?.(item.target), active: AdministradorScreen === item.target }))
    : portalView === 'evaluator'
      ? [{ key: 'eval-dashboard', label: 'Projetos para avaliacao', action: () => onNavigateEvaluator?.('eval-dashboard'), active: evaluatorScreen === 'eval-dashboard' }]
      : candidateItems

  return (
    <>
      <button type="button" className="responsive-sidebar__backdrop" onClick={onClose} aria-label="Fechar navegacao lateral" />
      <aside className="responsive-sidebar" aria-label="Navegacao lateral">
        <div className="responsive-sidebar__header">
          <strong>Navegacao</strong>
          <button type="button" className="responsive-sidebar__close" onClick={onClose} aria-label="Fechar">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <PortalSelector
          portalView={portalView}
          onSelectPortal={(value) => { onSelectPortal(value); onClose() }}
        />
        <nav className="responsive-sidebar__nav">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`responsive-sidebar__item${item.active ? ' is-active' : ''}`}
              onClick={() => { item.action(); onClose() }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="responsive-sidebar__item responsive-sidebar__item--danger"
          onClick={() => { onExit?.(); onClose() }}
        >
          Sair
        </button>
      </aside>
    </>
  )
}
