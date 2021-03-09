import * as React from "react"
import { graphql } from "gatsby"

import Section from "../components/section"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/postList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Section title='Últimos posts'>
        <PostList posts={posts} moreBtn/>
      </Section>
      <Section title='Proyectos'>
        <p>TO DO</p>
      </Section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM YYYY")
          title
          description
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tags
        }
      }
    }
  }
`
