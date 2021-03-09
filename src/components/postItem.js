import { Link } from "gatsby";
import Img from "gatsby-image";
import * as React from "react"

const Post = ({post}) => {
  console.log(post)
  const title = post.frontmatter.title || post.fields.slug;
  const {description, date, thumbnail} = post.frontmatter;
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
              <small>{date}</small>
              <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
              </div>


          </article>
        </li>      
  )
}

export default Post
