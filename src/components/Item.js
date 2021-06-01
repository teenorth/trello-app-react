import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

function Item({ clNa, txt, onDrag, mseEnter, updateItem }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDrag = (evt, txt) => {
    evt.preventDefault();
    onDrag(evt, txt);
  };

  const handleUpdate = (data) => {
    setShowEdit(false);
    if (data === txt) return;
    updateItem(data);
  };

  return (
    <>
      {!showEdit ? (
        <div
          draggable
          className={clNa}
          onDragStart={(evt) => handleDrag(evt, txt)}
          onClick={() => setShowEdit(true)}>
          <div className="drop-zone" onMouseEnter={() => mseEnter()} />
          {txt}
        </div>
      ) : (
        <EditItem current={txt} updateEvent={(data) => handleUpdate(data)} />
      )}
    </>
  );
}

function EditItem({ current, updateEvent }) {
  const [text, setText] = useState(current);
  const selected = useRef(null);

  const handleBlur = (event) => {
    event.preventDefault();
    selected.current = false;
    if (!text) return setText(current);
    updateEvent(text);
  };

  const textAreaCallback = (element) => {
    if (element && !selected.current) {
      element.select();
      selected.current = true;
    }
  };

  return (
    <div className="item-edit">
      <TextareaAutosize
        ref={textAreaCallback}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => handleBlur(e)}
        value={text}
        autoFocus
        spellCheck="false"
      />
    </div>
  );
}

export default Item;
