import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/search"
import PostList from "../components/post/postList"
import Section from "../components/section"

const Blog = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allMarkdownRemark.nodes
  const [posts, setPosts] = React.useState(allPosts)

  const handleSearchResults = res => {
    setPosts(res)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Section title="Artículos">
        <h3 className="section-subtitle">Todos los artículos, tutoriales y opiniones hasta la fecha.</h3>
        <Search posts={allPosts} onResults={handleSearchResults}/>
        <PostList posts={posts}/>
      </Section>
    </Layout>
  )
}

export default Blog

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
          tags
        }
      }
    }
  }
`
