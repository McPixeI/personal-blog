import { Link } from "gatsby";
import Img from "gatsby-image";
import * as React from "react"
import { getFormattedDate } from "../utils/helpers";

const Post = ({post}) => {
  const title = post.frontmatter.title || post.fields.slug;
  const {description, date, thumbnail} = post.frontmatter;
  const formattedDate = getFormattedDate(date)
  
  return (
        <li>
          <article
            className="post"
            itemScope
            itemType="http://schema.org/Article"
          >
              <Img 
                className="post__thumbnail" 
                fluid={thumbnail?.childImageSharp.fluid} 
                alt="post-thumbnail"
              />
              <div>
              <h2>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <small className="post__date">{formattedDate}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${description} <a href=${post.fields.slug}>Ver artículo→</a>`  || post.excerpt,
                }}
                itemProp="description"
              />
              </div>
          </article>
        </li>      
  )
}

export default Post
