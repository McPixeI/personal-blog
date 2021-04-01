import { Link } from "gatsby";
import React from "react";
import _ from "lodash"

export default function TagList ({tags, title}) {

    return (
        <>
        {title && <h3 className='sidebar-title'>{title}</h3>}
        <div className="tags">
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${_.kebabCase(tag)}`}
              className='tag-item'
            >
              {tag}              {console.log(tag)}

            </Link>
          ))}
        </div>
      </>
    )

}