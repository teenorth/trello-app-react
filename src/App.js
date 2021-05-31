import "./App.css";
import ListManager from "./components/ListManager";
import defaultItems from "./utils/defaultItems";

const items = defaultItems();

function App() {
  return (
    <div className="App">
      <ListManager initial={items} />
    </div>
  );
}

export default App;
