import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {

  return (
    <Layout location={location}>
      <Seo title={`Not found`} />
      <div className="not-found">
        <h1 className='not-found__title'>Error <span>404</span></h1>
        <p>Lo siento, la página que buscas no existe...</p>
        <p>Puedes buscar cualquier otro artículo en el siguiente enlace:</p>
        <Link to="/blog" class="btn btn--primary">Ver artículos</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
