import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { useFoods } from "./hooks/queries/useFoods";
import ky from "ky";

export function Admin() {
  const { data: foods = [], isLoading } = useFoods();

  const queryClient = useQueryClient();

  const deleteFood = useMutation({
    mutationFn: async (id: number) => {
      return ky.delete(`http://localhost:3001/foods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  return (
    <>
      <h1>Admin</h1>
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
