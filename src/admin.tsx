import { Spinner } from "./Spinner";
import { useAddFood, useDeleteFood, useFoods } from "./hooks/queries/useFoods";
import { useState } from "react";
import { NewFood } from "./types";

const newFood: NewFood = {
  name: "",
  image: "",
  price: 0,
  description: "",
  tags: [],
};

export function Admin() {
  const { data: foods = [], isLoading } = useFoods();
  const [food, setFood] = useState(newFood);

  const deleteFood = useDeleteFood();
  const addFood = useAddFood(() => setFood(newFood));

  return (
    <>
      <h1>Admin</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFood.mutate(food);
        }}
      >
        <label>
          Name
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={(e) => setFood({ ...food, name: e.target.value })}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={food.description}
            onChange={(e) => setFood({ ...food, description: e.target.value })}
          />
        </label>
        <button type="submit">Add Food</button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <button
                onClick={() => deleteFood.mutate(food.id)}
                aria-label={`Delete ${food.name}`}
              >
                Delete
              </button>{" "}
              {food.name} - {food.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
