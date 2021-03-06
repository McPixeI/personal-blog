import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allMarkdownRemark.nodes

  const emptyQuery = ""
  const [state, setState] = React.useState({
    filteredData: [],
    query: emptyQuery,
  })
  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const filteredData = allPosts.filter(post => {
      const { description, title, tags } = post.frontmatter
      console.log(post.frontmatter)
      return (
        description?.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase()))
      )
    })
    setState({
      query,
      filteredData,
    })
  }
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts
  console.log(filteredData)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <input
              type="text"
              aria-label="Search"
              placeholder="Type to filter posts..."
              onChange={handleInputChange}
          />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <input
              type="text"
              aria-label="Search"
              placeholder="Type to filter posts..."
              onChange={handleInputChange}
          />
      <ol style={{ listStyle: `none` }}>        
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Posts

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
