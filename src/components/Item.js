import React from "react";

function Item({ clNa, txt, mseDown, mseEnter }) {
  return (
    <div
      className={clNa}
      onMouseDown={(evt) => mseDown(evt, txt)}>
      <div className="drop-zone" onMouseEnter={() => mseEnter()} />
      {txt}
    </div>
  );
}

export default Item;
