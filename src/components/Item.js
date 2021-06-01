import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import DeleteIcon from "./icons/DeleteIcon";
import TickIcon from "./icons/TickIcon";

function Item({ clNa, txt, completed, onDrag, mseEnter, updateItem, completeItem, delItem }) {
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

  const handleComplete = (evt) => {
    evt.stopPropagation()
    completeItem(!completed)
  }

  const handleDel = (evt) => {
    evt.stopPropagation()
    delItem()
  }

  const getStyle = () => {
    return { textDecoration: completed ? "line-through" : "" };
  };

  return (
    <>
      {!showEdit ? (
        <div
          draggable
          style={getStyle()}
          className={clNa}
          onDragStart={(evt) => handleDrag(evt, txt)}
          onClick={() => setShowEdit(true)}>
          <div className="drop-zone" onMouseEnter={() => mseEnter()} />
          <div className="actions">
            <div className="button" onClick={(evt) => handleComplete(evt)}>
              <TickIcon size={16} onClick={(evt) => handleComplete(evt)} />
            </div>
            <div className="button" onClick={(evt) => handleDel(evt)}>
              <DeleteIcon size={10} onClick={(evt) => handleDel(evt)} />
            </div>
          </div>
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
