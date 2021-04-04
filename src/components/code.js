import * as React from "react"
import Prism from "prismjs";
import { useEffect } from "react"

const Code = ({language, content}) => {
  const [isVisible, setIsVisible] = React.useState(false)

  useEffect(()=>{
    Prism.highlightAll()
    setIsVisible(true)
  },[])

  return (
    <pre style={isVisible ? {visibility:'visible'} : {visibility:'hidden'}}>
      <code className={`language-${language}`}>
        {content}
      </code>
    </pre>
  )
}

export default Code
