import * as React from "react"
import Post from "./postItem";

const PostList = ({posts}) => {
  return (
    <>
    {
      posts.length === 0 ? 
        <p>No hay resultados coincidentes. ¡Prueba otra cosa!</p> :
          <ol style={{ listStyle: `none` }}>        
            {posts.map(post => {
                return <Post key={post.fields.slug} post={post}/>
            })}
          </ol>
    } 
    </>
  )
}

export default PostList
