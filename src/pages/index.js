import * as React from "react"
import { graphql } from "gatsby"

import Section from "../components/section"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post/postList"
import ProjectList from "../components/projectList"

import Sidebar from "../components/sidebar"
import TagList from "../components/tagList"
import Newsletter from "../components/newsletter"
import projects from "../data/projects"

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
        <Section title='Últimos proyectos'>
        </Section>
      </div>
      <Sidebar>
        <div className="sidebar__section">
          <TagList tags={tags} title='Categorías destacadas'></TagList>
        </div>
        <div className="sidebar__section">
          <Newsletter></Newsletter>
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
