import { Link } from "gatsby";
import React from "react";
import { useActiveHash } from "../hooks/use-active-hash"
import _ from "lodash"

export default function ToC ({headings}) {
    
    const getHeadingIds = headings =>{
        let idList = []
        headings
          .forEach(heading => {
            idList.push(_.kebabCase(heading.value)) 
          })
        return idList
    }
    const activeHash = useActiveHash(getHeadingIds(headings))
    const hasHeadings = headings.length > 0
    let isDesktop = false
    if (typeof window !== 'undefined') {
        isDesktop = window.matchMedia(`(min-width: 767px)`).matches
    }

    if (hasHeadings) {
       return  <>
                <h3 className="sidebar-title">Contenido del artículo</h3>
                <ul className="toc">                
                    {hasHeadings && headings
                        .map(heading => {
                            let isActive = isDesktop && (`#${_.kebabCase(heading.value)}` === `#${activeHash}`)
                            return <li key={heading.value}>
                                        <Link to={`#${_.kebabCase(heading.value)}`} data-current={isActive}>
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