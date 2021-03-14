import * as React from "react"
import Bio from "./bio"

const Hero = ({isRootPath}) => {

  return (
    <section className="hero">
      <div className="container">
        {isRootPath && <Bio/>}
      </div>
    </section>
  )
}

export default Hero
