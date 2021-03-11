import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

import navigation from '../data/navigation'

const Aside = ({isRootPath}) => {

  return (
    <aside className="side-content" data-is-root={isRootPath}>
          <Bio />
          <nav className="navbar">
            <ul className="navbar__list">
              { navigation.map(nav =>{
                return <li key={nav.title}>
                          <Link className="navbar__link" activeClassName="navbar__link--active" to={nav.path}>{nav.title}</Link>
                        </li>
              })}     
            </ul>
          </nav>
    </aside>
  )
}

export default Aside
