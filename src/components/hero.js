import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

import navigation from '../data/navigation'

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
