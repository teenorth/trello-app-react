import React from "react";

function Item({ clNa, txt, onDrag, mseEnter }) {

  const handleDrag = (evt, txt) => {
    evt.preventDefault();
    onDrag(evt, txt)
  }

  return (
    <div 
      draggable
      className={clNa}
      onDragStart={(evt) => handleDrag(evt, txt)}>
      <div className="drop-zone" onMouseEnter={() => mseEnter()} />
      {txt}
    </div>
  );
}

export default Item;
