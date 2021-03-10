import * as React from "react"
import Project from "./projectItem"

const ProjectList = ({data}) => {
  return (
    <>
    {
      data.length === 0 ? 
        <p>No hay resultados coincidentes. ¡Prueba otra cosa!</p> :
          <ol style={{ listStyle: `none` }}>        
            {data.map(project => {
                return <Project key={project.title} props={project}/>
            })}
          </ol>
    } 
    </>
  )
}

export default ProjectList
