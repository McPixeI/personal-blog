import * as React from "react"


const Sidebar = ({children, sticky}) => {

  const stickyClass = sticky ? 'sidebar__content--sticky' : ''
  return (
    <aside className="sidebar">
      <div className={`sidebar__content ${stickyClass}`}>
        {children}
      </div>
    </aside>
  )
}

export default Sidebar
