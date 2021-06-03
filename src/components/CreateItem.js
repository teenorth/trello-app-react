import React, { useState } from "react";
import AddIcon from "./icons/AddIcon";
import TextareaAutosize from "react-textarea-autosize";

function CreateItem({ createItem }) {
  const [showCreate, setShowCreate] = useState(false);
  const [text, setText] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return setShowCreate(false);
    createItem(text);
    setText(null);
    setShowCreate(false);
  };

  return (
    <>
      {!showCreate && (
        <div className="create-item" onClick={() => setShowCreate(true)}>
          <AddIcon size={14} onClick={() => null} />
          <span>Create new task</span>
        </div>
      )}
      {showCreate && (
        <form className="create-item-form">
          <TextareaAutosize
            placeholder="New task name"
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <div onClick={(evt) => handleSubmit(evt)}>
              Add
            </div>
            <div onClick={() => setShowCreate(false)}>
              Close
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default CreateItem;
