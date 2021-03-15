import * as React from "react"
import Header from "./header"
import Hero from "./hero"
import Footer from "./footer"

const Layout = ({ location, title, hasSidebar, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <Header/>
      <Hero isRootPath={isRootPath}/>
      <main className='main container'>
          {children}
      </main>
      <Footer/>
    </>
      
  )
}

export default Layout
