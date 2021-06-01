import React, { useState } from 'react';
import useMousePosition from "../utils/useMousePosition";
import ReactDOM from "react-dom"

const portal = document.getElementById("portal");

function DragCopy({ txt, copy }) {
  const { x, y } = useMousePosition();
  const [mouse] = useState({
    offsetY: copy.target.clientHeight / 2,
    offsetX: copy.target.clientWidth / 2
  })

  const getStyles = () => {
    return {
      top: y ? y - mouse.offsetY : copy.clientY - mouse.offsetY,
      left: x ? x - mouse.offsetX : copy.clientX - mouse.offsetX,
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
