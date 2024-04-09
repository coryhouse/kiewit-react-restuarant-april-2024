import { useEffect, useState } from "react";
import { Food, foodSchema } from "./types";
import { Spinner } from "./Spinner";
import ky from "ky";
import { z } from "zod";

function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const data = await ky("http://localhost:3001/foods").json();
        console.log(data);
        setFoods(z.array(foodSchema).parse(data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
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
