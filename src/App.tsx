import { useEffect, useState } from "react";
import { Food } from "./types";
import { Spinner } from "./Spinner";

function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/foods")
      .then((resp) => {
        resp.json().then((data) => {
          setLoading(false);
          console.log(data);
          setFoods(data);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) throw error;

  return (
    <>
      <h1>Menu</h1>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
}

export default App;
