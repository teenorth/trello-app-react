import React, { useReducer, useRef, useState } from "react";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";

import { isItem } from "../utils/util";
import DragCopy from "./DragCopy";

function reducer(state, action) {}

function ListManager({ initial }) {
  const [lists, dispatch] = useReducer(reducer, initial);

  const drgItem = useRef(null);
  const drgElement = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMseDown = (evt, idx) => {
    drgItem.current = idx;
    drgElement.current = evt;
    window.addEventListener("mouseup", handleMseUp);
    setIsDragging(true);
  };

  const handleMseUp = () => {
    drgItem.current = null;
    drgElement.current = null;
    window.removeEventListener("mouseup", handleMseUp);
    setIsDragging(false);
  };

  const createCopy = (txt, curIdx, thisIdx) => {
    return isItem(curIdx, thisIdx) ? (
      <DragCopy txt={txt} copy={drgElement.current} />
    ) : null;
  };

  return (
    <div className="list-wrapper">
      {lists?.map((list, listI) => {
        return (
          <List clNa="list" key={listI}>
            <Header>{list.title}</Header>
            <Content>
              {list.items?.map((item, itemI) => {
                return (
                  <>
                    {isDragging &&
                      createCopy(item.text, drgItem.current, { listI, itemI })}
                    <Item
                      clNa="item"
                      txt={item.text}
                      key={itemI}
                      mseDown={(evt) => handleMseDown(evt, { listI, itemI })}
                    />
                  </>
                );
              })}
            </Content>
            <Footer>
              <p>Footer</p>
            </Footer>
          </List>
        );
      })}
    </div>
  );
}

export default ListManager;
