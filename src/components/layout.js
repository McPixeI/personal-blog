import * as React from "react"
import Aside from "./header"

const Layout = ({ location, title, hasSidebar, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <Aside isRootPath={isRootPath}></Aside>
      <main className='main'>
          {children}
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
