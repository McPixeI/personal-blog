import * as React from "react"
import { graphql } from "gatsby"

import Section from "../components/section"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post/postList"
import Sidebar from "../components/sidebar"
import TagList from "../components/tagList"
import Newsletter from "../components/newsletter"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes
  const tags = (data.allTags.group).map(tag =>{
    return tag.fieldValue
  })

  return (
    <Layout location={location}>
      <Seo title='Inicio'/>
      <div className="main-content">
        <Section title='Últimos posts'>
          <PostList posts={posts} moreBtn/>
        </Section>
      </div>
      <Sidebar>
        <div className="sidebar__section">
          <TagList tags={tags} title='Categorías destacadas'></TagList>
        </div>
        <div className="sidebar__section">
          <div className="card">
            <Newsletter></Newsletter>
          </div>
        </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
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
    allTags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
