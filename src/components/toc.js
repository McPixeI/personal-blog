import { Link } from "gatsby";
import React from "react";
import {headingToAnchor} from "../utils/helpers"

export default function ToC ({headings, activeHash}) {
    
    const hasHeadings = headings.length > 0;
    let toc;

    if (hasHeadings) {
        toc =  <>
                <h5>Contenido del artículo</h5>
                <ul className="toc">                
                    {hasHeadings && headings
                        .filter( heading => heading.depth <= 4) //ver gatsby-remark-autolink-headers en gatsby.config
                        .map(heading => {
                            let isActive = (headingToAnchor(heading.value) == `#${activeHash}`)
                            console.log(activeHash)
                            return <li key={heading.value}>
                                        <Link to={headingToAnchor(heading.value)} data-current={isActive}>
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