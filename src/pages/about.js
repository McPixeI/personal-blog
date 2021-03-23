import React from "react"

// Components
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const About = ({
  location,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location} title={title}>
    <Helmet title={title} />
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