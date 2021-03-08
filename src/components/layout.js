import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <Header title={title}></Header>
    )
  } else {
    header = (
      <Header title={title}></Header>
    )
  }

  return (
    <div>
      <header className="global-header">{header}</header>
      <div className="hero" data-is-root-path={isRootPath}>
        <div className="container">
          {isRootPath && <Bio/>}
        </div>
      </div>
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <footer>
        Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
      
  )
}

export default Layout
