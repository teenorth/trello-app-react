import React from 'react'

function Header({ children, dragStart }) {
  const handleDrag = (evt) => {
    evt.preventDefault();
    console.log("start");
    dragStart(evt);
  };

  return (
    <div className="header" draggable onDragStart={(evt) => handleDrag(evt)}>
      {children}
    </div>
  )
}

export default Header
