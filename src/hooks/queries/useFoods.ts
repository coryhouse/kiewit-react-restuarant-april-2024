import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { foodSchema } from "../../types";
import { z } from "zod";

export function useFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const data = await ky("http://localhost:3001/foods").json();
      return z.array(foodSchema).parse(data);
    },
  });
}
