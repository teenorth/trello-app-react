import React, { useState } from "react";
import AddIcon from "./icons/AddIcon";
import TextareaAutosize from "react-textarea-autosize";

function CreateItem({ createItem }) {
  const [showCreate, setShowCreate] = useState(false);
  const [text, setText] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreate(false);

    if (!text) return;
    createItem(text);
    setText(null);
  };

  const handleBlur = (e) => {
    e.preventDefault();

    if (!showCreate) return;
    setTimeout(() => {
      setShowCreate(false);
    }, 100);
  };

  return (
    <>
      {!showCreate && (
        <div className="create-item" onClick={() => setShowCreate(!showCreate)}>
          <AddIcon size={14} onClick={() => null} />
          <span>Create new task</span>
        </div>
      )}
      {showCreate && (
        <form className="create-item-form" onSubmit={(e) => handleSubmit(e)}>
          <TextareaAutosize
            placeholder="New task name"
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => handleBlur(e)}
            autoFocus
          />
          <input type="submit" name="submit" />
        </form>
      )}
    </>
  );
}

export default CreateItem;
