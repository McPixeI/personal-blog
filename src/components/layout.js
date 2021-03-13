import * as React from "react"
import Header from "./header"
import Hero from "./hero"

const Layout = ({ location, title, hasSidebar, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <Header isRootPath={isRootPath}/>
      {isRootPath && <Hero/> }
      <main className='main container'>
          {children}
      </main>
      <footer className='footer'>
        <div className="container">
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </footer>

    </div>
      
  )
}

export default Layout
