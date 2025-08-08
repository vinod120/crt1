import { useQuery } from "@tanstack/react-query";
import { getTop10Reports } from "../api/reports";

export const useTopReportsQuery = () => {
  return useQuery({
    queryKey: ['top-reports'],
    queryFn: () => getTop10Reports(),
  });
};