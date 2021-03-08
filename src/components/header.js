import * as React from "react"
import { Link } from "gatsby"

const Header = ({title}) => {

  return (
    <div className="header">
      <nav className="navbar">
      <Link to="/">{title}</Link>
      </nav>
    </div>
  )
}

export default Header
