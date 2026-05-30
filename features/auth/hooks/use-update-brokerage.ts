import { useMutation } from "@tanstack/react-query";

import { updateBrokerage } from "../services/update-brokerage";

export function useUpdateBrokerage() {
  return useMutation({
    mutationFn: updateBrokerage,
  });
}
