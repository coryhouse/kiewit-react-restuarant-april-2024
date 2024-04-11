import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { NewFood, foodSchema } from "../../types";
import { z } from "zod";

const baseUrl = "http://localhost:3001/foods";

const keys = {
  foods: ["foods"],
};

export function useFoods() {
  return useQuery({
    queryKey: keys.foods,
    queryFn: async () => {
      const data = await ky(baseUrl).json();
      return z.array(foodSchema).parse(data);
    },
  });
}

export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return ky.delete(`${baseUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.foods });
    },
  });
}

export function useAddFood(onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFood: NewFood) => {
      return await ky.post(baseUrl, { json: newFood }).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.foods });
      onSuccess();
    },
  });
}
