import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

import navigation from '../data/navigation'

const Header = () => {

  return (
    <header className="header" >
      <div className="container">
          <nav className="navbar">
              <Link to="/" className="navbar__logo"><span>{`<`}</span>SamuTorres<span>{`/>`}</span></Link>
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
