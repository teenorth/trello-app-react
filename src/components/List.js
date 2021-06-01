import React from "react";

function List({ children, clNa, onMseEnter, style }) {
  return (
    <div className={clNa} onMouseEnter={(evt) => onMseEnter(evt)} style={style}>
      {children}
    </div>
  );
}

export default List;
