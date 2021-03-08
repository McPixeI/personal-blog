/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
      {author?.name && (
        <div>
          <p>
          Blog personal de <a href={`https://twitter.com/${social?.twitter || ``}`}>Samuel Torres</a>
          {` `}
        </p>
        <p>
          {author?.summary || null}
        </p>
        </div>

      )}
    </div>
  )
}

export default Bio
