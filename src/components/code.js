import * as React from "react"
import Prism from "prismjs";
import { useEffect } from "react"

const Code = ({language, content}) => {

  useEffect(()=>{
    Prism.highlightAll()
  },[])

  return (
    <pre>
      <code className={`language-${language}`}>
        {content}
      </code>
    </pre>
  )
}

export default Code
