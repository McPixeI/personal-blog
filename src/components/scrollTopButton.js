import * as React from "react"
import { useState, useEffect } from "react"
import _ from 'lodash';
import { isMobileSafari } from "react-device-detect";

const ScrollTopButton = ({offset}) => {

  const [visible, setVisible] = useState(false)
  
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }

  const handleScroll = () => {
    window.pageYOffset > offset ? setVisible(true) : setVisible(false)
  }

  useEffect(()=>{
    const throttledScroll = _.throttle(handleScroll, 200)
    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  })

  if (!isMobileSafari) {
    return <button className="btn btn--primary gotop" onClick={handleClick} data-visible={visible}>
              <span className='arrow-up'>↑</span> Volver arriba
          </button>
  } else {
    return null
  }
}

export default ScrollTopButton
