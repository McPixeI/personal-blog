import * as React from "react"
import Bio from "./bio"
import Header from "./aside"
import Aside from "./aside"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <Aside title={title}></Aside>
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <footer>
        <div className="container">
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </footer>

    </div>
      
  )
}

export default Layout
