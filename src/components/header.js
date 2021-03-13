import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

import navigation from '../data/navigation'

const Header = ({isRootPath}) => {

  return (
    <header className="header" data-is-root={isRootPath}>
      <div className="container">
          <nav className="navbar">
              <Link to="/" className="header__logo">Samuel<br/>Torres</Link>
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
