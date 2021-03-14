import { Link } from "gatsby";
import React from "react";

export default function ToC ({headings}) {
    
    const hasHeadings = headings.length > 0;
    let toc;

    const headingToAnchor = value =>{
        return `#${value.replace(/\s+/g, "-")}`
    }

    if (hasHeadings) {
        toc =  <>
                <h5>Contenido del artículo</h5>
                <ul className="toc">                
                    {hasHeadings && headings
                        .filter( heading => heading.depth <= 4)
                        .map(heading => {
                            return <li key={heading.value}>
                                        <Link to={headingToAnchor(heading.value)}>
                                            {heading.value}
                                        </Link>
                                    </li>
                        })
                    }
                </ul>
                </>
    } else {
        return null
    }

    return toc

}