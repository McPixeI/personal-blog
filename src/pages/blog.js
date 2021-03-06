import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/search"
import PostList from "../components/postList"

const Blog = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [posts, setPosts] = React.useState(data.allMarkdownRemark.nodes)

  const handleSearchResults = res => {
    setPosts(res)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Search posts={posts} onResults={handleSearchResults}/>
      <PostList posts={posts}/>
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
        }
      }
    }
  }
`
