import React from "react";

function Item({ clNa, txt, mseDown }) {
  return (
    <div
      className={clNa}
      onMouseDown={(evt) => mseDown(evt)}
      onMouseEnter={() => console.log("mouse enter")}>
      {txt}
    </div>
  );
}

export default Item;
