import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { AppFooter } from '../shared/AppBrand'
import { TableSearchBar } from '../shared/TableSearchBar'
import { AdministradorNavbar } from './AdminNavbar'
import { AdministradorSectionHeader } from './AdminSectionHeader'

export function AdministradorAuditsScreen({ rows, onBack, portalView, onSelectPortal, AdministradorScreen, onNavigate, onExit, onOpenSidebar }) {
  const selectedAudit = rows[0]
  const [searchTerm, setSearchTerm] = useState('')
  const filteredRows = rows.filter((row) =>
    [row.id, row.location, row.recordId, row.action, row.datetime]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.trim().toLowerCase())),
  )

  return (
    <div className="Administrador-page">
      <AdministradorNavbar portalView={portalView} onSelectPortal={onSelectPortal} AdministradorScreen={AdministradorScreen} onNavigate={onNavigate} onExit={onExit} onOpenSidebar={onOpenSidebar} />
      <main className="Administrador-main">
        <AdministradorSectionHeader title="Auditoria" subtitle="Acompanhe e registre as acoes realizadas no sistema para garantir integridade, rastreabilidade e seguranca dos dados." onBack={onBack} />
        <section className="Administrador-management-card Administrador-audit-card">

          <div className="Administrador-audit-block">
            <h3>Registro de usuário</h3>
            <Form.Control value={selectedAudit.user} readOnly />
          </div>

          <div className="Administrador-audit-block">
            <h3>Acoes</h3>
            <TableSearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar por localizacao, acao, data ou registro"
              searchLabel="Pesquisar auditoria"
            />
            <div className="Administrador-users-table-wrap">
              <table className="Administrador-table Administrador-table--cards">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Localizacao</th>
                    <th>ID Registro</th>
                    <th>Acao</th>
                    <th>Data/Hora</th>
                    <th>Ver em detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td data-label="ID">{row.id}</td>
                      <td data-label="Localizacao">{row.location}</td>
                      <td data-label="ID Registro">{row.recordId}</td>
                      <td data-label="Acao">{row.action}</td>
                      <td data-label="Data/Hora">{row.datetime}</td>
                      <td data-label="Detalhes"><button type="button" className="Administrador-eye-button"><i className="bi bi-eye-fill" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="Administrador-audit-detail-grid">
            <section className="Administrador-audit-detail-card">
              <h3>Detalhes das acoes de auditoria</h3>
              <div className="Administrador-audit-detail-lines">
                <div><strong>Nome do usuario:</strong> {selectedAudit.userName}</div>
                <div><strong>Login do usuario:</strong> {selectedAudit.user}</div>
                <div><strong>Ações realizadas:</strong> {rows.map((row) => row.action).join(', ')}</div>
                <div><strong>Quantidade total de ações:</strong> {rows.length}</div>
                <div><strong>Período das ações:</strong> {rows[rows.length - 1].datetime} a {rows[0].datetime}</div>
              </div>
            </section>

            <section className="Administrador-audit-detail-card">
              <h3>Detalhes da acao registrada</h3>
              <div className="Administrador-audit-detail-lines">
                <div><strong>Tipo de ação:</strong> {selectedAudit.action}</div>
                <div><strong>ID da auditoria:</strong> {selectedAudit.recordId}</div>
                <div><strong>Data e hora da ação:</strong> {selectedAudit.datetime}</div>
                <div><strong>Nome do usuario:</strong> {selectedAudit.userName}</div>
                <div><strong>Login do usuario:</strong> {selectedAudit.user}</div>
                <div><strong>IP de origem:</strong> {selectedAudit.ip}</div>
                <div><strong>Localizacao:</strong> {selectedAudit.location}</div>
                <div><strong>Detalhes da operacao:</strong> {selectedAudit.detail}</div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  )
}
