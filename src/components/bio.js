/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <Link to="/">
        <StaticImage
          className="bio__avatar"
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../images/profile-img.jpg"
          width={90}
          height={90}
          quality={100}
          alt="Profile picture"
        />
      </Link>

      {author?.name && (
        <div>
          <h1>
          Hola, soy Samuel 
          {` `}
          </h1>
        <p>
          {author?.summary || null} Puedes seguirme en <a href={`https://twitter.com/${social?.twitter || ``}`}>Twitter</a>
        </p>
        </div>

      )}
    </div>
  )
}

export default Bio
