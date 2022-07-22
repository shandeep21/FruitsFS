import axios from "axios";
import { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Fruitcart from "./Fruitcart";
let fruit = ["Apple", "Mango"];

function App() {
  const [info, setInfo] = useState([]);
  //const [name, setName] = useState("Fruit");
  useEffect(() => {
    const getInfo = async () => {
      await fetch("http://localhost:7777/fruitList")
        .then((data) => data.json())
        .then((data) => data.inventory)
        .then((data) => Object.keys(data).map((name) => [name, data[name]]))
        .then((data) => setInfo(data));
    };

    getInfo();
  }, []);
  //setName("Apple");
  return (
    <div className="App">
      <h1>FRUIT SHOP</h1>
      {info.map((fruitInfo) => (
        <Fruitcart fruitName={fruitInfo[0]} count={fruitInfo[1].quantity} />
      ))}
    </div>
  );
}
export default App;
