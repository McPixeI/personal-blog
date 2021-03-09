import * as React from "react"

export default function Section ({ title, children, ...props }) {
  return (
  <section {...props}>
    <h2 class="section-title">
      {title}
    </h2>
    {children}
  </section>
  )
}
