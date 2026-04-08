import { useState } from 'react'
import { adminSchedule, adminGraphSeries, fixedToday, parseIsoDate } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdminNavbar } from './AdminNavbar'

function AdminKpiCard({ title, value, icon, detail, onClick, disabled = false }) {
  return (
    <button type="button" className={`admin-kpi-card${disabled ? ' is-disabled' : ' is-clickable'}`} onClick={onClick} disabled={disabled}>
      <div className="admin-kpi-card__icon">
        <i className={`bi ${icon}`} />
      </div>
      <div className="admin-kpi-card__content">
        <span className="admin-kpi-card__title">{title}</span>
        <strong className="admin-kpi-card__value">{value}</strong>
        <small className="admin-kpi-card__detail">{detail}</small>
      </div>
    </button>
  )
}

function AdminInsightsCard({ adminContext }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProjects = adminContext.projectsRows.filter((project) =>
    [project.institution, project.email, project.phone, project.notice, project.amount, project.status]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <section className="admin-panel-card admin-panel-card--side">
      <header className="admin-panel-card__header">
        <div className="admin-panel-card__title">
          <i className="bi bi-kanban" />
          <span>Projetos em analise</span>
        </div>
        <span className="admin-table-card__badge">{adminContext.projectsRows.length} projetos</span>
      </header>

      <div className="admin-insights admin-insights--single">
        <article className="admin-table-card">
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por instituicao, e-mail, telefone ou status"
            searchLabel="Pesquisar projetos em analise"
          />
          <div className="admin-users-table-wrap">
            <table className="admin-table admin-table--cards">
              <thead>
                <tr>
                  <th>Instituicao</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.slice(0, 6).map((project) => (
                  <tr key={project.id}>
                    <td data-label="Instituicao">{project.institution}</td>
                    <td data-label="E-mail">{project.email}</td>
                    <td data-label="Telefone">{project.phone}</td>
                    <td data-label="Status">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  )
}

function AdminChatWidget({ adminContext }) {
  const [isOpen, setIsOpen] = useState(false)
  const attendanceGroups = adminContext?.attendanceGroups || [
    {
      label: 'Em andamento',
      items: [
        { title: 'Projeto aguardando avaliacao', detail: 'Fila principal do avaliador', status: 'Pendente' },
        { title: 'Cadastro institucional incompleto', detail: 'Aguardando envio complementar', status: 'Em andamento' },
      ],
    },
  ]
  const pendingCount = attendanceGroups
    .filter((group) => group.label !== 'Concluidos')
    .reduce((sum, group) => sum + (group.count ?? group.items.length), 0)

  return (
    <>
      <button type="button" className="admin-chat-toggle" onClick={() => setIsOpen((current) => !current)} aria-label="Abrir assistente">
        <i className="bi bi-chat-dots" />
      </button>

      {isOpen && (
        <section className="admin-chat-window">
          <header className="admin-chat-window__header">
            <span>SeleBot</span>
            <button type="button" onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg" />
            </button>
          </header>
          <div className="admin-chat-window__body">
            <div className="admin-chat-window__avatar">
              <i className="bi bi-robot" />
            </div>
            <p>Ola! Estes sao os atendimentos em aberto no momento.</p>
            <strong>{pendingCount} item(ns) aguardando acao</strong>
            <ul>
              {attendanceGroups
                .filter((group) => group.label !== 'Concluidos')
                .flatMap((group) => group.items.slice(0, 2))
                .map((item) => <li key={item.title}>{item.title}</li>)}
            </ul>
          </div>
          <footer className="admin-chat-window__footer">
            <input type="text" placeholder="Digite sua mensagem" />
            <button type="button">Enviar</button>
          </footer>
        </section>
      )}
    </>
  )
}

export function AdminDashboardScreen({ portalView, onSelectPortal, adminContext, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const kpis = [
    { title: 'Instituições', value: adminContext.totals.inscritos, icon: 'bi-people-fill', detail: 'Instituições localizadas no contexto atual.', target: 'institutions' },
    { title: 'Projetos', value: adminContext.projectsRows.length, icon: 'bi-kanban', detail: 'Projetos vinculados aos editais ativos.', target: 'projects' },
    { title: 'Recursos', value: adminContext.totals.recursos, icon: 'bi-file-earmark-text', detail: 'Demandas em revisão ou acompanhamento.', target: 'resources' },
    { title: 'Auditorias', value: adminContext.auditRows.length, icon: 'bi-clipboard-check', detail: 'Histórico rastreável de operações do sistema.', target: 'audits' },
  ]

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <section className="admin-kpi-grid">
          {kpis.map((kpi) => (
            <AdminKpiCard
              key={kpi.title}
              {...kpi}
              onClick={kpi.target ? () => onNavigate(kpi.target) : undefined}
            />
          ))}
        </section>

        <section className="admin-content-grid">
          <AdminInsightsCard adminContext={adminContext} />
        </section>
      </main>
      <AppFooter />
      <AdminChatWidget adminContext={adminContext} />
    </div>
  )
}
