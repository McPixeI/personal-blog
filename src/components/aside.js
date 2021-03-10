import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

import navigation from '../data/navigation'

const Aside = ({isRootPath}) => {

  return (
    <aside className="side-content" data-is-root={isRootPath}>
          <Bio />
          <nav className="navbar">
              { navigation.map(link =>{
                return <Link key={link.title} className="navbar__link" activeClassName="navbar__link--active" to={link.path}>{link.title}</Link>         
              })}     
          </nav>
    </aside>
  )
}

export default Aside
