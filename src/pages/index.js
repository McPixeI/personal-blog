import * as React from "react"
import { graphql } from "gatsby"

import Section from "../components/section"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/postList"
import Sidebar from "../components/sidebar"
import TagList from "../components/tagList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tags = (data.allMarkdownRemark.group).map(tag =>{
    return tag.fieldValue
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="main-content">
        <Section title='Últimos posts'>
          <PostList posts={posts} moreBtn/>
        </Section>
      </div>
      <Sidebar>
        <TagList tags={tags} title='Categorías destacadas'></TagList>
      </Sidebar> 
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
      group(field: frontmatter___tags) {
        fieldValue
      }
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "D MMMM YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
