import React from "react";

function AddIcon({ size, onClick }) {
  return (
    <svg
      onClick={(evt) => onClick(evt)}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-plus-lg"
      viewBox="0 0 16 16">
      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export default AddIcon;
