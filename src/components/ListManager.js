import React, { useReducer } from "react";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";

function reducer(state, action) {}

function ListManager({ initial }) {
  const [lists, dispatch] = useReducer(reducer, initial);

  return (
    <div className="list-wrapper">
      {lists?.map((list, listI) => {
        return (
          <List clNa="list" key={listI}>
            <Header>{list.title}</Header>
            <Content>
              {list.items?.map((item, itemI) => {
                return <Item clNa="item" txt={item.text} key={itemI} />;
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
