import React, { useState } from "react";
import useMousePosition from "../utils/useMousePosition";
import ReactDOM from "react-dom";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";
import Title from "./Title";
import CreateItem from "./CreateItem";

const portal = document.getElementById("portal");

function ListCopy({ list, copy }) {
  const { x, y } = useMousePosition();
  const [mouse] = useState({
    offsetY: copy.target.clientHeight / 2,
    offsetX: copy.target.clientWidth / 2,
  });

  const getStyles = () => {
    return {
      top: y ? y - mouse.offsetY : copy.clientY - mouse.offsetY,
      left: x ? x - mouse.offsetX : copy.clientX - mouse.offsetX,
    };
  };

  return ReactDOM.createPortal(
    <List
      clNa="list-copy"
      style={getStyles()}
      onMseDown={() => null}
      onMseEnter={() => null}>
      <Header>
        <Title
          title={list.title}
          updateTitle={() => null}
          delList={() => null}
        />
      </Header>
      <Content>
        {list.items?.map((item, itemI) => {
          return (
            <>
              <Item
                clNa="item"
                txt={item.text}
                key={itemI}
                mseDown={() => null}
                mseEnter={() => null}
              />
            </>
          );
        })}
      </Content>
      <Footer>
        <CreateItem
          createItem={() => null}
        />
      </Footer>
    </List>,
    portal
  );
}

export default ListCopy;
