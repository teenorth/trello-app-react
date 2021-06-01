import React from "react";
import AddIcon from "./icons/AddIcon";

function CreateList({ onClick }) {
  return (
    <div className="new-list">
      <div onClick={() => onClick()} className="create-list">
        <AddIcon size={16} />
        <span>Add new list</span>
      </div>
      <div className="clear-space"></div>
    </div>
  );
}

export default CreateList;
