import React from "react"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/post/postList"
import Seo from "../components/seo"

const Tags = ({ pageContext, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const { tag } = pageContext
  const { nodes, totalCount } = data.allMarkdownRemark
  
  const tagTitle = `Artículos etiquetados con: "${tag}"`
  const tagSubtitle = `${totalCount} resultado${
    totalCount === 1 ? "" : "s"
  }`
  const location = {pathname:`/tags/${pageContext}`}
  
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={tagTitle}/>
      <section className="content-section">
        <h1 className="section-title">{tagTitle}</h1>
        <h2 className="section-subtitle">{tagSubtitle}</h2>
        <PostList posts={nodes}></PostList>
        <Link className="btn btn--secondary btn--outline" to="/tags">Ver etiquetas →</Link>
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