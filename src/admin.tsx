import { Spinner } from "./Spinner";
import { AddFoodForm } from "./add-food-form";
import { useDeleteFood, useFoods } from "./hooks/queries/useFoods";

export function Admin() {
  const { data: foods = [], isLoading } = useFoods();

  const deleteFood = useDeleteFood();

  return (
    <>
      <h1>Admin</h1>
      <AddFoodForm />

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
