import React, { useReducer, useRef, useState } from "react";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";

import { isItem, isList } from "../utils/util";
import DragCopy from "./DragCopy";
import ListCopy from "./ListCopy";

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
    case "swap-list":
      newList.splice(to.listI, 0, newList.splice(from.listI, 1)[0]);
      return newList;
    case "edit-item-text":
      newList[index.listI].items[index.itemI].text = payload;
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

  const itemDragging = useRef(false);
  const listDragging = useRef(false);
  const [showCopy, setShowCopy] = useState(false);

  const itemOnDrag = (evt, txt, idx) => {
    drgItem.current = idx;
    drgElement.current = evt;
    drgCopy.current = <DragCopy txt={txt} copy={evt} />;
    itemDragging.current = true;
    window.addEventListener("mouseup", handleMseUp);
    setShowCopy(true);
  };

  const itemMseEnter = (thisIdx) => {
    const curIdx = drgItem.current;
    if (!curIdx || !thisIdx) return;
    if (!itemDragging.current) return;
    if (!isItem(curIdx, thisIdx)) {
      dispatch({ type: "swap-list-item", from: curIdx, to: thisIdx });
      drgItem.current = thisIdx;
    }
  };

  const listMseDown = (evt, list, idx) => {
    drgItem.current = idx;
    drgElement.current = evt;
    drgCopy.current = <ListCopy list={list} copy={evt} />;
    listDragging.current = true;
    window.addEventListener("mouseup", handleMseUp);
    setShowCopy(true);
  };

  const listMseEnter = (thisIdx) => {
    const curIdx = drgItem.current;
    if (!curIdx || !thisIdx) return;
    if (!listDragging.current) return;
    if (!isList(curIdx, thisIdx)) {
      dispatch({ type: "swap-list", from: curIdx, to: thisIdx });
      drgItem.current = thisIdx;
    }
  };

  const handleMseUp = () => {
    drgItem.current = null;
    drgElement.current = null;
    drgCopy.current = null;
    itemDragging.current = false;
    listDragging.current = false;
    window.removeEventListener("mouseup", handleMseUp);
    setShowCopy(false);
  };

  return (
    <div className="list-wrapper">
      {lists?.map((list, listI) => {
        return (
          <List
            clNa={
              isList(drgItem.current, { listI })
                ? listDragging.current
                  ? "list dragging"
                  : "list"
                : "list"
            }
            key={listI}
            onMseDown={(evt) => listMseDown(evt, list, { listI })}
            onMseEnter={
              list.items.length
                ? () => listMseEnter({ listI })
                : itemDragging.current
                ? () => itemMseEnter({ listI, itemI: 0 })
                : () => listMseEnter({ listI })
            }>
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
                      onDrag={(evt, txt) =>
                        itemOnDrag(evt, txt, { listI, itemI })
                      }
                      mseEnter={() => itemMseEnter({ listI, itemI })}
                      updateItem={(data) =>
                        dispatch({
                          type: "edit-item-text",
                          index: { listI, itemI },
                          payload: data,
                        })
                      }
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
      {showCopy && drgCopy.current}
    </div>
  );
}

export default ListManager;
