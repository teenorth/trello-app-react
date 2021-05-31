import React from 'react'

function Item({ clNa, txt }) {
  return (
    <div className={clNa}>
      {txt}
    </div>
  )
}

export default Item
