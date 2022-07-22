import "./App.css";

export default function Fruitcart(props) {
  return (
    <div className="cart">
      <h2>{props.fruitName}</h2>
      <h1>{props.count}</h1>
    </div>
  );
}
