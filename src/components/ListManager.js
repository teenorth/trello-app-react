import React, { useReducer, useRef, useState } from "react";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";
import Title from "./Title";
import CreateItem from "./CreateItem";

import { isItem, isList } from "../utils/util";
import DragCopy from "./DragCopy";
import ListCopy from "./ListCopy";
import CreateList from "./CreateList";

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
    case "edit-list-title":
      newList[index.listI].title = payload;
      return newList;
    case "delete-list":
      newList.splice(index.listI, 1);
      return newList;
    case "create-item":
      newList[index.listI].items.push({ text: payload, isCompleted: false });
      return newList;
    case "create-list":
      newList.push({ title: "New list", items: [] });
      return newList;
    case "complete-item":
      newList[index.listI].items[index.itemI].isCompleted = payload;
      return newList;
    case "delete-item":
      newList[index.listI].items.splice(index.itemI, 1);
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

  const listDragStart = (evt, list, idx) => {
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
            onMseEnter={
              !list.items.length
                ? listDragging.current
                  ? () => listMseEnter({ listI })
                  : () => itemMseEnter({ listI, itemI: 0 })
                : () => listMseEnter({ listI })
            }>
            <Header dragStart={(evt) => listDragStart(evt, list, { listI })}>
              <Title
                title={list.title}
                updateTitle={(data) =>
                  dispatch({
                    type: "edit-list-title",
                    payload: data,
                    index: { listI },
                  })
                }
                delList={() => {
                  dispatch({
                    type: "delete-list",
                    index: { listI },
                  });
                }}
              />
            </Header>
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
                      completed={item.isCompleted}
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
                      completeItem={(data) =>
                        dispatch({
                          type: "complete-item",
                          index: { listI, itemI },
                          payload: data,
                        })
                      }
                      delItem={() =>
                        dispatch({
                          type: "delete-item",
                          index: { listI, itemI },
                        })
                      }
                    />
                  </>
                );
              })}
            </Content>
            <Footer>
              <CreateItem
                createItem={(data) =>
                  dispatch({
                    type: "create-item",
                    index: { listI },
                    payload: data,
                  })
                }
              />
            </Footer>
          </List>
        );
      })}
      {showCopy && drgCopy.current}
      <CreateList onClick={() => dispatch({ type: "create-list" })} />
    </div>
  );
}

export default ListManager;
