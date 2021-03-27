import * as React from "react"

export default function Search ({ posts, onResults }){

  const handleInputChange = evt => {
    const query = evt.target.value

    const filteredData = posts.filter(post => {
      const { description, title, tags } = post.frontmatter
      return (
        description?.toLowerCase().includes(query.toLowerCase()) ||
        title?.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase()))
      )
    })

    const hasResults = filteredData && query !== ''
    const results = hasResults ? filteredData : posts
    onResults(results)
  }

  return (
    <input
    type="text"
    aria-label="Search"
    placeholder="p.ej: 'React'..."
    onChange={handleInputChange}
  />
  )
}

