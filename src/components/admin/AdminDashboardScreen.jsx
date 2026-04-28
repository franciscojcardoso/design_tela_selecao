import { useState } from 'react'
import { AdministradorSchedule, AdministradorGraphSeries, fixedToday, parseIsoDate } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdministradorNavbar } from './AdminNavbar'

function AdministradorKpiCard({ title, value, icon, detail, onClick, disabled = false }) {
  return (
    <button type="button" className={`Administrador-kpi-card${disabled ? ' is-disabled' : ' is-clickable'}`} onClick={onClick} disabled={disabled}>
      <div className="Administrador-kpi-card__icon">
        <i className={`bi ${icon}`} />
      </div>
      <div className="Administrador-kpi-card__content">
        <span className="Administrador-kpi-card__title">{title}</span>
        <strong className="Administrador-kpi-card__value">{value}</strong>
        <small className="Administrador-kpi-card__detail">{detail}</small>
      </div>
    </button>
  )
}

function AdministradorInsightsCard({ AdministradorContext }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProjects = AdministradorContext.projectsRows.filter((project) =>
    [project.institution, project.email, project.phone, project.notice, project.amount, project.status]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <section className="Administrador-panel-card Administrador-panel-card--side">
      <header className="Administrador-panel-card__header">
        <div className="Administrador-panel-card__title">
          <i className="bi bi-kanban" />
          <span>Projetos em analise</span>
        </div>
        <span className="Administrador-table-card__badge">{AdministradorContext.projectsRows.length} projetos</span>
      </header>

      <div className="Administrador-insights Administrador-insights--single">
        <article className="Administrador-table-card">
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por instituicao, e-mail, telefone ou status"
            searchLabel="Pesquisar projetos em analise"
          />
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-table--cards">
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

function AdministradorChatWidget({ AdministradorContext }) {
  const [isOpen, setIsOpen] = useState(false)
  const attendanceGroups = AdministradorContext?.attendanceGroups || [
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
      <button type="button" className="Administrador-chat-toggle" onClick={() => setIsOpen((current) => !current)} aria-label="Abrir assistente">
        <i className="bi bi-chat-dots" />
      </button>

      {isOpen && (
        <section className="Administrador-chat-window">
          <header className="Administrador-chat-window__header">
            <span>SeleBot</span>
            <button type="button" onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg" />
            </button>
          </header>
          <div className="Administrador-chat-window__body">
            <div className="Administrador-chat-window__avatar">
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
          <footer className="Administrador-chat-window__footer">
            <input type="text" placeholder="Digite sua mensagem" />
            <button type="button">Enviar</button>
          </footer>
        </section>
      )}
    </>
  )
}

export function AdministradorDashboardScreen({ portalView, onSelectPortal, AdministradorContext, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const kpis = [
    { title: 'Instituições', value: AdministradorContext.totals.inscritos, icon: 'bi-people-fill', detail: 'Instituições localizadas no contexto atual.', target: 'institutions' },
    { title: 'Projetos', value: AdministradorContext.projectsRows.length, icon: 'bi-kanban', detail: 'Projetos vinculados aos editais ativos.', target: 'projects' },
    { title: 'Recursos', value: AdministradorContext.totals.recursos, icon: 'bi-file-earmark-text', detail: 'Demandas em revisão ou acompanhamento.', target: 'resources' },
    { title: 'Auditorias', value: AdministradorContext.auditRows.length, icon: 'bi-clipboard-check', detail: 'Histórico rastreável de operações do sistema.', target: 'audits' },
  ]

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <section className="Administrador-kpi-grid">
          {kpis.map((kpi) => (
            <AdministradorKpiCard
              key={kpi.title}
              {...kpi}
              onClick={kpi.target ? () => onNavigate(kpi.target) : undefined}
            />
          ))}
        </section>

        <section className="Administrador-content-grid">
          <AdministradorInsightsCard AdministradorContext={AdministradorContext} />
        </section>
      </main>
      <AppFooter />
      <AdministradorChatWidget AdministradorContext={AdministradorContext} />
    </div>
  )
}
