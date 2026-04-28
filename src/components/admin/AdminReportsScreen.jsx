import { useState } from 'react'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

export function AdministradorReportsScreen({ AdministradorContext, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerms, setSearchTerms] = useState({})

  const reportSections = [
    {
      title: 'Projetos em análise',
      icon: 'bi-kanban',
      rows: AdministradorContext.projectsRows,
      headers: ['Instituição', 'E-mail', 'Telefone', 'Edital', 'Valor', 'Status'],
      cells: (row) => [row.institution, row.email, row.phone, row.notice.split(' - ')[0], row.amount, row.status],
    },
    {
      title: 'Recursos e demandas',
      icon: 'bi-file-earmark-text',
      rows: AdministradorContext.resourcesRows,
      headers: ['Inscrito', 'Cidade', 'Volume', 'Status'],
      cells: (row) => [row.companyName, row.city, row.volume, row.status],
    },
  ]

  const summaryKpis = [
    { label: 'Total de instituições', value: AdministradorContext.totals.inscritos },
    { label: 'Total de projetos', value: AdministradorContext.projectsRows.length },
    { label: 'Total de recursos', value: AdministradorContext.totals.recursos },
    { label: 'Documentos recebidos', value: AdministradorContext.totals.documentos },
    { label: 'Etapas concluídas', value: AdministradorContext.totals.concluidos },
    { label: 'Pendências', value: AdministradorContext.totals.pendencias },
  ]

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title="Relatórios" subtitle="Visão consolidada dos dados do processo seletivo para análise e acompanhamento." onBack={onBack} />

        <div className="reports-summary-grid">
          {summaryKpis.map((kpi) => (
            <div key={kpi.label} className="reports-kpi-card">
              <span className="reports-kpi-card__label">{kpi.label}</span>
              <strong className="reports-kpi-card__value">{kpi.value}</strong>
            </div>
          ))}
        </div>

        {reportSections.map((section) => (
          <section key={section.title} className="Administrador-management-card" style={{ marginBottom: '1rem' }}>
            <div className="Administrador-management-card__topline">
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
            <div className="Administrador-users-table-wrap">
              <table className="Administrador-table Administrador-table--cards">
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
