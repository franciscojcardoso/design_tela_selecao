import { useState } from 'react'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdminNavbar } from './AdminNavbar'
import { AdminSectionHeader } from './AdminSectionHeader'

export function AdminApplicantsTable({ title, rows, onBack, portalView, onSelectPortal, adminScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredRows = rows.filter((row) =>
    [row.companyName, row.city, row.currentStageLabel, row.status, row.documents]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <div className="admin-page">
      <AdminNavbar portalView={portalView} onSelectPortal={onSelectPortal} adminScreen={adminScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="admin-main">
        <AdminSectionHeader title={title} onBack={onBack} />
        <section className="admin-management-card admin-users-crud">
          <div className="admin-management-card__topline">
            <strong>{filteredRows.length} instituicao(oes)</strong>
          </div>
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por instituicao, cidade, etapa ou status"
            searchLabel="Pesquisar instituicoes"
          />
          <div className="admin-users-table-wrap">
            <table className="admin-table admin-table--cards">
              <thead>
                <tr>
                  <th>Instituicao</th>
                  <th>Cidade</th>
                  <th>Etapa atual</th>
                  <th>Status</th>
                  <th>Documentos</th>
                  <th>Acao</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Instituicao">{row.companyName}</td>
                    <td data-label="Cidade">{row.city}</td>
                    <td data-label="Etapa atual">{row.currentStageLabel}</td>
                    <td data-label="Status">{row.status}</td>
                    <td data-label="Documentos">{row.documents}</td>
                    <td data-label="Acoes">
                      <div className="admin-users-actions">
                        <button type="button" className="admin-inline-action">Documentos</button>
                        <button type="button" className="admin-inline-action">Gerenciar</button>
                      </div>
                    </td>
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
