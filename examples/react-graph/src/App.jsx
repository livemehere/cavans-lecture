import { useState } from "react";
import "./App.css";
import { MyGraph } from "./MyGraph.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([1, 2, 3, 4, 5]);

  const handleChange = () => {
    const arr = Array.from({ length: 5 }, () => rand(1, 6));
    setData(arr);
  };

  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <div>
      <h1>graph</h1>
      <button onClick={handleChange}>RANDOM</button>
      <MyGraph data={data} />
    </div>
  );
}

export default App;
