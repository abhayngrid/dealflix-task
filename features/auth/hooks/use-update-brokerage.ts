import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBrokerage } from "../services/update-brokerage";

export function useUpdateBrokerage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrokerage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}
