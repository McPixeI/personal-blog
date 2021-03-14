import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Tags = ({ pageContext, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const { tag } = pageContext
  const { nodes, totalCount } = data.allMarkdownRemark
  
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } etiquetado${
    totalCount === 1 ? "" : "s"
  } con "${tag}"`
  const location = {pathname:`/tags/${pageContext}`}
  
  return (
    <Layout location={location} title={siteTitle}>
      <section className="content-section">
        <h1 className="section-title">{tagHeader}</h1>
        <PostList posts={nodes}></PostList>
        <Link className="btn btn--primary btn--outline" to="/tags">Ver todos →</Link>
      </section>
    </Layout>
    
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "D MMMM YYYY")
          title
          description
        }
      }
    }
  }
`