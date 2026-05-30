import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateHandle } from "../services/update-handle";

export function useUpdateHandle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHandle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}
