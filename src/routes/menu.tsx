import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Food, foodSchema } from "../types";
import { Spinner } from "../Spinner";
import ky from "ky";
import { z } from "zod";

type MenuSearch = {
  foodSearch?: string;
};

export const Route = createFileRoute("/menu")({
  component: Menu,
  validateSearch: (search: Record<string, unknown>): MenuSearch => {
    return {
      foodSearch: z.string().optional().parse(search.foodSearch),
    };
  },
});

function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const { foodSearch: search = "" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Derived state
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search?.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase()) ||
      food.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

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
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => {
          navigate({
            search: (prev) => ({
              ...prev,
              foodSearch: e.target.value === "" ? undefined : e.target.value,
            }),
          });
        }}
      />

      {<p>{filteredFoods.length} foods found</p>}
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
            {filteredFoods.map((food) => (
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
