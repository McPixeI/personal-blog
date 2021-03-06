import * as React from "react"
import { Link } from "gatsby"

export default function Section ({ title, children, button, ...props }) {
  return (
  <section {...props}>
    <h2>
      {title}
      {button && (
        <Link className="section-button" to="/blog"> Ver todo</Link>
      )}
    </h2>
    {children}
  </section>
  )
}
