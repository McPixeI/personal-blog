import * as React from "react"

const Hero = ({isRootPath}) => {

  return (
    <section className="hero">
      <div className="container">
        {isRootPath && (
        <div className="hero__content container">
            <h1>
              <span>Hola,</span> bienvenido a mi blog
            </h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        )}
      </div>
    </section>
  )
}

export default Hero
