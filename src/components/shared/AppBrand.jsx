import logoJangada from '../../assets/logo-jangada.svg'
import logoEstadoCeara from '../../assets/logo-estado-ceara.svg'
import { institutionInfo } from '../../data/constants'

export function AppBrand({ footer = false }) {
  return (
    <div className={`app-brand${footer ? ' app-brand--footer' : ''}`}>
      <img src={logoJangada} alt="Logo Jangada" className="app-brand__image" />
    </div>
  )
}

export function AppFooter() {
  return (
    <footer className="footer-painel">
      <div className="footer-painel__stripe" aria-hidden="true">
        <span className="footer-painel__stripe-part footer-painel__stripe-part--green" />
        <span className="footer-painel__stripe-part footer-painel__stripe-part--blue" />
        <span className="footer-painel__stripe-part footer-painel__stripe-part--red" />
      </div>
      <div className="footer-painel__content">
        <div className="container-fluid px-4">
          <div className="footer-painel__inner">
            <div className="footer-painel__identity">
              <AppBrand footer />
              <div className="footer-info">
                <strong>{institutionInfo.fullName}</strong>
                <div><i className="bi bi-geo-alt-fill me-2" />{institutionInfo.address}</div>
                <div><i className="bi bi-envelope-fill me-2" />{institutionInfo.email}</div>
              </div>
            </div>
            <div className="footer-rights">
              <img src={logoEstadoCeara} alt={institutionInfo.government} className="footer-rights__logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
