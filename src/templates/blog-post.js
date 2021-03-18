import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ShareButtons from "../components/shareButtons"
import ToC from "../components/toc"
import { getFormattedDate } from "../utils/helpers";
import { Disqus } from 'gatsby-plugin-disqus';
import TagList from "../components/tagList"
import Sidebar from "../components/sidebar"

const BlogPostTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const post = data.markdownRemark
  const headings = post.headings
  const slug = post.fields.slug
  const { title, description, date, tags } = post.frontmatter
  const { previous, next } = data
  const formattedDate = getFormattedDate(date)
  
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: process.env.GATSBY_DISQUS_NAME, url: slug, title: title },
  }

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
          {tags && <TagList tags={tags}/>}
          <div className="blog-post__info">
            <div>
              <small>Publicado el </small>
              <time>{formattedDate}</time>
            </div>
          </div>
        </header>
        <section className="blog-post__content">
        <div
          className="blog-post__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
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
          {process.env.GATSBY_COMMENTS_ENABLED === 'true' && <Disqus config={{...disqusConfig}}/>}

        </footer>
      </article>
      <Sidebar sticky>
        {headings && <ToC headings={headings}></ToC>}
        <ShareButtons title={title} url={location.href} tags={tags}/>

      </Sidebar>

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
      fields {
        slug
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
