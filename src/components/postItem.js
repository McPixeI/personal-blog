import { Link } from "gatsby";
import * as React from "react"


const Post = ({post}) => {
  const title = post.frontmatter.title || post.fields.slug;
  const {description} = post.frontmatter;
  return (
        <li>
          <article
            className="post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <div>
              <h2>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: description  || post.excerpt,
                }}
                itemProp="description"
              />
              <Link className="post__link" to={post.fields.slug}>Ver artículo →</Link>
            </div>
          </article>
        </li>      
  )
}

export default Post
