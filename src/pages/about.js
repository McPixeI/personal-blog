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
      <h2 className="section-subtitle">Hola, soy Samuel Torres</h2>
      <article
        className="blog-post">
        <div className='blog-post__content'>
          <div className="blog-post__body" itemProp="articleBody">
              <p>
                Soy un ingeniero de software nacido en Barcelona ciudad, donde resido actualmente🏡. Tengo 32 años y llevo alrededor de 10 dedicados al desarrollo web 💻, 
                donde me siento como en casa.
              </p>
              <p>
              Puedes contactar conmigo por <a href="">Twitter</a> o <a href="">LinkedIn</a>.
              </p>
              <h3>Mi trabajo</h3>
              <p>
                Actualmente formo parte de Grupo Godó en el puesto de Lead Front-end del departamento de Sistemas, ayudando a hacer crecer las webs de La Vanguardia, 
                Mundo Deportivo y Rac1 desde hace ya algo más de 3 años.
              </p>
              <h3>Por qué este blog</h3>
              <p>
                El mundo del desarrollo web está en continuo cambio y cada vez existen más alternativas para resolver una necesidad.
                 y a veces la cantidad de posibilidades diferentes para afrontar un desarrollo puede llegar a 
                resultar abrumador. Si perteneces al sector o estás empezando,
                seguro que sabes de lo que hablo. 
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