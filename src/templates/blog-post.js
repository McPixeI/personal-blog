import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ShareButtons from "../components/shareButtons"
import ToC from "../components/toc"
import { getFormattedDate } from "../utils/helpers";
import { Disqus } from 'gatsby-plugin-disqus';
import TagList from "../components/tagList"
import Sidebar from "../components/sidebar"
import PostInfo from "../components/post/postInfo"
import PostNav from "../components/post/postNav"
import ScrollTopButton from "../components/scrollTopButton"

const BlogPostTemplate = ({ data, location }) => {
  const HEADINGS_MAX_DEPTH = 4
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata.author.name
  const post = data.markdownRemark
  const slug = post.fields.slug
  const { title, description, date, tags } = post.frontmatter
  const { previous, next } = data
  const formattedDate = getFormattedDate(date)

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: process.env.GATSBY_DISQUS_NAME, url: slug, title: title },
  }

  const headings = post.headings.filter( heading => heading.depth <= HEADINGS_MAX_DEPTH)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
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
            <PostInfo author={author} date={formattedDate}></PostInfo>
            <ShareButtons title={title} url={location.href} tags={tags}/>
          </div>
        </header>
        <section className="blog-post__content">
          <div
            className="blog-post__body"
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <Sidebar sticky>
            {headings && <ToC headings={headings}></ToC>}
            {tags && <TagList tags={tags} title='Etiquetas'/>}
          </Sidebar>
          <ScrollTopButton offset='400'/>
        </section>
        <hr />
        <footer>
          <PostNav previous={previous} next={next}></PostNav>
          {process.env.GATSBY_COMMENTS_ENABLED === 'true' && <Disqus config={{...disqusConfig}}/>}
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
        author {
          name
        }
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
