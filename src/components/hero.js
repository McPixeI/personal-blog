import * as React from "react"
import Code from "./code"

const Hero = ({isRootPath}) => {

  let codeConent = `
const bio = {
  name: 'Samuel Torres',
  age: 32,
  occupation: 'Front-end developer',
  interests: ['javascript','css', 'videogames', 'piano'],
  pizza: true
}
  `
  
  return (
    <section className="hero">
      <div className="container">
        {isRootPath && (
        <div className="hero__content">
            <h1>
              <span>Hola,</span> bienvenido a mi blog
            </h1>
            <h2>Escribo tutoriales, consejos y trucos de Front-end</h2>
            <Code language="javascript" content={codeConent}/>
        </div>
        )}
      </div>
    </section>
  )
}

export default Hero
