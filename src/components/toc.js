import { Link } from "gatsby";
import React from "react";
import {headingToAnchor} from "../utils/helpers"
import { useActiveHash } from "../hooks/use-active-hash"

export default function ToC ({headings}) {
    
    const getHeadingIds = headings =>{
        let idList = []
        const hashToId = str => str.slice(1)    
        headings
          .filter( heading => heading.depth <= 4) //ver gatsby-remark-autolink-headers en gatsby.config
          .forEach(heading => {
            idList.push(hashToId(headingToAnchor(heading.value))) 
          })
        return idList
    }
    const activeHash = useActiveHash(getHeadingIds(headings))
    const hasHeadings = headings.length > 0
    const isDesktop = window.matchMedia(`(min-width: 767px)`).matches

    if (hasHeadings) {
       return  <>
                <h3 className="sidebar-title">Contenido del artículo</h3>
                <ul className="toc">                
                    {hasHeadings && headings
                        .filter( heading => heading.depth <= 4) //ver gatsby-remark-autolink-headers en gatsby.config
                        .map(heading => {
                            let isActive = isDesktop && (headingToAnchor(heading.value) === `#${activeHash}`)
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
}