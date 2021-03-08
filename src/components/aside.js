import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

const Aside = ({title}) => {

  return (
    <aside className="side-content">
        <Bio/>
          <nav className="navbar">
            <Link to="/">{title}</Link>
            <div>
              <Link className="navbar__link" to="/blog">Blog</Link>
            </div>
          </nav>
    </aside>
  )
}

export default Aside
