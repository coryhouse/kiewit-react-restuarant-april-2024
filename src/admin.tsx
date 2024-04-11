import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { useFoods } from "./hooks/queries/useFoods";
import ky from "ky";
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

  const queryClient = useQueryClient();

  const deleteFood = useMutation({
    mutationFn: async (id: number) => {
      return ky.delete(`http://localhost:3001/foods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  const addFood = useMutation({
    mutationFn: async () => {
      const savedFood = await ky
        .post(`http://localhost:3001/foods`, { json: food })
        .json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      setFood(newFood);
    },
  });

  return (
    <>
      <h1>Admin</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFood.mutate();
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
