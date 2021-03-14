/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
      {author?.name && (
        <div>
          <h1>
          <span>Hola,</span> bienvenido a mi blog
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
