import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

const Aside = ({isRootPath}) => {

  return (
    <aside className="side-content" data-is-root={isRootPath}>
        <Bio />
          <nav className="navbar">
          <Link className="navbar__link" activeClassName="navbar__link--active" to="/">Inicio</Link>
          <Link className="navbar__link" activeClassName="navbar__link--active" to="/blog">Blog</Link>
          <Link className="navbar__link" activeClassName="navbar__link--active" to="/about">Proyectos</Link>
          <Link className="navbar__link" activeClassName="navbar__link--active" to="/contact">Sobre mí</Link>
          </nav>
    </aside>
  )
}

export default Aside
