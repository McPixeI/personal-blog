import { Link } from "gatsby";
import React from "react";
import { useActiveHash } from "../hooks/use-active-hash"
import _ from "lodash"
import { isMobile } from "react-device-detect";

export default function ToC ({headings}) {
    
    const getHeadingIds = headings =>{
        let idList = []
        headings
          .forEach(heading => {
            idList.push(_.kebabCase(heading.value.toLowerCase())) 
          })
        return idList
    }
    const activeHash = useActiveHash(getHeadingIds(headings))
    const hasHeadings = headings.length > 0
    if (hasHeadings) {
       return  <>
                <h3 className="sidebar-title">Contenido del artículo</h3>
                <ul className="toc">                
                    {hasHeadings && 
                        headings.map(heading => {
                            let isActive = !isMobile && (_.kebabCase(heading.value.toLowerCase()) === activeHash)
                            return <li key={heading.value} className={`toc__item toc__item--depth-${heading.depth}`} >
                                        <Link className={`toc__link`} to={`#${_.kebabCase(heading.value.toLowerCase())}`} data-current={isActive}>
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