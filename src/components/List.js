import React from "react";

function List({ children, clNa, onMseEnter, onMseDown, style }) {
  return (
    <div className={clNa} onMouseEnter={(evt) => onMseEnter(evt)} style={style}>
      <div className="drag-zone" onMouseDown={(evt) => onMseDown(evt)} />
      {children}
    </div>
  );
}

export default List;
