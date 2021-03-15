import * as React from "react"
import { Link } from "gatsby"

import navigation from '../data/navigation'
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {

  return (
    <footer className='footer'>
        <div className="container">
            <div className="d-flex align-items-center justify-between">
            <nav className="footer-links">
                {navigation.map(nav =>{
                    return <Link className="navbar__link" key={nav.title} to={nav.path}>{nav.title}</Link>
                })}
            </nav>
            <nav class="d-flex justify-center">
                <a 
                    href="https://www.gatsbyjs.com" 
                    title="Built with Gatsby" 
                    target="_blank" rel="noopener noreferrer"
                    className="footer__img"
                >
                    <StaticImage
                        layout="fixed"
                        formats={["AUTO", "WEBP", "AVIF"]}
                        src="../images/gatsby-icon.png"
                        width={30}
                        height={30}
                        quality={50}
                        alt="Gatsby"
                    />
                </a>
                <a href="https://www.netlify.com/" 
                    title="Hosted by Netlify" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer__img"
                >
                    <StaticImage
                        layout="fixed"
                        formats={["AUTO", "WEBP", "AVIF"]}
                        src="../images/netlify-icon.png"
                        width={30}
                        height={30}
                        quality={50}
                        alt="Netlify"
                    />
                </a>
                <a  href="https://github.com/McPixeI" 
                    title="Open-source on GitHub" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer__img"
                >
                    <StaticImage
                        layout="fixed"
                        formats={["AUTO", "WEBP", "AVIF"]}
                        src="../images/github-icon.png"
                        width={30}
                        height={30}
                        quality={50}
                        alt="Github"
                    />                </a>
             
            </nav>
            </div>
            
        </div>
  </footer>
  )
}

export default Footer
