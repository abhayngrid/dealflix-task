import { useMutation } from "@tanstack/react-query";

import { updateHandle } from "../services/update-handle";

export function useUpdateHandle() {
  return useMutation({
    mutationFn: updateHandle,
  });
}
