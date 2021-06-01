import React from 'react';
import useMousePosition from "../utils/useMousePosition";
import ReactDOM from "react-dom"

const portal = document.getElementById("portal");

function DragCopy({ txt, copy }) {
  const { x, y } = useMousePosition();

  const getStyles = () => {
    return {
      top: y ? y - copy.target.clientHeight / 2 : copy.clientY - copy.target.clientHeight / 2,
      left: x ? x - copy.target.clientWidth / 2 : copy.clientX - copy.target.clientWidth / 2,
    }
  }

  return ReactDOM.createPortal(
    <div className="item-copy" style={getStyles()}>
      {txt}
    </div>,
    portal
  )
}

export default DragCopy
