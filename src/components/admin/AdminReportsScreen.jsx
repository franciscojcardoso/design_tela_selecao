import { useState } from 'react'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdminNavbar } from './AdminNavbar'
import { AdminSectionHeader } from './AdminSectionHeader'

export function AdminReportsScreen({ adminContext, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerms, setSearchTerms] = useState({})

  const reportSections = [
    {
      title: 'Projetos em análise',
      icon: 'bi-kanban',
      rows: adminContext.projectsRows,
      headers: ['Instituição', 'E-mail', 'Telefone', 'Edital', 'Valor', 'Status'],
      cells: (row) => [row.institution, row.email, row.phone, row.notice.split(' - ')[0], row.amount, row.status],
    },
    {
      title: 'Recursos e demandas',
      icon: 'bi-file-earmark-text',
      rows: adminContext.resourcesRows,
      headers: ['Inscrito', 'Cidade', 'Volume', 'Status'],
      cells: (row) => [row.companyName, row.city, row.volume, row.status],
    },
  ]

  const summaryKpis = [
    { label: 'Total de instituições', value: adminContext.totals.inscritos },
    { label: 'Total de projetos', value: adminContext.projectsRows.length },
    { label: 'Total de recursos', value: adminContext.totals.recursos },
    { label: 'Documentos recebidos', value: adminContext.totals.documentos },
    { label: 'Etapas concluídas', value: adminContext.totals.concluidos },
    { label: 'Pendências', value: adminContext.totals.pendencias },
  ]

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <AdminSectionHeader title="Relatórios" subtitle="Visão consolidada dos dados do processo seletivo para análise e acompanhamento." onBack={onBack} />

        <div className="reports-summary-grid">
          {summaryKpis.map((kpi) => (
            <div key={kpi.label} className="reports-kpi-card">
              <span className="reports-kpi-card__label">{kpi.label}</span>
              <strong className="reports-kpi-card__value">{kpi.value}</strong>
            </div>
          ))}
        </div>

        {reportSections.map((section) => (
          <section key={section.title} className="admin-management-card" style={{ marginBottom: '1rem' }}>
            <div className="admin-management-card__topline">
              <strong><i className={`bi ${section.icon} me-2`} />{section.title}</strong>
              <span>{section.rows.filter((row) =>
                section.cells(row).some((cell) => String(cell || '').toLowerCase().includes((searchTerms[section.title] || '').trim().toLowerCase())),
              ).length} registro(s)</span>
            </div>
            <TableSearchBar
              value={searchTerms[section.title] || ''}
              onChange={(value) => setSearchTerms((current) => ({ ...current, [section.title]: value }))}
              placeholder={`Pesquisar em ${section.title.toLowerCase()}`}
              searchLabel={`Pesquisar em ${section.title}`}
            />
            <div className="admin-users-table-wrap">
              <table className="admin-table admin-table--cards">
                <thead>
                  <tr>{section.headers.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {section.rows.filter((row) =>
                    section.cells(row).some((cell) => String(cell || '').toLowerCase().includes((searchTerms[section.title] || '').trim().toLowerCase())),
                  ).map((row, index) => (
                    <tr key={index}>
                      {section.cells(row).map((cell, ci) => <td key={ci} data-label={section.headers[ci]}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>
      <AppFooter />
    </div>
  )
}
