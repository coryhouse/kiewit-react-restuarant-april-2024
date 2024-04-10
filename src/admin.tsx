import { Spinner } from "./Spinner";
import { useFoods } from "./hooks/queries/useFoods";

export function Admin() {
  const { data: foods = [], isLoading } = useFoods();

  return (
    <>
      <h1>Admin</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              {food.name} - {food.description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
