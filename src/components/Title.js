import React, { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";

function Title({ title, updateTitle, delList }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdate = (data) => {
    setShowEdit(false);
    updateTitle(data);
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

  return (
    <form>
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
