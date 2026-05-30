import { useQuery } from "@tanstack/react-query";

import { checkHandle } from "../services/check-handle";

export function useCheckHandle(handle: string) {
  return useQuery({
    queryKey: ["handle", handle],

    queryFn: () => checkHandle(handle),

    enabled: handle.length > 2,
  });
}
