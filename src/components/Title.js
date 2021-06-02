import React, { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";

function Title({ title, updateTitle, delList }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdate = (data) => {
    setShowEdit(false);
    
    if (data === title) return;
    if (!data.replace(/(\r\n|\n|\r)/gm, "").length) return;
    updateTitle(data.replace(/(\r\n|\n|\r)/gm, ""));
  };

  return (
    <>
      {!showEdit ? (
        <div className="title">
          <span onClick={() => setShowEdit(true)}>{title}</span>
          <DeleteIcon size={12} onClick={() => delList()}/>
        </div>
      ) : (
        <div className="title">
          <EditTitle
            current={title}
            updateEvent={(data) => handleUpdate(data)}
          />
        </div>
      )}
    </>
  );
}

function EditTitle({ current, updateEvent }) {
  const [title, setTitle] = useState(current);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateEvent(title);
  }

  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => updateEvent(title)}
        autoFocus
        spellCheck="false"
      />
    </form>
  );
}

export default Title;
