import React from 'react'

function List({ children, clNa }) {
  return (
    <div className={clNa}>
      {children}
    </div>
  )
}

export default List
