import { Link } from "gatsby";
import React from "react";

export default function ToC ({headings}) {
    
    const hasHeadings = headings.length > 0;
    let toc;

    const headingToAnchor = value =>{
        return `#${value.replace(/\s+/g, "-")}`
    }

    if (hasHeadings) {
        toc =  <ul className="toc">                
                {hasHeadings && headings.map(heading=>{
                    if (heading.depth > 4) return
                    return <li key={heading.value}>
                                <Link to={headingToAnchor(heading.value)}>
                                    {heading.value}
                                </Link>
                            </li>
                })}
                </ul>
    } else {
        return null
    }

    return toc

}