import { useState } from 'react'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

export function AdministradorResourcesScreen({ rows, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredRows = rows.filter((row) =>
    [row.companyName, row.city, row.volume, row.status]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title="Gerenciar recursos" subtitle="Lista consolidada dos recursos vinculados aos inscritos e prontos para tratamento administrativo." onBack={onBack} />
        <section className="Administrador-management-card Administrador-users-crud">
          <div className="Administrador-management-card__topline">
            <strong>{filteredRows.length} recurso(s)</strong>
          </div>
          <TableSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por inscrito, cidade, volume ou status"
            searchLabel="Pesquisar recursos"
          />
          <div className="Administrador-users-table-wrap">
            <table className="Administrador-table Administrador-table--cards">
              <thead>
                <tr>
                  <th>Inscrito</th>
                  <th>Cidade</th>
                  <th>Volume</th>
                  <th>Status</th>
                  <th>Acao</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Inscrito">{row.companyName}</td>
                    <td data-label="Cidade">{row.city}</td>
                    <td data-label="Volume">{row.volume}</td>
                    <td data-label="Status">{row.status}</td>
                    <td data-label="Acoes">
                      <button type="button" className="Administrador-inline-action">Abrir recurso</button>
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
