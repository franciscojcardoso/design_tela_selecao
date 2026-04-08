import { useState } from 'react'
import { selection } from '../../data/constants'
import { AppBrand } from '../shared/AppBrand'
import { PortalSelector } from '../shared/PortalSelector'

export function PainelNavbar({ onExit, onGoToSettings, portalView, onSelectPortal, onOpenSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <button type="button" className="navbar-compact-toggle" onClick={onOpenSidebar} aria-label="Abrir navegacao lateral">
            <i className="bi bi-list" />
          </button>
          <AppBrand />
          <div className="mb-0 navbar-titulo">{selection.title}</div>
        </div>
        <div className="d-flex align-items-center gap-3 ms-auto navbar-actions">
          <PortalSelector portalView={portalView} onSelectPortal={onSelectPortal} />
          <div className="navbar-user-wrap">
            <button
              type="button"
              className="navbar-user"
              onClick={() => setShowDropdown((v) => !v)}
              aria-expanded={showDropdown}
            >
              <div className="navbar-avatar">
                <i className="bi bi-person" />
              </div>
              <span>{selection.candidateName}</span>
              <i className="bi bi-chevron-down navbar-user__chevron" />
            </button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <button
                  type="button"
                  className="navbar-dropdown__item"
                  onClick={() => { setShowDropdown(false); onGoToSettings?.() }}
                >
                  <i className="bi bi-sliders" />
                  Minhas preferências
                </button>
                <button
                  type="button"
                  className="navbar-dropdown__item navbar-dropdown__item--danger"
                  onClick={() => { setShowDropdown(false); onExit() }}
                >
                  <i className="bi bi-box-arrow-right" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
