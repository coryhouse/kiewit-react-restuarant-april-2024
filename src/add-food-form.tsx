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

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFood({ ...food, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addFood.mutate(food);
      }}
    >
      <label>
        Name
        <input type="text" id="name" value={food.name} onChange={onChange} />
      </label>
      <label>
        Description
        <input
          type="text"
          name="description"
          value={food.description}
          onChange={onChange}
        />
      </label>
      <button type="submit">Add Food</button>
    </form>
  );
}
