import { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { evaluatorMenu, evaluatorProjects } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { AppBrand } from '../shared/AppBrand'
import { PortalSelector } from '../shared/PortalSelector'

function EvaluatorNavbar({ portalView, onSelectPortal, evaluatorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-painel">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center gap-3 navbar-branding">
          <button type="button" className="navbar-compact-toggle" onClick={onOpenSidebar} aria-label="Abrir navegacao lateral">
            <i className="bi bi-list" />
          </button>
          <AppBrand />
          <div className="mb-0 navbar-titulo">Painel do avaliador</div>
        </div>
        <div className="d-flex align-items-center gap-2 navbar-painel__menu">
          {evaluatorMenu.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`navbar-menu-item${evaluatorScreen === item.target ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.target)}
            >
              {item.icon && <i className={`bi ${item.icon}`} />}
              <span>{item.label}</span>
            </button>
          ))}
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
                <i className="bi bi-person-check" />
              </div>
              <span>Avaliador</span>
              <i className="bi bi-chevron-down navbar-user__chevron" />
            </button>
            {showDropdown && (
              <div className="navbar-dropdown">
                <button
                  type="button"
                  className="navbar-dropdown__item navbar-dropdown__item--danger"
                  onClick={() => { setShowDropdown(false); onExit?.() }}
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

export function EvaluatorDashboardScreen({ evaluatorScreen, portalView, onSelectPortal, onNavigate, onExit, selectedProjectId, onSelectProject, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')

  const statusBadge = (status) => {
    if (status === 'Avaliado') return 'success'
    if (String(status).toLowerCase().includes('avali')) return 'warning'
    return 'neutral'
  }

  const filteredProjects = evaluatorProjects.filter((project) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [project.institution, project.project, project.notice, project.amount, project.status]
      .some((value) => String(value || '').toLowerCase().includes(term))
  })

  return (
    <div className="admin-page">
      <EvaluatorNavbar portalView={portalView} onSelectPortal={onSelectPortal} evaluatorScreen={evaluatorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <div className="admin-detail-header">
          <div>
            <h2>Painel do avaliador</h2>
            <p>Leitura e avaliacao dos projetos atribuidos ao seu perfil.</p>
          </div>
        </div>

        <div className="reports-summary-grid" style={{ marginBottom: '1rem' }}>
          <div className="reports-kpi-card">
            <span className="reports-kpi-card__label">Projetos atribuidos</span>
            <strong className="reports-kpi-card__value">{evaluatorProjects.length}</strong>
          </div>
          <div className="reports-kpi-card">
            <span className="reports-kpi-card__label">Avaliados</span>
            <strong className="reports-kpi-card__value">{evaluatorProjects.filter((project) => project.status === 'Avaliado').length}</strong>
          </div>
          <div className="reports-kpi-card">
            <span className="reports-kpi-card__label">Pendentes</span>
            <strong className="reports-kpi-card__value">{evaluatorProjects.filter((project) => project.status !== 'Avaliado').length}</strong>
          </div>
        </div>

        <section className="admin-management-card admin-users-crud">
          <div className="admin-users-crud__topbar">
            <div className="admin-users-search">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pesquisar por instituicao, projeto, edital ou status"
              />
              <button type="button" aria-label="Pesquisar projetos">
                <i className="bi bi-search" />
              </button>
            </div>
          </div>

          <div className="admin-users-table-wrap">
            <table className="admin-table admin-users-table admin-table--cards">
              <thead>
                <tr>
                  <th>Instituicao</th>
                  <th>Projeto</th>
                  <th>Edital</th>
                  <th>Valor solicitado</th>
                  <th>Status</th>
                  <th>Acao</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className={selectedProjectId === project.id ? 'admin-table__row--highlight' : ''}>
                    <td data-label="Instituicao">{project.institution}</td>
                    <td data-label="Projeto">
                      <button type="button" className="admin-table-link" onClick={() => onSelectProject?.(project.id)}>
                        {project.project}
                      </button>
                    </td>
                    <td data-label="Edital">{project.notice}</td>
                    <td data-label="Valor solicitado">{project.amount}</td>
                    <td data-label="Status"><Badge className={`status-chip status-chip--${statusBadge(project.status)}`}>{project.status}</Badge></td>
                    <td data-label="Acao"><button type="button" className="admin-inline-action">Avaliar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}
