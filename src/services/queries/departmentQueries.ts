import { Department } from "@/components/sidebar/types";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "../api/department";

export const useDepartmentQuery = ({ open }: { open: boolean }) => {
  return useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: () => fetchDepartments(),
    enabled: open,
  });
};
