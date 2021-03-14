import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { slugify } from "../utils/helpers"
import ShareButtons from "../components/shareButtons"
import ToC from "../components/toc"
import { getFormattedDate } from "../utils/helpers";

const BlogPostTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const post = data.markdownRemark
  const headings = post.headings
  const { title, description, date, tags } = post.frontmatter
  const { previous, next } = data
  const formattedDate = getFormattedDate(date)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={title}
        description={description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className='blog-post__header'>
          <h1 itemProp="headline">{title}</h1>
          <div className="blog-post__info">
            <div>
              <p>Publicado el</p>
              <time>{formattedDate}</time>
            </div>
            <ShareButtons title={title} url={location.href} tags={tags}/>
          </div>
        </header>
        <section className="blog-post__content">
        <div
          className="blog-post__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <aside className="sidebar">
          <div className="sidebar__content sidebar__content--sticky">
            <ToC headings={headings}></ToC>
            {tags && (
              <>
                <h5>Etiquetas</h5>
                <div className="tags">
                  {tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tags/${slugify(tag)}`}
                      className={`tag tag--${tag}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>
        </section>

  
        <hr />
        <footer>
          <nav className="blog-post__nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </footer>
      </article>

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      headings {
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
