import React, { useRef, useState } from "react";
import AddIcon from "./icons/AddIcon";
import TextareaAutosize from "react-textarea-autosize";

function CreateItem({ createItem }) {
  const [showCreate, setShowCreate] = useState(false);
  const [text, setText] = useState(null);
  const ref = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (!text) return setShowCreate(false);
    createItem(text);
    setText(null);
    setShowCreate(false);
    ref.current.scrollIntoView();
  };

  return (
    <div className="create-item" onClick={() => setShowCreate(true)} ref={ref}>
      {!showCreate && (
        <>
          <AddIcon size={14} onClick={() => null} />
          <span>Create new task</span>
        </>
      )}
      {showCreate && (
        <form className="create-item-form">
          <TextareaAutosize
            placeholder="New task name"
            onChange={(evt) => setText(evt.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <div onClick={(evt) => handleSubmit(evt)}>Add</div>
            <div
              onClick={(evt) => {
                evt.stopPropagation();
                setShowCreate(false);
              }}>
              Close
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateItem;
