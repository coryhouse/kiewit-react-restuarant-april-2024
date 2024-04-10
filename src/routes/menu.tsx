import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Food, foodSchema } from "../types";
import { Spinner } from "../Spinner";
import ky from "ky";
import { z } from "zod";

type MenuSearch = {
  fullTextSearch?: string;
  tag?: string;
};

type MenuSearchKeys = keyof MenuSearch;

export const Route = createFileRoute("/menu")({
  component: Menu,
  validateSearch: (search: Record<MenuSearchKeys, unknown>): MenuSearch => {
    return {
      fullTextSearch: z.string().optional().parse(search.fullTextSearch),
      tag: z.string().optional().parse(search.tag),
    };
  },
});

function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const { fullTextSearch = "", tag = "" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Derived state
  let filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(fullTextSearch?.toLowerCase()) ||
      food.description.toLowerCase().includes(fullTextSearch.toLowerCase()) ||
      food.tags.some((tag) =>
        tag.toLowerCase().includes(fullTextSearch.toLowerCase())
      )
  );

  filteredFoods = tag
    ? filteredFoods.filter((food) => food.tags.includes(tag))
    : filteredFoods;

  const uniqueTags = Array.from(
    new Set(foods.flatMap((food) => food.tags).sort())
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
        value={fullTextSearch}
        type="search"
        placeholder="Search"
        onChange={(e) => {
          navigate({
            search: (prev) => ({
              ...prev,
              fullTextSearch:
                e.target.value === "" ? undefined : e.target.value,
            }),
          });
        }}
      />

      <select
        value={tag}
        onChange={(e) => {
          navigate({
            search: (prev) => ({
              ...prev,
              tag: e.target.value === "" ? undefined : e.target.value,
            }),
          });
        }}
      >
        <option value="">All tags</option>
        {uniqueTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

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
