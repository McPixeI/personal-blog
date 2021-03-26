import React from "react"

// Components
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({
  location,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location}>
    <SEO title={'Sobre mí'} />
    <section className="content-section">
      <h1 className="section-title">Sobre mí</h1>
      
    </section>
  </Layout>
 
)

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`