import * as React from "react"
import Prism from "prismjs";

const Hero = ({isRootPath}) => {

  React.useEffect(()=>{
    Prism.highlightAll()
  },[])
  return (
    <section className="hero">
      <div className="container">
        {isRootPath && (
        <div className="hero__content">
            <h1>
              <span>Hola,</span> bienvenido a mi blog
            </h1>
            <pre>
              <code className="language-javascript">
              {`const bio = { 
                  name: 'Samuel Torres',
                age: 32,
                occupation: 'Front-end developer',
                interests: ['javascript','css', 'videogames', 'piano'],
                pizza: true
              }
                  
              `}
              </code>
            </pre>
        </div>
        )}
      </div>
    </section>
  )
}

export default Hero
