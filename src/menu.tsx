import { useEffect, useState } from "react";
import { Food, Tag, foodSchema } from "./types";
import { Spinner } from "./Spinner";
import ky from "ky";
import { z } from "zod";
import { useMenuSearchParams } from "./useMenuSearchParams";

export function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const { fullTextSearch, tag, setTag, setFullTextSearch } =
    useMenuSearchParams();

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
        onChange={(e) => setFullTextSearch(e.target.value)}
      />

      <select value={tag} onChange={(e) => setTag(e.target.value as Tag)}>
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
