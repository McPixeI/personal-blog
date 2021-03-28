import { Link } from "gatsby";
import * as React from "react"


const PostNav = ({previous, next}) => {

  return (
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
          <Link to={`/blog${previous.fields.slug}`} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={`/blog${next.fields.slug}`} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  </nav>   
  )
}

export default PostNav
