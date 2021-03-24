import * as React from "react"
import { Link } from "gatsby"

import navigation from '../data/navigation'

const Header = () => {

  return (
    <header className="header" >
      <div className="container">
          <nav className="navbar">
              <Link to="/" className="navbar__logo">
                <span className="navbar__logo-symbol">{`</>`}</span> 
                <span className="navbar__logo-mobile">S.T</span>
                <span className="navbar__logo-desk">SamuTorres</span>
              </Link>
              <div>
                { navigation.map(nav =>{
                  return <Link key={nav.title} className="navbar__link" activeClassName="navbar__link--active" to={nav.path}>{nav.title}</Link>
                })}  
              </div>
          </nav>
      </div>
    </header>
  )
}

export default Header
