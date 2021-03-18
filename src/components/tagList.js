import { Link } from "gatsby";
import React from "react";
import { slugify } from "../utils/helpers";

export default function TagList ({tags, title}) {

    return (
        <>
        {title && <h5>{title}</h5>}
        <div className="tags">
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${slugify(tag)}`}
              className='tag'
            >
              {tag}
            </Link>
          ))}
        </div>
      </>
    )

}