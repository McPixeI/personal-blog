import * as React from "react"

export default function Section ({ title, children, ...props }) {
  return (
  <section className="content-section" {...props}>
    {title &&(<h2 className="section-title">
                {title}
              </h2>)
    }
    {children}
  </section>
  )
}
