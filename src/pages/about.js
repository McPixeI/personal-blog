import React from "react"

// Components
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import Newsletter from "../components/newsletter"
import Sidebar from "../components/sidebar"

const About = ({
  location,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location}>
    <SEO title={'Sobre mí'} />
    <section className="content-section">
      <h1 className="section-title">Sobre mí</h1>
      <h2 className="section-subtitle"><span role="img" aria-label='hello'>👋</span>Hola, soy Samuel Torres</h2>
      <article
        className="blog-post">
        <div className='blog-post__content'>
          <div className="blog-post__body" itemProp="articleBody">
            <StaticImage
              className='static-img'
              placeholder="blurred"
              src="../images/desk.jpg"
              alt="Desktop picture"
            />
            <p>
              Soy un ingeniero de software nacido en Barcelona ciudad, donde resido actualmente. Tengo 32 años y he pasado cerca de los últimos 10 trabajando como <strong>front-end developer</strong>.
            </p>
            <p>
            Puedes contactar conmigo por <a href="https://twitter.com/McPixeI" target='_blank' rel='nofollow noreferrer'>Twitter</a> o <a href="https://www.linkedin.com/in/samuel-torres-fernandez-59305b185/" target='_blank' rel='nofollow noreferrer'>LinkedIn</a>.
            </p>
            <h3><span role="img" aria-label='work'>💻</span> Mi trabajo </h3>
            <p>
              Actualmente formo parte de Grupo Godó en el puesto de <strong>Lead Front-end</strong> del departamento de Sistemas, ayudando a hacer crecer las webs 
              de <strong><a href="https://www.lavanguardia.com" target='_blank' rel="nofollow noreferrer">La Vanguardia</a>, <a href="https://www.mundodeportivo.com" target='_blank' rel="nofollow noreferrer">Mundo Deportivo</a> y <a href="https://www.rac1.cat" target='_blank' rel="nofollow noreferrer">Rac1</a></strong> desde hace ya algo más de 3 años.
            </p>
            <p>Algunos de mis puntos fuertes o intereses son:</p>
            <ul>
              <li>Optimización de tiempo de carga de página</li>
              <li>Conocimientos SEO y analítica</li>
              <li>Javascript Vanilla (ES6), jQuery y librerías como React</li>
              <li>CSS, SASS, <a href="http://getbem.com/" target='_blank' rel="nofollow noreferrer">Metodología BEM</a> y <a href="https://bradfrost.com/blog/post/atomic-web-design/" target='_blank' rel="nofollow noreferrer">Atomic Design</a></li>
            </ul>
            <h3><span role="img" aria-label='blog'>📓</span> Por qué este blog</h3>
            <p>
              El mundo del desarrollo web está en continuo cambio y cada vez existen más alternativas para resolver una misma necesidad.
              Esta variedad puede llegar a ser una gran ventaja, pero a su vez puede resultar abrumador para alguien que está dando sus primeros pasos. 
              Si perteneces a este sector, seguro que sabes de lo que hablo. 
            </p>
            <p>
            Personalmente, me gusta estar al día de las últimas tendencias y paso gran parte de mi tiempo libre  programando y formándome de forma autodidacta. 
            Hace un tiempo se me ocurrió que, a medida que iba aprendiendo, podía ir compartiendo mis conocimientos públicamente para todo aquel que lo necesitara.
            Ese es el principal motivo de ser de este blog. Así que, tanto si estás empezando como si ya llevas un tiempo en el sector, te invito a echar un vistazo a ver si algo te resulta útil.
            </p>
          </div>
          <Sidebar>
            <div className="card">
            <Newsletter/>
              </div>
          </Sidebar>
        </div>
        </article>

    </section>
  </Layout>
 
)

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`