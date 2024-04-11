import { useState } from "react";
import { useAddFood } from "./hooks/queries/useFoods";
import { NewFood } from "./types";

const newFood: NewFood = {
  name: "",
  image: "",
  price: 0,
  description: "",
  tags: [],
};

export function AddFoodForm() {
  const [food, setFood] = useState(newFood);

  const addFood = useAddFood(() => setFood(newFood));

  return (
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
  );
}
