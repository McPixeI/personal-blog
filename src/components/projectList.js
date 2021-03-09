import * as React from "react"

const ProjectList = ({data}) => {
  return (
    <>
    {
      data.length === 0 ? 
        <p>No hay resultados coincidentes. ¡Prueba otra cosa!</p> :
          <ol style={{ listStyle: `none` }}>        
            {data.map(project => {
                return <p>{project.title}</p>
            })}
          </ol>
    } 
    </>
  )
}

export default ProjectList
