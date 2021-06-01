import React, { useReducer, useRef, useState } from "react";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";

import { isItem } from "../utils/util";
import DragCopy from "./DragCopy";

function reducer(state, params) {
  const newList = JSON.parse(JSON.stringify(state));
  const { type, payload, index, to, from } = params;

  switch (type) {
    case "swap-list-item":
      newList[to.listI].items.splice(
        to.itemI,
        0,
        newList[from.listI].items.splice(from.itemI, 1)[0]
      );
      return newList;
    default:
      throw new Error();
  }
}

function ListManager({ initial }) {
  const [lists, dispatch] = useReducer(reducer, initial);

  const drgItem = useRef(null);
  const drgElement = useRef(null);
  const drgCopy = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMseDown = (evt, txt, idx) => {
    drgItem.current = idx;
    drgElement.current = evt;
    drgCopy.current = <DragCopy txt={txt} copy={evt} />;
    window.addEventListener("mouseup", handleMseUp);
    setIsDragging(true);
  };

  const handleMseUp = () => {
    drgItem.current = null;
    drgElement.current = null;
    drgCopy.current = null;
    window.removeEventListener("mouseup", handleMseUp);
    setIsDragging(false);
  };

  const handleMseEnter = (thisIdx) => {
    const curIdx = drgItem.current;
    if (!curIdx || !thisIdx) return;
    if (!isItem(curIdx, thisIdx)) {
      dispatch({ type: "swap-list-item", from: curIdx, to: thisIdx });
      drgItem.current = thisIdx;
    }
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
                    <Item
                      clNa={
                        isItem(drgItem.current, { listI, itemI })
                          ? "item dragging"
                          : "item"
                      }
                      txt={item.text}
                      key={itemI}
                      mseDown={(evt, txt) =>
                        handleMseDown(evt, txt, { listI, itemI })
                      }
                      mseEnter={() => handleMseEnter({ listI, itemI })}
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
      {isDragging && drgCopy.current}
    </div>
  );
}

export default ListManager;
