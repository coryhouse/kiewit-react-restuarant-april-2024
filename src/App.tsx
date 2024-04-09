import { useEffect, useState } from "react";
import { Food } from "./types";

function App() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/foods").then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        setFoods(data);
      });
    });
  }, []);

  return (
    <>
      <h1>Menu</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.description}</td>
              <td>{food.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
