import { useState } from 'react'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdminNavbar } from './AdminNavbar'
import { AdminSectionHeader } from './AdminSectionHeader'

export function AdminProjectsScreen({ rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredRows = rows.filter((row) =>
    [row.institution, row.notice, row.project, row.amount, row.status]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <AdminSectionHeader title="Projetos" subtitle="Lista dos projetos vinculados as instituicoes cadastradas, com edital, valor e situacao atual." onBack={onBack} />
        <section className="admin-management-card admin-users-crud">
          <div className="admin-management-card__topline">
            <strong>{filteredRows.length} projeto(s)</strong>
          </div>
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por instituicao, edital, projeto ou status"
            searchLabel="Pesquisar projetos"
          />
          <div className="admin-users-table-wrap">
            <table className="admin-table admin-table--cards">
              <thead>
                <tr>
                  <th>Instituicao</th>
                  <th>Edital</th>
                  <th>Projeto</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Instituicao">{row.institution}</td>
                    <td data-label="Edital">{row.notice}</td>
                    <td data-label="Projeto">{row.project}</td>
                    <td data-label="Valor">{row.amount}</td>
                    <td data-label="Status">{row.status}</td>
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
