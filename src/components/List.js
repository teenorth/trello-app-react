import React from "react";

function List({ children, clNa, onMseEnter, dragStart, style }) {
  const handleDrag = (evt) => {
    evt.preventDefault();
    console.log("start");
    dragStart(evt);
  };

  return (
    <div className={clNa} onMouseEnter={(evt) => onMseEnter(evt)} style={style}>
      <div
        draggable
        className="drag-zone"
        onDragStart={(evt) => handleDrag(evt)}
      />
      {children}
    </div>
  );
}

export default List;
