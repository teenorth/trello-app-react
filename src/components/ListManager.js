import React, { useReducer } from 'react';
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import Item from "./Item";

function reducer(state, action) {

}

function ListManager({ initial }) {
  const [lists, dispatch] = useReducer(reducer, initial);

  return (
    <div>
      <List clNa="list">
        <Header>
          <p>Hello Hello</p>
        </Header>
        <Content>
          <Item clNa="item" txt="hello" />
          <Item clNa="item" txt="hello" />
          <Item clNa="item" txt="hello" />
        </Content>
        <Footer>
          <p>Hello Hello</p>
        </Footer>
      </List>
    </div>
  )
}

export default ListManager
